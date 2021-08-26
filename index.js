//FIRST WE HAVE A SUBMIT LISTENER
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  //As required we give the user indecation that data was sent, and info loading
  document.getElementById("onLoad").innerHTML =
    "Loading data from WIKIPEDIA, please wait ......";
  //variables for sending to HTML id's
  const onLoad =  document.getElementById("onLoad");
  const resultWIK = document.getElementById("resultWIK");
  const imgGiphy = document.getElementById("imgGiphy");
  const onLoadG = document.getElementById("onLoadG");
  const descWIK = document.getElementById("descWIK");
  const extractWIK = document.getElementById("extractWIK");
  const imgWIK = document.getElementById("imgWIK");
  const divImgW = document.getElementById("divImgW");
  const resultGiphy = document.getElementById("resultGiphy");
  //here we get the input value from user
  const txtSearch = (document.getElementById("txtSearch").value).trim();
  if(txtSearch.length===0){
    onLoad.innerHTML = "Please type text to search.";
    resultWIK.innerHTML ="";
    imgGiphy.src = "";
    onLoadG.innerHTML = "";
    imgGiphy.className = "";
    descWIK.innerHTML = "";
    extractWIK.innerHTML = "";
    imgWIK.src = "";
    imgWIK.className = "";
    divImgW.className = "";
    resultGiphy.innerHTML = "";
  }
  else{
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
      resultWIK.innerHTML = data.displaytitle;
      descWIK.innerHTML = data.description;
      extractWIK.innerHTML = data.extract;
      imgWIK.className = "imgSrch";
      divImgW.className = "divImg";
      imgWIK.src = data.originalimage.source;
      //remove the loading indecation msg
      onLoad.innerHTML = "";
    })
    .catch((err) => {
      //if nothing found at wikipedia, we return a msg to the user
      resultWIK.innerHTML =
        "sorry we didn't find any result for your search in Wikipedia";
      onLoad.innerHTML = "";
      descWIK.innerHTML = "";
      extractWIK.innerHTML = "";
      imgWIK.src = "";
      imgWIK.className = "";
      divImgW.className = "";
    });
    onLoadG.innerHTML =
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
      imgGiphy.src = data2.data[0].images.downsized.url;
      resultGiphy.innerHTML = data2.data[0].title;
      onLoadG.innerHTML = "";
      imgGiphy.className = "imgSrch";
    })
    .catch((err) => {
      //if nothing found at wikipedia, we return a msg to the user
      resultGiphy.innerHTML = "sorry we didn't find any result for your search in Giphy";
      imgGiphy.src = "";
      onLoadG.innerHTML = "";
      imgGiphy.className = "";
    });
  }
});


