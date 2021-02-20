console.log(localStorage)

let list = document.querySelector('.todo-list')
// let items = list.children
let newItemForm = document.querySelector('.add-form')
let newItemTitle = newItemForm.querySelector('.add-form-input')
let taskTemplate = document.querySelector('#task-template').content
let newItemTemplate = taskTemplate.querySelector('.todo-list-item')
let showList = document.querySelector('.showBtn')
let hideList = document.querySelector('.hideBtn')
let count = localStorage.length
let objTask = {}

getFromLocalStorage()

function getFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let task = newItemTemplate.cloneNode(true)
        let taskDescription = task.querySelector('span')
        objTask = JSON.parse(localStorage.getItem([i]))
        taskDescription.textContent = objTask.task
        list.appendChild(task)

        let checkbox = task.querySelector('.todo-list-input')

        console.log(objTask)
        if (objTask.completed) {
            localStorage.setItem(i, JSON.stringify({task: objTask.task, completed: true}))
            checkbox.checked = true
            showList.disabled = false
            hideList.disabled = true
            hideList.removeAttribute('data-action')
            showList.setAttribute('data-action', 'show')
            task.classList.add('completed')
        } else {
            localStorage.setItem(i, JSON.stringify({task: objTask.task, completed: false}))
            checkbox.checked = false
        }
        addCheckHandler(task)
        console.log(list)

    }
}

function addCheckHandler(item) {
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

    checkbox.addEventListener('change', function (evt) {
            /*   // модуль удаления задач из LocalStorage, который срабатывает при изменении значения <input>
                 let taskText = (evt.target).nextElementSibling.textContent
                  for (let i = 0; i < localStorage.length; i++) {
                      if (localStorage.getItem(i) === taskText) {
                          localStorage.removeItem(i)
                          tasksArr.splice(i, 1)
                      }
                  }*/
            let completedTasks = getCheckedElements()

            let textTask = evt.target.nextElementSibling.textContent

            if (completedTasks.length === 0) {
                hideList.disabled = true
                hideList.removeAttribute('data-action')
                setStatus(false, textTask)
            }
            if (hideList.disabled === false && showList.disabled === true) {
                console.log('MODE MULTISELECT')

                for (let i = 0; i < localStorage.length; i++) {
                    if (JSON.parse(localStorage.getItem([i])).task === textTask) {
                        objTask = JSON.parse(localStorage.getItem([i]))
                        if (objTask.completed) {
                            localStorage.setItem(i, JSON.stringify({task: objTask.task, completed: false}))
                            console.log(localStorage)
                        } else {
                            localStorage.setItem(i, JSON.stringify({task: objTask.task, completed: true}))
                            console.log(localStorage)
                        }
                    }
                }
            } else if (checkbox.checked) {
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
    addTaskLocalStorage(taskText, count++)
})


function addTaskLocalStorage(taskText, i) {
    localStorage.setItem(i, JSON.stringify({task: taskText, completed: false}))
    console.log('Add task! Amount: ' + count, localStorage)
}

function getCheckedElements() {
    return document.querySelectorAll(':checked')
}

function setStatus(isCompleted, textTask) {
    for (let i = 0; i < localStorage.length; i++) {
        if (JSON.parse(localStorage.getItem([i])).task === textTask) {
            objTask = JSON.parse(localStorage.getItem([i]))
            localStorage.setItem(i, JSON.stringify({task: objTask.task, completed: isCompleted}))
            console.log(localStorage)
        }
    }
}


