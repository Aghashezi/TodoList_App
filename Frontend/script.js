document.addEventListener('DOMContentLoaded', function() {
    fetchTodos();

    document.getElementById('showFormBtn').addEventListener('click', function() {
        const form = document.getElementById('todoForm');
        form.classList.toggle('show');
        form.style.display = form.classList.contains('show') ? 'block' : 'none';
    });

    document.getElementById('addForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addTodo();
    });

    document.getElementById('updateBtn').addEventListener('click', function(e) {
        e.preventDefault();
        updateTodo();
    });

    const updateTitle = document.getElementById('update-title');
    const updateDescription = document.getElementById('update-description');
    const updateBtn = document.getElementById('updateBtn');

    updateTitle.addEventListener('input', checkFields);
    updateDescription.addEventListener('input', checkFields);

    function checkFields() {
        const title = updateTitle.value;
        const description = updateDescription.value;
        if (title && description) {
            updateBtn.style.backgroundColor = '#4CAF50'; 
        } else {
            updateBtn.style.backgroundColor = ''; 
        }
    }
});

function fetchTodos() {
    fetch('http://localhost:8000/todo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayTodos(data))
        .catch(error => console.error('Error fetching todos:', error));
}

function displayTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `
            <div>
                <strong>${todo.title}</strong>: ${todo.description}
            </div>
            <div>
                <button class="edit-btn" onclick="showUpdateForm(${todo.id}, '${todo.title}', '${todo.description}')">Edit</button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(listItem);
    });
}

function addTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (!title || !description) {
        alert('Both fields are required.');
        return;
    }

    fetch('http://localhost:8000/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        fetchTodos();
        document.getElementById('addForm').reset();
        document.getElementById('todoForm').classList.remove('show');
        document.getElementById('todoForm').style.display = 'none';
    })
    .catch(error => console.error('Error adding todo:', error));
}

function deleteTodo(id) {
    fetch(`http://localhost:8000/todo/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        fetchTodos();
    })
    .catch(error => console.error('Error deleting todo:', error));
}

function showUpdateForm(id, title, description) {
    document.getElementById('update-id').value = id;
    document.getElementById('update-title').value = title;
    document.getElementById('update-description').value = description;
    document.getElementById('updateForm').classList.add('show');
    document.getElementById('updateForm').style.display = 'block';
}

function updateTodo() {
    const id = document.getElementById('update-id').value;
    const title = document.getElementById('update-title').value;
    const description = document.getElementById('update-description').value;

    if (!title || !description) {
        alert('Both fields are required.');
        return;
    }

    fetch(`http://localhost:8000/todo/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, title, description })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        fetchTodos();
        document.getElementById('updateForm').classList.remove('show');
        document.getElementById('updateForm').style.display = 'none';
    })
    .catch(error => console.error('Error updating todo:', error));
}
