let itemsPerPage =5;
let currentPage=1;
let pages = math.ceil(products.length/itemsPerPage)
let start = (currentPage-1)*itemsPerPage ;
let end = start + itemsPerPage


function displayProducts(product,start,end,listE1)
    products.slice(start,end).forEach((item) => products.innerhtml+=item)

displayProducts(products,start,end)

function creatpagination(){
    for (let i = 0; i < pages.length; i++) {
        pagination.innerHTML = `<button onclick="paginateItems(${i+1})">  ${i+1}</button>`
    }
}

function paginateItems(c)
{
    let start = (c-1)*itemsPerPage
    let end = start + itemsPerPage
}


creatpagination()
