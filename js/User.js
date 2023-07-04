class User{
    static numOfUsers=0
    constructor(name,password)
    {
        ++numOfUsers
        this.name=name
        this.password=password
        wishlist=[]
        library=[]

    }
}