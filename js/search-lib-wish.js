
import User from "./User.js"

let user=JSON.parse(window.localStorage.getItem('user'))
let [homeButton,wishButton,libButton,,logoutButton]=document.querySelectorAll('.aside-element')
let moviesPanel = document.querySelector('.movies-container');

let searchInput = document.querySelector('input[type="search"]');



homeButton.onclick=()=>{ window.location.href="home.html" }
wishButton.onclick=()=>{
    moviesPanel.innerHTML=''
    user.wishlist.forEach(element => {
        // show on movies panel somehow
    });
}
libButton.onclick=()=>{
    moviesPanel.innerHTML=''
    user.library.forEach(element => {
        // show on movies panel somehow
    });
}

logoutButton.onclick=()=>{ window.location.href="index.html" }



searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default form submission behavior
    let searchQuery = searchInput.value;
    // Perform your desired action with the search query, such as triggering a search or executing a function
    console.log('Search query:', searchQuery);
  }
});

