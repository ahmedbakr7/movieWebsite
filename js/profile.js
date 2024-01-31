
let user        =JSON.parse(window.localStorage.getItem('user'))
let [homeButton,wishButton,libButton,,logoutButton]=document.querySelectorAll('.aside-element')
let searchInput = document.querySelector('input[type="search"]');
let libraryContainer = document.querySelector('#libraryContainer');
let wishlistContainer = document.querySelector('#wishlistContainer');
let usernameE1 = document.querySelector('#span-username')
let cartButton=document.querySelector('.cart-button')
let moviesLocal =JSON.parse(window.localStorage.getItem('movies'))
let movies=[]

usernameE1.textContent='username: '+user.name

wishButton.onclick=()=>
{
    window.location.href='search-lib-wish.html'
    window.localStorage.setItem('currentPage','wishlist')
}

libButton.onclick=(/* event */)=>{
// event.stopPropagtion()
    window.location.href='search-lib-wish.html'
    window.localStorage.setItem('currentPage','library')
}
logoutButton.onclick=()=>{ window.location.href='index.html' }

homeButton.onclick=()=>{ window.location.href='home.html' }
cartButton.onclick=()=>{ window.location.href='cart.html' }

displayProducts()
function displayProducts() // displays products according to pagenumber
{
    libraryContainer.innerHTML=''
    wishlistContainer.innerHTML=''
    user.library.forEach    ((item)  => { addMoviePanel(libraryContainer,item) })
    user.wishlist.forEach   ((item) => { addMoviePanel(wishlistContainer,item) })
}

function addMoviePanel(moviesPanel,movie)
{
    moviesPanel.innerHTML+= `
    <div class="scroll-child">
    <div class="img" style="background-image: url('${movie.thumbnail}');"></div>
    <p class="movie-name">${movie.title}</p>
    <span class="movie-genre">${movie.genre}</span>
    </div>
    `;

}