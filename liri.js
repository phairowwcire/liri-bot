require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var axios = require("axios")
// var myArr=["phil","eric","joe"]

// myArr[0] //"phil"
// myArr[1]//eric
// myArr[2]//joe

var command = process.argv[2]

// concert-this
var searchTerm = process.argv.slice(3).join(" ")
//process.argv=["node", "liri","spotify-this-song","electic","relaxtion"]
// spotify-this-song
console.log(searchTerm)
// movie-this
commandName()
// do-what-it-says
function commandName() {
    switch (command) {
        case "spotify-this-song":
            searchSpotify()
            break
        case "movie-this":
            movieSearch()
            break
            case"concert-this":
            concertSearch()
            break
    }
}
// * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
function movieSearch() {
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log(response.data)
            console.log("Title:",response.data.Title)
            console.log("movieYear:",response.data.Year)
            console.log("imdbRating",response.data.imdbRating)
            console.log("rottenTomatoes",response.data.Ratings[1].Value)

        })
}
// Name of the venue

// Venue location

// Date of the Event (use moment to format this as "MM/DD/YYYY")
function concertSearch(){
    axios.get("https://rest.bandsintown.com/artists/"+searchTerm+"/events?app_id=codingbootcamp")
  .then(function(response){
      console.log(response.data)
      console.log(response.data[0].venue.name)
  })  
}

function searchSpotify() {
    spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (let i = 0; i < data.tracks.items.length; i++) {
            //console.log(data.tracks.items[i]);
            console.log("artists name:", data.tracks.items[i].artists[0].name)
            console.log("song name:", data.tracks.items[i].name)
            console.log("preview URL", data.tracks.items[i].preview_url)
            console.log("album", data.tracks.items[i].album.name)
            console.log("__________________________________________________")
        }


    });
}
//This will show the following information about the song in your terminal/bash window

// Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from
