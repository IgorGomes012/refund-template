// seleciona os elementos do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

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
  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    //cria o elemento de li para adicionar na lista ul
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // cria o icone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Cria a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    //cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    //cria o icone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remove");

    //adiciona nome e categoria na div das informaçoes da despesa
    expenseInfo.append(expenseName, expenseCategory);

    //adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    //adiciona o item na lista
    expenseList.append(expenseItem);

    //atualiza o total
    updateTotals()

  } catch (error) {
    alert("nao foi possivel atualizar a lista de despesas");
  }
}

// atualiza a quantidade de itens
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children
    //atualiza a quantidade de itens
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    // Variavel implementar total
    let total = 0

    //percorrer cada item da lista
    for(let item = 0; item < items.length; item++){
     const itemAmount = items[item].querySelector(".expense-amount")
     //remover caracteres nai numericos e substitui virgula pelo ponto
     let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

     // converte o valor para float
     value = parseFloat(value)

     //Verifica se é um numero valido
     if(isNaN(value)){
      return alert("o valor nao parece ser um numero")
     }
     // incrementar o valor total
     total += Number(value)
    }
    
    // criar a span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // formata o valor e remove o R$ que sera exibido pelo small com estilo customizado
    total = formatarCurrencyBRL(total).toUpperCase().replace("R$", "")

    expenseTotal.innerHTML = ""

    expenseTotal.append(symbolBRL, total)

  } catch (error) {
    alert("nao foi possivel atualizar os totais");
  }
}

  // Evento que captura o clique na lista
expenseList.addEventListener("click", function(event){
  // Verifica  se o elemneto clicado é o icone de remover
  if(event.target.classList.contains("remove-icon")){
  // obtem a li pai do elemento clicado
  const item = event.target.closest(".expense")
  // remove item da lista
  item.remove()
  }
  // atualiza os totais
  updateTotals()
})