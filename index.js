/////////// started DOM

const elForm = document.querySelector(".todolist-added-section")
const elInput = document.querySelector(".todolist-input")
const elList = document.querySelector(".todolist-lists")

const todos = []

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault()

  let inputvalue = elInput.value

  if (inputvalue !== "") {
    const newTodo = {
      id: todos[todos.length - 1]?.id + 1 || 0,
      name: inputvalue,
      isCompleted: false,
      time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      isShifr: false
    }
    todos.push(newTodo)
    elInput.value = ""
    elList.innerHTML = null
    renderTodos(todos, elList)
  }
})

function renderTodos(arr, htmlElement) {
  arr.forEach((item) => {
    const li = document.createElement("li")
    const input = document.createElement("input")
    const time = document.createElement("p")
    const button = document.createElement("button")
    const buttons = document.createElement("button")
    const buttonds = document.createElement("button")
    
    
    

    li.textContent = item.name
    button.textContent = "delete"
    time.textContent = item.time

    button.dataset.deleteTodoBtnDataset = item.id
    button.classList.add("todo-btn")
    input.dataset.editTodoInputDataset = item.id
    input.classList.add("todo-input")
    buttons.dataset.shifrTodoBtnDataset = item.id
    buttons.classList.add("shifrlash")
    buttons.textContent = "Shifrlash"
    buttonds.dataset.deshifrTodoBtnDataset = item.id
    buttonds.classList.add("deshifrlash")
    buttonds.textContent = "Deshifrlash"

    if(item.isCompleted) {
      input.checked = true
      li.style.textDecoration = "line-through"
    }

    input.type = "checkbox"

    li.classList.add("list-item")

    li.appendChild(input)
    li.appendChild(time)
    li.appendChild(button)
    li.appendChild(buttons)
    li.appendChild(buttonds)

    htmlElement.appendChild(li)
  })
}

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".todo-btn")) {
    const foundedDataset = evt.target.dataset.deleteTodoBtnDataset * 1
    const foundedTodo = todos.findIndex((item) => item.id === foundedDataset)
    todos.splice(foundedTodo, 1)
    elList.innerHTML = null
    renderTodos(todos, elList)
    tebranish();
    console.log(todos);
  }else if (evt.target.matches(".todo-input")) {
    const foundedDataset = evt.target.dataset.editTodoInputDataset * 1
    const foundedTodo = todos.find((item) => item.id === foundedDataset)

    foundedTodo.isCompleted = !foundedTodo.isCompleted
    elList.innerHTML = null
    renderTodos(todos, elList)
  }else if(evt.target.matches(".shifrlash")){
    const foundedDataset = evt.target.dataset.shifrTodoBtnDataset * 1
    const foundedTodo = todos.find((item) => item.id === foundedDataset)
    if (foundedTodo.isShifr === false) {
      foundedTodo.name = window.atob(foundedTodo.name)
    foundedTodo.isShifr = !foundedTodo.isShifr
    }
    elList.innerHTML = null
    renderTodos(todos, elList)
  }else if (evt.target.matches(".deshifrlash")) {
    const foundedDataset = evt.target.dataset.deshifrTodoBtnDataset * 1
    const foundedTodo = todos.find((item) => item.id === foundedDataset)
    if (foundedTodo.isShifr === true) {
      foundedTodo.name = window.btoa(foundedTodo.name)
      foundedTodo.isShifr = !foundedTodo.isShifr
    }
    elList.innerHTML = null
    renderTodos(todos, elList)
  }
  
})



////////// ended DOM


///////// started BOM 

const elP = document.querySelector(".battery")

window.navigator.getBattery().then((battery) => {
  elP.textContent = `Battery Level: ${battery.level * 100}%`
  elP.style.backgroundColor =
    battery.level > 0.75? "green" : battery.level > 0.5? "yellow" : "red"
})

///////// Ended BOM


/////////  Prosta qoshimcha


function tebranish() {
  const intensity = 50;
  let count = 0;
  const interval = setInterval(() => {
    const offsetX = (Math.random() * intensity * 2) - intensity;
    const offsetY = (Math.random() * intensity * 2) - intensity;
    document.body.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    count++;
    if (count > 15) {
      clearInterval(interval);
      document.body.style.transform = '';
    }
  }, 50);
}


///////emoji  

const emojis = ['😀', '😂', '😍', '😎', '😴', '🤩', '🤔', '🥳', '😡', '🤯'];
const button = document.getElementById('emojiButton');
const emojiDiv = document.getElementById('emoji');

button.addEventListener('click', () => {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  emojiDiv.textContent = randomEmoji;
});
