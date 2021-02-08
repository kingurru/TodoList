let list = document.querySelector('.todo-list')
let items = list.children
// let emptyListMessage = document.querySelector('.empty-tasks')
let newItemForm = document.querySelector('.add-form')
let newItemTitle = newItemForm.querySelector('.add-form-input')
let taskTemplate = document.querySelector('#task-template').content
let newItemTemplate = taskTemplate.querySelector('.todo-list-item')
let showList = document.querySelector('[data-action="show"]')
let hideList = document.querySelector('[data-action="hide"]')
let tasksCompleted = document.getElementsByClassName('completed')


let addCheckHandler = function (item) {

    let checkbox = item.querySelector('.todo-list-input')
    showList.addEventListener('click', function () {

        if (checkbox.checked) {
            item.classList.remove('completed')

        }
    })

    hideList.addEventListener('click', function () {
        if (checkbox.checked) {
            item.classList.add('completed')
        }
    })

    checkbox.addEventListener('change', function () {
        // item.remove()
        if (checkbox.checked) {
            item.classList.toggle('completed')
        }
    })
}


for (let i = 0; i < items.length; i++) {
    addCheckHandler(items[i])
}

newItemForm.addEventListener('submit', function (evt) {
    evt.preventDefault()
    let taskText = newItemTitle.value
    let task = newItemTemplate.cloneNode(true)
    let taskDescription = task.querySelector('span')

    taskDescription.textContent = taskText
    list.appendChild(task)
    addCheckHandler(task)
    newItemTitle.value = ''
})