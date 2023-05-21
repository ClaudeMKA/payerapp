
const baseUrl = 'https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/';
const playButton = document.getElementById('btn-play');




playButton.addEventListener('click', () => {
    const select = document.getElementById('sourate');
    const selectedSourate = select.value;
    const selectedVerset = document.getElementById('verset').value;
    const audioUrl = `${baseUrl}${selectedSourate}.mp3`;
    playAudio(audioUrl);
});

function playAudio(url) {
    const audio = document.getElementById('audio');
    audio.src = url;
    audio.play();
}


//Définition des paramètres
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