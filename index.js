//FIRST WE HAVE A SUBMIT LISTENER
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  //As required we give the user indecation that data was sent, and info loading
  document.getElementById("onLoad").innerHTML =
    "Loading data from WIKIPEDIA, please wait ......";
  //here we get the input value from user
  const txtSearch = document.getElementById("txtSearch").value;
  //here we have the API for wikipedia
  const repo = fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${txtSearch}`
  );
  repo
    .then((repo) => {
      //for not showing 404 err we check that Promise ok
      if (repo.ok != true) {
        throw new Error(repo.status);
      }
      // first we parse the data to JSON obect
      return repo.json();
    })
    .then((data) => {
      //and here we show the result in HTML
      document.getElementById("resultWIK").innerHTML = data.displaytitle;
      document.getElementById("descWIK").innerHTML = data.description;
      document.getElementById("extractWIK").innerHTML = data.extract;
      document.getElementById("imgWIK").className = "imgSrch";
      document.getElementById("divImgW").className = "divImg";
      document.getElementById("imgWIK").src = data.originalimage.source;
      //remove the loading indecation msg
      document.getElementById("onLoad").innerHTML = "";
    })
    .catch((err) => {
      //if nothing found at wikipedia, we return a msg to the user
      document.getElementById("resultWIK").innerHTML =
        "sorry we didn't find any result for your search in Wikipedia";
      document.getElementById("onLoad").innerHTML = "";
      document.getElementById("descWIK").innerHTML = "";
      document.getElementById("extractWIK").innerHTML = "";
      document.getElementById("imgWIK").src = "";
      document.getElementById("imgWIK").className = "";
      document.getElementById("divImgW").className = "";
    });
  document.getElementById("onLoadG").innerHTML =
    "Loading data from Giphy, please wait ......";
  //then we send the second API -
  const repo2 = fetch(
    `https://api.giphy.com/v1/gifs/search?q=${txtSearch}&limit=1&api_key=N8U0faNPmctPrYciLJWKHkFVGzBTVOje`
  );
  repo2
    .then((repo2) => {
      //for not showing 404 erro we check that Promise ok
      if (repo2.ok != true) {
        throw new Error(repo2.status);
      }
      // first we parse the data to JSON obect
      return repo2.json();
    })
    .then((data2) => {
      //and here we show the result in HTML
      document.getElementById("imgGiphy").src =
        data2.data[0].images.downsized.url;
      document.getElementById("resultGiphy").innerHTML = data2.data[0].title;
      document.getElementById("onLoadG").innerHTML = "";
      document.getElementById("imgGiphy").className = "imgSrch";
    })
    .catch((err) => {
      //if nothing found at wikipedia, we return a msg to the user
      document.getElementById("resultGiphy").innerHTML =
        "sorry we didn't find any result for your search in Giphy";
      document.getElementById("imgGiphy").src = "";
      document.getElementById("onLoadG").innerHTML = "";
      document.getElementById("imgGiphy").className = "";
    });
});
