// Getting fav superheroes from local storage
const myFavHeroes = JSON.parse(localStorage.getItem("favChars"));
console.log(myFavHeroes);

const showHeroesEle = document.querySelector(".showHeroes");
//Shoe heroes in myfav page
myFavHeroes.forEach((element) => {
  console.log(element);
  let cardEle = document.createElement("div");
  cardEle.innerHTML = `<div class="card" style="width: 18rem;">
        <img src=${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        } class="card-img-top" alt="...">
        <div class="cardBody">
          <h5 class="card-title">${element.name}</h5>
          <div class="buttons">
            <a href="#"><button class="btn btn-primary removeFav" id=${
              element.id
            }>Remove From favourites</button></a>
          </div>
        </div>`;
  showHeroesEle.appendChild(cardEle);
});
//Remove from fav button functionality
const removeButtonEle = document.querySelectorAll(".removeFav");
removeButtonEle.forEach((bt) => {
  bt.addEventListener("click", (e) => {
    console.log(e.target.id);
    let result = myFavHeroes.filter((ele) => ele.id != e.target.id);
    console.log(result);
    localStorage.setItem("favChars", JSON.stringify(result));
    alert("Element Deleted Successfully");
    location.reload();
  });
});
