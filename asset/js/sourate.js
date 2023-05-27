function convertTajweedToHTML(text) {
    const tajweedRules = [
        {
            regex: /ٱ/g,
            replacement: '<tajweed class="ham_wasl" data-type="hamza-wasl" data-description="Hamzat ul Wasl" data-tajweed=":153">ٱ</tajweed>',
        },
        // Ajoutez ici les autres règles de conversion pour les caractères Tajweed
        // { regex: /regex_goes_here/g, replacement: 'replacement_goes_here' },
    ];

    tajweedRules.forEach((rule) => {
        text = text.replace(rule.regex, rule.replacement);
    });

    return text;
}
const sourates = [
    { value: '1', name: 'Al-Fatiha' },
    { value: '2', name: 'Al-Baqara' },
    { value: '3', name: 'Al-Imran' },
    { value: '4', name: "An-Nisa'" },
    { value: '5', name: 'Al-Ma\'idah' },
    { value: '6', name: 'Al-Anam' },
    { value: '7', name: 'Al-Araf' },
    { value: '8', name: 'Al-Anfal' },
    { value: '9', name: 'At-Tawbah' },
    { value: '10', name: 'Yunus' },
    { value: '11', name: 'Hud' },
    { value: '12', name: 'Yusuf' },
    { value: '13', name: "Ar-Ra'd" },
    { value: '14', name: 'Ibrahim' },
    { value: '15', name: 'Al-Hijr' },
    { value: '16', name: 'An-Nahl' },
    { value: '17', name: "Al-Isra'" },
    { value: '18', name: 'Al-Kahf' },
    { value: '19', name: 'Maryam' },
    { value: '20', name: 'Ta-Ha' },
    { value: '21', name: "Al-Anbiya'" },
    { value: '22', name: 'Al-Hajj' },
    { value: '23', name: "Al-Muminun" },
    { value: '24', name: "An-Nur" },
    { value: '25', name: "Al-Furqan" },
    { value: '26', name: "Ash-Shu'ara" },
    { value: '27', name: "An-Naml" },
    { value: '28', name: "Al-Qasas" },
    { value: '29', name: "Al-Ankabut" },
    { value: '30', name: "Ar-Rum" },
    { value: '31', name: "Luqman" },
    { value: '32', name: "As-Sajdah" },
    { value: '33', name: "Al-Ahzab" },
    { value: '34', name: "Saba'" },
    { value: '35', name: "Fatir" },
    { value: '36', name: "Ya-Sin" },
    { value: '37', name: "As-Saffat" },
    { value: '38', name: "Sad" },
    { value: '39', name: "Az-Zumar" },
    { value: '40', name: "Ghafir" },
    { value: '41', name: "Fussilat" },
    { value: '42', name: "Ash-Shuraa" },
    { value: '43', name: "Az-Zukhruf" },
    { value: '44', name: "Ad-Dukhan" },
    { value: '45', name: "Al-Jathiyah" },
    { value: '46', name: "Al-Ahqaf" },
    { value: '47', name: "Muhammad" },
    { value: '48', name: "Al-Fath" },
    { value: '49', name: "Al-Hujurat" },
    { value: '50', name: "Qaf" },
    { value: '51', name: "Adh-Dhariyat" },
    { value: '52', name: "At-Tur" },
    { value: '53', name: "An-Najm" },
    { value: '54', name: "Al-Qamar" },
    { value: '55', name: "Ar-Rahman" },
    { value: '56', name: "Al-Waqi'ah" },
    { value: '57', name: "Al-Hadid" },
    { value: '58', name: "Al-Mujadilah" },
    { value: '59', name: "Al-Hashr" },
    { value: '60', name: "Al-Mumtahanah" },
    { value: '61', name: "As-Saff" },
    { value: '62', name: "Al-Jumu'ah" },
    { value: '63', name: "Al-Munafiqun" },
    { value: '64', name: "At-Taghabun" },
    { value: '65', name: "At-Talaq" },
    { value: '66', name: "At-Tahrim" },
    { value: '67', name: "Al-Mulk" },
    { value: '68', name: "Al-Qalam" },
    { value: '69', name: "Al-Haqqah" },
    { value: '70', name: "Al-Ma'arij" },
    { value: '71', name: "Nuh" },
    { value: '72', name: "Al-Jinn" },
    { value: '73', name: "Al-Muzzammil" },
    { value: '74', name: "Al-Muddaththir" },
    { value: '75', name: "Al-Qiyamah" },
    { value: '76', name: "Al-Insan" },
    { value: '77', name: "Al-Mursalat" },
    { value: '78', name: "An-Naba'" },
    { value: '79', name: "An-Nazi'at" },
    { value: '80', name: "'Abasa" },
    { value: '81', name: "At-Takwir" },
    { value: '82', name: "Al-Infitar" },
    { value: '83', name: "Al-Mutaffifin" },
    { value: '84', name: "Al-Inshiqaq" },
    { value: '85', name: "Al-Buruj" },
    { value: '86', name: "At-Tariq" },
    { value: '87', name: "Al-A'la" },
    { value: '88', name: "Al-Ghashiyah" },
    { value: '89', name: "Al-Fajr" },
    { value: '90', name: "Al-Balad" },
    { value: '91', name: "Ash-Shams" },
    { value: '92', name: "Al-Lail" },
    { value: '93', name: "Ad-Duha" },
    { value: '94', name: "Ash-Sharh" },
    { value: '95', name: "At-Tin" },
    { value: '96', name: "Al-'Alaq" },
    { value: '97', name: "Al-Qadr" },
    { value: '98', name: "Al-Bayyinah" },
    { value: '99', name: "Az-Zalzalah" },
    { value: '100', name: "Al-'Adiyat" },
    { value: '101', name: "Al-Qari'ah" },
    { value: '102', name: "At-Takathur" },
    { value: '103', name: "Al-'Asr" },
    { value: '104', name: "Al-Humazah" },
    { value: '105', name: "Al-Fil" },
    { value: '106', name: "Quraysh" },
    { value: '107', name: "Al-Ma'un" },
    { value: '108', name: "Al-Kawthar" },
    { value: '109', name: "Al-Kafirun" },
    { value: '110', name: "An-Nasr" },
    { value: '111', name: "Al-Masad" },
    { value: '112', name: "Al-Ikhlas" },
    { value: '113', name: "Al-Falaq" },
    { value: '114', name: "An-Nas" }
    // Ajoutez les autres sourates ici
];

const searchInput = document.getElementById('search-input');
const sourateList = document.querySelector('.sourate-list');
// Déclaration de la variable audio en dehors de la fonction
let audio;

const baseUrl = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/';

// Fonction pour afficher les sourates correspondantes à la recherche
function displaySourates(searchTerm) {
    // Réinitialiser la liste des sourates
    sourateList.innerHTML = '';

    // Filtrer les sourates correspondantes à la recherche
    const filteredSourates = sourates.filter((sourate) =>
        sourate.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    // Afficher les sourates correspondantes
    filteredSourates.forEach((sourate) => {
        const listItem = document.createElement('li');
        listItem.textContent = sourate.name;
        listItem.setAttribute('data-value', sourate.value);
        listItem.addEventListener('click', () => {
            // Vous pouvez exécuter des actions lorsque la sourate est sélectionnée
            console.log('Sourate sélectionnée:', sourate.name);
            fetchVerseData(sourate.value);
            searchInput.value = sourate.name;
        });
        sourateList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultSourateValue = 1; // Numéro de sourate pour Al-Fatiha

    fetchVerseData(defaultSourateValue);
});

// Fonction pour récupérer les données du verset à partir de l'API
function fetchVerseData(sourateValue) {
    Promise.all([
        fetch(`http://api.alquran.cloud/v1/surah/${sourateValue}/ar.alafasy`).then((response) =>
            response.json()
        ),
        fetch(`http://api.alquran.cloud/v1/surah/${sourateValue}/fr.hamidullah`).then((response) =>
            response.json()
        ),
    ])
        .then(([arabe, francais]) => {
            const ayahs = arabe.data.ayahs;
            const traductions = francais.data.ayahs.reduce((acc, ayah) => {
                acc[ayah.numberInSurah] = ayah.text;
                return acc;
            }, {});
            let texteArabe = '';
            ayahs.forEach((ayah) => {
                const tajweedText = convertTajweedToHTML(ayah.text); // Convertir le texte avec les balises Tajweed en HTML
                texteArabe += `<div class="wrap_srt">`;
                texteArabe += `<div class="btn_srt">`;
                texteArabe += `<button class="btn-verse" data-audio="${baseUrl}${ayah.number}.mp3">Écouter le verset</button>`;
                texteArabe += `<button class="btn-loop" data-audio="${baseUrl}${ayah.number}.mp3">Lire en boucle</button>`;
                texteArabe += `</div>`;
                texteArabe += `<p class="arabic_vrs"><span>${tajweedText}</span></p>`;
                texteArabe += `<p class="translate">${traductions[ayah.numberInSurah]}</p>`;

                texteArabe += `</div>`;
                texteArabe += `<hr class="my-4">`
            });
            resultat.innerHTML = `<p><strong>Traduction en arabe :</strong></p>${texteArabe}`;
            addVerseAudioListeners();
        })

        .catch((error) => {
            console.error(error);
        });
}


// Fonction pour ajouter les écouteurs d'événements aux boutons des versets
function addVerseAudioListeners() {
    const verseButtons = document.querySelectorAll('.btn-verse');
    verseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const audioUrl = button.getAttribute('data-audio');
            playAudio(audioUrl);
        });
    });
    function addAudioListeners() {
        const audioElements = document.querySelectorAll('.audio-verse');

        audioElements.forEach((audio) => {
            audio.addEventListener('ended', handleAudioEnded);
        });
    }
    function handleAudioEnded(event) {
        const currentAudio = event.target;
        const nextAudio = currentAudio.nextElementSibling;

        if (nextAudio && nextAudio.tagName === 'AUDIO') {
            nextAudio.play();
        }
    }

    const loopButtons = document.querySelectorAll('.btn-loop');
    loopButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const audioUrl = button.getAttribute('data-audio');
            toggleAudioLoop(audioUrl, button);
        });
    });
}

// Créer une variable pour stocker l'instance audio en cours de lecture

// Fonction pour jouer l'audio en boucle ou arrêter la lecture en boucle
function toggleAudioLoop(url, button) {
    // Vérifier si l'audio est déjà en lecture
    if (!audio || audio.paused) {
        // Arrêter l'audio actuellement en cours de lecture, le cas échéant
        if (audio) {
            audio.pause();
            audio = null;
        }

        audio = new Audio(url);
        audio.loop = true; // Définit la lecture en boucle

        audio.addEventListener('ended', () => {
            // Une fois que l'audio est terminé, supprimer l'instance
            audio.remove();
            audio = null;
        });
        audio.play();
        button.textContent = 'Arrêter la lecture en boucle';
        audio.remove();
    } else {
        audio.pause();
        audio = null;
        button.textContent = 'Lire en boucle';
    }
}

// Fonction pour jouer l'audio une seule fois
function playAudio(url) {
    // Arrêter la lecture en boucle si elle est active
    const loopButton = document.querySelector('.btn-loop.active');
    if (loopButton) {
        const loopAudioUrl = loopButton.getAttribute('data-audio');
        toggleAudioLoop(loopAudioUrl, loopButton);
    }

    // Vérifier si une instance audio est déjà en cours de lecture
    if (audio) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    } else {
        audio = new Audio(url);
        audio.addEventListener('ended', () => {
            // Une fois que l'audio est terminé, supprimer l'instance
            audio.remove();
            audio = null;
        });
        audio.play();
    }
}
const launchButton = document.getElementById('launch-button');
let isPlaying = false;

launchButton.addEventListener('click', toggleRecitation);

function toggleRecitation() {
    if (isPlaying) {
        stopRecitation();
    } else {
        startRecitation();
    }
}

function startRecitation() {
    const audioButtons = document.querySelectorAll('.btn-verse');
    let index = 0;

    const playAudioSequentially = () => {
        if (index >= audioButtons.length) {
            stopRecitation();
            return;
        }

        const audioButton = audioButtons[index];
        const audioSrc = audioButton.getAttribute('data-audio');
        audio = new Audio(audioSrc);

        audio.play();

        // Souligner le verset en arabe correspondant et sa traduction
        const arabicVerse = audioButton.closest('.wrap_srt').querySelector('.arabic_vrs');
        const translation = audioButton.closest('.wrap_srt').querySelector('.translate');

        arabicVerse.classList.add('highlight');
        translation.classList.add('highlight');

        // Faire défiler jusqu'au verset en cours de lecture
        arabicVerse.scrollIntoView({ behavior: 'smooth' });

        audio.onended = () => {
            // Retirer le soulignement du verset en arabe et de sa traduction
            arabicVerse.classList.remove('highlight');
            translation.classList.remove('highlight');

            index++;
            playAudioSequentially();
        };
    };

    isPlaying = true;
    launchButton.textContent = 'Arrêter la lecture';
    playAudioSequentially();
}


function stopRecitation() {
    isPlaying = false;
    launchButton.textContent = 'Lancer la lecture';
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio = null;
    }
}



// Gestionnaire d'événement de clic sur l'ensemble du document
document.addEventListener('click', (event) => {
    // Vérifier si le clic est en dehors de la liste des sourates ou de la barre de recherche
    if (!event.target.closest('.srt-container')) {
        // Effacer le filtre en réinitialisant la liste des sourates
        sourateList.innerHTML = '';
    }
});

// Écouter les événements de saisie dans la barre de recherche
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    displaySourates(searchTerm);
});






