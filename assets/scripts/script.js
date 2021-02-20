console.log(localStorage)

let list = document.querySelector('.todo-list')
//let items = list.children
let newItemForm = document.querySelector('.add-form')
let newItemTitle = newItemForm.querySelector('.add-form-input')
let taskTemplate = document.querySelector('#task-template').content
let newItemTemplate = taskTemplate.querySelector('.todo-list-item')
let showList = document.querySelector('.showBtn')
let hideList = document.querySelector('.hideBtn')
let deleteList = document.querySelector('.deleteBtn')
let count = localStorage.length
let objTask = {}

getFromLocalStorage()

function getFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let task = newItemTemplate.cloneNode(true)
        let taskDescription = task.querySelector('span')
        let key = localStorage.key(i)

        objTask = JSON.parse(localStorage.getItem([key]))
        taskDescription.textContent = objTask.task

        list.appendChild(task)

        let input = task.querySelector('.todo-list-input')

        if (objTask.completed) {
            localStorage.setItem(key, JSON.stringify({task: objTask.task, completed: true}))
            input.checked = true
            showList.disabled = false
            hideList.disabled = true
            deleteList.disabled = true

            showList.setAttribute('data-action', 'show')
            hideList.removeAttribute('data-action')

            task.classList.add('completed')
        } else {
            localStorage.setItem([key], JSON.stringify({task: objTask.task, completed: false}))
            input.checked = false
        }
        addCheckHandler(task)
    }
}

function addCheckHandler(item) {
    let input = item.querySelector('.todo-list-input')

    showList.addEventListener('click', function () {
        if (input.checked) {
            showList.disabled = true
            hideList.disabled = false
            deleteList.disabled = false

            showList.removeAttribute('data-action')
            hideList.setAttribute('data-action', 'hide')
            deleteList.setAttribute('data-action', 'delete')
            item.classList.remove('completed')
        }
    })

    hideList.addEventListener('click', function () {
        if (input.checked) {
            showList.disabled = false
            hideList.disabled = true
            deleteList.disabled = true

            hideList.removeAttribute('data-action')
            showList.setAttribute('data-action', 'show')
            deleteList.removeAttribute('data-action')
            item.classList.add('completed')
        }
    })

    deleteList.addEventListener('click', function () {

        if (input.checked) {
            showList.disabled = true
            hideList.disabled = true
            deleteList.disabled = true
            hideList.removeAttribute('data-action')
            showList.removeAttribute('data-action')
            deleteList.removeAttribute('data-action')

            let task = input.parentNode.parentNode
            task.remove()
            localStorage.clear()

            let inputNotChecked = list.querySelectorAll('input:not(:checked)')
            for (let i = 0; i < inputNotChecked.length; i++) {
                let taskDescription = (inputNotChecked[i].nextElementSibling).textContent
                addTaskLocalStorage(taskDescription, i, false)
            }
        }
    })

    input.addEventListener('change', function (evt) {

            let completedTasks = getCheckedElements()

            let textTask = evt.target.nextElementSibling.textContent

            if (completedTasks.length === 0) {
                hideList.disabled = true
                hideList.removeAttribute('data-action')
                deleteList.disabled = true
                deleteList.removeAttribute('data-action')
                setStatus(false, textTask)
            }
            if (showList.disabled === true && hideList.disabled === false && deleteList.disabled === false) {
                console.log('MODE MULTISELECT')

                for (let i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i)

                    if (JSON.parse(localStorage.getItem([key])).task === textTask) {
                        objTask = JSON.parse(localStorage.getItem([key]))

                        if (objTask.completed) {
                            localStorage.setItem(key, JSON.stringify({task: objTask.task, completed: false}))
                            console.log(localStorage)
                        } else {
                            localStorage.setItem(key, JSON.stringify({task: objTask.task, completed: true}))
                            console.log(localStorage)
                        }
                    }
                }
            } else if (input.checked) {
                item.classList.toggle('completed')
                showList.disabled = false
                showList.setAttribute('data-action', 'show')

                setStatus(true, textTask)
            }
        }
    )
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
    addTaskLocalStorage(taskText, count++, false)
})


function addTaskLocalStorage(taskText, key, isCompleted) {
    localStorage.setItem(key, JSON.stringify({task: taskText, completed: isCompleted}))
}

function getCheckedElements() {
    return document.querySelectorAll(':checked')
}

function setStatus(isCompleted, textTask) {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        objTask = JSON.parse(localStorage.getItem([key]))

        if (objTask.task === textTask) {
            localStorage.setItem(key, JSON.stringify({task: objTask.task, completed: isCompleted}))
        }
    }
    console.log(localStorage)
}


