const timeStamp1 = "1712050770090";
const publicKey = "a66e73ba6436199f86f82f587157913d";
const hashValue = "a07703f4a778f47b5f526367397ce0f6";
const dateTime = new Date();
const timeStamp = dateTime.getTime().toString();
console.log(timeStamp);

let prevArr = JSON.parse(localStorage.getItem("favChars"));
console.log(prevArr);
if (prevArr === null) {
  localStorage.setItem("favChars", JSON.stringify([]));
}

const showHeroesEle = document.querySelector(".showHeroes");
const inputEle = document.querySelector("#input");

const showHerosOnHomePage = (data) => {
  let query = inputEle.value.toLowerCase();
  console.log(query);
  let dataDisplay = data
    .filter((eventData) => {
      let newStr = eventData.name
        .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "")
        .toLowerCase();
      return newStr.includes(query);
    })
    .map((element) => {
      let cardEle = document.createElement("div");
      cardEle.innerHTML = `<div class="card" style="width: 18rem;">
        <img src=${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        } class="card-img-top" alt="...">
        <div class="cardBody">
          <h5 class="card-title">${element.name}</h5>
          <div class="buttons">
            <a href="#"><button class="btn btn-primary seeDetails" id=${
              element.id
            }>See Details</button></a>
            <a href="#"><button class="btn btn-primary addToFav" id=${
              element.id
            }>Add to favourites</button></a>
          </div>
        </div>`;

      return cardEle;
    });
  console.log(dataDisplay);
  dataDisplay.forEach((ele) => {
    showHeroesEle.appendChild(ele);
  });
};
let collectedData = [];
const apiFetch = async () => {
  try {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp1}&apikey=${publicKey}&hash=${hashValue}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    collectedData = jsonData.data.results;
    console.log(jsonData.data.results);
    showHerosOnHomePage(jsonData.data.results);
    seeDetailsOfTheHero(jsonData.data.results);
    addToFav(jsonData.data.results);
  } catch (error) {
    console.log(error);
  }
};
apiFetch();

const seeDetailsOfTheHero = (data) => {
  const seeDetailsButtonEle = document.querySelectorAll(".seeDetails");
  seeDetailsButtonEle.forEach((bt) => {
    bt.addEventListener("click", (e) => {
      const clickData = data.filter((ele) => ele.id == e.target.id);
      const finalData = clickData[0];
      console.log(finalData);
      localStorage.setItem("superHeroDetail", JSON.stringify(finalData));
      window.location.href = "./superHero.html";
    });
  });
};

const addToFav = (data) => {
  const addToFavButtonEle = document.querySelectorAll(".addToFav");
  addToFavButtonEle.forEach((bt) => {
    bt.addEventListener("click", (e) => {
      const clickData = data.filter((ele) => ele.id == e.target.id);
      const finalData = clickData[0];
      console.log(finalData);
      let existingArr = JSON.parse(localStorage.getItem("favChars"));
      console.log(existingArr);
      favChars = [...existingArr, finalData];
      console.log(favChars);
      localStorage.setItem("favChars", JSON.stringify(favChars));
      alert("Super Hero Added successfully!!");
    });
  });
};

inputEle.addEventListener("input", () => {
  showHeroesEle.innerHTML = "";
  console.log(collectedData);
  showHerosOnHomePage(collectedData);
  seeDetailsOfTheHero(collectedData);
  addToFav(collectedData);
});
