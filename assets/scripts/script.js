let list = document.querySelector('.todo-list')
let items = list.children
let newItemForm = document.querySelector('.add-form')
let newItemTitle = newItemForm.querySelector('.add-form-input')
let taskTemplate = document.querySelector('#task-template').content
let newItemTemplate = taskTemplate.querySelector('.todo-list-item')
let showList = document.querySelector('.showBtn')
let hideList = document.querySelector('.hideBtn')
let count = localStorage.length
// let tasksArr = []

localStorage.clear()
/*for (let i = 0; i < localStorage.length; i++) {
    let task = newItemTemplate.cloneNode(true)
    let taskDescription = task.querySelector('span')
    taskDescription.textContent = localStorage.getItem(i)
    tasksArr.push(localStorage.getItem(i))
    list.appendChild(task)
    console.log(task)
}*/

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

    checkbox.addEventListener('change', function (evt) {
            /*   // модуль удаления задач из LocalStorage, который срабатывает при изменении значения <input>
                 let taskText = (evt.target).nextElementSibling.textContent
                  for (let i = 0; i < localStorage.length; i++) {
                      if (localStorage.getItem(i) === taskText) {
                          localStorage.removeItem(i)
                          tasksArr.splice(i, 1)
                      }
                  }*/
            let taskText = (evt.target).nextElementSibling.textContent
            let listCheckbox = list.querySelectorAll(':checked')
            if (listCheckbox.length === 0) {
                hideList.disabled = true
                hideList.removeAttribute('data-action')
            }
            if (checkbox.checked && hideList.disabled === false && showList.disabled === true) {
            } else if (checkbox.checked) {
                item.classList.toggle('completed')
                showList.disabled = false
                showList.setAttribute('data-action', 'show')
            }
            updateLocalStorage(taskText)
        }
    )
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
    /*    tasksArr.push(taskText)

        for (let i = 0; i < tasksArr.length; i++) {
            localStorage.setItem(i, tasksArr[i])
        }*/
    list.appendChild(task)



    updateLocalStorage(taskText, count++)
    addCheckHandler(task)

    newItemTitle.value = ''

})

function updateLocalStorage(taskName, i) {

    let completedTasks = list.querySelectorAll(':checked')

    if (i === undefined) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains('completed')) {
                console.log('Update task!')
            } else console.log('ERROR UPDATE!!!')
        } console.log('Completed list: ', completedTasks)
    } else {
        localStorage[i] = JSON.stringify({task: taskName, completed: false})
        console.log('Add task! Full list:', localStorage, items)
    }
}


console.log('localStorage end', localStorage)

