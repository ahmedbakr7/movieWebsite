import User,{addUser,getUsers,updateUsers} from "./User.js"

let users=getUsers()

function showUsers(){

}
showUsers()

function deleteUser(this)
{
    let parent=this.parent       // code to be revised
    let userId=parent.children[0]    // user id
    users.splice(userId,1)
    updateUsers(users)
    location.reload();              // Reload the current window
}


