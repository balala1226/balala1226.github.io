function tictactoeGame()
{
    let gameBoard = ["-","-","-","-","-","-","-","-","-"];
    let currentFillCount = 0;
    let currentSymbol = "O";

    this.isInputValid = function(boardIndex){
        if (gameBoard[boardIndex] != "-")
        {
            return false;
        }

        return true;
    }

    this.setInput = function(boardIndex){
        if (gameBoard[boardIndex] != "-")
        {
            return;
        }

        gameBoard[boardIndex] = currentSymbol;
        currentFillCount ++;
    }

    this.resetGameBoard = function(){
        for(var index = 0; index < gameBoard.length; index++)
        {
            gameBoard[index] = "-";
        }
        currentSymbol = "O";
        currentFillCount = 0;
    }

    this.didPlayerWin = function(){
        if(gameBoard[0] == currentSymbol)
        {
            if(gameBoard[1] == currentSymbol && gameBoard[2] == currentSymbol )
            {
                return true;
            } 

            if(gameBoard[3] == currentSymbol && gameBoard[6] == currentSymbol )
            {
                return true;
            } 
        } 
        if ((gameBoard[4] == currentSymbol))
        {
            if(gameBoard[1] == currentSymbol && gameBoard[7] == currentSymbol )
            {
                return true;
            } 

            if(gameBoard[3] == currentSymbol && gameBoard[5] == currentSymbol )
            {
                return true;
            } 

            if(gameBoard[0] == currentSymbol && gameBoard[8] == currentSymbol )
            {
                return true;
            } 

            if(gameBoard[2] == currentSymbol && gameBoard[6] == currentSymbol )
            {
                return true;
            } 
        }
        if ((gameBoard[8] == currentSymbol))
        {
            if(gameBoard[5] == currentSymbol && gameBoard[2] == currentSymbol )
            {
                return true;
            } 

            if(gameBoard[6] == currentSymbol && gameBoard[7] == currentSymbol )
            {
                return true;
            } 
        }

        return false
    }

    this.changePlayer = function(){
        if (currentSymbol == "X")
        {
            currentSymbol = "O"
        } else 
        {
            currentSymbol = "X"
        }
    }

    this.getCurrentSymbol = function(){
        return currentSymbol;
    }

    this.playerInput = function(index){
        this.setInput(index);
        if (this.didPlayerWin())
        {
            return "win";
        } else if(currentFillCount >= 9)
        {
            return "draw";
        }

        this.changePlayer();
        return "continue";
    }
}

function tictactoeGameViewController()
{
    const gameResultDialog = document.getElementById('gameResultDialog');
    const gameResultDialogText = document.getElementById('gameResultDialogText');
    const gameResetButton = document.getElementById('gameResetButton');

    this.initialize = function(tictactoeGameFunction){     
          
        gameResetButton.addEventListener("click", () => {
            tictactoeGameFunction.resetGameBoard();
            this.resetBoard();
            this.updateCurrentPlayer(gameBoard.getCurrentSymbol());
            gameResultDialog.close();
        });
        
        for(let index = 0; index < 9; index++)
        {
            let elementId = "cell" + index.toString();
            let cell = document.getElementById(elementId);
            let text = cell.querySelector('p');

            if (cell == null)
            {
                console.log("Null cell");
                return;
            }
            
            cell.addEventListener("click", () => {
                if (!tictactoeGameFunction.isInputValid(index)){
                    return;
                }
                var currentSymbol = tictactoeGameFunction.getCurrentSymbol();
                text.innerHTML = currentSymbol;
                var gameStatus = tictactoeGameFunction.playerInput(index);

                if (gameStatus == "win")
                {
                    console.log("Player " + currentSymbol + " Won!");
                    this.showResultDialog("Player " + currentSymbol + " Won!");
                    return;
                } 
                else if (gameStatus == "draw")
                {
                    console.log("Draw");
                    this.showResultDialog("Draw!");
                    return;
                }

                this.updateCurrentPlayer(tictactoeGameFunction.getCurrentSymbol());
            });
        }

        this.updateCurrentPlayer(gameBoard.getCurrentSymbol());
    }

    this.updateCurrentPlayer = function(currentPlayer){
        var player = document.getElementById("player");
        player.innerHTML = "Player " + currentPlayer;
    }

    this.resetBoard = function() {
        for(let index = 0; index < 9; index++)
        {
            let elementId = "cell" + index.toString();
            let cell = document.getElementById(elementId);
            let text = cell.querySelector('p');
            text.innerHTML = "";
        }
    }

    this.showResultDialog = function(textResult) {
        gameResultDialogText.innerHTML = textResult;
        gameResultDialog.showModal();
    }
}

const gameBoard = new tictactoeGame();
const display = new tictactoeGameViewController();

display.initialize(gameBoard);