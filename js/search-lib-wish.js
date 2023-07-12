
import User from "./User.js"

let user=JSON.parse(window.localStorage.getItem('User'))
let cart = JSON.parse(window.localStorage.getItem('cart') != "undefined" ? window.localStorage.getItem('cart') : '[]');
let bigMovie=document.querySelector('#big-movie')
let profileE1=document.querySelector('.fa-user')
let [homeButton,wishButton,libButton,,logoutButton]=document.querySelectorAll('.aside-element')
let searchInput = document.querySelector('input[type="search"]');
let moviesPanel = document.querySelector('.movies-container');
let moviesLocal=JSON.parse(window.localStorage.getItem('movies'))
let angle_right = document.querySelector('.fa-angle-right');
let pagination=document.querySelectorAll('.pagination')
let movies=[]

console.log(window.localStorage.getItem('movies'));

window.addEventListener('keydown', (event)=> { // close popup big movie panel
  if (event.key === 'Escape') {
    event.preventDefault(); // Prevent the default form submission behavior
    if(bigMovie.style.display==='flex') bigMovie.style.display==='none';
  }
});

function addToCart(button) { 
  if(button.innerHTML==='in library')
    return
  button.innerHTML='added to cart'
  cart.push(moviesLocal[moviesLocal.findIndex(item=> item.title===button.parentElement.children[0].innerHTML)])
  window.localStorage.setItem( 'cart' ,JSON.stringify(cart))
}

function displayMovie(movieId)
{
  bigMovie.children[0].children[3].innerHTML=user.library.some(item=> item.id== moviesLocal[movieId-1].id)?'in library':'add to cart'
  bigMovie.children[0].children[0].innerHTML=moviesLocal[movieId-1].title
  bigMovie.children[0].children[1].innerHTML=`rating - ${moviesLocal[movieId-1].rating}`
  bigMovie.children[1].style.backgroundImage=`url(${moviesLocal[movieId-1].thumbnail})`
  bigMovie.style.display='flex'
}

function addMoviePanel(movie)
{
  moviesPanel.innerHTML+= `
  <div class="movie-panel flex" onclick="displayMovie(${movie.id.slice(3,10)})">
    <div class="img" style="background-image: url('${movie.thumbnail}');"></div>
    <div class="details flex">
      <p class="name">${movie.title}</p>
      <div class="row1 flex">
        <span class="genre">${movie.genre}</span>
        <span class="rating">${movie.rating}</span>
        <i class="fa-${user.wishlist?.includes(movie) ? 'solid' : 'regular'} fa-heart pointy" onclick="wishSwitch(this, ${movie.id.slice(3,10)})"></i>
      </div>    
    </div>
  </div>
`;
}

function wishSwitch(heart,movieId)
{
  if(heart.classList.contains('fa-solid'))
    {
      element.classList.replace('fa-solid', 'fa-regular')
      let i=user.wishlist.findIndex(item=> item.id===moviesLocal[movieId-1].id)
      user.wishlist.splice(i,1)
    }
    else{
      element.classList.replace('fa-regular', 'fa-solid')
      user.wishlist.push(moviesLocal[movieId-1])
    }
    window.localStorage.setItem('user',JSON.stringify(user))
}



let lastPressedButton
switch(window.localStorage.getItem('currentPage'))  
{
  case 'library' :
    movies=user.library
    libButton.style.color='white'
    lastPressedButton=libButton
    break
  case 'wishlist' :
    movies=user.wishlist
    wishButton.style.color='white'
    lastPressedButton=wishButton
    break

  case 'search' :
    let searchQuery=window.localStorage.getItem('searchQuery').toLowerCase
    movies=moviesLocal.filter(item=> item.title.toLowerCase().includes(searchQuery)  )
    displayProducts(movies)

    break
  default:
}

profileE1.onclick=()=>{window.location.href="cart.html"}
homeButton.onclick=() => { window.location.href="home.html" }
wishButton.onclick=() => {
    moviesPanel.innerHTML=''
    wishButton.style.color='white'
    lastPressedButton.style.color='var(--grey-color)'
    lastPressedButton=wishButton
    displayProducts(user.wishlist);
}
wishButton.addEventListener('click',wishButton,onclick)

libButton.onclick=()=>{
    moviesPanel.innerHTML=''
    libButton.style.color='white'
    lastPressedButton.style.color='var(--grey-color)'
    lastPressedButton=libButton
    displayProducts(user.library);
}

logoutButton.onclick=()=>{ window.location.href="index.html" }



searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    let searchQuery = searchInput.value;
    moviesPanel.innerHTML=''
    let movies=moviesLocal.filter(item=> item.title.toLowerCase().includes(searchQuery.toLowerCase())  )
    displayProducts(movies,start,end)

    console.log('Search query:', searchQuery);
  }
});




let itemsPerPage =8;
let currentPage=1;
let pages = Math.ceil(movies.length/itemsPerPage)
let start = (currentPage-1)*itemsPerPage ;
let end = start + itemsPerPage
creatpagination()
displayProducts(movies,start,end)

function displayProducts(movies,start,end) // displays products according to pagenumber
{
  moviesPanel.innerHTML=''
  movies.slice(start,end).forEach((item) => { addMoviePanel(item) })
}

function creatpagination(){     // create pagination buttons
  let length= pages.length>=5? 5 : pages.length;

  for (let i = 0; i < length; i++)
  {
    angle_right.prepend(`<button class="pagButton ${i+1==currentPage?'highlight':''}" onclick="paginateItems(${i+1},this)">${i+1}</button>`)
  }
  if (length===5)
  angle_right.prepend("<button class=`pagButton`>...</button>")
}

function paginateItems(currentPage,button=pagination.children[1]) // controls which elements to show
{
  for (let i = 0; i < pagination.children.length; i++)
  pagination.children[i].classList.remove('highlight');
  
  button.classList.add('highlight')
  let start = (currentPage-1)*itemsPerPage
  let end = start + itemsPerPage
  displayProducts(movies,start,end)
}

function movePage(angel)
{
  if(angel.classList.contains('fa-angle-right'))
    currentPage+=currentPage===pages?0:1;
  else
  currentPage+=currentPage===1?0:-1;
  paginateItems(currentPage,pagination.children[currentPage-1])
}
