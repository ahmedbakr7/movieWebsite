const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fcff51d3aemshcf6c96f86509ac3p15cf9cjsn009c918eb2a1',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}