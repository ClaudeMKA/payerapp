

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
let adresse_modal = document.querySelector('#adresse');
const contact = document.querySelector('.contact');
const methode = document.querySelector('.methode');


document.addEventListener("DOMContentLoaded", function() {
    const burgerIcon = document.querySelector('#burger-icon');
    const burgerMenu = document.querySelector('.burger-menu');
    const closeBurgerButton = document.querySelector('#close-burger');

    burgerIcon.addEventListener('click', () => {
        burgerMenu.style.transform = 'translateY(0)';
    });

    closeBurgerButton.addEventListener('click', () => {
        burgerMenu.style.transform = 'translateY(-100%)';
    });
    contact.addEventListener('click',()=>{
        contact.innerText = 'Pour me contacter, veuillez m\'envoyer un e-mail à l\'adresse suivante : Miakouikilaclaude@gmail.com'
    });

    methode.addEventListener('click',()=>{
        methode.innerText = 'Les méthodes de calcul des heures de prière pour différents angles sont les suivantes :\n' +
            '- Pour l\'angle de 12 degrés, on se base sur la méthode de calcul de l\'Union Organization Islamic de France.\n' +
            '- Pour l\'angle de 15 degrés, on se base sur la méthode de calcul de l\'Islamic Society of North America.\n' +
            '- Pour l\'angle de 18 degrés, on se base sur la méthode de calcul du Muslim World League.'
    });


    // methode.addEventListener('click',()=>{
    //     methode.innerText = 'Pour me contacter, veuillez m\'envoyer un e-mail à l\'adresse suivante : Miakouikilaclaude@gmail.com'
    // });




    // // Fermer le menu burger en cliquant n'importe où en dehors de celui-ci
    // window.addEventListener('click', (event) => {
    //     if (!burgerMenu.contains(event.target) && event.target !== burgerIcon) {
    //         burgerMenu.style.transform = 'translateY(-100%)';
    //     }
    // });
});



const button_calendar = document.querySelector('.button_calendar')


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
// Table de conversion des noms des mois en anglais vers les noms en français
const moisEnFrancais = {
    "January": "Janvier",
    "February": "Février",
    "March": "Mars",
    "April": "Avril",
    "May": "Mai",
    "June": "Juin",
    "July": "Juillet",
    "August": "Août",
    "September": "Septembre",
    "October": "Octobre",
    "November": "Novembre",
    "December": "Décembre"
};

// Fonction pour traduire les noms des mois
function traduireMoisEnFrancais(moisEnAnglais) {
    return moisEnFrancais[moisEnAnglais];
}

// Reste du code inchangé...

button_calendar.addEventListener('click', async (evt) => {
    evt.preventDefault();

    const selectedAddress = adresse_modal.value; // Adresse sélectionnée
    const selectedAngle = parseInt(document.getElementById("angle").value);

    // Mettre à jour le contenu de la balise p avec l'angle choisi
    const selectAngleText = `Angle choisi : ${selectedAngle}`;
    const selectAngleParagraph = document.querySelector('.select_angle');
    selectAngleParagraph.textContent = selectAngleText;

    // Utiliser la fonction pour obtenir les horaires de prière pour le mois actuel avec la méthode adaptée à l'angle choisi
    await getPrayerTimesForMonth(selectedAddress, selectedAngle);

    // Une fois les horaires de prière obtenus, vérifier si le calendrier est prêt et générer le PDF si c'est le cas
});




// ...


function getPrayerTimesForMonth(address, angle) {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;

    const url = `http://api.aladhan.com/v1/calendarByAddress/${year}/${month}?address=${address}&method=${getCalculationMethod(angle)}&midnightMode=0`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const prayerTimes = data.data;

            // Générer le calendrier avec les horaires de prière pour le mois actuel
            generatePrayerCalendar(prayerTimes);
        })
        .catch(error => console.error(error));
}

function getCalculationMethod(angle) {
    // Associer l'angle choisi à la méthode de calcul correspondante
    switch (angle) {
        case 12:
            return 12; // University of Islamic Sciences, Karachi
        case 15:
            return 2; // Islamic Society of North America (ISNA)
        case 18:
            return 3; // Muslim World League (MWL)
        default:
            return 12; // Par défaut, utiliser University of Islamic Sciences, Karachi
    }
}

function generatePrayerCalendar(prayerTimes) {
    // Supprimer le calendrier précédent s'il existe
    const oldCalendar = document.querySelector('#prayerCalendar');
    if (oldCalendar) {
        oldCalendar.remove();
    }

    // Créer un nouvel élément pour le calendrier
    const calendar = document.createElement('table');
    calendar.id = 'prayerCalendar';

    // Liste des noms de prières à afficher dans le calendrier, avec les traductions en français
    const prayerTranslations = {
        'Fajr': 'Fajr',
        'Dhuhr': 'Dhuhr',
        'Asr': 'Asr',
        'Maghrib': 'Maghrib',
        'Isha': 'Isha',
        'Firstthird': 'Premier tiers',
        'Lastthird': 'Dernier tiers'
    };

    // Créer l'en-tête de la table
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headerDate = document.createElement('th');
    headerDate.textContent = 'Date';
    headerRow.appendChild(headerDate);

    // Ajouter uniquement les horaires de prières spécifiées dans la liste
    for (const prayer in prayerTranslations) {
        const headerPrayer = document.createElement('th');
        headerPrayer.textContent = prayerTranslations[prayer];
        headerRow.appendChild(headerPrayer);
    }

    thead.appendChild(headerRow);
    calendar.appendChild(thead);

    // Créer le corps de la table (les horaires de prière pour chaque jour du mois)
    const tbody = document.createElement('tbody');
    prayerTimes.forEach(day => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');

        // Ajouter le mois en arabe dans le h2 avec la classe .mois_arab
        const moisArab = prayerTimes[0].date.hijri.month.en;
        const h2MoisArab = document.querySelector('.mois_arab');
        h2MoisArab.innerHTML = `Pdf Generer par Claudyshow`;

        // Traduire le mois en français en utilisant la fonction traduireMoisEnFrancais
        const moisEnAnglais = day.date.gregorian.month.en;
        const moisEnFrancais = traduireMoisEnFrancais(moisEnAnglais);

        // Créer la cellule de date avec le format "jour mois année"
        dateCell.textContent = `${day.date.gregorian.day} ${moisEnFrancais} ${day.date.gregorian.year}`;
        row.appendChild(dateCell);

        const prayerTimings = day.timings;
        // Ajouter les horaires de prières spécifiées dans la liste
        for (const prayer in prayerTranslations) {
            const prayerCell = document.createElement('td');
            if (prayerTimings[prayer]) {
                // Modifier la chaîne de caractères pour enlever (CEST) de l'heure
                const trimmedTime = prayerTimings[prayer].split(" ")[0];
                prayerCell.textContent = trimmedTime;
            } else {
                prayerCell.textContent = '-';
            }
            row.appendChild(prayerCell);
        }

        tbody.appendChild(row);
    });
    calendar.appendChild(tbody);

    // Ajouter la table à la div "calendrier"
    const calendrierDiv = document.querySelector('.calendrier');
    const loader = document.querySelector('.loader-container')
    const container = document.querySelector('.container')
    loader.style.display = 'flex'
    modal.style.display = 'none'
    dropdown.style.position = 'relative'
    calendrierDiv.style.display = 'block'
    calendrierDiv.style.textAlign = '-webkit-center;'
    calendrierDiv.style.position = 'absolute'
    calendrierDiv.style.top = '-100'
    calendrierDiv.style.zIndex = '-4'
    container.style.display = 'none'


    calendrierDiv.appendChild(calendar);
    // Génération du contenu HTML pour le calendrier
    const calendarHTML = `
        <html>
        <head>
            <style>
            .calendrier{
               text-align: -webkit-center;
            }
                /* Vos styles CSS ici */
                #prayerCalendar {
                    border-collapse: collapse;
                    width: 80%;
                    font-size: 8px;
                    height: 70vh;
                    padding-bottom: 3rem;
                }

                #prayerCalendar th,
                #prayerCalendar td {
                    border: 1px solid #dee2e6;
                    text-align: center;
                    font-size: 8px;
                }

                #prayerCalendar th {
                    background-color: #f8f9fa;
                    color: #343a40;
                }

                #prayerCalendar tr {
                    background-color: #ffffff;
                    color: #000000;
                }

                .mois_arab {
                    font-size: 12px;
                    font-weight: bold;
                }

                /* Pour centrer le contenu dans les cellules */
                #prayerCalendar th,
                #prayerCalendar td {
                    display: table-cell;
                    vertical-align: middle;
                }

                /* Styles pour le header de la table */
                #prayerCalendar thead {
                    background-color: #343a40;
                    color: #ffffff;
                }

                /* Styles pour les cellules de date */
                #prayerCalendar td.date-cell {
                    font-weight: bold;
                }

                /* Styles pour les cellules d'horaires de prière */
                #prayerCalendar td.prayer-time-cell {
                    font-weight: normal;
                }
            </style>
        </head>
        <body>
            ${calendrierDiv.innerHTML}
        </body>
        </html>
    `;

    // Envoyer le contenu HTML au serveur pour la génération du PDF
    fetch('pdf.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `htmlContent=${encodeURIComponent(calendarHTML)}`
    })
        .then(response => response.blob())
        .then(pdfBlob => {
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
            loader.style.display = 'none'
            calendrierDiv.style.display = 'none'
            container.style.display = 'block'

        })
        .catch(error => {
            console.error('Erreur lors de la génération du PDF :', error);
        });
}






// Reste du code inchangé...


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

