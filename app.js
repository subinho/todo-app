let todos = JSON.parse(localStorage.getItem('todoTasks')) || []
const editSVG = `
<svg
    width="1em" 
    height="1em" 
    viewBox="0 0 32 32" 
    xmlns="http://www.w3.org/2000/svg">
    <path d="M30.6437 2.52494C32.0125 3.89181 32.0125 6.10806 30.6437 7.47494L28.7687 9.35619L22.6437 3.23244L24.525 1.35369C25.8937 -0.0134044 28.1063 -0.0134044 29.475 1.35369L30.6437 2.52494ZM10.775 15.1062L21.2313 4.64619L27.3563 10.7687L16.8937 21.2249C16.5125 21.6124 16.0437 21.8999 15.525 22.0749L9.975 23.9249C9.38125 24.0999 8.84375 23.9624 8.4375 23.5062C8.0375 23.1562 7.9 22.5624 8.075 22.0249L9.925 16.4749C10.1 15.9562 10.3875 15.4874 10.775 15.1062ZM12 3.94369C13.1063 3.94369 14 4.89556 14 5.94369C14 7.10619 13.1063 7.94369 12 7.94369H6C4.89562 7.94369 4 8.89369 4 9.94369V25.9999C4 27.1062 4.89562 27.9999 6 27.9999H22C23.1063 27.9999 24 27.1062 24 25.9999V19.9437C24 18.8937 24.8937 17.9437 26 17.9437C27.1063 17.9437 28 18.8937 28 19.9437V25.9999C28 29.3124 25.3125 31.9999 22 31.9999H6C2.68625 31.9999 0 29.3124 0 25.9999V9.94369C0 6.63119 2.68625 3.94369 6 3.94369H12Z" 
    fill="#FFFCFC"/>
</svg> 
`

const deleteSVG = `
<svg 
    width="1em" 
    height="1em" 
    viewBox="0 0 55 55" 
    xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5982 1.90029C17.2612 0.735625 18.6239 0 20.1094 0H34.8906C36.3761 0 37.7388 0.735625 38.4018 1.90029L39.2857 3.4375H51.0714C53.2444 3.4375 55 4.97686 55 6.875C55 8.77314 53.2444 10.3125 51.0714 10.3125H3.92857C1.75926 10.3125 0 8.77314 0 6.875C0 4.97686 1.75926 3.4375 3.92857 3.4375H15.7143L16.5982 1.90029ZM3.81808 13.75H51.0714V48.125C51.0714 51.917 47.548 55 43.2143 55H11.6752C7.44587 55 3.81808 51.917 3.81808 48.125V13.75ZM13.6395 22.3438V46.4062C13.6395 47.3516 14.6339 48.125 15.6038 48.125C16.7946 48.125 17.5681 47.3516 17.5681 46.4062V22.3438C17.5681 21.3984 16.7946 20.625 15.6038 20.625C14.6339 20.625 13.6395 21.3984 13.6395 22.3438ZM25.4252 22.3438V46.4062C25.4252 47.3516 26.4196 48.125 27.3895 48.125C28.5804 48.125 29.4643 47.3516 29.4643 46.4062V22.3438C29.4643 21.3984 28.5804 20.625 27.3895 20.625C26.4196 20.625 25.4252 21.3984 25.4252 22.3438ZM37.3214 22.3438V46.4062C37.3214 47.3516 38.2054 48.125 39.2857 48.125C40.3661 48.125 41.25 47.3516 41.25 46.4062V22.3438C41.25 21.3984 40.3661 20.625 39.2857 20.625C38.2054 20.625 37.3214 21.3984 37.3214 22.3438Z" 
    fill="#FF0000"/>
</svg>
`
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
        editTask.classList.add('task__actions-edit')
        editTask.innerHTML = editSVG

        const deleteTask = document.createElement('button')
        deleteTask.classList.add('task__actions-delete')
        deleteTask.innerHTML = deleteSVG

        taskInfo.appendChild(inputCheck)
        taskInfo.appendChild(inputTask)
        taskActions.appendChild(editTask)
        taskActions.appendChild(deleteTask)
        task.appendChild(taskInfo)
        task.appendChild(taskActions)
        tasks.appendChild(task)

        if(todo.finished) {
            inputTask.classList.add('checked')
        }

        // TASK COMPLETE ?
        inputCheck.addEventListener('change', e => {
            todo.finished = e.target.checked
            
            localStorage.setItem('todoTasks', JSON.stringify(todos))

            if(todo.finished) {
                inputTask.classList.add('checked')
            } else {
                inputTask.classList.remove('checked')
            }

            renderTasks()

        })

        //  EDIT TASK
        editTask.addEventListener('click', e => {
            inputTask.removeAttribute('readonly')
            inputTask.focus()
            inputTask.addEventListener('blur', e => {
                inputTask.setAttribute('readonly', true)
                todo.name = e.target.value

                localStorage.setItem('todoTasks', JSON.stringify(todos))
                renderTasks()
            })
        })

        // DELETE TASK
        deleteTask.addEventListener('click',  () => {
            todos = todos.filter(task => task != todo)
            
            localStorage.setItem('todoTasks', JSON.stringify(todos))
            renderTasks()
        })

    })
}

window.addEventListener('load', e => {
    const form = document.querySelector('.new__task-form')

    form.addEventListener('submit', e => {
        e.preventDefault()
        
        let userInput = e.target.elements.newInput.value
        const todo = {
            name: userInput,
            finished: false
        }

        if(userInput) {
            todos.push(todo)
            localStorage.setItem('todoTasks', JSON.stringify(todos))
            e.target.elements.newInput.value = ''
    
            renderTasks()
        }
    })
    renderTasks()
})
