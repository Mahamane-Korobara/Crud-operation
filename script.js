// Sélectionne l'élément avec la classe "dark_bg" 
let darkBg = document.querySelector('.dark_bg'); 

// Sélectionne le bouton ayant la classe "ajoutMenbreBtn" 
let ajoutMenbreBtn = document.querySelector('.ajoutMenbreBtn'); 

// Sélectionne l'élément avec la classe "surgir" 
let surgirForm = document.querySelector('.surgir'); 

// Sélectionne le bouton ayant la classe "submitBtn" 
let submitBtn = document.querySelector('.submitBtn'); 

// Sélectionne l'élément avec la classe "modelTitre" 
let modelTitre = document.querySelector('.modelTitre'); 

// Sélectionne l'élément avec la classe "surgirFooter" 
let surgirFooter = document.querySelector('.surgirFooter'); 

// Sélectionne le bouton avec la classe "fermeBtn" 
let fermeBtn = document.querySelector('.fermeBtn'); 

// Sélectionne l'élément `<form>` 
let form = document.querySelector('form'); 

//Sélectionne tout les l'éléments `<input>` de `<form>`
let formInputChamps = document.querySelectorAll('form input');

// Sélectionne un élément avec l'identifiant "telecharger" 
let telecharger = document.getElementById('telecharger'); 

// Sélectionne l'élément avec la classe "img"
let imgInput = document.querySelector('.img'); 


imgTitulaire = document.querySelector('.imgTitulaire');

// Sélectionne l'élément avec l'identifiant "fName" 
let fName = document.getElementById('fName'); 

// Sélectionne l'élément avec l'identifiant "lName" 
let lName = document.getElementById('lName'); 

// Sélectionne l'élément avec l'identifiant "age" 
let age = document.getElementById('age'); 

// Sélectionne l'élément avec l'identifiant "ville" 
let ville = document.getElementById('ville'); 

// Sélectionne l'élément avec l'identifiant "position" 
let position = document.getElementById('position'); 

// Sélectionne l'élément avec l'identifiant "salaire" 
let salaire = document.getElementById('salaire'); 

// Sélectionne l'élément avec l'identifiant "date" 
let date = document.getElementById('date'); 

// Sélectionne l'élément avec l'identifiant "email" 
let email = document.getElementById('email'); 

// Sélectionne l'élément avec la classe "montreEntree" 
let entree = document.querySelector('.montreEntree'); 

// Sélectionne l'élément avec l'identifiant "taille_Tableau" 
let tailleTableau = document.getElementById('taille_Tableau'); 

// Sélectionne l'élément avec la classe "userInfo"
let userInfo = document.querySelector('.userInfo'); 

// Sélectionne l'élément avec la classe "table"
let table = document.querySelector('.table');

// Sélectionne l'input avec l'id "recherche"
let filtreData = document.getElementById('recherche');

// Sélectionne l'élément avec la classe "userInfo_mobile"
let userInfo_mobile =document.querySelector('.userInfo_mobile')



let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
/*condition ternaire si une donnée est trouvée avec la clé 'userProfile', elle est récupérée et convertie en objet JavaScript avec JSON.parse()
.Sinon, une liste vide [] est attribuée à originalData.*/
let obtenirData = [...originalData]; // Copie de originalData
let estEdit = false, editId;


let longueurDuTableau = 0; //LOngueur du tableau
let tailleTable = 10; //taille de la page ex : 10 elements 
let departIndex = 1; // l'index de depart des elements 
let finIndex = 0; // l'index de fin des elements 
let actuelIndex = 1; // page courante par defaut à 1
let maxIndex = 0; // Nombre total de page

AfficheInfo()

// Regex pour la validation d'email
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;//Ce regex correspond à un format standard pour les emails valides

// Fonction de validation d'email
function validateEmail(email) {
    if (!EMAIL_REGEX.test(email)) {
        //Vérifie si l'email respecte le format défini par le regex
        return "Format d'email invalide";
    }
    
    // Vérification des doublons en excluant l'email actuel en cas de modification
    const existingEmails = originalData
    //estEdit : Indique si l'email actuel est en cours de modification ou
    //editId : Identifiant de l'email en cours d'édition
        .filter((item, index) => !estEdit || index !== editId)
        .map(item => item.emailVal.toLowerCase()); //Transforme tous les emails en lettres minuscules
    
    if (existingEmails.includes(email.toLowerCase())) {
        return "Cet email est déjà utilisé";
    }
    
    return null;// format vamide et pas de doublons
};

// Fonction de validation d'âge
function validateAge(age) {
    const ageNum = parseInt(age);//conversion de age en nbr
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 50) {
        //Verifie si l'age est une chaine non numerique et si elle est en dehors 
        // de la plage valide (18 à 50 inclus)
        return "L'âge doit être compris entre 18 et 50 ans";
    }
    return null;
};



//ouverture du conteneur formulaire et le formulaire
ajoutMenbreBtn.addEventListener('click', () => {

    estEdit = false
    submitBtn.innerHTML = "Soumettre";
    modelTitre.innerHTML = "Remplir le formulaire";
    surgirFooter.style.display = "block";
    imgInput.src = "OIP.jpeg";

    //Ajout de la classe css active
    darkBg.classList.add('active');
    surgirForm.classList.add('active');
});


//Fermeture du conteneur formulaire et le formulaire
fermeBtn.addEventListener('click', () => {
    // Suppresssion de la classe active
    darkBg.classList.remove('active');
    surgirForm.classList.remove('active');
    //Réinitialisatin des champs de saisie 
    form.reset();
});

//Fonction pour gerer le telechargement de l'image
telecharger.onchange = function () { // l'evenement onchange declenchée lorsque l'utilisateur choisi un element
    if(telecharger.files[0].size < 1000000){ // 1000000 octets = 1MB
        let fileLire = new FileReader(); // lire le contenue d'un fichier asychrone

        fileLire.onload = function(e) { //evenement de rappel fonction executé une fois que la lecture du fichier soit terminer
            let imgUrl = e.target.result;
            imgInput.src =  imgUrl;

        }
        fileLire.readAsDataURL(telecharger.files[0]);
    }
    else {
        alert('Ce fichier est trop volumeux')
    }
};

// fonction pour calculer combioen de page neccesaire pour afficher les données
function preChargeCalcule() {
    let tableau = obtenirData; // les donner provenant de obtnirData
    longueurDuTableau = tableau.length;
    maxIndex = longueurDuTableau / tailleTable; // nombrec total de page 
    if((longueurDuTableau % tailleTable) > 0){
        // S'il reste des element ajout d'une page suplmentaire a maxIndex
        maxIndex ++;
    }
};


//affichage des boutons de pagination
function displayIndesBtn() {


    preChargeCalcule();

    const pagination = document.querySelector('.pagination');
    //Reinitialisation 
    pagination.innerHTML = "";

    pagination.innerHTML = '<button onclick= "prec()" class="prec">Préc</button>';

    for(let i = 1; i <= maxIndex; i++){
        // creation de bouton pour chque page
        pagination.innerHTML += '<button onclick= paginationBtn('+i+') index = "'+i+'">'+i+'</button>';
    }


    pagination.innerHTML += '<button onclick= "suiv()" class="suiv">Suiv</button>';

    brillanceBtn();
    
};

// Fonction pour l'affichage des éléments visibles sur la page 
function brillanceBtn(){
    departIndex = ((actuelIndex - 1) * tailleTable) + 1; //  Calculer le premier index (l'entrée de départ) qui sera affiché sur 
    // la page actuelle (actuelIndex), actuelIndex - 1 carcar les pages commencent à 1 mais les index de tableau commencent à 0 
    finIndex = (departIndex + tailleTable) -1; // Calculer l'index du dernier élément affiché pour la page actuelle

    if(finIndex > longueurDuTableau) {
        //S'assurer que l'index de fin ne dépasse pas le nombre total d'éléments dans le tableau
        finIndex = longueurDuTableau;
    }

    if(maxIndex >= 2){
        let suivBtn = document.querySelector('.suiv');
        suivBtn.classList.add('act')
    }

    entree.textContent = `Affichage de ${departIndex} à ${finIndex} sur ${longueurDuTableau} entrées`;


    // Sélectionne tous les boutons à l'intérieur de l'élément avec la classe "pagination".
    let paginationBtns = document.querySelectorAll('.pagination button'); 
    // Mettre à jour l'état des boutons de pagination 
    paginationBtns.forEach(btn => {
        btn.classList.remove('active')
        if(btn.getAttribute('index') === actuelIndex.toString()){
            btn.classList.add('active')
        }
    })

    AfficheInfo();

};

//Fonction pour afficher les informations dans le tableau
function  AfficheInfo() {

    document.querySelectorAll('.employerDetails').forEach(info => info.remove());
    
    let depatTableau = departIndex - 1;
    let finTableau = finIndex;

    if(obtenirData.length > 0){ //Vérifie que obtenirData (le tableau contenant les données des employés) n'est pas vide
        for(let i = depatTableau; i < finTableau; i++){
            let personnel = obtenirData[i];

            if(personnel){ // Verifie si les données de cet index existe 
                let createElement = `<tr class="employerDetails" >
                    <td>${i + 1}</td>
                    <td><img src="${personnel.picture}" alt="" width="40px" height="40px"></td>
                    <td>${personnel.fNameVal +" "+ personnel.lNameVal}</td>
                    <td>${personnel.ageVal}</td>
                    <td>${personnel.villeVal}</td>
                    <td>${personnel.positionVal}</td>
                    <td>${personnel.salaireVal}</td>
                    <td>${personnel.dateVal}</td>
                    <td>${personnel.emailVal}</td>
                    <td>
                        <button onclick="lireInfo('${personnel.picture}','${personnel.fNameVal}','${personnel.lNameVal}','${personnel.ageVal}','${personnel.villeVal}',
                        '${personnel.positionVal}','${personnel.salaireVal}','${personnel.dateVal}','${personnel.emailVal}')"><i class="fa-regular fa-eye"></i></button>
                        <button onclick="modifierInfo('${i}','${personnel.picture}','${personnel.fNameVal}','${personnel.lNameVal}','${personnel.ageVal}','${personnel.villeVal}',
                        '${personnel.positionVal}','${personnel.salaireVal}','${personnel.dateVal}','${personnel.emailVal}')"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onclick="supprimerInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>`

                userInfo.innerHTML += createElement;
            }
        }
    }

    if(obtenirData.length > 0){
        for(let i = depatTableau; i < finTableau; i++){
            let personnel = obtenirData[i];
        if(personnel){
            let createElement_mobile = `<tr class="employerDetails" data-index="${i}">
                    <td>${i + 1}</td>
                    <td><img src="${personnel.picture}" alt="" width="40px" height="40px"></td>
                    <td>${personnel.fNameVal +" "+ personnel.lNameVal}</td>
                </tr>`

                 // Ajouter à la table mobile
                userInfo_mobile.innerHTML += createElement_mobile;
        }
    }

    // Ajouter les événements après la création des lignes
    document.querySelectorAll('.userInfo_mobile .employerDetails').forEach(row => {
        row.addEventListener('click', function () {
          let index = this.dataset.index; // Récupérer l'index de l'employé
          let personnel = obtenirData[index]; // Obtenir les informations de l'employé
          afficherDetailsMobile(personnel, index); // Appeler la fonction pour afficher les détails
        });
      });

} else {
    userInfo.innerHTML = `<tr class="employerDetails" >
        <td class="vide" colspan="11" align="center">
          Aucune donnée disponible dans le tableau
        </td>
      </tr>`

      userInfo_mobile.innerHTML = `<tr class="employerDetails" >
      <td class="vide" colspan="11" align="center">
        Aucune donnée disponible dans le tableau
      </td>
    </tr>`
}
};

AfficheInfo();


function afficherDetailsMobile(personnel, index) {
    // Sélectionner le conteneur dédié pour les détails 
    const detailsContainer = document.getElementById('detailsMobile');
  
    // Injecter les informations manquantes de l'employé
    detailsContainer.innerHTML = `
      <h2>Détails de l'employé</h2>
      <div class="img_Nom"> <img src="${personnel.picture}" alt="Photo" width="100px"> <h3> ${personnel.fNameVal} ${personnel.lNameVal}<h3></div>
      <p><strong>Âge :</strong> ${personnel.ageVal}</p>
      <p><strong>Ville :</strong> ${personnel.villeVal}</p>
      <p><strong>Position :</strong> ${personnel.positionVal}</p>
      <p><strong>Salaire :</strong> ${personnel.salaireVal}</p>
      <p><strong>Date d'embauche :</strong> ${personnel.dateVal}</p>
      <p><strong>Email :</strong> ${personnel.emailVal}</p>
    `;


    // Ajouter le bouton de modification dynamiquement
    const editButton = document.createElement('button');
    editButton.className = "btn-modifier";
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

    // Ajouter l'événement au bouton de modification
    editButton.addEventListener('click', function () {
        const index = originalData.findIndex(item => item.id === personnel.id);
        modifierInfo(index, personnel.picture, personnel.fNameVal, personnel.lNameVal, 
            personnel.ageVal, personnel.villeVal, personnel.positionVal, 
            personnel.salaireVal, personnel.dateVal, personnel.emailVal);
    });

    
    // Ajouter le bouton de modification dynamiquement
    const supBtn = document.createElement('button');
    supBtn.className = "btn-supprimer";
    supBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    // Ajouter l'événement au bouton de suppression
    supBtn.addEventListener('click', function () {
        const index = originalData.findIndex(item => 
            item.picture === personnel.picture && 
            item.fNameVal === personnel.fNameVal &&
            item.lNameVal === personnel.lNameVal
        );
        supprimerInfo(index);
        // Fermer la fenêtre de détails après la suppression
        document.getElementById('detailsMobile').style.display = 'none';
    });
    // Ajouter le bouton à la div detailsContainer
    detailsContainer.appendChild(editButton);
    detailsContainer.appendChild(supBtn);

    // Rendre le conteneur visible
    detailsContainer.style.display = 'block';
  }
  
  // Rendre le conteneur invisible
  document.getElementById('detailsMobile').addEventListener('click', function () {
    this.style.display = 'none';
  });

// Gérer l'affichage de detailsMobile sur les ecrans
  window.addEventListener('resize', () => {
    const detailsContainer = document.getElementById('detailsMobile');
    
    // Si l'écran dépasse 768px, masquer detailsMobile
    if (window.innerWidth > 768) {
      detailsContainer.style.display = 'none';
    }
  });

//Fonction pour lire les informations 
function lireInfo(pic, preNom, deuNom, Age, Ville, Position, Salaire, Date, Email) {

    imgInput.src = pic;
    fName.value = preNom;
    lName.value = deuNom;
    age.value = Age;
    ville.value = Ville;
    position.value = Position;
    salaire.value = Salaire;
    date.value = Date;
    email.value = Email;

    darkBg.classList.add('active');
    surgirForm.classList.add('active');
    surgirFooter.style.display = 'none';
    modelTitre.innerHTML = 'Profile';
    formInputChamps.forEach(input => {
        input.disabled = true;
    });

    imgTitulaire.style.pointerEvents = 'none';
};

//Fonction pour modifier les informations 
function modifierInfo(id, pic, preNom, deuNom, Age, Ville, Position, Salaire, Date, Email){

    estEdit = true;
    // Convertir l'id en nombre si c'est une chaîne
    editId = typeof id === 'string' ? parseInt(id) : id;

    // Trouver l'index correct dans originalData
    let indexToUpdate = originalData.findIndex(item => item.id === editId);
    if (indexToUpdate === -1) { // Si l'id n'est pas trouvé dans originalData utiliser l'index directement
        indexToUpdate = editId;
    }

    // Mettre à jour les données
    const updatedInfo = {
        id: originalData[indexToUpdate].id || Date.now(), // Garder l'id existant ou en créer un nouveau
        picture: pic,
        fNameVal: preNom,
        lNameVal: deuNom,
        ageVal: Age,
        villeVal: Ville,
        positionVal: Position,
        salaireVal: Salaire,
        dateVal: Date,
        emailVal: Email
    };

    // Mettre à jour originalData et localStorage
    originalData[indexToUpdate] = updatedInfo;
    localStorage.setItem('userProfile', JSON.stringify(originalData));
    obtenirData = [...originalData];

    imgInput.src = pic;
    fName.value = preNom;
    lName.value = deuNom;
    age.value = Age;
    ville.value = Ville;
    position.value = Position;
    salaire.value = Salaire;
    date.value = Date;
    email.value = Email;

    darkBg.classList.add('active');
    surgirForm.classList.add('active');
    surgirFooter.style.display = 'block';
    modelTitre.innerHTML = 'Mettre a jour le formulaire';
    submitBtn.innerHTML = 'Mise a jour'
    formInputChamps.forEach(input => {
        input.disabled = false;
    });

    imgTitulaire.style.pointerEvents = 'auto';
};

//function pour supprimer les informations 
function supprimerInfo(index){
    if(confirm("Etes-vous sur de vouloir supprimer ?")){
        originalData.splice(index, 1);
        localStorage.setItem('userProfile', JSON.stringify(originalData));


        // Mis a jour de obtenirData apres la suppression
        obtenirData = [...originalData];

        preChargeCalcule();
        if(obtenirData.length === 0){
            actuelIndex = 1;
            departIndex = 1;
            finIndex = 0;
        }
        else if(actuelIndex > maxIndex){
            actuelIndex = maxIndex;
        }

        AfficheInfo();
        brillanceBtn();
        displayIndesBtn();

        let suivBtn = document.querySelector('.suiv');
        let precBtn = document.querySelector('.prec');

        if(Math.floor(maxIndex) > actuelIndex){
            suivBtn.classList.add('act');
        }
        else {
            suivBtn.classList.remove('act');
        }

        if(actuelIndex > 1){
            precBtn.classList.add('act');
        }
    }
};

form.addEventListener('submit', (e) => {

    e.preventDefault()// Empêche le rechargement de la page

    // Validation de l'email
    const emailError = validateEmail(email.value);
    if (emailError) {
        alert(emailError);
        return;
    };

    // Validation de l'âge
    const ageError = validateAge(age.value);
    if (ageError) {
        alert(ageError);
        return;
    };

    //Information sur l'utilisateur
    const information = {
        id : Date.now(),// genener un identifiant unique 
        picture : imgInput.src == undefined ? "OIP.jpeg" : imgInput.src,
        fNameVal : fName.value,
        lNameVal : lName.value,
        ageVal : age.value,
        villeVal : ville.value,
        positionVal : position.value,
        salaireVal : salaire.value,
        dateVal : date.value,
        emailVal : email.value
    }

    if(!estEdit){
        //Ajout d'element dans originalData si estEdit est true
        originalData.unshift(information)
    }
    else {
        // Mise a jour des information car elle existe deja 
        originalData[editId] = information
    }

    obtenirData = [...originalData];
    localStorage.setItem('userProfile', JSON.stringify(originalData))/*Les données sont maintenant stockées sous la clé 'userProfile'
    dans le localStorage en les transformant en chaine de caractere */

    submitBtn.innerHTML = "Soumettre";
    modelTitre.innerHTML = "Remplir le formulaire";
    darkBg.classList.remove('active');
    surgirForm.classList.remove('active');
    form.reset();

    brillanceBtn();
    displayIndesBtn();
    AfficheInfo();

    let suivBtn = document.querySelector('.suiv');
    let precBtn = document.querySelector('.prec');
    if(Math.floor(maxIndex) > actuelIndex){ //convertir maxIndex si ce n'est pas un entier 
        //Si elle est superieux a la page actuel possibilité d'aller a la page suivante
        suivBtn.classList.add('act')
    }
    else{
        suivBtn.classList.remove('act');
    }

    if(actuelIndex > 1){ // si page actuel est superieur a 1 possibilité d'aler a la page precedente
        precBtn.classList.add(act);
    }
});

//Validation en temps réel
email.addEventListener('input', () => {
    const error = validateEmail(email.value);
    email.setCustomValidity(error || '');
});

age.addEventListener('input', () => {
    const error = validateAge(age.value);
    age.setCustomValidity(error || '');
});


//fonction pour aller a la page suivante
function suiv(){
    let precBtn = document.querySelector('.prec');
    let suivBtn = document.querySelector('.suiv');

    if(actuelIndex <= maxIndex - 1){
        // peut passer à la page suivante tant que l'index actuel n'a pas atteint l'avant-dernière page 
        actuelIndex++;
        precBtn.classList.add('act');// bouton prec cliquable a partir de la page 2
        brillanceBtn();
    }

    if(actuelIndex > maxIndex - 1){
        suivBtn.classList.remove("act")
        brillanceBtn();
    }
};

//fonction pour aller a la page precedente
function prec(){
    let precBtn = document.querySelector('.prec');

    if(actuelIndex > 1){
        actuelIndex--;
        precBtn.classList.add('act');
        brillanceBtn();
    }

    if(actuelIndex < 2){// si page actuel est inferieur a 2 donc page 1
        precBtn.classList.remove('act');
    }
};


function paginationBtn(i) {
    actuelIndex = i;

    let precBtn = document.querySelector('.prec');
    let suivBtn = document.querySelector('.suiv');
    brillanceBtn();
    
    if(actuelIndex > maxIndex - 1) {
        suivBtn.classList.remove('act');
    }
    else {
        suivBtn.classList.add('act');
    }

    if(actuelIndex > 1){
        precBtn.classList.add('act');
    }

    if(actuelIndex < 2){
        precBtn.classList.remove('act');
    }
}

//Cet événement écoute les changements dans un élément select
tailleTableau.addEventListener('change', () => {
    let selectValue = parseInt(tailleTableau.value);// convertir la valeur en nbre entier
    tailleTable = selectValue;
    actuelIndex = 1;//pagination recommence à la première page après chaque changement du nombre d'éléments par page
    departIndex = 1;//gérer l'index du premier élément à afficher
    displayIndesBtn()
});

//écouteur d'événement au champ de recherche
filtreData.addEventListener('input', () => {
    //Récupération de la valeur entrée
    const rechercheTerme = filtreData.value.toLowerCase().trim();

    if(rechercheTerme !== ""){ // Si le champs n'est pas vide le bloc de code s'exécute

        // Filtrage des données
        const filtre = originalData.filter((item) => { // Parcourt chaque élément du tableau originalData
            const nomComplet = (item.fNameVal + " "+ item.lNameVal).toLowerCase();
            const ville = item.villeVal.toLowerCase();
            const position = item.positionVal.toLowerCase();

            return(
                nomComplet.includes(rechercheTerme) || 
                ville.includes(rechercheTerme) || 
                position.includes(rechercheTerme)
            )
        })

        //Mise a jour des données actuel avec les donnée filter
        obtenirData = filtre;
    } 
    else {
        //On récupère les données originales depuis le stockage local (localStorage)
        //  sous la clé userProfil si le champ de recherche est vide 
        obtenirData = JSON.parse(localStorage.getItem('userProfile')) || []
    }

    //Réinitialisation des index
    actuelIndex = 1;
    departIndex = 1;
    displayIndesBtn();
});

displayIndesBtn()