


try {
  let user        =JSON.parse(window.localStorage.getItem('user'))
  let cart        = JSON.parse(window.localStorage.getItem('cart') != "undefined" ? window.localStorage.getItem('cart') : '[]');
  let bigMovie    =document.querySelector('#big-movie')
  let profileE1   =document.querySelector('.fa-user')
  let [homeButton,wishButton,libButton,,logoutButton]=document.querySelectorAll('.aside-element')
  let searchInput = document.querySelector('input[type="search"]');
  let moviesPanel = document.querySelector('.movies-container');
  let moviesLocal =JSON.parse(window.localStorage.getItem('movies'))
  let angle_right = document.querySelector('#angle_right');
  let seatingButton = document.querySelector(".seating-button");
  let paginationContainer  =document.querySelector('.pagination')
  let movies=[]

  console.log(window.localStorage.getItem('movies'));

  let lastPressedButton=null
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
      let searchQuery=window.localStorage.getItem('searchQuery').toLowerCase();
      switch (searchQuery) {
        case "action":
        case "comedy":
        case "crime":
        case "drama":
        case "adventure":
        case "scifi":
        case "romance":
          movies=moviesLocal.filter(item=> item.genre.toLowerCase().includes(searchQuery));

          break;

        default:
          movies=moviesLocal.filter(item=> item.title.toLowerCase().includes(searchQuery));

          break;
      }
      // displayProducts(movies)


      break
    default:
  }


  window.addEventListener('keydown', (event)=> { // close popup big movie panel
    if (event.key === 'Escape') {
      event.preventDefault(); // Prevent the default form submission behavior
      if(bigMovie.style.display==='flex') bigMovie.style.display='none';
    }
  });
  seatingButton.onclick= ()=>{ window.location.href="seating.html" }


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
      movies=moviesLocal.filter(item=> item.title.toLowerCase().includes(searchQuery.toLowerCase())  )



      let itemsPerPage =8;
      let currentPage=1;
      let pages = Math.ceil(movies.length/itemsPerPage)
      start = (currentPage-1)*itemsPerPage ;
      end = start + itemsPerPage
      creatpagination(pages)
      displayProducts(movies,start,end)


      console.log('Search query:', searchQuery);
    }
  });



  function addToCart(button) {
    if(button.innerHTML==='in library')
      return
    button.innerHTML='added to cart'
    cart.push(moviesLocal[moviesLocal.findIndex(item=> item.title===button.parentElement.children[0].innerHTML)])
    window.localStorage.setItem( 'cart' ,JSON.stringify(cart))
  }


  function addMoviePanel(movie)
  {
    //${movie.id.slice(3,10)}
    moviesPanel.innerHTML+= `
    <div class="movie-panel flex" onclick="displayMovie(${movie.id.slice(3,10)})">
      <div class="img" style="background-image: url('${movie.thumbnail}');"></div>
      <div class="details flex">
        <p class="name">${movie.title}</p>
        <div class="row1 flex">
          <span class="genre">${movie.genre}</span>
          <span class="rating">${movie.rating}</span>
          <i class="fa-${user.wishlist?.includes(movie) ? 'solid' : 'regular'} fa-heart pointy" onclick="wishSwitch(event,this, ${movie.id.slice(3,10)})"></i>
        </div>
      </div>
    </div>
  `;



  }

  function displayMovie(movieId)
  {
    console.log(movieId);
    bigMovie.children[0].children[3].innerHTML=user.library.some(item=> item.id== moviesLocal[movieId-1].id)?'in library':'add to cart'
    bigMovie.children[0].children[0].innerHTML=moviesLocal[movieId-1].title
    bigMovie.children[0].children[1].innerHTML=`rating - ${moviesLocal[movieId-1].rating}`
    bigMovie.children[1].style.backgroundImage=`url(${moviesLocal[movieId-1].thumbnail})`
    bigMovie.style.display='flex'
  }


  function wishSwitch(event,heart,movieId)
  {
    event.stopPropagation();
    if(heart.classList.contains('fa-solid'))
      {
        heart.classList.replace('fa-solid', 'fa-regular')
        let i=user.wishlist.findIndex(item=> item.id===moviesLocal[movieId-1].id)
        user.wishlist.splice(i,1)
      }
      else{
        heart.classList.replace('fa-regular', 'fa-solid')
        user.wishlist.push(moviesLocal[movieId-1])
      }
      window.localStorage.setItem('user',JSON.stringify(user))
  }







  let itemsPerPage =8;
  let currentPage=1;
  let pages = Math.ceil(movies.length/itemsPerPage)
  let start = (currentPage-1)*itemsPerPage ;
  let end = start + itemsPerPage
  creatpagination(pages)
  displayProducts(movies,start,end)

  function displayProducts(movies,start,end) // displays products according to pagenumber
  {
    moviesPanel.innerHTML=''
    movies.slice(start,end).forEach((item) => { addMoviePanel(item) })
  }

  function creatpagination(pages){     // create pagination buttons
    let pagesButtons=document.querySelectorAll(".pagButton")
    pagesButtons.forEach(element=>{element.remove()})

    let length= pages>=5? 5 : pages;

    for (let i = 0; i < length; i++)
    {
      let button = document.createElement("button");
      button.className = `pagButton pointy ${i + 1 === currentPage ? 'highlight' : ''}`;
      button.textContent = `${i + 1}`;
      button.onclick = function() {
        paginateItems(i + 1, button);
      };

      paginationContainer.insertBefore(button, angle_right);
      // paginationContainer.prepend(button);
    }
    if (length===5)
    {
      let button = document.createElement("button");
      button.className = `pagButton`;
      button.textContent = `...`;
      paginationContainer.insertBefore(button, angle_right);
    }
  }

  function paginateItems(currentPage,button=paginationContainer.children[1]) // controls which elements to show
  {
    for (let i = 0; i < paginationContainer.children.length; i++)
      paginationContainer.children[i].classList.remove('highlight');

    button.classList.add('highlight')
    currentPage=button.textContent
    let start = (currentPage-1)*itemsPerPage
    let end = start + itemsPerPage
    displayProducts(movies,start,end)
  }

  function movePage(angel)
  {
    if(angel.classList.contains('fa-angle-right'))
      currentPage+=currentPage===pages?0:1;          // insures that current page doesnt exceed the max page, current page starts at 1
    else
    currentPage+=currentPage===1?0:-1;                // insures that current page doesnt go less than page 1
    paginateItems(currentPage,paginationContainer.children[currentPage])
    // pagination: is a class pointing at the flex contiaining the pagination including the prev,next and pages
  }
  } catch (error) {
    console.log("error:",error);
}





