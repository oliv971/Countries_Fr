function getCountryByFrenchLanguage(continent) {
    
/********************************** */
/* Declaration / initialisation des variables
/********************************** */
    let tabCountries = [];
    let title = document.getElementById('title');
    let flag;
    let country;
    let nbPays = [];
    let req = new XMLHttpRequest(); //Création d'une instance de XMLHttpRequest
/********************************** */
    req.open("GET", "https://restcountries.com/v3.1/lang/french"); //Initialisation de l'objet avec GET
    req.responseType = 'json'; //Réponse au format 'JSON'
    req.send(); //Envoi de la requête au serveur
    
    req.onload = () => {        //Définit une fonction qui est appelée à réception de la fonction
        if (req.readyState == XMLHttpRequest.DONE) {        //renvoie l'état dans lequel se trouve le client XMLHttpRequest (compris entre 0 et 4). DONE correspondant à 4
            if (req.status == 200 ) {       //retourne le statut de la réponse (200 correspondant à OK)
                tabCountries = req.response;   //'response' renvoie un objet Javascript selon la valeur de responseType
                
                document.getElementById('logo').innerHTML = ""; //On vide la div 'logo' avant l'affichage du prochain tableau
                
                //Fonction qui permet de trier le nom des pays par ordre alphabétique (en français)
                tabCountries.sort((a, b) => a.name.nativeName.fra.common.localeCompare(b.name.nativeName.fra.common, 'fr', {ignorePunctuation: true}));

                for (let i = 0; i < tabCountries.length; i++) {
                    
                    if (tabCountries[i].region == continent) {     //Parcourt les régions du tableau 'tabCountries' et compare avec la valeur passée en param de la fonction
                        nbPays.push(i);
                        flag = document.createElement('div');   //Init de la variable 'flag' pour création d'une div
                        flag.classList.add('cadre');
                        flag.innerHTML += `<img src = ${tabCountries[i].flags.png}>`;   //Affiche le drapeau issu de l'API
                        document.getElementById('logo').appendChild(flag);      //Ajout de la div 'flag' au tableau parent 'logo'

                        country = document.createElement('div');
                        country.classList.add('infos');
                        // Affiche le pays EN FRANCAIS (anglais) et sa capitale
                        country.innerHTML += `<span class="pays"><strong>${tabCountries[i].name.nativeName.fra.common}</strong></span><br/>(${tabCountries[i].name.common})<br/><br/>Capitale: <span class="capitale"><i>${tabCountries[i].capital}</i></span>`;
                        document.getElementById('logo').appendChild(country);
                    }

                    // Met à jour le nom de la zone en français en fonction du bouton choisi
                    switch (continent) {

                        case "Africa":
                            title.innerHTML = `<span class="zone">Afrique: </span>${nbPays.length} pays francophone(s)`;
                            break;
                    
                        case "Americas":
                            title.innerHTML = `<span class="zone">Amérique: </span>${nbPays.length} pays francophone(s)`;
                            break;
                        
                        case "Antarctic":
                            title.innerHTML = `<span class="zone">Antarctique: </span>${nbPays.length} pays francophone(s)`;
                            break;

                        case "Asia":
                            title.innerHTML = `<span class="zone">Asie: </span>${nbPays.length} pays francophone(s)`;
                            break;

                        case "Europe":
                            title.innerHTML = `<span class="zone">Europe: </span>${nbPays.length} pays francophone(s)`;
                            break;

                        case "Oceania":
                            title.innerHTML = `<span class="zone">Océanie: </span>${nbPays.length} pays francophone(s)`;
                            break;                            
                    }
                }
            }
        }  
    }
}

getCountryByFrenchLanguage("Africa");   //Fonction qui exécute par défaut l'affichage de la zone 'Afrique'

document.getElementById('africa').addEventListener('click', () => {      //Affichage de la zone Afrique lors du clic dans la Navbar
    getCountryByFrenchLanguage("Africa");
});
document.getElementById('america').addEventListener('click', () => {    //Affichage de la zone Amérique lors du clic dans la Navbar
    getCountryByFrenchLanguage("Americas");
});
document.getElementById('asia').addEventListener('click', () => {   //Affichage de la zone Asie lors du clic dans la Navbar
    getCountryByFrenchLanguage("Asia");
});
document.getElementById('europa').addEventListener('click', () => { //Affichage de la zone Europe lors du clic dans la Navbar
    getCountryByFrenchLanguage("Europe");
});
document.getElementById('oceania').addEventListener('click', () => {    //Affichage de la zone Océanie-Antarctique lors du clic dans la Navbar
    getCountryByFrenchLanguage("Oceania");
});
document.getElementById('antarctic').addEventListener('click', () => {    //Affichage de la zone Océanie-Antarctique lors du clic dans la Navbar
    getCountryByFrenchLanguage("Antarctic");
});