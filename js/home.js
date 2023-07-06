let movies=JSON.parse(window.localStorage.getItem('movies'))

let user=JSON.parse(window.localStorage.getItem('user'))
let [,wishButton,libButton,,logoutButton]=document.querySelectorAll('.aside-element')
let addToCartButton = document.querySelector('#watch-button')
let searchInput = document.querySelector('input[type="search"]');
let movie_panel=document.querySelectorAll('.movie-panel')
let bigMovie=document.querySelector('#big-movie')


wishButton.onclick=()=>{ window.location.href='search-lib-wish.html'
  window.localStorage.setItem('currentPage','wishlist')
 }
libButton.onclick=()=>{ window.location.href='search-lib-wish.html' 
 window.localStorage.setItem('currentPage','library')
}
logoutButton.onclick=()=>{ window.location.href='index.html' }


// let cart=[]       // code to manage add to cart button
//     cart.push(movie.id)
//     addToCartButton.onclick=()=>{ window.localStorage.setItem('cart',JSON.stringify(cart))
// }

console.log(movies);
// console.log(window.localStorage.getItem('movies'));


let cart=[]
addToCartButton.onclick=()=>{
  cart.push(movies[0])
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

