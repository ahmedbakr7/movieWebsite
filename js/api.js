
const url = 'https://imdb-top-100-movies1.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9cb5bbb13fmsh1ff4151e16e00d5p10ec00jsnc13159ad71be',
		'X-RapidAPI-Host': 'imdb-top-100-movies1.p.rapidapi.com'
	}
};

let movies=[]

function callback(data){
	data=data.map(item=>
	({
		title:item.title,
		id:item.id,
		genre:item.genre,
		rating:item.rating,
		thumbnail:item.thumbnail
	}))
	movies=data
	console.log(data);
	window.localStorage.setItem("movies",JSON.stringify(data))			
}

if(!window.localStorage.getItem('movies'))
{
	fetch(url,options)
	.then(response => response.json())
	.then(data => {  
			callback(data)
		})
	.catch (error=> {
		console.error(error);
	})

}
