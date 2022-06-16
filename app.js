let todos = JSON.parse(localStorage.getItem('todoTasks')) || []

const renderTasks = () => {
    const tasks = document.querySelector('.tasks')

    tasks.innerHTML = ''

    todos.forEach(todo => {
        const task = document.createElement('div')
        task.classList.add('task')

        const taskInfo = document.createElement('div')
        taskInfo.classList.add('task__info')

        const inputCheck = document.createElement('input')
        inputCheck.type = 'checkbox'
        inputCheck.checked = todo.finished

        const inputTask = document.createElement('input')
        inputTask.type = 'text'
        inputTask.value = todo.name
        inputTask.classList = 'task__info-name'
        inputTask.readOnly = true

        const taskActions = document.createElement('div')
        taskActions.classList.add('task__actions')

        const editTask = document.createElement('button')
        editTask.innerHTML = 'Edit'

        const deleteTask = document.createElement('button')
        deleteTask.innerHTML = 'Delete'

        taskInfo.appendChild(inputCheck)
        taskInfo.appendChild(inputTask)
        taskActions.appendChild(editTask)
        taskActions.appendChild(deleteTask)
        task.appendChild(taskInfo)
        task.appendChild(taskActions)
        tasks.appendChild(task)

    })
}

window.addEventListener('load', e => {
    const form = document.querySelector('.new__task-form')

    form.addEventListener('submit', e => {
        e.preventDefault()
        const todo = {
            name: e.target.elements.newInput.value,
            finished: false
        }

        todos.push(todo)
        localStorage.setItem('todoTasks', JSON.stringify(todos))

        e.target.elements.newInput.value = ''

        renderTasks()
    })

})
