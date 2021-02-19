let list = document.querySelector('.todo-list')
let items = list.children
let newItemForm = document.querySelector('.add-form')
let newItemTitle = newItemForm.querySelector('.add-form-input')
let taskTemplate = document.querySelector('#task-template').content
let newItemTemplate = taskTemplate.querySelector('.todo-list-item')
let showList = document.querySelector('.showBtn')
let hideList = document.querySelector('.hideBtn')
let count = localStorage.length
let objTask = {}

// let tasksArr = []

function getCheckedElements() {
    return document.querySelectorAll(':checked')
}

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
    let checkboxList = document.querySelectorAll('.todo-list-input')
    console.log(checkboxList)
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
            if (completedTasks.length === 0) {
                hideList.disabled = true
                hideList.removeAttribute('data-action')
            }
            if (hideList.disabled === false && showList.disabled === true) {
                console.log('SHOW LIST off & HIDE LIST on')
                let textTask = evt.target.nextElementSibling.textContent
                for (let i = 0; i < localStorage.length; i++) {
                    if (JSON.parse(localStorage.getItem([i])).task === textTask) {
                        objTask = JSON.parse(localStorage.getItem([i]))
                        if (objTask.completed) {
                            localStorage.setItem(i, JSON.stringify({task: objTask.task, completed: false}))
                            console.log('input if', localStorage)
                        } else {
                            localStorage.setItem(i, JSON.stringify({task: objTask.task, completed: true}))
                            console.log('input else', localStorage)
                        }
                    }
                }
            } else if (checkbox.checked) {
                item.classList.toggle('completed')
                showList.disabled = false
                showList.setAttribute('data-action', 'show')
            }
        }
    )
}
// for (let i = 0; i < items.length; i++) {
//     addCheckHandler(items[i])
// }
newItemForm.addEventListener('submit', function (evt) {
    evt.preventDefault()

    let taskText = newItemTitle.value
    let task = newItemTemplate.cloneNode(true)
    let taskDescription = task.querySelector('span')
    taskDescription.textContent = taskText

    list.appendChild(task)
    addCheckHandler(task)
    newItemTitle.value = ''
    updateLocalStorage(taskText, count++)
})

function updateLocalStorage(taskName, i) {


    if (i === undefined && taskName === undefined) {
        let completedTasks = getCheckedElements()

        for (let i = 0; i < completedTasks.length; i++) {
            objTask = JSON.parse(localStorage.getItem(i))
            if (completedTasks[i].checked) {
                console.log(completedTasks[i].checked)
                objTask = JSON.parse(localStorage.getItem([i]))
                //localStorage.setItem(i, JSON.stringify({task: objTask.task, completed: true}))
            } else {
                console.log(completedTasks[i].checked)
                objTask = JSON.parse(localStorage.getItem([i]))
                localStorage.setItem(i, JSON.stringify({task: objTask.task, completed: false}))
            }
        }
    } else {
        localStorage.setItem(i, JSON.stringify({task: taskName, completed: false}))
        console.log('Add task! Amount: ' + items.length)
    }
    console.log('Full list:', localStorage)
}


console.log('localStorage end', localStorage)

