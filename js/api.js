
const url = 'https://imdb-top-100-movies1.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9cb5bbb13fmsh1ff4151e16e00d5p10ec00jsnc13159ad71be',
		'X-RapidAPI-Host': 'imdb-top-100-movies1.p.rapidapi.com'
	}
};

function callback(data){
	data=data.map(item=>({
		title:item.title,
		id:item.id,
		genre:item.genre,
		rating:item.rating,
		thumbnail:item.thumbnail
	}))
}

let movies=[]
if(!window.localStorage.getItem("movies"))
{
	fetch(url,options)
	.then(response => response.json())
	.then(data => {  
			callback(data)
			movies=data
			window.localStorage.setItem("movies",JSON.stringify(data))			
		})
	.catch (error=> {
		console.error(error);
	})

}
console.log(window.localStorage);
console.log(movies);
// console.log(window.localStorage.getItem);