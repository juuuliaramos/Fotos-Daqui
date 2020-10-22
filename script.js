let img = document.getElementById("image");
let latitude = 0;
let longitude = 0;
let input = document.getElementById("input");
let textArea = input.value;
let index = 0;
//let myArr = [];

function geoFindMe(textArea) {
  //pega a localização e chama a função que faz o fetch()
  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    //console.log(latitude);
    flickr(latitude, longitude);
  }

  //pelo fetch envia para o link e recebe a promise. Depois já cria o array com os link e pega uma imagem
  function flickr(latitude, longitude) {
    fetch(
      `https://www.flickr.com/services/rest/?api_key=ba599f6e09e26bb416823156b39066b9&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${latitude}lon=${longitude}&text=${textArea}`
    )
      .then((result) => result.json())
      .then((param) => {
        let myArr = param.photos.photo;
        //console.log(myArr);
        let res = [];
        myArr.map((x) => {
          let i = constructImageURL(x);
          res.push(i);
        });
        let imageURL = constructImageURL(param.photos.photo[index]);
        imageURL.src = imageURL;
        console.log(imageURL);
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

window.onload = geoFindMe();

// const imageUrl = constructImageURL(response.photos.photo[0]);
// console.log(imageUrl);

// var myImage = document.querySelector("img");

// fetch(`flickr.com/services/rest/?api_key=ba599f6e09e26bb416823156b39066b9&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${latitude}lon=${longitude}&text=${textArea}`)
//   .then(function (response) {
//     return response.blob();
//   })
//   .then(function (myBlob) {
//     var objectURL = URL.createObjectURL(myBlob);
//     myImage.src = objectURL;
//   });

//Obter a localização geográfica
//Construir a URL de consulta
//Usar o fetch para enviar a solicitação ao Flickr
//Processar os dados de resposta em um objeto
//Usar os valores do objeto de resposta para construir uma URL de fonte de imagens
//Exibir a primeira imagem na página
//Em resposta a algum evento (por exemplo, um clique ou um setInterval), exibir a próxima imagem da coleção
