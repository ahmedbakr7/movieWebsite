import User,{addUser,getUsers,updateUsers} from "./User.js"

let user   = window.localStorage.getItem('user')
let cart   = window.localStorage.getItem('cart')
let cartPanel = document.querySelector('.products-panel');
let total=document.querySelector('#total')
let checkoutButtons=document.querySelectorAll('.checkout')


function addCartPanel(movie)
{
    cartPanel+=`
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
    total.innerHtml=`total: ${cart.length*50}`
}

cart.forEach(element => {
    addCartPanel(element)
});
total.innerHtml=`total: ${cart.length*50}`

checkoutButtons[0].onclick=()=>{
    user.library.push(...cart)
    window.localStorage.setItem('cart',JSON.stringify([]))
    window.location.href="./home.js"
}
checkoutButtons[1].onclick=()=>{
    window.location.href="./home.js"
}
