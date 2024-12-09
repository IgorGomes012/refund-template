// seleciona os elementos do formulario
const amount = document.getElementById("amount")

//captura o evento input para formatar o valor
amount.oninput = () => {
  //obtem o valor atual do input e remove os caracteres
  let value = amount.value.replace(/\D/g, "");

  //transforma o valor em centavo.
  value = Number(value) / 100

  //atualiza o valor do input
  amount.value = formatarCurrencyBRL(value)
}

function formatarCurrencyBRL(value){
  //Formata o valor no padrao BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
  return value
}

