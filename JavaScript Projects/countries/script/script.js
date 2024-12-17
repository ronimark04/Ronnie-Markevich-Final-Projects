const URL = "https://restcountries.com/v3.1/all";


async function getData(api) {
    try {
        const response = await fetch(api);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error loading countries: ", error);

        const container = document.getElementById("container");
        const errorElement = document.createElement("h2");
        errorElement.innerText = "Error loading countries...";
        container.appendChild(errorElement);
    }
}

getData(URL);

function displayData(countries) {
    countries.forEach(country => {
        const name = country.name.common;
        const capital = country.capital ? country.capital[0] : "No capital";
        const population = country.population;
        const flag = country.flags.png;
        const googleMaps = country.maps.googleMaps;

        let newCountry = new Country(name, capital, population, flag, googleMaps);
        newCountry.render();
    });
}

class Country {
    constructor(name, capital, population, flag, googleMaps) {
        this.name = name;
        this.capital = capital;
        this.population = population;
        this.flag = flag;
        this.googleMaps = googleMaps;
    }

    render() {
        const container = document.getElementById("container");
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = this.flag;
        img.alt = this.name;

        const h1 = document.createElement("h1");
        h1.innerText = this.name;

        const p1 = document.createElement("p");
        p1.innerText = `Capital: ${this.capital}`;

        const p2 = document.createElement("p");
        p2.innerText = `Population: ${this.population}`;

        const a = document.createElement("a");
        a.target = "_blank";
        a.href = this.googleMaps;
        a.innerText = "Location";

        card.appendChild(img);
        card.appendChild(h1);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(a);

        container.appendChild(card);
    }
}


/*
<div id="container">
        <div class="card">
            <img src="images/gs.png" alt="Country">
            <h1>Country Name</h1>
            <p>Capital</p>
            <p>Population: 0000000</p>
            <a href="/">
                <p>Location</p>
            </a>
        </div>
*/