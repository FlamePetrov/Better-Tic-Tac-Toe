const X_Class = 'x'
const O_Class = 'o'
const Winning_Combination = [
    //хоризонтали
    [0, 1, 2, 3],
    [4, 5, 6 ,7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    //вертикали
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    //диагонали(ляво-дясно)
    [0, 5, 10, 15],
    [1, 6, 11],[4, 9, 14],
    //диагонали(дясно-ляво)
    [3, 6, 9, 12],
    [2, 5, 8],[7, 10, 13],

    //малки диагонали
    //[1, 4],[2, 7],[8, 13],[11 ,14]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningTextMessage = document.querySelector('[data-winning-message-text]')
let oTurn


startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    oTurn = false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_Class)
        cell.classList.remove(O_Class)
        cell.removeEventListener('click', Clicked)
        //позволява да се натискането на всяка клетка само по 1 път
        cell.addEventListener('click', Clicked, {once: true})
    })
    setBoardHoverClass();
    //премахване на съобщение

    winningMessageElement.classList.remove('show')

}

function Clicked(e){
    const cell = e.target
    const currentClass = oTurn ? O_Class : X_Class
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    } else{
        swapTurns()
        setBoardHoverClass()
    }  
}

function endGame(draw){
    if(draw) {
        winningTextMessage.innerText = 'Draw!'
    } else {
        winningTextMessage.innerText = `${oTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_Class) ||
        cell.classList.contains(O_Class)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    oTurn = !oTurn
}
function setBoardHoverClass(){
    board.classList.remove(X_Class)
    board.classList.remove(O_Class)
    if(oTurn){
        board.classList.add(O_Class)
    } else {
        board.classList.add(X_Class)
    }
}
function checkWin(currentClass){
    //проверка дали има изпълнена комбинация(връща true)
    return Winning_Combination.some(combination =>{
        return combination.every(index => {
            //ако всяка клетка от комбинацията е вярна за една от печеливша комбинация
            return cellElements[index].classList.contains(currentClass)
        })
    })
}