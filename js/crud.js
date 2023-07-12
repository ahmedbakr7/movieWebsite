import User, { addUser } from "./User.js"

let usersLocal   = window.localStorage.getItem('users')
let contentPanel = document.querySelector('.content-panel');
let searchInput  = document.querySelector('input[type="search"]');
let angle_right  = document.querySelector('.fa-angle-right');
let pagination   = document.querySelectorAll('.pagination')

let users=[]

function addUserPanel(user)
{
    contentPanel+=`
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
    console.log(`Hello, ${userInput}!`);
    let userInput = prompt('edit library or wishlist?');
    let userInput2 = prompt('enter values');

    switch(userInput)
    {
        case "library":
            // modify values
            break;
            
        case "wishlist":
            // modify values
            break;
        
        default:
    }
}
function deleteUser(button,userId)
{
    usersLocal.splice(userId-1,1)
    button.parentElement.remove()
    window.localStorage.setItem('users',JSON.stringify(usersLocal))
}

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') 
    {
      event.preventDefault();
      let searchQuery = searchInput.value;
      conten.innerHTML=''
      if(!isNaN(searchQuery))   // is number
      {
        users=usersLocal.filter(item=> item.id.toLowerCase().includes(searchQuery.toLowerCase())  )
        displayProducts(users,start,end)  
      }
      else{     // is string
        users=usersLocal.filter(item=> item.name.toLowerCase().includes(searchQuery.toLowerCase())  )

        currentPage=1
        pages = Math.ceil(users.length/itemsPerPage)
        start = (currentPage-1)*itemsPerPage ;
        end = start + itemsPerPage
        createpagination()
        displayProducts(users,start,end)  
      }
      console.log('Search query:', searchQuery);
    }
  });

searchInput.addEventListener('input', function() 
{
  const isEmpty = searchInput.value.trim().length === 0;
  
  if (isEmpty) {
    currentPage=1
    pages = Math.ceil(users.length/itemsPerPage)
    start = (currentPage-1)*itemsPerPage ;
    end = start + itemsPerPage
    createpagination()
    displayProducts(usersLocal,start,end)
    paginateItems(currentPage,button=pagination.children[1]) // controls which elements to show

    console.log('Input search is empty');
  }
});



let itemsPerPage =5;
let currentPage=1;
let pages = Math.ceil(users.length/itemsPerPage)
let start = (currentPage-1)*itemsPerPage ;
let end = start + itemsPerPage
creatpagination()
displayProducts(users,start,end)

function displayProducts(users,start,end) // displays products according to pagenumber
{
  userPanel.innerHTML=''
  users.slice(start,end).forEach((item) => { addUserPanel(item) })
}

function creatpagination(){     // create pagination buttons
  let length= pages.length>=5? 5 : pages.length;

  for (let i = 0; i < length; i++)
    angle_right.prepend(`<button class="pagButton ${i+1==currentPage?'highlight':''}" onclick="paginateItems(${i+1},this)">${i+1}</button>`)
  if(length===5)
    angle_right.prepend("<button class=`pagButton`>...</button>")
}

function paginateItems(currentPage,button=pagination.children[1]) // controls which elements to show
{
  for (let i = 0; i < pagination.children.length; i++)
      pagination.children[i].classList.remove('highlight');
  
  button.classList.add('highlight')
  let start = (currentPage-1)*itemsPerPage
  let end = start + itemsPerPage
  displayProducts(users,start,end)
}

function movePage(angel)
{
  if(angel.classList.contains('fa-angle-right'))
    currentPage+=currentPage===pages?0:1;
  else
  currentPage+=currentPage===1?0:-1;
  paginateItems(currentPage,pagination.children[currentPage-1])
}
