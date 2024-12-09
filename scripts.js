// seleciona os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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

// Captura o eveto de submit do formulario para obter os valores
form.onsubmit = (event) => {
  // previne o comportamento padrão de recarregar a pagina
  event.preventDefault()

  //cria um objeto com os detalhes da nova dispesa
    const newExpenses = {
      id: new Date().getTime(),
      expense: expense.value,
      category_id: category.value,
      category_name: category.options[category.selectedIndex].text,
      amount: amount.value,
      created_at: new Date(),
    }
}

