const searchForm=document.querySelector('form');
const movieContainer=document.querySelector('.movie-container');
const inputBox=document.querySelector('.inputBox');

const getmovieInfo= async (movieName)=>{

  try{

const apikey="1dcdd022";
var response= await fetch(`http://www.omdbapi.com/?apikey=${apikey}&t=${movieName}`);

if(!response.ok){
  throw Error("NOT ABLE TO FETCH IT");
}

const data=await response.json();
console.log(data);
showMovie(data);
  }

catch (Error)  {
  movieContainer.innerHTML=`<h1>NO MOVIE FOUND</h1>`

}



}

//function to show movie data on screen
const showMovie=(data)=>{

    movieContainer.innerHTML=''; //jab hum naya movie search karen to purane wale ka data hat kar naya data aa jaye

    //destructuring jo values extract kar raha hain from json format of api data
    const{Title,ImdbRating,Genre,Released,Plot,Runtime,Poster,Actors}=data;
  const movieElement=document.createElement('div');
  movieElement.classList.add('movie-info');
  movieElement.innerHTML=`<h2>${Title}</h2>   <h5>${data.Ratings[0].Value}</h5>`;
  //movieContainer.appendChild(movieElement);--- ise poster ke div ke baad append kara hain taaki image pahle aaye

const movieGenereElement=document.createElement('div');
movieGenereElement.classList.add("movie-genre");   //movie-genere class add kara hain

Genre.split(",").forEach(element => {
const p=document.createElement('p');
p.innerText=element;
movieGenereElement.appendChild(p);

    
});
movieElement.appendChild(movieGenereElement);
movieElement.innerHTML+=`<h5> ReleseDate:${Released}</h5>  
Runtime:<h5>${Runtime}</h5>
Plot:<h5>${Plot}</h5>
 Actors:<h5>${Actors}</h5>
`;

//create the div for movie poster

const movieposter=document.createElement('div');
movieposter.classList.add("movie-poster");
movieposter.innerHTML=`<img src="${Poster}"/>`;
movieContainer.appendChild(movieposter);
movieContainer.appendChild(movieElement);
}

// ye input ko read karega 
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    //console.log(inputBox.value);
 
    var movieName=inputBox.value.trim();
       if(movieName!==""){
        getmovieInfo(movieName)
       }
       else{
        movieContainer.innerHTML=`<h1>Enter the movie which you want to search</h1>`
       }

})


