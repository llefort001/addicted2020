// Objet du fichier : Script du mini jeu du memory
// Provenance : http://sciences-du-numerique.fr/projets-javascript/code-source-du-jeu-de-memory/60

// tableau contenant les paires de cartes
var motifsCartes = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
// tableau contenant l'état des cartes, retournées au début (0)'
var etatsCartes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// aucune carte retournées au début
var cartesRetournees = [];
// aucune paires trouvées au début
var nbPairesTrouvees = 0;

var imgCartes = document.getElementById("tapis").getElementsByTagName("img");
// ajoute une propriété NoCarte sur chaque élément img et ajoute un event handler onclick
for (var i = 0; i < imgCartes.length; i++) {
    imgCartes[i].noCarte = i; //Ajout de la propriété noCarte à l'objet img
    imgCartes[i].onclick = function () {
        controleJeu(this.noCarte);
    }
}

initialiseJeu();

// permet de gérer l'affichage des carte dasn leurs 3 états, face verso, recto et cachée une fois la paire trouvée
function majAffichage(noCarte) {
    switch (etatsCartes[noCarte]) {
        case 0://verso
            imgCartes[noCarte].src = "memory/img/fondcarte.jpg";
            break;
        case 1://paire trouvée
            imgCartes[noCarte].src = "memory/img/carte" + motifsCartes[noCarte] + ".jpg";
            break;

        case -1://paire non trouvée
            imgCartes[noCarte].style.visibility = "hidden";
            break;
    }
}

// positions de cartes aléatoires à chaque partie
function initialiseJeu() {
    for (var position = motifsCartes.length - 1; position >= 1; position--) {
        var hasard = Math.floor(Math.random() * (position + 1));
        var sauve = motifsCartes[position];
        motifsCartes[position] = motifsCartes[hasard];
        motifsCartes[hasard] = sauve;
    }
}

function controleJeu(noCarte) {

    if (cartesRetournees.length < 2) {
// si on a pas retourné plus de 1 carte
        if (etatsCartes[noCarte] == 0) { //si carte face cachée, on la retourne
            etatsCartes[noCarte] = 1;
            cartesRetournees.push(noCarte);//on ajoute au tableau cartesretournées le numéro de la carte que l'on vient de retourner
            majAffichage(noCarte);
        }
        if (cartesRetournees.length == 2) {//si on vient de rtourner 2 cartes
            var nouveauEtat = 0;
            if (motifsCartes[cartesRetournees[0]] == motifsCartes[cartesRetournees[1]]) {//vérification de paire ou non
                nouveauEtat = -1;
                nbPairesTrouvees++;
            }

            etatsCartes[cartesRetournees[0]] = nouveauEtat;
            etatsCartes[cartesRetournees[1]] = nouveauEtat;
            setTimeout(function () {//temps de 0.75 secondes après avoir retourné 2 cartes
                majAffichage(cartesRetournees[0]);
                majAffichage(cartesRetournees[1]);
                cartesRetournees = [];
                if (nbPairesTrouvees == 5) { //si le nombre de aires trouvées est égal au nombre de paires total
                    loadLevel('level3');//charge le niveau suivant (play.js)
                }
            }, 750);
        }
    }
}