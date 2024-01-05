(function () {
    const OptionA = document.querySelector("#btn1");
    const OptionB = document.querySelector("#btn2");

    let controls = document.querySelector(".controls");

    let CreatePlayerSection = (choice) => {
        let newEle = document.createElement("div");
        controls.innerHTML = "";
        newEle.innerHTML = `<p><label for="player1Name">X - Player1 Name :</label>
        <input type="text" id="player1Name" required>
        </p>`;
        if (choice === 1) {
            newEle.innerHTML += `<p><label for="player2Name">O - Player2 Name :</label>
            <input type="text" id="player2Name" required>
            </p>`;
        }
        controls.appendChild(newEle);
    }

    OptionA.addEventListener("click", () => {
        CreatePlayerSection(0);
    });

    OptionB.addEventListener("click", () => {
        CreatePlayerSection(1);
    });

    const result = (() => {
        let print = (message) => {
            let msg = document.querySelector(".msg");
            msg.innerHTML = message;
            if (message) {
                msg.style.display = "block";
            }
            else {
                msg.style.display = "none";
            }
        };
        return {
            print
        }
    })();

    const GameBoard = (() => {
        let array = ["", "", "", "", "", "", "", "", ""];
        let rightSide = document.querySelector(".rightSide");

        const display = () => {
            let html = "";
            array.forEach((item, index) => {
                html += `<div class="square" id="square-${index}">${item}</div>`;
            });
            rightSide.innerHTML = html;
            rightSide.style.border = "1px solid black";
            let squares = document.querySelectorAll(".square");
            squares.forEach(square => {
                square.addEventListener("click", Game.handleClick);
            });
        }

        let update = (index, mark) => {
            array[index] = mark;
            display();
        }

        const getArray = () => array;

        return {
            display,
            update,
            getArray
        }
    })();


    const CreatePlayer = (name, mark) => {
        return {
            name,
            mark
        }
    }

    const checkWin = (arr) => {
        const winningComb = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < winningComb.length; i++) {
            let [a, b, c] = winningComb[i];
            if (arr[a] === arr[b] && arr[b] === arr[c] && arr[b]) {
                return true;
            }
        }
        return false;
    };

    const checkTie = (arr) => {
        return arr.every(item => item !== "");
    };
    
    const Game = (() => {

        let players = [];
        let currentPlayerIndex;
        let isGameOver;
        const start = () => {
            if (!document.querySelector("#player1Name") && !document.querySelector("#player2Name")) {
                alert("how do you like to play solo or with friend?\nPlease select an option.");
            }

            if (document.querySelector("#player2Name") == null) {
                players = [CreatePlayer(document.querySelector("#player1Name").value, "X"), CreatePlayer("Computer", "O")];
            }
            else {
                players = [CreatePlayer(document.querySelector("#player1Name").value, "X"), CreatePlayer(document.querySelector("#player2Name").value, "O")];
            }
            currentPlayerIndex = 0;
            isGameOver = false;
            GameBoard.display();
        };

        let handleClick = (event) => {
            if (document.querySelector("#player1Name").value) {
                while (!isGameOver) {
                    index = +(event.target.id).split("-")[1];
                    if (GameBoard.getArray()[index] !== "") { return }
                    GameBoard.update(index, players[currentPlayerIndex].mark);
                    if (checkWin(GameBoard.getArray())) {
                        isGameOver = true;
                        result.print(`${players[currentPlayerIndex].name} won!`);
                        return;
                    }

                    if (checkTie(GameBoard.getArray())) {
                        isGameOver = true;
                        result.print(`It's Tie!`);
                        return;
                    }
                    if (document.querySelector("#player2Name") == null) {
                        let randomNumber = Math.floor(Math.random() * 9);
                        while (GameBoard.getArray()[randomNumber] !== "") {
                            randomNumber = Math.floor(Math.random() * 9);
                        }
                        currentPlayerIndex = (currentPlayerIndex === 0) ? 1 : 0;
                        GameBoard.update(randomNumber, players[currentPlayerIndex].mark);
                        if (checkWin(GameBoard.getArray())) {
                            isGameOver = true;
                            result.print(`${players[currentPlayerIndex].name} won!`);
                            return;
                        }

                        if (checkTie(GameBoard.getArray())) {
                            isGameOver = true;
                            result.print(`It's Tie!`);
                            return;
                        }
                    }
                    currentPlayerIndex = (currentPlayerIndex === 0) ? 1 : 0;
                }
            }
            else {
                alert("Please fill out - Player name");
            }
        };


        const reset = () => {
            for (let i = 0; i < 9; i++) {
                GameBoard.update(i, "");
            }
            result.print("");
            isGameOver = false;
        };

        return {
            start,
            handleClick,
            reset
        }
    })();



    const startBtn = document.querySelector(".start");
    startBtn.addEventListener("click", () => {
        Game.start();
    });


    const resetBtn = document.querySelector(".reset");
    resetBtn.addEventListener("click", () => {
        if (document.querySelector(".square")) {
            Game.reset();
            Game.start();
        }
        else {
            alert("Game haven't started yet");
        }
    });
})();






