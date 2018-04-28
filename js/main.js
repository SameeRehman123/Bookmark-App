// Listen for form submit
document.getElementById('addBookmark').addEventListener('submit', saveBookmark);

// Listen for key strokes in the search bar
document.getElementById('filterBar').addEventListener('keyup', filterNames);


function saveBookmark(e){
  // Prevent Default form submit
  e.preventDefault();

  // Get form values
  var siteInput = document.getElementById('siteInput').value;
  var urlInput  = document.getElementById('urlInput').value;

  //Validation
  if (siteInput === "" || urlInput === "") {
    return;
  }

  var bookmark = {
    name: siteInput,
    url: urlInput
  };

  // Test if bookmarks exists in local storage
  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];

    //Add bookmark value to array
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  else{
    // Get bookmarks from local Storage
    var bookmarks = localStorage.getItem('bookmarks');
    bookmarks = JSON.parse(bookmarks);

    //Add bookmark to array
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  fetchBookmarks();
  M.toast({html: 'Bookmark Added'})

}

function fetchBookmarks(){
  // Fetch bookmarks from local Storage
  var bookmarks = localStorage.getItem('bookmarks');
  bookmarks = JSON.parse(bookmarks);

  // Get output id
  var bookmarkResults = document.getElementById('bookmarks');

  bookmarkResults.innerHTML = "";
  for(var i=0; i<bookmarks.length; i++){
    var index = i;
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    var description = bookmarks[i].description;
    var category = bookmarks[i].category;

    bookmarkResults.innerHTML +=
       '<div class="card col s12 z-depth-1">'+
       '<div class="card-content">'+
           '<div class="col s8">'+
            '<p id="name">'+name+'</p>'+
           '</div>'+
           '<div class="col s2">'+
            '<a style="cursor:pointer;" onclick="deleteBookmark(\''+url+'\')"><i class="material-icons">delete</i></a>'+
           '</div>'+
           '<div class="col s2">'+
            '<a target="_blank" href="https:'+url+'"><i class="material-icons">language</i></a>'+
           '</div>'+
       '</div>'+
       '</div>';
  }
}


// Delete a bookmark
function deleteBookmark(url){
  // Get bookmark from local Storage
  var bookmarks = localStorage.getItem('bookmarks');
  bookmarks = JSON.parse(bookmarks);

  // Get category list
  categoryList = JSON.parse(localStorage.getItem('Category List'));


  //loop through bookmarkResults
  for(var i=0; i< bookmarks.length; i++){
      if (bookmarks[i].url == url) {
        bookmarks.splice(i, 1);
      }
  }

  if(bookmarks.length < 0){
    localStorage.clear();
  }

  else {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Re-fetch all the bookmarks
    fetchBookmarks();
  }

  M.toast({html: 'Bookmark Deleted'})

}


function filterNames(){
  fetchBookmarks();
  var value = filterBar.value.toUpperCase();
  var bookmarks = document.getElementById('bookmarks').childNodes;


  for (var i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].querySelector('p#name').innerHTML;

    if (name.toUpperCase().indexOf(value) > -1) {
      bookmarks[i].style.display = '';
    }
    else {
      bookmarks[i].style.display = 'none';
    }
  }

}
