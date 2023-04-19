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

document.addEventListener('click', function(event) {
    const isClickInsideDropdown = dropdownContent.contains(event.target);
    const isClickInsideInput = input.contains(event.target);
    if (!isClickInsideDropdown && !isClickInsideInput) {
        dropdownContent.classList.remove('show');
    }
});

function useCoordinates() {
    const fajrTimeElement = document.getElementById("fajr-time");
    const dhuhurTimeElement = document.getElementById("dhuhur-time");
    const asrTimeElement = document.getElementById("asr-time");
    const maghribTimeElement = document.getElementById("maghrib-time");
    const ishaTimeElement = document.getElementById("isha-time");
    const midnightTimeElement = document.getElementById("midnight-time");

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
                    return (
                        prayerDate.getDate() === currentDate.getDate() &&
                        prayerDate.getMonth() === currentDate.getMonth() &&
                        prayerDate.getFullYear() === currentDate.getFullYear()
                    );
                });

                // Afficher les horaires de prière pour la date actuelle
                if (todayPrayerTime) {
                    const timings = todayPrayerTime.timings;
                    // Modifier la chaîne de caractères pour enlever (CEST) de l'heure
                    const fajrTime = timings.Fajr.split(" ")[0];
                    const dhuhurTime = timings.Dhuhr.split(" ")[0];
                    const asrTime = timings.Asr.split(" ")[0];
                    const maghribTime = timings.Maghrib.split(" ")[0];
                    const ishaTime = timings.Isha.split(" ")[0];
                    const midnightTime = timings.Midnight.split(" ")[0];

                    // Mettre à jour les éléments HTML avec les horaires de prière
                    fajrTimeElement.textContent = fajrTime;
                    dhuhurTimeElement.textContent = dhuhurTime;
                    asrTimeElement.textContent = asrTime;
                    maghribTimeElement.textContent = maghribTime;
                    ishaTimeElement.textContent = ishaTime;
                    midnightTimeElement.textContent = midnightTime;

                } else {
                    console.log("Aucun horaire de prière n'a été trouvé pour la date actuelle");
                }
            })
            .catch(error => console.log(error));
    }
}

const prayerCards = document.querySelectorAll('.card p');

// Ajouter la classe "show" sur chaque élément "p" et les afficher progressivement

dropdownContent.addEventListener('click', function() {
    prayerCards.forEach((card) => {
        card.classList.add('show');
        for (let i = 0; i < prayerCards.length; i++) {
            prayerCards[i].style.opacity = 0;

        }
        setTimeout(() => {
            prayerCards.forEach((card) => {
                card.classList.remove('show');
                for (let i = 0; i < prayerCards.length; i++) {
                    prayerCards[i].style.opacity = 1;
                }
            })
        }, 500);
    })

    // Supprimer la classe 'show' après un certain temps (par exemple 5 secondes)
    setTimeout(() => {
        prayerCards.forEach((card) => {
            card.classList.remove('show');
            for (let i = 0; i < prayerCards.length; i++) {
                prayerCards[i].style.opacity = 1;
            }
        })
    }, 5000);
});

