let img = document.getElementById("image");
let bttFindMe = document.getElementById("find-me");
let bttPrev = document.getElementById("previous");
let bttNext = document.getElementById("next");

let latitude = 0;
let longitude = 0;
let index = 0;

function geoFindMe() {
  let input = document.getElementById("input");
  let textArea = input.value;
  console.log(textArea);
  //pega a localização e chama a função que faz o fetch()
  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    //console.log(latitude);
    flickr(latitude, longitude, textArea);
  }

  //pelo fetch envia para o link e recebe a promise. Depois já cria o array com os link e pega uma imagem
  function flickr(latitude, longitude, textArea) {
    fetch(
      `https://www.flickr.com/services/rest/?api_key=ba599f6e09e26bb416823156b39066b9&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${latitude}lon=${longitude}&text=${textArea}`
    )
      .then((result) => result.json())
      .then((param) => {
        let myArr = param.photos.photo;
        console.log(myArr);
        let res = [];
        myArr.map((x) => {
          let i = constructImageURL(x);
          res.push(i);
        });
        let imageURL = constructImageURL(param.photos.photo[index]);
        img.src = imageURL;
        //console.log(imageURL);
      });
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  //constrói a URL
  function constructImageURL(photoObj) {
    return (
      "https://farm" +
      photoObj.farm +
      ".staticflickr.com/" +
      photoObj.server +
      "/" +
      photoObj.id +
      "_" +
      photoObj.secret +
      ".jpg"
    );
  }
  //seta latitude e longitude se o usuário não liberar ou chama a função success
  if (!navigator.geolocation) {
    latitude = 36.4766;
    longitude = -95.019236;
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function prev() {
  if (index > 0) {
    index -= 1;
    geoFindMe();
  }
}

function next() {
  if (index < 5) {
    index += 1;
    geoFindMe();
  }
}

bttFindMe.addEventListener("click", geoFindMe);
bttPrev.addEventListener("click", prev);
bttNext.addEventListener("click", next);
