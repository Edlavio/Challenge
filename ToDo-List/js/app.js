const texto = document.querySelector('input')
const btnInsert = document.querySelector('.inputContainer button')
const btnDeleteAll = document.querySelector('#btnDelete-All')
var ul = document.querySelector('ul')

var html = document.querySelector('html')
const btnDarkMode = document.querySelector('#btnTheme')

var itensDB = []

btnDeleteAll.onclick = () => {
  itensDB = []
  updateDB()
}

texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
})

btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
}

function setItemDB() {
  if (itensDB.length > 19) {
    alert('Limite máximo atingido!')
    return
  }

  itensDB.push({ 'item': texto.value, 'status': ''})
  updateDB()
}

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i)
  });
}

function insertItemTela(text, status, i) {
  const li = document.createElement('li')

  li.innerHTML = `
    <div class="task">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});">
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class="fa-solid fa-trash"></i></button>
    </div>
  `

  ul.appendChild(li);

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  } 

  texto.value = '';
}

function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked'
  } else {
    itensDB[i].status = ''
  }

  updateDB()
}

function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}

loadItens()

// Total tasks
const totalTasksValue = setInterval(() => {
  document.querySelector('.totalTasks').innerHTML = itensDB.length;
  },updateDB);

// Theme Switch
btnTheme.addEventListener('click', darkMode)

function darkMode () {
  html.classList.toggle('dark-mode')
  var theme;

  if (html.classList.contains('dark-mode')) {
    theme = 'DARK'
  } else {
    theme = 'LiGHT'
  }

  localStorage.setItem("PageTheme", JSON.stringify(theme));
}

let GetTheme = JSON.parse(localStorage.getItem("PageTheme"))

if (GetTheme === 'DARK') {
  html.classList = 'dark-mode'
}