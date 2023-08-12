

const input = document.querySelector('#ville');
const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
const villeList = document.querySelector('#ville-list');
const prayerCards = document.querySelectorAll('.card p');
const angle_12 = document.querySelector('#m1');
const angle_15 = document.querySelector('#m2');
const angle_18 = document.querySelector('#m3');
let cordonners = [];
const btn_form = document.querySelector('.btn_form')
const modal = document.getElementById('myModal');
const closeModalBtn = document.getElementById("closeModal");


input.addEventListener('input', handleInput);

document.addEventListener('click', handleClickOutsideDropdown);

dropdownContent.addEventListener('click', handleDropdownClick);

function handleInput() {
    const value = this.value.trim();
    if (value.length >= 0) {
        cordonners = [];
        const url = `https://api-adresse.data.gouv.fr/search/?q=${value}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                villeList.innerHTML = '';
                data.features.forEach(feature => {
                    const { city: ville, postcode: codePostal, name: adresse } = feature.properties;
                    const li = document.createElement('li');
                    li.textContent = `${adresse}, (${codePostal}) ${ville} `;
                    li.addEventListener('click', () => handleLiClick(adresse, codePostal, ville));
                    villeList.appendChild(li);
                });
                dropdownContent.classList.add('show');
            })
            .catch(error => console.error(error));
    } else {
        dropdownContent.classList.remove('show');
    }
}
function updatePrayerTimings() {
    if (angle_12.classList.contains('angle-active')) {
        useCoordinates(8);
    } else if (angle_15.classList.contains('angle-active')) {
        useCoordinates(12);
    } else if (angle_18.classList.contains('angle-active')) {
        useCoordinates(6);
    } else {
        useCoordinates(1);
    }
}
angle(angle_12,12)
angle(angle_15,8)
angle(angle_18,1)
function handleLiClick(adresse, codePostal, ville, method = 8) {
    input.value = `${adresse},(${codePostal}) ${ville} `;
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${input.value}`)
        .then(response => response.json())
        .then(data => {
            const coordinates = data.features[0].geometry.coordinates;
            cordonners.push(coordinates);
            if (angle_12.classList.contains('angle-active')){
                useCoordinates(12)
            } else if (angle_15.classList.contains('angle-active')) {
                useCoordinates(2)
            }  else if (angle_18.classList.contains('angle-active')) {
                useCoordinates(3)
            } else {
                useCoordinates(3)

            }
            dropdownContent.classList.remove('show');
        })
        .catch(error => console.error(error));
}

function useCoordinates(method) {
    const fajrTimeElement = document.getElementById("fajr-time");
    const dhuhurTimeElement = document.getElementById("dhuhur-time");
    const asrTimeElement = document.getElementById("asr-time");
    const maghribTimeElement = document.getElementById("maghrib-time");
    const ishaTimeElement = document.getElementById("isha-time");
    const midnightTimeElement = document.getElementById("midnight-time");

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const address =  input.value;
    const midnightMode = 0; // 0 pour Standard (Mid Sunset to Sunrise), 1 pour Jafari (Mid Sunset to Fajr)

    if (cordonners.length > 0) {
        // const [longitude, latitude] = cordonners[0];
        const url = `http://api.aladhan.com/v1/calendarByAddress/${year}/${month}?address=${address}&method=${method}&midnightMode=${midnightMode}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(url)
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

function useCoordinatesforCalendar(method) {
    let form_calendar = document.querySelector('.form_calendar')

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const address =  input.value;
    const midnightMode = 0; // 0 pour Standard (Mid Sunset to Sunrise), 1 pour Jafari (Mid Sunset to Fajr)

    if (cordonners.length > 0) {
        // const [longitude, latitude] = cordonners[0];
        const url = `http://api.aladhan.com/v1/calendarByAddress/${year}/${month}?address=${form_calendar}&method=${method}&midnightMode=${midnightMode}`;
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

                // // Afficher les horaires de prière pour la date actuelle
                // if (todayPrayerTime) {
                //     const timings = todayPrayerTime.timings;
                //     // Modifier la chaîne de caractères pour enlever (CEST) de l'heure
                //     const fajrTime = timings.Fajr.split(" ")[0];
                //     const dhuhurTime = timings.Dhuhr.split(" ")[0];
                //     const asrTime = timings.Asr.split(" ")[0];
                //     const maghribTime = timings.Maghrib.split(" ")[0];
                //     const ishaTime = timings.Isha.split(" ")[0];
                //     const midnightTime = timings.Midnight.split(" ")[0];
                //
                // } else {
                //     console.log("Aucun horaire de prière n'a été trouvé pour la date actuelle");
                // }
            })
            .catch(error => console.log(error));
    }
}

function angle(valeur) {
    valeur.addEventListener('click', () => {
        console.log('dd');
        const activeAngles = document.querySelectorAll('.angle.angle-active');
        activeAngles.forEach(activeAngle => {
            activeAngle.classList.remove('angle-active');
        });
        valeur.classList.add('angle-active');
        console.log('Angle activé');
    });
}
function handleClickOutsideDropdown(event) {
    const isClickInsideDropdown = dropdownContent.contains(event.target);
    const isClickInsideInput = input.contains(event.target);
    if (!isClickInsideDropdown && !isClickInsideInput) {
        dropdownContent.classList.remove('show');
    }
}

// Ouvrir la modale avec une transition d'opacité
btn_form.addEventListener('click', () => {
    console.log('dd');
    modal.style.display = 'block'; // Afficher la modale

    // Rendre la modale opaque avec une transition
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
    }, 10); // Utiliser un délai très court pour que la transition soit visible

});


// Fermer la modale
closeModalBtn.addEventListener('click', () => {
    modal.style.opacity = '0'; // Rendre la modale transparente

    // Attendre que la transition de fermeture soit terminée
    setTimeout(() => {
        modal.style.visibility = 'hidden'; // Cacher la modale
        modal.style.display = 'none'; // Masquer la modale
    }, 500); // Utiliser la même durée que la transition pour assurer que la transition de fermeture est terminée
});

// Fermer la modale en cliquant à l'extérieur
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.opacity = '0'; // Rendre la modale transparente

        // Attendre que la transition de fermeture soit terminée
        setTimeout(() => {
            modal.style.visibility = 'hidden'; // Cacher la modale
            modal.style.display = 'none'; // Masquer la modale
        }, 500); // Utiliser la même durée que la transition pour assurer que la transition de fermeture est terminée
    }
});
function handleDropdownClick() {
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
            });
        }, 500);
    });

    setTimeout(() => {
        prayerCards.forEach((card) => {
            card.classList.remove('show');
            for (let i = 0; i < prayerCards.length; i++) {
                prayerCards[i].style.opacity = 1;
            }
        });
    }, 5000);
}
