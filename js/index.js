let botao = document.getElementById("botao")
let select = document.getElementById("select-moedas")
let input = document.getElementById("input")

async function converterMoedas() {
  try {
    let moedas = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(function (response) {
      return response.json()
    })

    let dolarBid = moedas.USDBRL.bid
    let dolarAsk = moedas.USDBRL.ask
    let euroBid = moedas.EURBRL.bid
    let euroAsk = moedas.EURBRL.ask
    let bitcoin = moedas.BTCBRL.bid
    let inputValorEmReais = input.value
    let inputMoedas = document.getElementById("input-moedas")
    let textoReal = document.getElementById("texto-real")
    let valorEmReais = parseFloat(inputValorEmReais.replace(',', '.'))

    if (inputValorEmReais == "") {
      inputMoedas.innerHTML = '0,00'
      textoReal.innerHTML = '0,00'
    } else {

      if (select.value === "US$ Dólar Americano") {
        let valorEmDolaresBid = valorEmReais / dolarBid
        let valorEmDolaresAsk = valorEmReais / dolarAsk
        inputMoedas.innerHTML = `Compra: ${valorEmDolaresBid.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}<br>Venda: ${valorEmDolaresAsk.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
      }

      if (select.value === "€ Euro") {
        let valorEmEurosBid = valorEmReais / euroBid
        let valorEmEurosAsk = valorEmReais / euroAsk
        inputMoedas.innerHTML = `Compra: ${valorEmEurosBid.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}<br>Venda: ${valorEmEurosAsk.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}`
      }

      if (select.value === "Bitcoin") {
        let valorEmBitcoin = valorEmReais * bitcoin
        inputMoedas.innerHTML = valorEmBitcoin.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        textoReal.innerHTML = valorEmReais.toLocaleString('pt-br')
      } else {
        textoReal.innerHTML = valorEmReais.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
      }
    }
  } catch (error) {
    console.error("Erro ao buscar cotações: ", error)
    alert("Erro ao buscar cotações. Tente novamente.")
  }
}

function trocaDeMoeda() {
  let textoMoedas = document.getElementById("texto-moedas")
  let bandeiraMoedas = document.getElementById("bandeira-moedas")
  let labelValor = document.getElementById("label-valor")

  if (select.value === "US$ Dólar Americano") {
    textoMoedas.innerHTML = "Dólar Americano"
    bandeiraMoedas.src = "./assets/img/eua.png"
    input.placeholder = "R$"
    labelValor.innerHTML = "<b>Valor</b>"
  }
  if (select.value === "€ Euro") {
    textoMoedas.innerHTML = "Euro"
    bandeiraMoedas.src = "./assets/img/euro.png"
    input.placeholder = "R$"
    labelValor.innerHTML = "<b>Valor</b>"
  }
  if (select.value === "Bitcoin") {
    textoMoedas.innerHTML = "Bitcoin"
    bandeiraMoedas.src = "./assets/img/bitcoin.jpg"
    input.placeholder = "Qtd"
    labelValor.innerHTML = "<b>Quantidade</b>"
  }
  converterMoedas()
}


botao.addEventListener("click", converterMoedas)
select.addEventListener("change", trocaDeMoeda)
input.addEventListener("keypress", function (event) {
  if (!/[0-9.,]/.test(event.key)) {
    event.preventDefault()
  }
})