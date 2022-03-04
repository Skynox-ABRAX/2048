
//#region "initialisation"



/**
 * objet stockant la valeur des positions en cours
 */

var position = {};
var currentElement = null;
var gameOver = {};
var emptyPosition=[];



const HAUT = 'HAUT';
const BAS = 'BAS';
const GAUCHE = 'GAUCHE';
const DROITE = 'DROITE';

const gap = 15;
const width = 107;
const height = 107;

//#endregion





document.addEventListener('DOMContentLoaded', function() {
    NewGame();
 }, false);




window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


window.addEventListener('keydown', logKey);


/**
 * fonction permettant de bloquer la duree entre deux click minimale
 */


var lastClicked = 0;

function onClickCheck() {
    var timeNow = (new Date()).getTime();

    if (timeNow > (lastClicked + 300)) {
        lastClicked = timeNow;
        return 0;
    }
    else {
       
        lastClicked = timeNow;
        return -1;
    }


}

/**
 * fonction permettant de recuperer la touche sur laquelle elle a été frappé
 * @param {}  e
 */

function logKey(e)
{
    e = e || window.event;

    if (onClickCheck() == 0 && emptyPosition.length > 0) {
        
        let checkActionButton = false;

                switch (e.keyCode) {

                    // HAUT
                    case 38:

                        checkActionButton = true;
                        moveUp();

            
                        break;

                    // BAS
                    case 40:

                        checkActionButton = true;
                        moveDown();

                        break;


                    //gauche
                    case 37:

                        checkActionButton = true;
                        moveLeft();

                        break;

                    
                    case 39:

                        checkActionButton = true;
                        moveRight();

                        break;
                
                }

            
        if (checkActionButton) {
            
        
                setTimeout(() =>
                {
                    generateItem(1, getEmptyPosition());
                    checkIfGameOver();

                    
                }, 200);
            }

}

}

//#endregion

function NewGame()
{

    gameOver = document.getElementsByClassName('gameOver')[0];
    gameOver.style.opacity = 0;
    
    initPosition();
    

    eraseGridTiles();

    generateItem(1, getEmptyPosition());
    generateItem(1, getEmptyPosition());


    resetCompteur();


}

/**
 * fonction permettant d'initialiser les positions
 */

function initPosition()
{
    


    position.position11 = {top: 15, left: 15, valeur: 0, adjacentPosition: ['position21', 'position12']};
    position.position12 = {top: 15, left: 137, valeur: 0, adjacentPosition: ['position13']};
    position.position13 = {top: 15, left: 259, valeur: 0};
    position.position14 = {top: 15, left: 381, valeur: 0, adjacentPosition: ['position13', 'position24']};
    
    
    position.position21 = {top: 137, left: 15, valeur: 0, adjacentPosition: ['position31']};
    position.position22 = {top: 137, left: 137, valeur: 0, adjacentPosition: ['position12', 'position21', 'position23', 'position32']};
    position.position23 = {top: 137, left: 259, valeur: 0, adjacentPosition: ['position24', 'position13']};
    position.position24 = {top: 137, left: 381, valeur: 0};
    
    position.position31 = {top: 259, left: 15, valeur: 0};
    position.position32 = {top: 259, left: 137, valeur: 0, adjacentPosition: ['position31', 'position42']};
    position.position33 = {top: 259, left: 259, valeur: 0, adjacentPosition: ['position32', 'position23', 'position43', 'position34']};
    position.position34 = {top: 259, left: 381, valeur: 0, adjacentPosition: ['position24']};
    
    
    position.position41 = {top: 381, left: 15, valeur: 0, adjacentPosition: ['position31', 'position42']};
    position.position42 = {top: 381, left: 137, valeur: 0, adjacentPosition: ['position43']};
    position.position43 = {top: 381, left: 259, valeur: 0};
    position.position44 = {top: 381, left: 381, valeur: 0, adjacentPosition: ['position34', 'position43']};


}


/**
 * fonction permettan de tester si le game est over
  */

function checkIfGameOver(){



    let gameOver = true;

    for (const key in position) {
                
        

        
        if (Object.hasOwnProperty.call(position, key)) {
                    const element = position[key];

                        if (element.adjacentPosition != undefined) {
                            
                                  
                          
                            for (const iterator of element.adjacentPosition) {

                      
                                     
                                if (position[iterator].valeur == element.valeur || position[iterator].valeur == 0 || element.valeur == 0) {
                                        
                        
                                    //console.log("element valeur  " + element.valeur);
                                    //console.log('positon iterator' + position[iterator].valeur);

                                    gameOver = false;
                                
                       

                                    }

                            }

                        }
                    
                }
         }

         
    

    
    if (gameOver == true) {

        setTimeout(() =>
        {

            gameOver = document.getElementsByClassName('gameOver')[0];
            gameOver.style.opacity = 1;

        }, 600)

    }


}



/**
 * fonction nettoyant toutes les tuiles de la grille
 */

function eraseGridTiles(){


    let tiles = document.getElementsByClassName('container-grid--item');

    while(tiles[0]) {
        tiles[0].parentNode.removeChild(tiles[0]);
    
    }
    


}



/**
 * 
 */

function resetCompteur()
{
    let compteurCourant = document.getElementsByClassName("container-compteur--valeur")[0]
    let compteurMeilleur = document.getElementsByClassName("container-meilleur--valeur")[0]
    compteurCourant.innerHTML = '0';


}

/**
 * fonction permettant de generer les items au fur et à mesure
 * @param {*} n 
 */

function generateItem(n, positions)
{


    for (let index = 0; index < n; index++) {


        let element = document.createElement('div');
        let grid = document.getElementById("grid");

        
        
        
        const pickPosition = randomInteger(0, positions.length - 1);
        
        element.classList.add('container-grid--item');
        element.setAttribute("data-position", positions[pickPosition]);
        element.setAttribute("data-valeur", 2);    
        element.style.top = position[positions[pickPosition]].top  + 'px';
        element.style.left = position[positions[pickPosition]].left + 'px';
        element.textContent = element.getAttribute("data-valeur");
        element.classList.add('value-2');
        
        grid.appendChild(element);
        
        

        element.classList.add('IsAppear');
        setTimeout(() => {
            element.classList.toggle('IsAppear');
        }, 400);



        position[positions[pickPosition]].valeur = parseInt(element.textContent,10);
        
    }

}

//#endregion

/**
 * fonction permettant de picker au hasard une position parmi les positions vides
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * fonction permettant de recuperer les position vides pour pouvoir creer
 * une nouvelle tuiles
 * 
 * @returns 
 */


function getEmptyPosition()
{
    emptyPosition=[];

    for (const key in position) {
        if (Object.hasOwnProperty.call(position, key) && position[key].valeur == 0) {
            const element = key;
            emptyPosition.push(element);
      
        }
    }


    return emptyPosition;

}







/**
 * fonction permettant de calculer les deplacements des tuiles
 * @param {*} direction 
 */





        

// //#endregion





function moveUp(){


    let blockPosition1 = false;
    let blockPosition2 = false;
    let colonne = 0;
    let ligne = 0;



    for (colonne = 1; colonne < 5; colonne++) {

        blockPosition1 = false;
        blockPosition2 = false;
 

            for (ligne = 1; ligne < 5; ligne++) {
        

                let valeurPosition1 = 0;
                let valeurPosition2 = 0;
                let valeurPosition3 = 0;
                let valeurCurrentPosition2 = 0;
                let valeurCurrentPosition3 = 0;
                let valeurCurrentPosition4 = 0;
                let deleted = false;

                switch (ligne) {


                    //1er cas gestion de la premiere colonne

                    //position 11, 21, 31, 41


                    case 1:
                
                        //position 11-pas de mouvement
                
                        break;

                    //position 12


                    //#region 12

                    case 2:

                        valeurPosition1 = getValueFromPosition(ligne - 1, colonne)
                      valeurCurrentPosition2 = getValueFromPosition(ligne, colonne);



                        if(valeurCurrentPosition2 == 0){
                            break;
                        }


                        
                        if (valeurCurrentPosition2 == valeurPosition1) {
            
                            
                           blockPosition1 = true;
                            deleted = true;

                        // }

                        updateValuePosition(ligne, colonne, ligne-1, colonne, valeurCurrentPosition2);

                        moveElement(ligne, colonne, ligne - 1, colonne, deleted);
                            

                        } 
                        
                         else if (valeurPosition1 == 0 ) {

                        updateValuePosition(ligne, colonne, ligne-1, colonne, valeurCurrentPosition2);

                        moveElement(ligne, colonne, ligne - 1, colonne, deleted);
                
                         }
                        break;







//#endregion


//#region 13



                    


                    //position 13
                    case 3:
                

                        valeurPosition1 = getValueFromPosition(ligne - 2, colonne);
                        valeurPosition2 = getValueFromPosition(ligne - 1, colonne);
                        valeurCurrentPosition3 = getValueFromPosition(ligne, colonne);



                        if (valeurCurrentPosition3 == 0) {
                            break;
                        }

                        if (valeurPosition1 == 0 && valeurPosition2 == 0) {



                            updateValuePosition(ligne, colonne, ligne - 2, colonne, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne - 2, colonne, deleted);
                     

                            break;
                            
                    
                        } else if (valeurPosition1 == valeurCurrentPosition3 && valeurPosition2 == 0 && blockPosition1 != true) {
                    
         

                            blockPosition1 = true;
                            deleted = true;

                            updateValuePosition(ligne, colonne, ligne - 2, colonne, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne - 2, colonne, deleted);
  

                            break;

                        } else if (valeurPosition2 == 0) {
                    
       

                            updateValuePosition(ligne, colonne, ligne - 1, colonne, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne - 1, colonne, deleted);

                            break;
                        }
                        
                        
                        else if (valeurPosition2 == valeurCurrentPosition3) {
                    
       


                            blockPosition2 = true;
                            deleted = true;


                            updateValuePosition(ligne, colonne, ligne - 1, colonne, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne - 1, colonne, deleted);

                            break;
                        }

                        break;
       //#endregion     


       //#region 14
                
                    //position 14
            
                    case 4:
                
                
                
                        valeurPosition1 = getValueFromPosition(ligne - 3, colonne);
                        valeurPosition2 = getValueFromPosition(ligne - 2, colonne);
                        valeurPosition3 = getValueFromPosition(ligne - 1, colonne);
                        valeurCurrentPosition4 = getValueFromPosition(ligne, colonne);
                


                        if(valeurCurrentPosition4 == 0){
                            break;
                        }



                        if (valeurPosition1 == 0 && valeurPosition2 == 0 && valeurPosition3 == 0 ) {

 



                            updateValuePosition(ligne, colonne, ligne-3, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne - 3, colonne, deleted);

                            break;
                    
                        } else if (valeurPosition1 == valeurCurrentPosition4 && valeurPosition2 == 0 && valeurPosition3 == 0 && blockPosition1 != true ) {
                    


                            blockPosition1 = true;
                            deleted = true;

                            
                            updateValuePosition(ligne, colonne, ligne-3, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne - 3, colonne, deleted);


                            break;

                        } else if (valeurPosition2 == 0 && valeurPosition3 == 0) {
                    




                            updateValuePosition(ligne, colonne, ligne-2, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne - 2, colonne, deleted);


                            break;
                        }
                        else if (valeurPosition2 == valeurCurrentPosition4 && valeurPosition3 == 0 && blockPosition2 != true ) {
                    
  

                            deleted = true;
                            blockPosition2 = true;

                            updateValuePosition(ligne, colonne, ligne-2, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne - 2, colonne, deleted);

                            break;

                        } else if (valeurPosition3 == valeurCurrentPosition4) {
                    
 

                            deleted = true;

                            updateValuePosition(ligne, colonne, ligne-1, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne - 1, colonne, deleted);


                            break;

                    
                    
                        } else if (valeurPosition3 == 0) {
                    
           


                            updateValuePosition(ligne, colonne, ligne - 1, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne - 1, colonne, deleted);

                            break;

                        }

                        break;
          //#endregion  
                
                }
                

            }

            

                
            }
}


function moveDown(){




    let blockPosition1 = false;
    let blockPosition2 = false;
    let colonne = 0;
    let ligne = 0;



    for (colonne = 1; colonne < 5; colonne++) {

        blockPosition1 = false;
        blockPosition2 = false;
 



            for (ligne = 4; ligne > 0; ligne--) {
        


                let valeurPosition1 = 0;
                let valeurPosition2 = 0;
                let valeurPosition3 = 0;
                let valeurCurrentPosition2 = 0;
                let valeurCurrentPosition3 = 0;
                let valeurCurrentPosition4 = 0;
                let deleted = false;

                switch (ligne) {


                    //1er cas gestion de la premiere colonne

                    //position 11, 21, 31, 41


                    case 4:
                
                        //position 11-pas de mouvement
                
                        break;

                    //position 12


                    //#region 12

                    case 3:

                    valeurPosition1 = getValueFromPosition(ligne + 1, colonne)
                      valeurCurrentPosition2 = getValueFromPosition(ligne, colonne);



                        if(valeurCurrentPosition2 == 0){
                            break;
                        }


                        
                        if (valeurCurrentPosition2 == valeurPosition1) {
            
                            


                            blockPosition1 = true;
                            deleted = true;

              

                        updateValuePosition(ligne, colonne, ligne + 1, colonne, valeurCurrentPosition2);

                        moveElement(ligne, colonne, ligne + 1, colonne, deleted);
                            

                        } 
                        
                         else if (valeurPosition1 == 0 ) {

                        updateValuePosition(ligne, colonne, ligne + 1, colonne, valeurCurrentPosition2);

                        moveElement(ligne, colonne, ligne + 1, colonne, deleted);
                
                         }
                        break;







//#endregion


//#region 13



                    


                    //position 13
                    case 2:
                

                        valeurPosition1 = getValueFromPosition(ligne + 2, colonne);
                        valeurPosition2 = getValueFromPosition(ligne + 1, colonne);
                        valeurCurrentPosition3 = getValueFromPosition(ligne, colonne);


                             if (valeurCurrentPosition3 == 0) {
                            break;
                        }

                        if (valeurPosition1 == 0 && valeurPosition2 == 0) {

 


                            updateValuePosition(ligne, colonne, ligne + 2, colonne, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne + 2, colonne, deleted);
                     

                            break;
                            
                    
                        } else if (valeurPosition1 == valeurCurrentPosition3 && valeurPosition2 == 0 && blockPosition1 != true) {
                    
        

                            blockPosition1 = true;
                            deleted = true;

                            updateValuePosition(ligne, colonne, ligne + 2, colonne, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne + 2, colonne, deleted);
  

                            break;

                        } else if (valeurPosition2 == 0) {
                    
             

                            updateValuePosition(ligne, colonne, ligne + 1, colonne, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne + 1, colonne, deleted);

                            break;
                        }
                        
                        
                        else if (valeurPosition2 == valeurCurrentPosition3) {
                    
     

                            blockPosition2 = true;
                            deleted = true;


                            updateValuePosition(ligne, colonne, ligne + 1, colonne, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne + 1, colonne, deleted);

                            break;
                        }

                        break;
       //#endregion     


       //#region 14
                
                    //position 14
            
                    case 1:
                
                
                
                        valeurPosition1 = getValueFromPosition(ligne + 3, colonne);
                        valeurPosition2 = getValueFromPosition(ligne + 2, colonne);
                        valeurPosition3 = getValueFromPosition(ligne + 1, colonne);
                        valeurCurrentPosition4 = getValueFromPosition(ligne, colonne);

                        

                        if(valeurCurrentPosition4 == 0){
                            break;
                        }



                        if (valeurPosition1 == 0 && valeurPosition2 == 0 && valeurPosition3 == 0 ) {

     


                            updateValuePosition(ligne, colonne, ligne + 3, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne + 3, colonne, deleted);

                            break;
                    
                        } else if (valeurPosition1 == valeurCurrentPosition4 && valeurPosition2 == 0 && valeurPosition3 == 0 && blockPosition1 != true ) {
                    
                    

                            blockPosition1 = true;
                            deleted = true;

                            
                            updateValuePosition(ligne, colonne, ligne + 3, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne + 3, colonne, deleted);


                            break;

                        } else if (valeurPosition2 == 0 && valeurPosition3 == 0) {
                    
                   

                            updateValuePosition(ligne, colonne, ligne + 2, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne + 2, colonne, deleted);


                            break;
                        }
                        else if (valeurPosition2 == valeurCurrentPosition4 && valeurPosition3 == 0 && blockPosition2 != true ) {
                    
       

                            deleted = true;
                            blockPosition2 = true;

                            updateValuePosition(ligne, colonne, ligne + 2, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne + 2, colonne, deleted);

                            break;

                        } else if (valeurPosition3 == valeurCurrentPosition4) {
                    
               

                            deleted = true;

                            updateValuePosition(ligne, colonne, ligne + 1, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne + 1, colonne, deleted);


                            break;

                    
                    
                        } else if (valeurPosition3 == 0) {
                    
                


                            updateValuePosition(ligne, colonne, ligne + 1, colonne, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne + 1, colonne, deleted);

                            break;

                        }

                        break;
          //#endregion  
                
                }
                

            }

            

                
            }
}






function moveLeft(){




    let blockPosition1 = false;
    let blockPosition2 = false;
    let colonne = 0;
    let ligne = 0;



    for (ligne = 1; ligne < 5; ligne++) {

        blockPosition1 = false;
        blockPosition2 = false;
 



            for (colonne = 0; colonne < 5; colonne++) {
        


                let valeurPosition1 = 0;
                let valeurPosition2 = 0;
                let valeurPosition3 = 0;
                let valeurCurrentPosition2 = 0;
                let valeurCurrentPosition3 = 0;
                let valeurCurrentPosition4 = 0;
                let deleted = false;

                switch (colonne) {


                    //1er cas gestion de la premiere colonne

                    //position 11, 21, 31, 41


                    case 1:
                
                        //position 11-pas de mouvement
                
                        break;

                    //position 12


                    //#region 12

                    case 2:

                    valeurPosition1 = getValueFromPosition(ligne, colonne - 1)
                      valeurCurrentPosition2 = getValueFromPosition(ligne, colonne);



                        if(valeurCurrentPosition2 == 0){
                            break;
                        }


                        
                        if (valeurCurrentPosition2 == valeurPosition1) {
            
                            
                 

                            blockPosition1 = true;
                            deleted = true;

                        // }

                        updateValuePosition(ligne, colonne, ligne , colonne - 1, valeurCurrentPosition2);

                        moveElement(ligne, colonne, ligne , colonne - 1, deleted);
                            

                        } 
                        
                         else if (valeurPosition1 == 0 ) {

                        updateValuePosition(ligne, colonne, ligne, colonne - 1, valeurCurrentPosition2);

                        moveElement(ligne, colonne, ligne, colonne - 1, deleted);
                
                         }
                        break;







//#endregion


//#region 13



                    


                    //position 13
                    case 3:
                

                        valeurPosition1 = getValueFromPosition(ligne, colonne - 2);
                        valeurPosition2 = getValueFromPosition(ligne, colonne - 1);
                        valeurCurrentPosition3 = getValueFromPosition(ligne, colonne);


                        if (valeurCurrentPosition3 == 0) {
                            break;
                        }



                        if (valeurPosition1 == 0 && valeurPosition2 == 0) {

               

                            updateValuePosition(ligne, colonne, ligne, colonne - 2, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne, colonne - 2, deleted);
                     

                            break;
                            
                    
                        } else if (valeurPosition1 == valeurCurrentPosition3 && valeurPosition2 == 0 && blockPosition1 != true) {
                    


                            blockPosition1 = true;
                            deleted = true;

                            updateValuePosition(ligne, colonne, ligne, colonne - 2, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne, colonne - 2, deleted);
  

                            break;

                        } else if (valeurPosition2 == 0) {
                    
           

                            updateValuePosition(ligne, colonne, ligne, colonne - 1, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne, colonne - 1, deleted);

                            break;
                        }
                        
                        
                        else if (valeurPosition2 == valeurCurrentPosition3) {
                    



                            blockPosition2 = true;
                            deleted = true;


                            updateValuePosition(ligne, colonne, ligne, colonne - 1, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne, colonne - 1, deleted);

                            break;
                        }

                        break;
       //#endregion     


       //#region 14
                
                    //position 14
            
                    case 4:
                
                
                
                        valeurPosition1 = getValueFromPosition(ligne, colonne - 3);
                        valeurPosition2 = getValueFromPosition(ligne, colonne - 2);
                        valeurPosition3 = getValueFromPosition(ligne, colonne - 1);
                        valeurCurrentPosition4 = getValueFromPosition(ligne, colonne);
                


                        if(valeurCurrentPosition4 == 0){
                            break;
                        }



                        if (valeurPosition1 == 0 && valeurPosition2 == 0 && valeurPosition3 == 0 ) {

                   



                            updateValuePosition(ligne, colonne, ligne, colonne - 3, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne - 3, deleted);

                            break;
                    
                        } else if (valeurPosition1 == valeurCurrentPosition4 && valeurPosition2 == 0 && valeurPosition3 == 0 && blockPosition1 != true ) {
                    
                    

                            blockPosition1 = true;
                            deleted = true;

                            
                            updateValuePosition(ligne, colonne, ligne, colonne - 3, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne - 3, deleted);


                            break;

                        } else if (valeurPosition2 == 0 && valeurPosition3 == 0) {
                    
                   



                            updateValuePosition(ligne, colonne, ligne, colonne - 2, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne - 2, deleted);


                            break;
                        }
                        else if (valeurPosition2 == valeurCurrentPosition4 && valeurPosition3 == 0 && blockPosition2 != true ) {
                    
           

                            deleted = true;
                            blockPosition2 = true;

                            updateValuePosition(ligne, colonne, ligne, colonne - 2, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne - 2, deleted);

                            break;

                        } else if (valeurPosition3 == valeurCurrentPosition4) {
                    
              

                            deleted = true;

                            updateValuePosition(ligne, colonne, ligne, colonne - 1, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne - 1, deleted);


                            break;

                    
                    
                        } else if (valeurPosition3 == 0) {
                    
             

                            updateValuePosition(ligne, colonne, ligne, colonne - 1, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne - 1, deleted);

                            break;

                        }

                        break;
          //#endregion  
                
                }
                

            }

            

                
            }
}





function moveRight(){




    let blockPosition1 = false;
    let blockPosition2 = false;
    let colonne = 0;
    let ligne = 0;



    for (ligne = 1; ligne < 5; ligne++) {

        blockPosition1 = false;
        blockPosition2 = false;
 



            for (colonne = 4; colonne > 0; colonne--) {
        
  

                let valeurPosition1 = 0;
                let valeurPosition2 = 0;
                let valeurPosition3 = 0;
                let valeurCurrentPosition2 = 0;
                let valeurCurrentPosition3 = 0;
                let valeurCurrentPosition4 = 0;
                let deleted = false;

                switch (colonne) {


                    //1er cas gestion de la premiere colonne

                    //position 11, 21, 31, 41


                    case 4:
                
                        //position 11-pas de mouvement
                
                        break;

                    //position 12


                    //#region 12

                    case 3:

                    valeurPosition1 = getValueFromPosition(ligne, colonne + 1)
                      valeurCurrentPosition2 = getValueFromPosition(ligne, colonne);



                        if(valeurCurrentPosition2 == 0){
                            break;
                        }


                        
                        if (valeurCurrentPosition2 == valeurPosition1) {
            
                            
     

                            blockPosition1 = true;
                            deleted = true;

                        // }

                        updateValuePosition(ligne, colonne, ligne , colonne + 1, valeurCurrentPosition2);

                        moveElement(ligne, colonne, ligne , colonne + 1, deleted);
                            

                        } 
                        
                         else if (valeurPosition1 == 0 ) {

                        updateValuePosition(ligne, colonne, ligne, colonne + 1, valeurCurrentPosition2);

                        moveElement(ligne, colonne, ligne, colonne + 1, deleted);
                
                         }
                        break;







//#endregion


//#region 13



                    


                    //position 13
                    case 2:
                

                        valeurPosition1 = getValueFromPosition(ligne, colonne + 2);
                        valeurPosition2 = getValueFromPosition(ligne, colonne + 1);
                        valeurCurrentPosition3 = getValueFromPosition(ligne, colonne);


                        if (valeurCurrentPosition3 == 0) {
                            break;
                        }



                        if (valeurPosition1 == 0 && valeurPosition2 == 0) {

        
                            updateValuePosition(ligne, colonne, ligne, colonne + 2, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne, colonne + 2, deleted);
                     

                            break;
                            
                    
                        } else if (valeurPosition1 == valeurCurrentPosition3 && valeurPosition2 == 0 && blockPosition1 != true) {
                    
 
                            blockPosition1 = true;
                            deleted = true;

                            updateValuePosition(ligne, colonne, ligne, colonne + 2, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne, colonne + 2, deleted);
  

                            break;

                        } else if (valeurPosition2 == 0) {
                    
       

                            updateValuePosition(ligne, colonne, ligne, colonne + 1, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne, colonne + 1, deleted);

                            break;
                        }
                        
                        
                        else if (valeurPosition2 == valeurCurrentPosition3) {
                    
                            blockPosition2 = true;
                            deleted = true;


                            updateValuePosition(ligne, colonne, ligne, colonne + 1, valeurCurrentPosition3);
                            moveElement(ligne, colonne, ligne, colonne + 1, deleted);

                            break;
                        }

                        break;
       //#endregion     


       //#region 14
                
                    //position 14
            
                    case 1:
                
                
                
                        valeurPosition1 = getValueFromPosition(ligne, colonne + 3);
                        valeurPosition2 = getValueFromPosition(ligne, colonne + 2);
                        valeurPosition3 = getValueFromPosition(ligne, colonne + 1);
                        valeurCurrentPosition4 = getValueFromPosition(ligne, colonne);
                


                        if(valeurCurrentPosition4 == 0){
                            break;
                        }



                        if (valeurPosition1 == 0 && valeurPosition2 == 0 && valeurPosition3 == 0 ) {




                            updateValuePosition(ligne, colonne, ligne, colonne + 3, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne + 3, deleted);

                            break;
                    
                        } else if (valeurPosition1 == valeurCurrentPosition4 && valeurPosition2 == 0 && valeurPosition3 == 0 && blockPosition1 != true ) {
                    
                 

                            blockPosition1 = true;
                            deleted = true;

                            
                            updateValuePosition(ligne, colonne, ligne, colonne + 3, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne + 3, deleted);


                            break;

                        } else if (valeurPosition2 == 0 && valeurPosition3 == 0) {
                    
              



                            updateValuePosition(ligne, colonne, ligne, colonne + 2, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne + 2, deleted);


                            break;
                        }
                        else if (valeurPosition2 == valeurCurrentPosition4 && valeurPosition3 == 0 && blockPosition2 != true ) {
                    
                 

                            deleted = true;
                            blockPosition2 = true;

                            updateValuePosition(ligne, colonne, ligne, colonne + 2, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne + 2, deleted);

                            break;

                        } else if (valeurPosition3 == valeurCurrentPosition4) {
                    
                

                            deleted = true;

                            updateValuePosition(ligne, colonne, ligne, colonne + 1, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne + 1, deleted);


                            break;

                    
                    
                        } else if (valeurPosition3 == 0) {
                    
                 


                            updateValuePosition(ligne, colonne, ligne, colonne + 1, valeurCurrentPosition4);

                            moveElement(ligne, colonne, ligne, colonne + 1, deleted);

                            break;

                        }

                        break;
          //#endregion  
                
                }
                

            }

            

                
            }
}






/**
 * fonction permettant d'actualiser le tableau des valeurs des tuiles en fonction du deplacement effectué
 * @param {*} fromRow 
 * @param {*} fromColumn 
 * @param {*} destRow 
 * @param {*} destColumn 
 * @param {*} addedValue 
 */


function updateValuePosition(fromRow, fromColumn, destRow, destColumn, addedValue){


    position[generateKeyPosition(destRow, destColumn)].valeur += addedValue;
    position[generateKeyPosition(fromRow, fromColumn)].valeur = 0;

}



/**
 * fonction permettant de recuperer la valeur de la tuile à partir de la valeur de la cle position dans le tableau position
 * @param {*} row 
 * @param {*} column 
 * @returns 
 */


function getValueFromPosition(row, column){

     return position[generateKeyPosition(row, column)].valeur;


}




function getElementFromRowAndCol(row, col){

    let tile = document.querySelector('[data-position="position' + row + col + '"]');

   return tile;


}



/**
 * fonction permettant de creer le libelle de la position 
 * à aprtir de la ligne et de la colonne correspondant à l'objet posiion
 * @param {*} row 
 * @param {*} col 
 * @returns 
 */

 function generateKeyPosition(row, col)
 {
     return "position" + row + col;
 
 }



/**
 * fonction permettant de recuperer la valeur de data-attribute en fonction de la ligne colonne
 * @param {*} row 
 * @param {*} column 
 * @returns 
 */


function getDataAttributeFromPosition(row, column){


   let tile = document.querySelector('[data-position="position' + row + column + '"]');

    return tile.getAttribute('data-position');


}



/**
 * fonction permettant d'actualiser la valeur de l'attribut data-position
 */

function updateDataPosition(element, fromRow, fromColumn, destRow, destColumn)
{
    
    let tile = document.querySelector('[data-position="position' + fromRow + fromColumn + '"]');

    tile.setAttribute('data-position', 'position' + destRow + destColumn);

    return tile;

}



 /**
  * fonction permettant de supprimer de la grille l'element souhaité
  * @param {*} element 
  */

function deleteElement(element){

    try {

        element.remove();

    } catch (error) {
        
        console.log("l'element suivant n'a pas pu être supprimer");
        console.log(element);
    }

}


/**
 * fonction permettant de modifier la valeur du data position suite au deplacement.
 * @param {*} element 
 * @param {*} newValue 
 */


function changeDataAttribute(element, newValue){

    element.setAttribute("data-position", newValue);


}


/**
 * fonction permettant de modifier top et left de l'element
 * @param {*} element 
 * @param {*} destRow 
 * @param {*} destColumn 
 */


function moveTile(element, destRow, destColumn){



    let top = position['position' + destRow + destColumn].top + 'px';
    let left = position['position' + destRow + destColumn].left + 'px';


    element.style.top = top;
    element.style.left = left;


}



/**
 * fonction permettant de modifier le zindex quand il a une superposition
 * @param {*} element 
 * @returns 
 */


function toggleZindex(element){


    if (element.style.zIndex == 2) {
        return     element.style.zIndex = 0;
    }

    return element.style.zIndex = 2;


}









/**
 * fonction permettant de generer le deplacement de la tuile
 * 
 * @param {*} fromRow 
 * @param {*} fromColumn 
 * @param {*} destRow 
 * @param {*} destColumn 
 * @param {*} deleted 
 */



 function moveElement(fromRow, fromColumn, destRow, destColumn, deleted)
 {

    let del = getElementFromRowAndCol(destRow, destColumn);
      let el = getElementFromRowAndCol(fromRow, fromColumn); 
     

     if (deleted) {


         el.classList.add('effect');

         el.addEventListener('animationEnd', function ()
         {
           
           toggleZindex(el);
  

             
         })
     }


     moveTile(el, destRow, destColumn);
     el.textContent = getValueFromPosition(destRow, destColumn);

     if (parseInt(el.textContent) > 1000) {
      
        el.classList.add('value-max');
     }

     



     if (deleted) {

       setTimeout(() =>
          {

              deleteElement(del);

              el.classList.remove('effect');

              let compteurCourant = document.getElementsByClassName("container-compteur--valeur")[0]
              let compteurMeilleur = document.getElementsByClassName("container-meilleur--valeur")[0]
              compteurCourant.innerHTML = parseInt(compteurCourant.innerHTML) + parseInt(el.textContent);
      
      
              if ( parseInt(compteurCourant.innerHTML) >= parseInt(compteurMeilleur.innerHTML)) {
                  compteurMeilleur.innerHTML = compteurCourant.innerHTML;
              }
      

              el.classList.add('value-' + el.textContent);

              el.classList.remove('value-' + parseInt(el.textContent / 2));




         
         }, 300);

     }

     updateDataPosition(el, fromRow, fromColumn, destRow, destColumn);


         
  
 
    
 }
 