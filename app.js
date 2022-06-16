let todos = JSON.parse(localStorage.getItem('todoTasks')) || []

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
    })

})