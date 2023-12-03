let movies=JSON.parse(window.localStorage.getItem('movies'))

let user=JSON.parse(window.localStorage.getItem('user'))
let [,wishButton,libButton,,logoutButton]=document.querySelectorAll('.aside-element')
let addToCartButton = document.querySelector('#watch-button')
let searchInput = document.querySelector('input[type="search"]');
let movie_panel=document.querySelectorAll('.movie-panel')
let bigMovie=document.querySelector('#big-movie')
let userE1=document.querySelector('.fa-user')


userE1.onclick=()=>{ window.location.href='profile.html' }

wishButton.onclick=()=>{
  window.location.href='search-lib-wish.html'
  window.localStorage.setItem('currentPage','wishlist')
 }

libButton.onclick=(/* event */)=>{
  // event.stopPropagtion()
  window.location.href='search-lib-wish.html'
 window.localStorage.setItem('currentPage','library')
}
logoutButton.onclick=()=>{ window.location.href='index.html' }

// function searchFilter(element)
// {
//   window.localStorage.setItem('searchQuery',element.textContent)
//   window.localStorage.setItem('currentPage','search')
//   window.location.href='search-lib-wish.html'
// }

// document.addEventListener('click', function(event) {
//   var target = event.target;

//   if (target.classList.contains('leaf-item')) {

//   }
// });


// let cart=[]       // code to manage add to cart button
//     cart.push(movie.id)
//     addToCartButton.onclick=()=>{ window.localStorage.setItem('cart',JSON.stringify(cart))
// }

console.log(movies);
// console.log(window.localStorage.getItem('movies'));


let cart=[]
addToCartButton.onclick=()=>{
  if (!cart.includes(movies[0])) {
    cart.push(movies[0]);
    window.localStorage.setItem('cart',JSON.stringify(cart))
  }
  addToCartButton.innerHTML='added to cart'
}


bigMovie.children[0].children[0].innerHTML=movies[0].title
bigMovie.children[0].children[1].innerHTML=`rating - ${movies[0].rating}`
bigMovie.children[1].style.backgroundImage=`url(${movies[0].thumbnail})`

for (let i = 0; i < movie_panel.length; i++) {
  movie_panel[i].children[0].style.backgroundImage=`url(${movies[i].thumbnail})`
  movie_panel[i].children[1].innerHTML=movies[i].title
  movie_panel[i].children[2].innerHTML=movies[i].genre
}


searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default form submission behavior
    // Perform your desired action with the search query, such as triggering a search or executing a function
    window.localStorage.setItem('searchQuery',searchInput.value)
    window.localStorage.setItem('currentPage','search')
    window.location.href='search-lib-wish.html'
    console.log('Search query:', searchInput.value);
  }
});

