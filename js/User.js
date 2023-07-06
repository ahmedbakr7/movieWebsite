export default class User{
    static numOfUsers=0
    constructor(name,password)
    {
        ++User.numOfUsers
        this.id=User.numOfUsers
        this.name=name
        this.password=password
        this.wishlist=[]
        this.library=[]
    }
}
export let admin=new User('123','123')

export function getUsers() 
{ return JSON.parse(window.localStorage.getItem('users')) }

export function addUser(users,name,password)
{
    users.push(new User(name,password))
    window.localStorage.setItem("users",JSON.stringify(users))
}
export function updateUsers(users)
{
    window.localStorage.setItem("users",JSON.stringify(users))
}
