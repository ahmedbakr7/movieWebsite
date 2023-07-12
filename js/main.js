import User ,{admin,addUser,getUsers} from "./User.js"
let [loginE1,signupE2] = document.querySelectorAll(".big-text")
let [usernameE3,passE4] = document.querySelectorAll(".userCredentials")
let actionButton= document.querySelector('#loginButton')

window.localStorage.setItem('cart',undefined)
console.log(user);

if(!window.localStorage.getItem("users"))
    window.localStorage.setItem("users",JSON.stringify([admin]))

let users=JSON.parse(window.localStorage.getItem('users'))  // makes user js object

signupE2.onclick=() =>{
    loginE1.style.color="#837c7c"
    signupE2.style.color="white"
    actionButton.setAttribute('value','Register')
}

loginE1.onclick=() =>{
    loginE1.style.color="white"
    signupE2.style.color="#837c7c"
    actionButton.setAttribute('value','Login')
}

addUser(users,name,password)

actionButton.onclick=()=>{
    console.log(usernameE3.value);
    console.log(passE4.value);
    let x=actionButton.getAttribute('value')
    let temp
    if( x === "Login" &&usernameE3.value!=null&&passE4.value!=null )                            // login
    {
        temp =users.findIndex( user =>  usernameE3.value == user.name && user.password == passE4.value)
       if(temp!==-1)
        {
            if (temp==0)
            {
                window.location.href='crud.html'
                return
            }
            window.localStorage.setItem('User',JSON.stringify(users[temp]))
            window.location.href='home.html' 
        }
        else{
            console.log("login failed");
        }        
    }
    else if( x ==="Register"&&usernameE3.value!=null&&passE4.value!=null)                     // register
    {
        temp=users.findIndex( user => { 
            return usernameE3.value == user.name || passE4.value == user.password })
        if(temp===-1)                             //   didnt hit account
        {
            addUser(users,usernameE3.value,passE4.value)
            console.log("successful");
            loginE1.onclick()
            console.log(window.localStorage.getItem('users'));

            return
        }
        console.log("failed");
        console.log(window.localStorage.getItem('users'));
    }
}

console.log(window.localStorage.getItem('users'));