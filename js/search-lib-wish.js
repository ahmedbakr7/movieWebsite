
import User from "./User.js"

let user=JSON.parse(window.localStorage.getItem('user'))
let cart=JSON.parse(typeof window.localStorage.getItem('cart') !== 'undefinded'?window.localStorage.getItem('cart') : [] )

let bigMovie=document.querySelector('#big-movie')
let profileE1=document.querySelector('.fa-user')

let [homeButton,wishButton,libButton,,logoutButton]=document.querySelectorAll('.aside-element')
let searchInput = document.querySelector('input[type="search"]');
let moviesPanel = document.querySelector('.movies-container');

let moviesLocal=window.localStorage.getItem('movies')
let movies=[]


window.addEventListener('keydown', (event)=> { // close popup big movie panel
  if (event.key === 'Escape') {
    event.preventDefault(); // Prevent the default form submission behavior
    if(bigMovie.style.display==='flex') bigMovie.style.display==='none';
  }
});




function addToCart(button) { 
  button.innerHTML='added to cart'
                // movie name

  cart.push(moviesLocal.filter(item=> item.title===button.parentElement.children[0].innerHTML)[0])
  
  addToCartButton.onclick=()=>{ window.localStorage.setItem('cart',JSON.stringify(cart))

}}

function displayMovie(movieId)
{
  bigMovie.children[0].children[0].innerHTML=movies[movieId-1].title
  bigMovie.children[0].children[1].innerHTML=`rating - ${movies[movieId-1].rating}`
  bigMovie.children[1].style.backgroundImage=`url(${movies[movieId-1].thumbnail})`
  
  bigMovie.style.display='flex'
}

function addMoviePanel(movie)
{
  moviesPanel.append(`<div class="movie-panel flex" onclick=displayMovie(${movie.id[3]}) >
    <div class="img" style="background-image=url("${movie.thumbnail}")" ></div>
    <div class="details flex">
      <p class="name">${movie.name}</p>
      <div class="row1 flex">
          <span class="genre">${movie.genre}</span>
          <span class="rating">${movie.rating}</span>
          <i class="fa-${user.wishlist.includes(movie)?'solid':'regular'} fa-heart pointy"></i>
      </div>    
    </div>
  </div>    
  `)
}

switch(window.localStorage.getItem('currentPage'))  
{
  case 'library' :
    movies=user.library
    libButton.style.color='white'
    break
  case 'wishlist' :
    movies=user.wishlist
    wishButton.style.color='white'
    break

  case 'search' :
    let searchQuery=window.localStorage.getItem('searchQuery').toLowerCase
    movies=moviesLocal.filter(item=> item.title.toLowerCase().includes(searchQuery)  )
    break
  default:
}

profileE1.onclick=()=>{window.location.href="cart.html"}
homeButton.onclick=() => { window.location.href="home.html" }
wishButton.onclick=() => {
    moviesPanel.innerHTML=''
    user.wishlist.forEach(element => {
        // show on movies panel somehow
      wishButton.style.color='white'

    });
}

libButton.onclick=()=>{
    moviesPanel.innerHTML=''
    user.library.forEach(element => {
        // show on movies panel somehow
      libButton.style.color='white'

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














let itemsPerPage =8;
let currentPage=1;
let pages = math.ceil(movies.length/itemsPerPage)
let start = (currentPage-1)*itemsPerPage ;
let end = start + itemsPerPage

function displayProducts(product,start,end,listE1)
{
  movies.slice(start,end).forEach((item) => {
    addMoviePanel
  })

}
displayProducts(movies,start,end)

function creatpagination(){
    for (let i = 0; i < pages.length; i++)
        pagination.innerHTML = `<button onclick="paginateItems(${i+1})">  ${i+1}</button>`
}

function paginateItems(c)
{
    let start = (c-1)*itemsPerPage
    let end = start + itemsPerPage
}
