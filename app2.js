let todos1 = []; // מערך שבו יאוחסנו כל המשימות

// פונקציה ליצירת מזהה ייחודי
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// פונקציה להוספת משימה חדשה
function addTodo(event) {
    event.preventDefault();
    
    // קבלת הערך של השדה input
    const input = document.querySelector('#todoInput');
    if (!input.value.trim()) {
        return; // מונע הוספת משימה ריקה
    }
    
    // יצירת אובייקט המשימה
    const todo = {
        id: generateId(),
        text: input.value,
        isDone: false
    };
    
    // הוספת המשימה למערך todos
    todos1.push(todo);
    
    // שמירת המשימות (נניח שאחסון מקומי)
    saveTodos();
    
    // רענון הרשימה
    renderTodos();
    
    // ניקוי שדה הקלט לאחר הוספת המשימה
    input.value = '';
}

const filterBtn = ()=>{
    debugger
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos1 = JSON.parse(savedTodos);
        const filterTodo = []
        todos1.forEach((element) => {
            if(element.isDone === false){
                filterTodo.push(element);
            }
        });
        renderTodos(filterTodo);
    
    }
}

// פונקציה לשמירת המשימות (לדוגמה, ל-LocalStorage)
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos1));
}

// פונקציה לטעינת המשימות מ-LocalStorage
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos1 = JSON.parse(savedTodos);
        renderTodos();
    }
}


// פונקציה לרנדר את המשימות בטבלה
function renderTodos(todos = todos1) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // מנקה את התוכן הקיים
    
    todos.forEach(todo => {
        const row = document.createElement('tr');
        
        const idCell = document.createElement('td');
        idCell.innerText = `${(todo.id.substr(0,3))}...`;
        row.appendChild(idCell);
        
        const textCell = document.createElement('td');
        textCell.innerText = todo.text;
        if(todo.isDone) textCell.style.textDecoration = 'line-through'
        row.appendChild(textCell);
        
        const statusCell = document.createElement('td');
        statusCell.innerText = todo.isDone ? 'הושלם' : 'לא הושלם';
        row.appendChild(statusCell);
        
        const actionsCell = document.createElement('td');
        
        // כפתור לסימון המשימה כהושלמה/לא הושלמה
        const toggleButton = document.createElement('button');
        toggleButton.innerText = todo.isDone ? 'בטל סיום' : 'סמן כהושלם';
        toggleButton.addEventListener('click', function() {
            todo.isDone = !todo.isDone;
             saveTodos(); // שמירה לאחר שינוי
            renderTodos(); // רענון הרשימה
        });
        actionsCell.appendChild(toggleButton);
        
        // כפתור לעדכון המשימה
        const editButton = document.createElement('button');
        editButton.innerText = 'עדכן משימה';
        editButton.addEventListener('click', function() {
            
            currentTodoId = todo.id; // זוכר את ה-ID של המשימה הנוכחית
            const popup = document.querySelector('.popup');
            popup.style.display = 'flex';
            const bodyContainer = document.querySelector('.body-container');
            bodyContainer.style.display = 'none';
            const body = document.querySelector('body')
            body.style.background = 'grey'
            
            const anulBtn = document.querySelector('.cansel-btn')
            anulBtn.addEventListener('click', () =>{
                const popup = document.querySelector('.popup');
                const bodyContainer = document.querySelector('.body-container')
                const body = document.querySelector('body')
                popup.style.display = 'none';
                bodyContainer.style.display = 'block';
                body.style.background = 'linear-gradient(120deg, #f6d365, #fda085)'
                
            })
            const editButton = document.querySelector('.edit-btn');
            editButton.addEventListener('click' , ()=>{
                const popup = document.querySelector('.popup');
                const bodyContainer = document.querySelector('.body-container')
                const body = document.querySelector('body')
                const input = document.querySelector('.pop-input')
                todo.text = input.value
                saveTodos();
                renderTodos();
                popup.style.display = 'none';
                bodyContainer.style.display = 'block';
                body.style.background = 'linear-gradient(120deg, #f6d365, #fda085)'
                
            })
        });
        actionsCell.appendChild(editButton);
        
        
        // כפתור למחיקת המשימה
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'מחק';
        deleteButton.addEventListener('click', function() {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos(); // שמירה לאחר מחיקה
            renderTodos(); // רענון הרשימה
        });
        actionsCell.appendChild(deleteButton);
        
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });
}



// בעת הטעינה של הדף, טוען את המשימות מ-LocalStorage
document.addEventListener('DOMContentLoaded', function() {
    loadTodos();
});
