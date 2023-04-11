console.log('dd')

document.querySelector('#ville').addEventListener('input', function() {
    let adresse = this.value;
    let url = `https://api-adresse.data.gouv.fr/search/?q=${adresse}`;
    fetch(url).then(response => response.json().then(data => console.log(data)));
});

const input = document.querySelector('#ville');
const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
const villeList = document.querySelector('#ville-list');

let cordonners = [];

input.addEventListener('input', function() {
    const value = this.value.trim();
    if (value.length >= 0) {
         cordonners = [];
        const url = `https://api-adresse.data.gouv.fr/search/?q=${value}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                villeList.innerHTML = '';
                data.features.forEach(feature => {
                    const ville = feature.properties.city;
                    const codePostal = feature.properties.postcode;
                    const adresse = feature.properties.name;
                    const li = document.createElement('li');
                    li.textContent = `${adresse}, (${codePostal}) ${ville} `;
                    li.addEventListener('click', function() {
                        input.value = `${adresse},(${codePostal}) ${ville} `;
                        dropdownContent.classList.remove('show');
                        const form = document.querySelector('.form');
                        fetch(`https://api-adresse.data.gouv.fr/search/?q=${input.value}`)
                            .then(response => response.json())
                            .then(data => {
                                // Add the coordinates to the cordonnées array
                                const coordinates = data.features[0].geometry.coordinates;
                                console.log(coordinates);
                                cordonners.push(coordinates);
                                // Call the function that uses the coordinates
                                useCoordinates();
                                dropdownContent.classList.remove('show');

                            })
                            .catch(error => {
                                // Handle the error
                                console.error(error);
                            });
                    });
                    villeList.appendChild(li);
                });
                dropdownContent.classList.add('show');
            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });
    } else {
        dropdownContent.classList.remove('show');
    }
});



function useCoordinates() {
    const prayerTimesElement = document.getElementById("prayer-times");
    prayerTimesElement.innerHTML = ''
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    if (cordonners.length > 0) {
        const [longitude, latitude] = cordonners[0];
        const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const prayerTimes = data.data;
                // Trouver l'objet de calendrier pour la date actuelle
                const currentDate = new Date();
                const todayPrayerTime = prayerTimes.find(prayerTime => {
                    const prayerDate = new Date(prayerTime.date.readable);
                    return prayerDate.getDate() === currentDate.getDate() && prayerDate.getMonth() === currentDate.getMonth() && prayerDate.getFullYear() === currentDate.getFullYear();
                });
                // Afficher les horaires de prière pour la date actuelle
                if(todayPrayerTime){
                    const timings = todayPrayerTime.timings;
                    // Modifier la chaîne de caractères pour enlever (CEST) de l'heure
                    const fajrTime = timings.Fajr.split(" ")[0];
                    const dhuhurTime = timings.Dhuhr.split(" ")[0];
                    const asrTime = timings.Asr.split(" ")[0];
                    const maghribTime = timings.Maghrib.split(" ")[0];
                    const ishaTime = timings.Isha.split(" ")[0];

                    const prayerTimesElement = document.getElementById("prayer-times");
                        prayerTimesElement.innerHTML = ` <div class="times fajr">                  <p> Fajr </p>  
          <p> ${fajrTime}</p>
    </div>
    <div class="times dhuhur">
      <p> Dhuhr </p> 
      <p>${dhuhurTime}</p>
    </div>
    <div class="times asr">
      <p> ASR </p> 
      <p>${asrTime}</p>
    </div>
    <div class="times maghrib">
      <p> Maghrib </p>
      <p>${maghribTime}</p>
    </div>
    <div class="times isha">
      <p> Isha </p> 
      <p>${ishaTime}</p>
    </div>
    <div class="shourouq_midnight">
      <div class="shourouq">
        <p class="shourouq"> Shorooq ${timings.Sunrise}</p>
        <div class="barre_prayer"></div>
      </div>
      <div class="midnight">
        <p class="midnight"> Moitiée de la nuit ${timings.Midnight}</p>
        <div class="barre_prayer"></div>
      </div>
    </div>`;
                } else {
                    console.log("Aucun horaire de prière n'a été trouvé pour la date actuelle");
                }
            })
            .catch(error => console.log(error));
    }
}

// Définition des paramètres
const sourah = 2;
const verse = 255;
const translation = 'fr.hamidullah';

// Construction de l'URL de la requête
const url = `http://api.alquran.cloud/v1/ayah/${sourah}:${verse}/${translation}`;

// Envoi de la requête
fetch('http://api.alquran.cloud/v1/ayah/1:1/fr.hamidullah')
    .then(response => response.json())
    .then(data => {
        console.log('Traduction en français : ', data.data.text);
    })
    .catch(error => {
        console.error(error);
    });



const form = document.querySelector('.sourate');
const resultat = document.querySelector('#resultat');
const resultat2 = document.querySelector('#resultat2');
const resultat3 = document.querySelector('#resultat3');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche l'envoi du formulaire

    const sourate = form.elements.sourate.value;
    const verset = form.elements.verset.value;
    resultat.innerHTML = '';
    resultat2.innerHTML = '';

    Promise.all([
        fetch(`http://api.alquran.cloud/v1/surah/${sourate}/ar.alafasy`).then(response => response.json()),
        fetch(`http://api.alquran.cloud/v1/surah/${sourate}/fr.hamidullah`).then(response => response.json())
    ])
        .then(([arabe, francais]) => {
            const ayahs = arabe.data.ayahs;
            const traductions = francais.data.ayahs.reduce((acc, ayah) => {
                acc[ayah.numberInSurah] = ayah.text;
                return acc;
            }, {});
            let texteArabe = '';
            ayahs.forEach(ayah => {
                texteArabe += `<p><strong>${ayah.numberInSurah}. </strong>${ayah.text}</p>`;
                texteArabe += `<p>${traductions[ayah.numberInSurah]}</p>`;
            });
            resultat.innerHTML = `<p><strong>Traduction en arabe :</strong></p>${texteArabe}`;
        })
        .catch(error => {
            console.error(error);
        });
});



