// seleciona os elementos do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//seleciona os elementos da lista
const expenseList = document.querySelector("ul")

//captura o evento input para formatar o valor
amount.oninput = () => {
  //obtem o valor atual do input e remove os caracteres
  let value = amount.value.replace(/\D/g, "");

  //transforma o valor em centavo.
  value = Number(value) / 100;

  //atualiza o valor do input
  amount.value = formatarCurrencyBRL(value);
};

function formatarCurrencyBRL(value) {
  //Formata o valor no padrao BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
}

// Captura o eveto de submit do formulario para obter os valores
form.onsubmit = (event) => {
  // previne o comportamento padrão de recarregar a pagina
  event.preventDefault();

  //cria um objeto com os detalhes da nova dispesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
  //chama a função que vai adicionar um item na lista
  expenseAdd(newExpense)
};


function expenseAdd(newExpense) {
  try {
   //cria o elemento de li para adicionar na lista ul
   const expenseItem = document.createElement("li")
   expenseItem.classList.add("expense-item")

   // cria o icone da categoria
   const expenseIcon = document.createElement("img")
   expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`)
   expenseIcon.setAttribute("alt", newExpense.category_name)

   //adiciona as informações no item
   expenseItem.append(expenseIcon)

   //adiciona o item na lista
   expenseList.append(expenseItem	)

  } catch (error) {
    alert("nao foi possivel atualizar a lista de despesas")
  }
}
