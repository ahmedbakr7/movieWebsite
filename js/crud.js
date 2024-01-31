// import User, { addUser } from "./User.js"

let usersLocal = JSON.parse(window.localStorage.getItem('users')) || [];

let usersContainerE1 = document.querySelector('.users-container');
let searchInput  = document.querySelector('input[type="search"]');
let angle_right  = document.querySelector('.fa-angle-right');
let pagination   = document.querySelectorAll('.pagination')
let paginationContainer  =document.querySelector('.pagination')
let formReg= document.querySelector('#form-reg')
let submitButton=document.querySelector('.submit-button')
let inputBox=document.querySelector('#textBox')

const itemsPerPage =5;
let currentPage=1;
let pages = Math.ceil(usersLocal.length/itemsPerPage)
let start = (currentPage-1)*itemsPerPage ;
let end = start + itemsPerPage

let users=usersLocal



creatpagination()
displayProducts()


searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter')
  {
    event.preventDefault();
    let searchQuery = searchInput.value;
    usersContainerE1.innerHTML=''
    if(!isNaN(searchQuery))   // is number
    {
      users=usersLocal.filter(item=> item.id.toLowerCase().includes(searchQuery.toLowerCase())  )
    }
    else{     // is string
      users=usersLocal.filter(item=> item.name.toLowerCase().includes(searchQuery.toLowerCase())  )
    }
      currentPage=1
      pages = Math.ceil(users.length/itemsPerPage)
      start = (currentPage-1)*itemsPerPage ;
      end = start + itemsPerPage
      createpagination()
      displayProducts()
    console.log('Search query:', searchQuery);
  }
});

// searchInput.addEventListener('input', function()
// {
//   const isEmpty = searchInput.value.trim().length === 0;

//   if (isEmpty) {
//     currentPage=1
//     pages = Math.ceil(users.length/itemsPerPage)
//     start = (currentPage-1)*itemsPerPage ;
//     end = start + itemsPerPage
//     createpagination()
//     displayProducts()
//     paginateItems(button=pagination.children[1]) // controls which elements to show

//     console.log('Input search is empty');
//   }
// });





function addUserPanel(user)
{
  usersContainerE1.innerHTML+=`
    <div class="flex user-panel panel">
    <span>${user.id}</span><span>${user.name}</span>
    <button class="pointy details-button crud-button" onclick="openDetails(this,${user.id})">
        Details
    </button>
    <button class="pointy edit-button crud-button" onclick="openDetails(this,${user.id})" >
        Edit
    </button>
    <button class="pointy delete-button crud-button" onclick="deleteUser(this,${user.id})">
        delete
    </button>
    </div>
    `
}
function openDetails(button,userId)
{
    console.log(usersLocal[userId-1]);
    inputBox.value=usersLocal.forEach(element=>{
      return element.id==userId? JSON.stringify(element.library):"";
    });
    formReg.style.display='inline-block'

}

function deleteUser(button,userId)
{
    usersLocal.splice(userId-1,1)
    button.parentElement.remove()
    window.localStorage.setItem('users',JSON.stringify(usersLocal))
}

function displayProducts()
{
  usersContainerE1.innerHTML=''
  users.slice(start,end).forEach((item) => { addUserPanel(item) })
}

function creatpagination(){     // create pagination buttons
  let pagesButtons=document.querySelectorAll(".pagButton")
  pagesButtons.forEach(element=>{element.remove()})

  let length= pages>=5? 5 : pages;

  for (let i = 0; i < length; i++)
  {
    let button = document.createElement("button");
    button.className = `pagButton pointy ${i + 1 === currentPage ? 'highlight' : ''}`;
    button.textContent = `${i + 1}`;
    button.onclick = function() {
      paginateItems( button);
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

function paginateItems(button=paginationContainer.children[1]) // controls which elements to show
{
  for (let i = 0; i < paginationContainer.children.length; i++)
    paginationContainer.children[i].classList.remove('highlight');

  button.classList.add('highlight')
  currentPage=parseInt(button.textContent)
  start = (currentPage-1)*itemsPerPage
  end = start + itemsPerPage
  displayProducts()
}

function movePage(angel)
{
  if(angel.classList.contains('fa-angle-right'))
    currentPage+=currentPage==pages?0:1;          // insures that current page doesnt exceed the max page, current page starts at 1
  else
  currentPage+=currentPage==1?0:-1;                // insures that current page doesnt go less than page 1
  paginateItems(paginationContainer.children[currentPage])
  // pagination: is a class pointing at the flex contiaining the pagination including the prev,next and pages
}


window.addEventListener('keydown', (event)=> { // close popup big movie panel
  if (event.key === 'Escape') {
    event.preventDefault(); // Prevent the default form submission behavior
    if(formReg.style.display==='inline-block') formReg.style.display='none';
  }
});
