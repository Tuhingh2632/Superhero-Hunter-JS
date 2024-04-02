// Getting Details of the superhero from local storage
const superHeroDetail = JSON.parse(localStorage.getItem("superHeroDetail"));
console.log(superHeroDetail);

const superHeroDetailCardSectionELe = document.querySelector(".section");
const superHeroCardEle = document.createElement("div");
superHeroCardEle.className = "card superHeroCard mx-auto";
superHeroCardEle.innerHTML = `<img src=${
  superHeroDetail.thumbnail["path"] +
  "." +
  superHeroDetail.thumbnail["extension"]
} class="card-img-top" alt="...">
<div class="cardBody">
  <h5 class="card-title">${superHeroDetail.name}</h5>
  <p class="card-text">${superHeroDetail.description}</p>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">Comics Available : ${
    superHeroDetail.comics.available
  }</li>
  <li class="list-group-item">Events Available : ${
    superHeroDetail.events.available
  }</li>
  <li class="list-group-item">Series Available : ${
    superHeroDetail.series.available
  }</li>
  <li class="list-group-item">Stories Available : ${
    superHeroDetail.stories.available
  }</li>
</ul>
`;
superHeroDetailCardSectionELe.appendChild(superHeroCardEle);
