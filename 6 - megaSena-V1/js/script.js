var state = {
    board: [],
    currentGame: [],
    savedGame: []
}

function start(){
    createBoard()
    newGame()
}

function createBoard(){
    state.board = []

    for(var i = 1; i <=60; i++){
        state.board.push(i)
    }
}

function newGame(){
    resetGame()
    render()

    console.log(state.currentGame)
}

function render(){
    renderBoard()
    renderButtons()
    renderSavedGame()
}

function renderBoard(){
    var divBoard = document.querySelector('#megasena-board')
    divBoard.innerHTML = ''
    
    var ulNumber = document.createElement('ul')
    ulNumber.classList.add('numbers')
    
    for(var i =0; i < state.board.length; i++){
        var currentNumber = state.board[i]
        
        var liNumber = document.createElement('li')
        liNumber.textContent = currentNumber
        liNumber.classList.add('number')

        liNumber.addEventListener('click', handleNumberClick)

        if (isNumberInGame(currentNumber)){
            liNumber.classList.add('selected-number')
        }

        ulNumber.appendChild(liNumber)
    }

    divBoard.appendChild(ulNumber)
}

function renderButtons(){
    var divButtons = document.querySelector('#megasena-buttons')
    divButtons.innerHTML = ''
    var buttonNewGame = createNewGameButton()
    var buttonRandomGame = createRandomGameButton()
    var buttonSaveGame = createSaveGameButton()

    divButtons.appendChild(buttonNewGame)
    divButtons.appendChild(buttonRandomGame)
    divButtons.appendChild(buttonSaveGame)

}

function createRandomGameButton(){
    var button = document.createElement('button')
    button.textContent = 'Jogo aleatório'

    button.addEventListener('click', randomGame)

    return button
}

function createNewGameButton(){
    var button = document.createElement('button')
    button.textContent = 'Novo Jogo'

    button.addEventListener('click', newGame)

    return button
}

function createSaveGameButton(){
    var button = document.createElement('button')
    button.textContent = 'Salvar Jogo'
    button.disabled = !isGameCompleto()

    button.addEventListener('click', saveGame)

    return button
}

function renderSavedGame(){
    var divSaveGame = document.querySelector('#megasena-saved-games')
    divSaveGame.innerHTML = ''

    if(state.savedGame.length == 0){
        divSaveGame.innerHTML = '<p>Nenhuem jogo salvo</p>'
    }
    else{
        var ulSalvedGame = document.createElement('ul')

        for(var i = 0; i < state.savedGame.length; i++){
            var currentGame = state.savedGame[i]

            var ligame = document.createElement('li')
            ligame.textContent = currentGame.join(', ');
            ulSalvedGame.appendChild(ligame)
        }

        divSaveGame.appendChild(ulSalvedGame)
    }
}

function handleNumberClick(event){
    var value = Number(event.currentTarget.textContent)
    if (isNumberInGame(value)){
        removeNumberFromGame(value)
    }
    else{
        addNumberToGame(value)
    }

    console.log(state.currentGame)
    render()
}

function addNumberToGame(numberToAdd){
    if(numberToAdd < 1 || numberToAdd > 60 ){
        console.error('Número inválido', numberToAdd)
        return
    }
    if (state.currentGame.length >= 6){
        console.error('O Jogo já está completo.')
        return
    }

    if(isNumberInGame(numberToAdd)){
        console.error('Esse número já está no jogo', numberToAdd)
        return
    }
    state.currentGame.push(numberToAdd)
}

function removeNumberFromGame(numberRemove){
    if(numberRemove < 1 || numberRemove > 60 ){
        console.error('Número inválido', numberRemove)
        return
    }
    var newGame = []

    for(var i = 0; i < state.currentGame.length; i++){
        var currentNumber = state.currentGame[i]

        if(currentNumber === numberRemove){
            continue
        }
        newGame.push(currentNumber)
    }
    state.currentGame = newGame
}

function isNumberInGame(numberToCheck){
    // if(state.currentGame.includes(numberToCheck)){
    //     return true
    // }
    return state.currentGame.includes(numberToCheck)
}

function saveGame(){
    if(!isGameCompleto()){
        console.error('O Jogo não está completo')
        return
    }
    state.savedGame.push(state.currentGame)
    newGame()

    console.log(state.savedGame)
}

function isGameCompleto(){
    return state.currentGame.length === 6
}

function resetGame(){
    state.currentGame = []
}

function randomGame(){
    resetGame()

    while(!isGameCompleto()){
        var randomNumber = Math.ceil(Math.random() * 60)
        addNumberToGame(randomNumber)
    }

    console.log(state.currentGame)
    render()
}

start()