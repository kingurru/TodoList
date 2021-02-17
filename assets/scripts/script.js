let list = document.querySelector('.todo-list')
let items = list.children
// let emptyListMessage = document.querySelector('.empty-tasks')
let newItemForm = document.querySelector('.add-form')
let newItemTitle = newItemForm.querySelector('.add-form-input')
let taskTemplate = document.querySelector('#task-template').content
let newItemTemplate = taskTemplate.querySelector('.todo-list-item')
let showList = document.querySelector('.showBtn')
let hideList = document.querySelector('.hideBtn')
//let tasksCompleted = document.getElementsByClassName('completed')


let addCheckHandler = function (item) {

    let checkbox = item.querySelector('.todo-list-input')
    showList.addEventListener('click', function () {
        if (checkbox.checked) {
            showList.disabled = true
            hideList.disabled = false
            showList.removeAttribute('data-action')
            hideList.setAttribute('data-action', 'hide')
            item.classList.remove('completed')

        }
    })

    hideList.addEventListener('click', function () {
        if (checkbox.checked) {
            showList.disabled = false
            hideList.disabled = true
            hideList.removeAttribute('data-action')
            showList.setAttribute('data-action', 'show')
            item.classList.add('completed')
        }
    })

    checkbox.addEventListener('change', function () {
        if (checkbox.checked && hideList.disabled === false && showList.disabled === true) {

        }
        else if (checkbox.checked) {
            item.classList.toggle('completed')
            showList.disabled = false
            showList.setAttribute('data-action', 'show')

            //showList.setAttribute('data-action', 'show')
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