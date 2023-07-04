export * from "User.js"
let [loginE1,signupE2] = document.querySelectorAll(".big-text")
let [usernameE3,passE4] = document.querySelectorAll(".userCredentials")
let actionButton= document.querySelector('#loginButton')

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

if(temp=users.findIndex( user => { usernameE3.value === user.name })!==-1)
{
    users[temp].pass === passE4
    // granted
}
else{
    console.log("login failed");
}

loginE1.onclick=()=>{
    temp=loginE1.getAttribute('value')
    if(temp === "Login")
    {
        
    }
}

