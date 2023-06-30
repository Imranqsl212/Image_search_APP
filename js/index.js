import { accessKey1 } from "./new.js";
// const accessKey1 = "You should copy key in unsplash.com and paste here";
const formEl = document.querySelector("form");
const inputEl = document.querySelector("#search");
const btnEl = document.querySelector("#search_button");
const results = document.querySelector(".results");
const showMoreButtonEl = document.querySelector("#show-more__info");

let inputElData = "";
let page = 1;

const searchImage = async () => {
  inputElData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputElData}&client_id=${accessKey1}`;
  const response = await fetch(url);
  const data = await response.json();
  const allResImages = data.results;
  if (page === 1) {
    results.innerHTML = "";
  }
  allResImages.map((i) => {
    const containerImage = document.createElement("div");
    containerImage.classList.add("result");
    const img = document.createElement("img");
    img.src = i.urls.small;
    img.alt = i.alt_description;
    const imgHref = document.createElement("a");
    imgHref.href = i.links.html;
    imgHref.target = "_blank";
    imgHref.textContent = i.alt_description;
    containerImage.appendChild(img);
    containerImage.appendChild(imgHref);
    results.appendChild(containerImage);
  });
  page++;
  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});

showMoreButtonEl.addEventListener("click", searchImage);

