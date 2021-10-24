"use strict";
// modify h4 tags
var h4 = document.getElementsByTagName("h4");
for (let i = 0; i < h4.length; i++) {
    h4[i].style.fontStyle = "italic";
}
// Data for book, film offer section
let offers; // download data from server
fetch("data_for_books_films.json", { method: "GET", headers: { "Content-Type": "application/json" } })
    .then((response) => { return response.json(); })
    .then((data) => {
    offers = data;
});
let mainCategory_selector = document.getElementById("mainCategories");
let genre_selector = document.getElementById("genre");
let subGenre_selector = document.getElementById("subGenre");
function populate_genres() {
    let selectedMainCateg = mainCategory_selector.value;
    // clear all options
    for (let i = genre_selector.children.length - 1; i >= 0; i--) {
        genre_selector.removeChild(genre_selector.children[i]);
    }
    // add options
    let genres = offers[selectedMainCateg];
    if (genres !== undefined) {
        for (let genreName of Object.keys(genres)) {
            let option = document.createElement("option");
            option.innerText = genreName;
            genre_selector.appendChild(option);
        }
    }
    else {
        let option = document.createElement("option");
        option.innerText = "...";
        genre_selector.appendChild(option);
    }
    // select first item
    if (genre_selector.children.length >= 1) {
        genre_selector.selectedIndex = 0;
    }
}
function populate_subGenres() {
    let selectedMainCateg = mainCategory_selector.value;
    let selectedGenre = genre_selector.value;
    // clear all options
    for (let i = subGenre_selector.children.length - 1; i >= 0; i--) {
        subGenre_selector.removeChild(subGenre_selector.children[i]);
    }
    // add options
    let genres = offers[selectedMainCateg];
    let couldPopulate = false;
    if (genres !== undefined) {
        let subGenres = genres[selectedGenre];
        if (subGenres !== undefined) {
            couldPopulate = true;
            for (let subGenreName of subGenres) {
                let option = document.createElement("option");
                option.innerText = subGenreName;
                subGenre_selector.appendChild(option);
            }
        }
    }
    if (couldPopulate === false) {
        let option = document.createElement("option");
        option.innerText = "...";
        subGenre_selector.appendChild(option);
    }
    // select first item
    if (subGenre_selector.children.length >= 1) {
        subGenre_selector.selectedIndex = 0;
    }
}
// call the functions
mainCategory_selector.onchange = () => {
    populate_genres();
    populate_subGenres();
};
genre_selector.onchange = () => {
    populate_subGenres();
};
document.getElementById("recommendButton").onclick = () => {
    let form = document.getElementById("form"); // kikeresi a form taget
    let data = new FormData(form); // form tag adataiból adatokat csinál
    let genre = data.get("Genre").toString();
    let subgenre = data.get("SubGenre").toString();
    let resultText;
    let picName;
    let offer_text_book = "Ajánlott könyv: ";
    let offer_text_film = "Ajánlott film: ";
    if (subgenre == "...") {
        resultText = "Kérjük, válasszon kategóriát!";
    }
    if (subgenre === "Párizs, 20-as évek") {
        resultText = offer_text_book + "Ernest Hemingway: Vándorünnep, 1964";
        picName = "hemingway_book";
    }
    if (subgenre === "klasszikus") {
        resultText = offer_text_book + "Agatha Christie: Halloween és halál, 1969";
        picName = "christie_book";
    }
    if (subgenre === "kortárs") {
        resultText = offer_text_book + "Anders de la Motte: Halálos ősz, 2017";
        picName = "motte_book";
    }
    if (subgenre === "világjáró") {
        resultText = offer_text_book + "Szilvási Lajos: Egyszer-volt szerelem, 1961";
        picName = "szilvasi_book";
    }
    if (subgenre === "misztikus" && genre === "romantikus") {
        resultText = offer_text_book + "Nicolas Barreau: A nő mosolya, 2019";
        picName = "barreau_book";
    }
    if (subgenre === "családi") {
        resultText = offer_text_film + "Édesek és mostohák, 1998";
        picName = "edesek_film";
    }
    if (subgenre === "fiúiskola") {
        resultText = offer_text_film + "Holt költők társasága, 1989";
        picName = "holt_film";
    }
    if (subgenre === "rakéta") {
        resultText = offer_text_film + "Októberi égbolt, 1999";
        picName = "oktoberi_film";
    }
    if (subgenre === "dráma") {
        resultText = offer_text_film + "Édes november, 2001";
        picName = "edes_film";
    }
    if (subgenre === "véres") {
        resultText = offer_text_film + "Halloween, 1978";
        picName = "halloween_film";
    }
    if (subgenre === "misztikus" && genre === "thriller") {
        resultText = offer_text_film + "Más világ, 2001";
        picName = "mas_film";
    }
    document.getElementById("resultLabelText").innerText = resultText;
    let img = document.getElementById("picture");
    img.src = 'assets/books_and_films/' + picName + '.png';
    img.width = 300;
};
let ajax1 = new XMLHttpRequest();
ajax1.onreadystatechange = function () {
    if (ajax1.readyState === 4 && ajax1.status === 200) {
        let data = JSON.parse(ajax1.responseText);
        {
            let genderSelector = document.getElementById("gender");
            for (let gender of data["genders"].genders2) {
                let inputWgt = document.createElement("input");
                inputWgt.type = "radio";
                inputWgt.name = "Gender";
                genderSelector.append(inputWgt);
                let labelWgt = document.createElement("label");
                labelWgt.innerText = gender;
                genderSelector.appendChild(labelWgt);
                let brWgt = document.createElement("br");
                genderSelector.appendChild(brWgt);
            }
        }
        {
            let ageGroupSelector = document.getElementById("ageGroup");
            for (let ageGroup of data["ageGroups"].ageGroups_longerList) {
                let optionWgt = document.createElement("option");
                optionWgt.innerText = ageGroup;
                ageGroupSelector.append(optionWgt);
            }
        }
        {
            let interestSelector = document.getElementById("interest");
            let inputStr = "";
            for (let interest of data["interests"]) {
                inputStr += '<br>' + '<input type="checkbox">' + " " + interest;
            }
            interestSelector.innerHTML = inputStr;
        }
    }
};
ajax1.open("GET", "data_for_newsletter.json");
ajax1.send();
