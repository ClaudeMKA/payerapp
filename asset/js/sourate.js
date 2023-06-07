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
let elementWithClass = ''; // Déclarer la variable ici
let elementpauseClass = ''; // Déclarer la variable ici

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
            let elementWithClass = ''; // Déclarer la variable ici
            let elementpauseClass  = ''; // Déclarer la variable ici
            ayahs.forEach((ayah) => {
                 elementWithClass =`<i class="fa-solid fa-arrows-rotate btn-loop" data-audio="${baseUrl}${ayah.number}.mp3"></i>`;
                 elementpauseClass  =`<i class="fa-sharp fa-solid fa-play btn-verse verse" data-audio="${baseUrl}${ayah.number}.mp3"></i>`;
                const tajweedText = convertTajweedToHTML(ayah.text); // Convertir le texte avec les balises Tajweed en HTML
                texteArabe += `<div class="wrap_srt">`;
                texteArabe += `<div class="btn_srt">`;
                texteArabe += elementpauseClass;
                texteArabe += elementWithClass;
                texteArabe += `</div>`;
                texteArabe += `<p class="arabic_vrs"><span>${tajweedText}</span></p>`;
                texteArabe += `<p class="translate">${traductions[ayah.numberInSurah]}</p>`;
                texteArabe += `<hr class="my-4">`

                texteArabe += `</div>`;
            });
            resultat.innerHTML = `<p><strong>Traduction en arabe :</strong></p>${texteArabe}`;
            addVerseAudioListeners();
        })

        .catch((error) => {
            console.error(error);
        });
}


/// Fonction pour ajouter les écouteurs d'événements aux boutons des versets
function addVerseAudioListeners() {
    const verseButtons = document.querySelectorAll('.btn-verse');
    console.log(verseButtons); // Afficher les éléments sélectionnés

    verseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const audioUrl = button.getAttribute('data-audio');
            playAudio(audioUrl,button);
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
    console.log(loopButtons);
    loopButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const audioUrl = button.getAttribute('data-audio');
            toggleAudioLoop(audioUrl, button);
        });
    });

    // Autres codes utilisant `verseButtons` peuvent être placés ici
}

// ...

// fetchVerseData(sourateValue);


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

        if (button.classList.contains('fa-arrows-rotate')) {
            button.classList.replace('fa-arrows-rotate', 'fa-x');
            button.classList.replace('fa-solid', 'fa-regular');

            // Ajouter la classe highlight pour le verset en arabe correspondant
            const arabicVerse = button.closest('.wrap_srt').querySelector('.arabic_vrs');
            const translation = button.closest('.wrap_srt').querySelector('.translate');
            arabicVerse.classList.add('highlight');
            translation.classList.add('highlight');
        } else {
            button.classList.replace('fa-x', 'fa-arrows-rotate');
            button.classList.replace('fa-regular', 'fa-solid');


        }
    } else {
        audio.pause();
        audio = null;
        button.classList.replace('fa-x', 'fa-arrows-rotate');
        button.classList.replace('fa-regular', 'fa-solid');
        // Supprimer la classe highlight pour le verset en arabe correspondant
        const arabicVerse = button.closest('.wrap_srt').querySelector('.arabic_vrs');
        const translation = button.closest('.wrap_srt').querySelector('.translate');
        arabicVerse.classList.remove('highlight');
        translation.classList.remove('highlight');
    }
}
function playAudio(url, button) {
    let progressBar = document.querySelector('.progress');
    const playButton = document.querySelector('.play-button');
    const pauseButton = document.querySelector('.pause-button');
    const psbutton = document.querySelector('.btn-verse');

    // Vérifier si une instance audio est déjà en cours de lecture
    if (audio && audio.src === url) {
        if (audio.paused) {
            audio.play(); // Relancer la lecture
            if (button) {
                button.classList.replace('fa-play', 'fa-pause');
                button.classList.remove('icon-white');
                button.classList.add('icon-green');
            }
        } else {
            audio.pause();
            if (button) {
                button.classList.replace('fa-pause', 'fa-play');
                button.classList.remove('icon-green');
                button.classList.add('icon-white');
            }
        }
        return; // Sortir de la fonction pour éviter de créer une nouvelle instance audio
    }

    // Si une autre instance audio est en cours de lecture, l'arrêter
    if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0; // Réinitialiser la position de lecture
        audio.remove(); // Supprimer l'instance audio précédente
        audio = null;
    }
    if (audio === null){
        // Supprimer la classe highlight pour le verset en arabe correspondant
        const arabicVerse = button.closest('.wrap_srt').querySelector('.arabic_vrs');
        const translation = button.closest('.wrap_srt').querySelector('.translate');
        arabicVerse.classList.remove('highlight');
        translation.classList.remove('highlight');
    }

    audio = new Audio(url);

    // Mettre à jour la barre de progression
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
    });

    audio.addEventListener('ended', () => {
        // Une fois que l'audio est terminé, supprimer l'instance
        audio.remove();
        audio = null;

        if (button) {
            button.classList.replace('fa-pause', 'fa-play');
            button.classList.remove('icon-green');
            button.classList.add('icon-white');

            // Supprimer la classe highlight pour le verset en arabe correspondant
            const arabicVerse = button.closest('.wrap_srt').querySelector('.arabic_vrs');
            const translation = button.closest('.wrap_srt').querySelector('.translate');
            arabicVerse.classList.remove('highlight');
            translation.classList.remove('highlight');
        }
    });

    psbutton.addEventListener('click', () => {
        if (button.classList.contains('fa-play')) {
            pauseAudio();
        } else if (audio && audio.paused) {
            resumeAudio();
        }
    });

    const pauseAudio = () => {
        if (audio && !audio.paused) {
            audio.pause();

            // Supprimer la classe highlight pour le verset en arabe correspondant
            const arabicVerse = button.closest('.wrap_srt').querySelector('.arabic_vrs');
            const translation = button.closest('.wrap_srt').querySelector('.translate');
            arabicVerse.classList.remove('highlight');
            translation.classList.remove('highlight');
        }
    };

    const resumeAudio = () => {
        if (audio && audio.paused) {
            audio.play();

            // Mettre à jour la classe highlight pour le verset en arabe correspondant
            const arabicVerse = button.closest('.wrap_srt').querySelector('.arabic_vrs');
            const translation = button.closest('.wrap_srt').querySelector('.translate');
            arabicVerse.classList.add('highlight');
            translation.classList.add('highlight');
        }
    };

    playButton.addEventListener('click', resumeAudio);
    pauseButton.addEventListener('click', pauseAudio);

    audio.play();
    if (button) {
        button.classList.replace('fa-play', 'fa-pause');
        button.classList.remove('icon-white');
        button.classList.add('icon-green');

        // Mettre à jour la classe highlight pour le verset en arabe correspondant
        const arabicVerse = button.closest('.wrap_srt').querySelector('.arabic_vrs');
        const translation = button.closest('.wrap_srt').querySelector('.translate');
        arabicVerse.classList.add('highlight');
        translation.classList.add('highlight');
    }
}




// ... autres fonctions

const launchButton = document.getElementById('launch-button');
let isPlaying = false;

launchButton.addEventListener('click', toggleRecitation);

function toggleRecitation() {
    if (isPlaying) {
        stopRecitation();
    } else {
        if (!audio) {
            startRecitation();
        }
    }
}

function startRecitation() {
    const audioButtons = document.querySelectorAll('.btn-verse');
    let index = 0;
    const progressBar = document.querySelector('.progress');
    const playButton = document.querySelector('.play-button');
    const pauseButton = document.querySelector('.pause-button');

    const playAudioSequentially = () => {
        if (index >= audioButtons.length) {
            stopRecitation();
            return;
        }

        const audioButton = audioButtons[index];
        const audioSrc = audioButton.getAttribute('data-audio');
        audio = new Audio(audioSrc);

        // Souligner le verset en arabe correspondant et sa traduction
        const arabicVerse = audioButton.closest('.wrap_srt').querySelector('.arabic_vrs');
        const translation = audioButton.closest('.wrap_srt').querySelector('.translate');

        // Mettre à jour la barre de progression
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
        });

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

        audio.play();
        playButton.style.color = 'green';
        pauseButton.style.color = '';
    };

    const pauseAudio = () => {
        if (audio && !audio.paused) {
            audio.pause();
            pauseButton.style.color = 'green';
            playButton.style.color = '';
        }
    };

    const resumeAudio = () => {
        if (audio && audio.paused) {
            audio.play();
            playButton.style.color = 'green';
            pauseButton.style.color = '';
        }
    };

    const stopRecitation = () => {
        pauseAudio();
        index = 0;
        audio = null;
        progressBar.style.width = '0';
    };

    playButton.addEventListener('click', resumeAudio);
    pauseButton.addEventListener('click', pauseAudio);

    isPlaying = true;
    launchButton.textContent = 'Arrêter la lecture';
    playAudioSequentially(); // Appel de la fonction playAudioSequentially pour commencer la récitation
}


const playAudioSequentially = () => {
    if (index >= audioButtons.length) {
        stopRecitation();
        return;
    }

    const audioButton = audioButtons[index];
    const audioSrc = audioButton.getAttribute('data-audio');
    audio = new Audio(audioSrc);

    // Mettre à jour la classe highlight pour les versets en arabe correspondants
    const arabicVerse = audioButton.closest('.wrap_srt').querySelector('.arabic_vrs');
    arabicVerse.classList.add('highlight');

    audio.play();

    // Mettre à jour la barre de progression
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
    });

    // Retirer la classe highlight lorsque l'audio se termine
    audio.addEventListener('ended', () => {
        arabicVerse.classList.remove('highlight');
        index++;
        playAudioSequentially();
    });
};



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






