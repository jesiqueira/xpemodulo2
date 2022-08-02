function start(){
    var buttonCalculator  = document.querySelector('#calcular-imc')
    buttonCalculator.addEventListener('click', nomeDaFuncao)

    var inputPeso = document.querySelector('#peso')
    var inputAltura = document.querySelector('#altura')

    inputPeso.addEventListener('input', nomeDaFuncao)
    inputAltura.addEventListener('input', nomeDaFuncao)
    
    nomeDaFuncao()
}

function calcularImc(peso, altura){
    return peso / (altura * altura)
}

function nomeDaFuncao(){
    var inputPeso = document.querySelector('#peso')
    var inputAltura = document.querySelector('#altura')
    var imcResult = document.querySelector('#imc-result')

    var altura = Number(inputAltura.value)
    var peso = Number(inputPeso.value)

    var imc = calcularImc(peso, altura)
    var formatedImc = imc.toFixed(2).replace('.', ',')
    imcResult.textContent = formatedImc
}

start()