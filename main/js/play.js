// Script principal de l'application


// jquery on document ready
$(function () {
    jeuEnCours = false;
    //annulation de l'appui sur une touche quand cette dernière est appuyée
    $(document).on("keydown", keyboardCustom);
    //chargement des visuels des personnages
    topIndex = 0;
    bottomIndex = 0;
    characterBottom = [];
    characterTop = [];
    var y = 1;
    for (var i = 0; i < 5; i++) {//remplissage des 2 tableaux de personnages
        characterBottom[i] = "img/characters/persofemme" + y + "bas.png";
        characterTop[i] = "img/characters/persofemme" + y + "haut.png";
        i++;
        characterBottom[i] = "img/characters/persohomme" + y + "bas.png";
        characterTop[i] = "img/characters/persohomme" + y + "haut.png";
        y++;
    }
    $("#aiguille").addClass("off");
});

//désactivation des touches clavier  classiques permettant de rafraîchir la page ou de quitter le plain écran, L'utilisateur a toujours la possibilité de quitter avec F11 ou le bouton rafraîchir du navigateur
function keyboardCustom(e) {
    if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82 || (e.which || e.keyCode) == 27) e.preventDefault();
    if ((e.which || e.keyCode) == 122 && jeuEnCours == false) {
        loadLevel('characterChoice');//chargement du choix des personnages une fois le bouton appuyé pour la prmière fois
        jeuEnCours = true;
    }
}

// Démarrer le jeu si l'utilisateur a rempli son nom
function start() {
    if (nameChoice() === true) {//si l'utilisateur a choisi un nom
        initTimer(); //initialisation du compte à rebours
        $("#aiguille").toggleClass("off");//lancement de l'animation de l'aiguille
        $("#play").remove();//suppression du bouton play
        $("#characterChoice").toggleClass('hidden');//cache le choix des personnages
        $("#level1").toggleClass('hidden');//affiche le niveau 1
    }
    else {
        animateNameChosen();//anime le champ du choix du personnage
    }

}

// timer de 5 minutes
//source https://www.w3schools.com/howto/howto_js_countdown.asp
function initTimer() {

    // Set the date we're counting down to
    countDownDate = new Date(new Date().getTime() + 5 * 60000);

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        // Output the result
        // document.getElementById("timer").innerHTML = minutes + ":" + seconds + ""; avant l'utilisation de JQuery
        $("#timer").text(minutes + ":" + seconds + "");
        localStorage.setItem("time", distance);

        // If the count down is over, do something
        if (distance < 0) {
            clearInterval(x);//arret du timer
            $("#timer").text("Temps expire !");//changement du texte affiché
            localStorage.setItem("time", distance);//sauvegarde du temps en LocalStorage pour de futurs traitements (non implémentés)
            $("#aiguille").toggleClass("off");//arrête l'animation de l'aiguille
            loadLevel("lost");//chargement du niveau de fin "perdu"
        }
        if ($("#won").hasClass('hidden') === false) {//si le niveau de fin "gaagne" est affiché
            clearInterval(x);
            $("#timer").text("Bravo !");
            localStorage.setItem("time", distance);
            $("#aiguille").toggleClass("off");
        }

    }, 1000);//intervale de 1 seconde
}


/**
 *gestion des niveaux
 * permet de charger tous les écrans du jeu dynamiquement grâce à la classe css hidden { display : none; }
 * @param level
 */
function loadLevel(level) {
    switch (level) {
        case "characterChoice" :
            $("#mainMenu").toggleClass('hidden');
            $("#characterChoice").toggleClass('hidden');
            addPlayButton();//changement du texte play en bouton play avec une nouvelle fonction assignée
            break;
        case "level1" :
            start();//initialisation du jeu
            break;
        case "level2" :
            $("#level1").toggleClass('hidden');//cacher le niveau précédent
            $("#level2").toggleClass('hidden');//afficher le niveau suivant
            break;
        case "level3" :
            $("#level2").toggleClass('hidden');
            $("#level3").toggleClass('hidden');
            break;
        case "level4":
            $("#level3").toggleClass('hidden');
            $("#level4").toggleClass('hidden');
            startCasseBriques();
            break;
        case "level5" :
            $("#level4").addClass('hidden');
            $("#level5").removeClass('hidden');
            break;
        case "level6" :
            $("#level5").addClass('hidden');
            $("#level6").removeClass('hidden');
            break;
        case "won" :
            if ($("#level1").hasClass('hidden') === false) {//cacher tous les niveaux si ils sont affichés
                $("#level1").addClass('hidden');
            }
            if ($("#level2").hasClass('hidden') === false) {
                $("#level2").addClass('hidden');
            }
            if ($("#level3").hasClass('hidden') === false) {
                $("#level3").addClass('hidden');
            }
            if ($("#level4").hasClass('hidden') === false) {
                $("#level4").addClass('hidden');
            }
            if ($("#level5").hasClass('hidden') === false) {
                $("#level5").addClass('hidden');
            }
            if ($("#level6").hasClass('hidden') === false) {
                $("#level6").addClass('hidden');
            }
            $("#won").toggleClass('hidden');//affichage de l'écran de fin + ajout d'une phrase
            $("#won").append("<h2 id=\"nickname\"\">" + "Bravo " + localStorage.getItem("name") + " appuie sur F11 pour t'echapper !</h2>");
            break;
        case "lost" :
            if ($("#level1").hasClass('hidden') === false) {//cacher tous les niveaux si ils sont affichés
                $("#level1").addClass('hidden');
            }
            if ($("#level2").hasClass('hidden') === false) {
                $("#level2").addClass('hidden');
            }
            if ($("#level3").hasClass('hidden') === false) {
                $("#level3").addClass('hidden');
            }
            if ($("#level4").hasClass('hidden') === false) {
                $("#level4").addClass('hidden');
            }
            if ($("#level5").hasClass('hidden') === false) {
                $("#level5").addClass('hidden');
            }
            if ($("#level6").hasClass('hidden') === false) {
                $("#level6").addClass('hidden');
            }
            $("#lost").toggleClass('hidden');//affichage de l'écran de fin + ajout d'une phrase
            $("#lost").append("<h2 id=\"nickname\"\">" + "Dommage " + localStorage.getItem("name") + "</h2>");
            break;
        default :
            console.log('Erreur lors du chargement du niveau');//aide de développement pour éviteur les erreurs d'orthographe ou de niveau non existnt lors de l'appel de la fonction
            break;

    }
}

/**
 * choix du personnage
 * @returns {boolean}
 */
function nameChoice() {
    if ($('#nameChosen').val() !== "") {//si le nom a été saisi
        localStorage.setItem("name", $('#nameChosen').val()); //sauvegarde pour affichage plus tard
        return true;
    }
    else {
        return false;
    }

}

/**
 * fonction intermédiaire permettant d'appeler une des 4 fonctions gérant les tenues disponibles pour le personnage selon les paramètres appelés
 * @param part
 * @param instruction
 */
function changeCharacter(part, instruction) {
    if (part === "bottom" && instruction === "next") {
        nextCharacterBottom();
    }
    else if (part === "bottom" && instruction === "previous") {
        previousCharacterBottom()
    }
    if (part === "top" && instruction === "next") {
        nextCharacterTop();
    }
    else if (part === "top" && instruction === "previous") {
        previousCharacterTop()
    }
}

//ce choix de scinder la fonction en 2 étapes a été fait dans le but de maintenir une meilleure lisibilité et maintenabilité
function nextCharacterBottom() {//fonction correspondant au tableau bas et instruction suivant
    bottomIndex++; //avance d'une case dans le tableau
    if (bottomIndex >= characterBottom.length) {
        bottomIndex = 0;//si on arrive au bout du tableau, repart au début
    }
    $("#characterImgBottom").attr('src', characterBottom[bottomIndex]);//change l'image affichée
}

function nextCharacterTop() {
    topIndex++;
    if (topIndex >= characterTop.length) {
        topIndex = 0;
    }
    $("#characterImgTop").attr('src', characterTop[topIndex]);
}

function previousCharacterBottom() {
    bottomIndex--;
    if (bottomIndex <= 0) {
        bottomIndex = characterBottom.length;
    }
    $("#characterImgBottom").attr('src', characterBottom[bottomIndex]);
}

function previousCharacterTop() {
    if (topIndex <= 0) {
        topIndex = characterTop.length;
    }
    topIndex--;
    $("#characterImgTop").attr('src', characterTop[topIndex]);
}

// Audio
function playPause() {
    var audio = document.getElementById("backgroundMusic");//récupère l'élément audio backgroundMusic du html
    if (!audio.paused === true) {//si le son est actuellement en lecture
        audio.pause();//mise en pause de l'audio
        $("#playPause").removeClass('fa fa-pause fa-2');//inversement des icones play/pause
        $("#playPause").addClass('fa fa-play fa-2');
    }
    else if (!audio.paused === false) {//si le son est actuellement en pause
        audio.play();//reprendre la lecture
        $("#playPause").removeClass('fa fa-play fa-2');//inversement des icones play/pause
        $("#playPause").addClass('fa fa-pause fa-2');
    }

}

//Animations
function animateNameChosen() {
    $("#nameChosen").animate({
        marginLeft: "-1em"
    }, 100);
    $("#nameChosen").animate({
        marginLeft: "1em"
    }, 100);
    $("#nameChosen").animate({
        marginLeft: "0em"
    }, 100);
    $("#nameChosen").focus();
}

//divers
function addPlayButton() {
    $("#play").remove();//supprime l'ancien texte play
    $("#main").append("<img id=\"play\" src=\"img/play.png\" onclick=\"loadLevel('level1');\">");//le remplace par un nouveau bouton ayant une fonction différente qui charge le niveau 1
}