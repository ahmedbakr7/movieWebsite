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






function displayMovies(movieList) {
    const container = document.getElementById('movieContainer');

    movieList.forEach(movie => {
      const moviePanel = createMoviePanel(movie);
      container.appendChild(moviePanel);
    });
  }

  function createMoviePanel(movie) {
    const moviePanel = document.createElement('div');
    moviePanel.classList.add('movie-panel', 'flex');
    moviePanel.onclick = function () {
      displayMovie(movie.id); // Assuming displayMovie is another function to handle the click event
    };

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');
    imgDiv.style.backgroundImage = `url('${movie.thumbnail}')`;
    moviePanel.appendChild(imgDiv);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details', 'flex');

    const nameP = document.createElement('p');
    nameP.classList.add('name');
    nameP.textContent = movie.title;
    detailsDiv.appendChild(nameP);

    const row1Div = document.createElement('div');
    row1Div.classList.add('row1', 'flex');

    const genreSpan = document.createElement('span');
    genreSpan.classList.add('genre');
    genreSpan.textContent = movie.genre;
    row1Div.appendChild(genreSpan);

    const dashSpan = document.createElement('span');
    dashSpan.textContent = '-';
    row1Div.appendChild(dashSpan);

    const ratingSpan = document.createElement('span');
    ratingSpan.classList.add('rating');
    ratingSpan.textContent = movie.rating;
    row1Div.appendChild(ratingSpan);

    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fa', user.wishlist?.includes(movie) ? 'fa-solid' : 'fa-regular', 'fa-heart', 'pointy');
    heartIcon.onclick = function () {
      wishSwitch(heartIcon, movie.id.slice(3, 10));
    };
    row1Div.appendChild(heartIcon);

    detailsDiv.appendChild(row1Div);
    moviePanel.appendChild(detailsDiv);

    return moviePanel;
  }
