let user=JSON.parse(window.localStorage.getItem('user'))
let [,wishButton,libButton,,logoutButton]=document.querySelectorAll('.aside-element')
let addToCartButton = document.querySelector('#watch-button')
let searchInput = document.querySelector('input[type="search"]');

wishButton.onclick=()=>{ window.location.href='search-lib-wish.html' }
libButton.onclick=()=>{ window.location.href='search-lib-wish.html' }
logoutButton.onclick=()=>{ window.location.href='index.html' }


// let cart=[]       // code to manage add to cart button
//     cart.push(movie.id)
//     addToCartButton.onclick=()=>{ window.localStorage.setItem('cart',JSON.stringify(cart))
// }



searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default form submission behavior
    let searchQuery = searchInput.value;
    // Perform your desired action with the search query, such as triggering a search or executing a function
    console.log('Search query:', searchQuery);
  }
});

