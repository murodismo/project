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
      time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
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

    li.textContent = item.name
    button.textContent = "delete"
    time.textContent = item.time

    button.dataset.deleteTodoBtnDataset = item.id
    button.classList.add("todo-btn")
    input.dataset.editTodoInputDataset = item.id
    input.classList.add("todo-input")

    if(item.isCompleted) {
      input.checked = true
      li.style.textDecoration = "line-through"
    }

    input.type = "checkbox"

    li.classList.add("list-item")

    li.appendChild(input)
    li.appendChild(time)
    li.appendChild(button)
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
    console.log(todos);
  }else if (evt.target.matches(".todo-input")) {
    const foundedDataset = evt.target.dataset.editTodoInputDataset * 1
    const foundedTodo = todos.find((item) => item.id === foundedDataset)

    foundedTodo.isCompleted = !foundedTodo.isCompleted
    elList.innerHTML = null
    renderTodos(todos, elList)
  }
})


////////// ended DOM