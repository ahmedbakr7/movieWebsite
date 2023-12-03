import User,{addUser,getUsers,updateUsers} from "./User.js"

let user   = JSON.parse(window.localStorage.getItem('user'))
let cart   = window.localStorage.getItem('cart') == 'undefined'?[]:JSON.parse(window.localStorage.getItem('cart'))
let productsPanel = document.querySelector('.products-panel');
let total=document.querySelector('#total')
let checkoutButtons=document.querySelectorAll('.checkout')


displayProducts()

function addCartPanel(movie)
{
    productsPanel.innerHTML+=`
    <div class="product-panel flex">
        <div class="description flex">
            <div class="img" style="background-image: url('${movie.thumbnail}');" ></div>
            <div class="moviename flex">${movie.title}</div>
        </div>
        <div class="price">50</div>
        <button onclick="" class="delete pointy" onclick="removeItem(this,${movie.id})">X</button>
    </div>
`
}

function removeItem(button,movieId)
{
    cart.splice(cart.findIndex(item=>item.id==movieId),1)
    button.parentElement.remove()
    window.localStorage.setItem('cart',JSON.stringify(cart))
    total.innerHTML=`total: ${cart.length*50}`
}

function displayProducts()
{
    productsPanel.innerHTML=''
    cart.forEach(element => { addCartPanel(element) });
    total.innerHTML=`total: ${cart.length*50}`
}

checkoutButtons[0].onclick=()=>{
    user.library.push(...cart)
    window.localStorage.setItem('cart',JSON.stringify([]))
    window.location.href="./home.js"
}
checkoutButtons[1].onclick=()=>{
    window.location.href="./home.js"
}
