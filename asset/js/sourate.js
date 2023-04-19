console.log('dd')
const btnPlay = document.querySelector('#btn-play')
btnPlay.addEventListener('click', async () => {
    try {
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        audio.src = objectUrl;
        audio.play();
    } catch (error) {
        console.error(error);
    }
});

audio.addEventListener('ended', () => {
    btnPlay.textContent = 'Lecture audio';
});

audio.addEventListener('play', () => {
    btnPlay.textContent = 'Pause';
});

audio.addEventListener('pause', () => {
    btnPlay.textContent = 'Lecture audio';
});


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





