/* 
 * Fichier Javascript de l'ECF : ECF_JS_CalculateHtml.js
 * Didier Bonneau
 * Afpa DWWM Créteil maj 29-07-2021
 */
let op1 = '', op2 = '', oper = '';
let resultat = '';
let bou=(op1!=="" && op2!=="" &&oper!=="");


/**
 * fonction appelée sur un click d'un des boutons de la calculate
 * @param {Event} event
 */
function btnClick(event) {
    let touche = event.target.textContent; // récupération du contenu de la balise button cliquée
    
    if(touche === "C"){
        btnClear();
    } else {
        boutons[0].disabled=false;
        
        if(touche==="="){
            resultat=effectuerCalcul(op1,op2,oper);
            op1=resultat;
            op2="";
            oper="";
            resultat="";
            boutons[15].disabled=true;
            
        }
        else{
            if((touche==="+")||(touche==="-")||(touche==="x")||(touche==="/")){
                if(op1!==""){
                oper="";
                oper=""+touche+"";
                }
            }
            else{
                if((resultat==="")||(oper!=="")){
                    if(oper===""){
                        
                        op1=op1+touche;
                    }
                    else{
                        op2=op2+touche;
                    }
                }
            }
        }
    }
    if(op1!=="" && op2!=="" &&oper!==""){
        boutons[15].disabled=false;
    }

    // envoi des 3 variables dans l'input text du resultat
    document.querySelector('input').value = op1 + oper + op2;
}

/**
 * fonction de remise à zéro des 4 variables globales
 * et effacement de l-input résultat
 */
function btnClear() {
    
    document.querySelector("input").value="";
    op1="";
    op2="";
    oper="";
    resultat="";
    boutons[0].disabled=true;
    boutons[15].disabled=true;
}

/**
 * fonction de calcul du résultat
 * @param {Number} operande1
 * @param {Number} operande2
 * @param {String} operateur
 * @returns {Number}
 */
function effectuerCalcul(operande1, operande2, operateur) {

    let resultat = 2;

    switch (operateur){
        
        case "+":
            resultat=Number(operande1)+Number(operande2);
            break;
        case "-":
            resultat=Number(operande1)-Number(operande2);
            break;
        case "x":
            resultat=operande1*operande2;
            break;
        case "/":
        if(operande2==="0"){
            resultat="Erreur";
        }
        else{ 
            resultat=operande1/operande2; 
        }
        break;
               
    }
    
   return resultat;
}

function init() {
    // la balise input pour l'affichage du résultat est dans une div de classe "resultat"
    // chaque balise button est dans une div de classe "bouton"

    // déclaration d'un tableau des codes de touche
    let codeTouches = ['C','','','+','7','8','9','-','4','5','6','x','1','2','3','/','0','','','='];
    // création du html pour l'affichage et les boutons
    let divs = '<div class="resultat"><input type="text" readonly="readonly" value=""/></div>';
    for (let codeTouche of codeTouches) {
        if (codeTouche === '') {    // pas de bouton
            divs += '<div class="bouton"></div>';
        } else {
            divs += '<div class="bouton"><button>'+codeTouche+'</button></div>';   
        }
    }
    // envoi de ce code html dans la div
    document.querySelector('div[class="grid-calculate calculate"]').innerHTML = divs;

    // récupération de tout les boutons pour leur assigner le gestionnaire d'évènement click
    boutons = document.querySelectorAll('button'); 
    for(let bouton of boutons){
        bouton.onclick = btnClick;
    }

    var b=document.getElementsByClassName("grid-calculate calculate").children;
    
}

document.addEventListener('DOMContentLoaded', function(){
    init();
    boutons[0].disabled=true;
    boutons[15].disabled=true;
});