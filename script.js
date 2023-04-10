const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPosition= [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]
];


//create func to initialize the game 
function initGame(){

     currentPlayer = "X";

     //make box empty at our end
     gameGrid=["","","","","","","","",""];
     newGamebtn.classList.remove("active");

     //make box empty on ui
     boxes.forEach((box,index) => {
           box.innerText="";
           boxes[index].style.pointerEvents="all";

           box.classList=`box box-${index+1}`;


     });
     newGamebtn.classList.remove("active");
     gameInfo.innerText =`Current Player: ${currentPlayer}`;
}

initGame();


boxes.forEach((b,index)=>{
     b.addEventListener("click",() => {
          handleClick(index);
         
     });
});


function handleClick(index){
     if(gameGrid[index] === ""){
          gameGrid[index] = currentPlayer;
          boxes[index].innerText = currentPlayer;
          
          boxes[index].style.pointerEvents="none";

          //new game button active 
          newGamebtn.classList.add("active");

          //swap turn
          swapTurn();

          //Has game finished
          checkGameOver();
     }
}

newGamebtn.addEventListener("click", initGame);


function swapTurn(){
     if(currentPlayer === "X"){
          currentPlayer = "O";
     }
     else{
          currentPlayer ="X";
     }

     gameInfo.innerText =`Current Player: ${currentPlayer}`;
}

//check if game is over
function checkGameOver(){

     //who won 'x or O'
    let answer="";

    winningPosition.forEach( (position) => {
     //all 3 boxes shold be non empty and have same value
        if (gameGrid[position[0]] !== "" 
          && (gameGrid[position[1]] === gameGrid[position[0]])
          && (gameGrid[position[2]] === gameGrid[position[1]])){
              
               if(gameGrid[position[1]]=='X'){
                    answer = 'X';
               }
               else{
                    answer = 'O';
               }

               boxes.forEach( (box) => {
                   box.style.pointerEvents="none";
               });

               boxes[position[0]].classList.add("win");
               boxes[position[1]].classList.add("win");
               boxes[position[2]].classList.add("win");

        }
    } );


    if (answer !== ""){
     gameInfo.innerText =`Winner Player: ${answer}`;
     newGamebtn.classList.add("active");
     return;
    }

    let fillCount =0;

    gameGrid.forEach((box) => {
       if( box !== ""){
          fillCount++;
       }
    });

    if (fillCount === 9){
     gameInfo.innerText =`Game Tied !`;
     newGamebtn.classList.add("active");

    }
}
