
let user        =JSON.parse(window.localStorage.getItem('user'))
let [homeButton,wishButton,libButton,,logoutButton]=document.querySelectorAll('.aside-element')
let searchInput = document.querySelector('input[type="search"]');
let libraryContainer = document.querySelector('#libraryContainer');
let wishlistContainer = document.querySelector('#wishlistContainer');
let usernameE1 = document.querySelector('#span-username')
let cartButton=document.querySelector('.cart-button')
let confirmButton=document.querySelector('.confirm-button')
let moviesLocal =JSON.parse(window.localStorage.getItem('movies'))
let movies=[]



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


confirmButton.onclick=()=>{
    window.location.href='home.html'
}

function highlightSeat(element)
{
    element.classList.add("highlight-seat")
}