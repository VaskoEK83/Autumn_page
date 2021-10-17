
// modify h4 tags

var h4 = document.getElementsByTagName("h4");
  for (let i = 0; i < h4.length; i++) {
    h4[i].style.fontStyle = "italic";
  }





// Data for book, film offer section

let offers: Record<string, Record<string, string[]>>;  // download data from server

fetch("data_for_books_films.json", {method: "GET", headers: {"Content-Type": "application/json"}})
.then((response: Response) => { return response.json(); })
.then((data: Record<string, Record<string, string[]>>) => {
    offers = data;
});


let mainCategory_selector: HTMLSelectElement = document.getElementById("mainCategories") as HTMLSelectElement;
let genre_selector: HTMLSelectElement = document.getElementById("genre") as HTMLSelectElement;
let subGenre_selector: HTMLSelectElement = document.getElementById("subGenre") as HTMLSelectElement;

function populate_genres(): void
{
    let selectedMainCateg: string = mainCategory_selector.value;

    // clear all options
    for (let i = genre_selector.children.length - 1; i >= 0; i--)
    {
        genre_selector.removeChild(genre_selector.children[i]);
    }

    // add options
    let genres: Record<string, string[]> = offers[selectedMainCateg];
    if (genres !== undefined)
    {
        for (let genreName of Object.keys(genres))
        {
            let option: HTMLOptionElement = document.createElement("option");
            option.innerText = genreName;
            genre_selector.appendChild(option);
        }
    }
    else
    {
        let option: HTMLOptionElement = document.createElement("option");
        option.innerText = "...";
        genre_selector.appendChild(option);
    }

    // select first item
    if (genre_selector.children.length >= 1)
    {
        genre_selector.selectedIndex = 0;
    }
}


function populate_subGenres(): void
{
    let selectedMainCateg: string = mainCategory_selector.value;
    let selectedGenre: string = genre_selector.value;
        
    // clear all options
    for (let i = subGenre_selector.children.length - 1; i >= 0; i--)
    {
        subGenre_selector.removeChild(subGenre_selector.children[i]);
    }

    // add options
    let genres: Record<string, string[]> = offers[selectedMainCateg];
    let couldPopulate: boolean = false;
    if (genres !== undefined)
    {
        let subGenres: string[] = genres[selectedGenre];
        if (subGenres !== undefined)
        {
            couldPopulate = true;
            for (let subGenreName of subGenres)
            {
                let option: HTMLOptionElement = document.createElement("option");
                option.innerText = subGenreName;
                subGenre_selector.appendChild(option);
            }
        }
    }
    if (couldPopulate === false)
    {
        let option: HTMLOptionElement = document.createElement("option");
        option.innerText = "...";
        subGenre_selector.appendChild(option);
    }

    // select first item
    if (subGenre_selector.children.length >= 1)
    {
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
    let form: HTMLFormElement = document.getElementById("form") as HTMLFormElement; // kikeresi a form taget
    let data: FormData = new FormData(form); // form tag adataiból adatokat csinál

    let genre: string = data.get("Genre").toString();
    let subgenre: string = data.get("SubGenre").toString();

    let resultText: string;
    let picName: string;

    let offer_text_book: string = "Ajánlott könyv: ";
    let offer_text_film: string = "Ajánlott film: ";

    if (subgenre == "...")
    {
        resultText = "Kérjük, válasszon kategóriát!";
    }
    if (subgenre === "Párizs, 20-as évek")
    {
        resultText = offer_text_book + "Ernest Hemingway: Vándorünnep, 1964";
        picName = "hemingway_book";
    }
    if (subgenre === "klasszikus")
    {
        resultText = offer_text_book + "Agatha Christie: Halloween és halál, 1969";
        picName = "christie_book";
    }
    if (subgenre === "kortárs")
    {
        resultText = offer_text_book + "Anders de la Motte: Halálos ősz, 2017";
        picName = "motte_book";
    }
    if (subgenre === "világjáró")
    {
        resultText = offer_text_book + "Szilvási Lajos: Egyszer-volt szerelem, 1961";
        picName = "szilvasi_book";
    }
    if (subgenre === "misztikus" && genre === "romantikus")
    {
        resultText = offer_text_book + "Nicolas Barreau: A nő mosolya, 2019";
        picName = "barreau_book";
    }
    if (subgenre === "családi")
    {
        resultText = offer_text_film + "Édesek és mostohák, 1998";
        picName = "edesek_film";
    }
    if (subgenre === "fiúiskola")
    {
        resultText = offer_text_film + "Holt költők társasága, 1989";
        picName = "holt_film";
    }
    if (subgenre === "rakéta")
    {
        resultText = offer_text_film + "Októberi égbolt, 1999";
        picName = "oktoberi_film";
    }
    if (subgenre === "dráma")
    {
        resultText = offer_text_film + "Édes november, 2001";
        picName = "edes_film";
    }
    if (subgenre === "véres")
    {
        resultText = offer_text_film + "Halloween, 1978";
        picName = "halloween_film";
    }
    if (subgenre === "misztikus" && genre === "thriller")
    {
        resultText = offer_text_film + "Más világ, 2001";
        picName = "mas_film";
    }

    document.getElementById("resultLabelText").innerText = resultText;

    let img: HTMLImageElement = document.getElementById("picture") as HTMLImageElement;
    img.src = 'assets/books_and_films/' + picName + '.jpg';
    img.width = 300;
};





// Data for newsletter section

interface Data
{
    genders: Record<string, string[]>;
    ageGroups: Record<string, string[]>;
    interests: string[];
}

let ajax1: XMLHttpRequest = new XMLHttpRequest();
ajax1.onreadystatechange = function() {

    if (ajax1.readyState === 4 && ajax1.status === 200)
    {
        let data: Data = JSON.parse(ajax1.responseText);
        
        {
            let genderSelector: HTMLInputElement = document.getElementById("gender") as HTMLInputElement;

            for (let gender of data["genders"].genders2)
            {
                let inputWgt: HTMLInputElement = document.createElement("input") as HTMLInputElement;
                
                inputWgt.type = "radio";
                inputWgt.name = "Gender";
                genderSelector.append(inputWgt);

                let labelWgt: HTMLLabelElement = document.createElement("label");
                labelWgt.innerText = gender;
                genderSelector.appendChild(labelWgt);

                let brWgt: HTMLBRElement = document.createElement("br") as HTMLBRElement;
                genderSelector.appendChild(brWgt);
            }
        }

        {
            let ageGroupSelector: HTMLSelectElement = document.getElementById("ageGroup") as HTMLSelectElement;

            for (let ageGroup of data["ageGroups"].ageGroups_longerList)
            {
                let optionWgt: HTMLOptionElement = document.createElement("option") as HTMLOptionElement;
                optionWgt.innerText = ageGroup;
                ageGroupSelector.append(optionWgt);
            }
        }
            
        {
            let interestSelector: HTMLInputElement = document.getElementById("interest") as HTMLInputElement;

            let inputStr: string = "";

            for (let interest of data["interests"])
            {
                inputStr += '<br>' + '<input type="checkbox">' + " " + interest;
            }
            interestSelector.innerHTML = inputStr;
        }
        
    }
};
ajax1.open("GET", "data_for_newsletter.json");
ajax1.send();