const soldiers = JSON.parse(localStorage.getItem("soldiers")) || [];

function addSoldier(event) {
    event.preventDefault();
    debugger
    // קבלת הערך של השדה input
    const nameInput = document.querySelector('#name-input');
    const rankInput = document.querySelector('#rank-input');
    const roleInput = document.querySelector('#role-input');
    const companyInput = document.querySelector('#company-input');
    const statusOption = document.querySelector('#status-option');
    
    
    // יצירת אובייקט המשימה
    const  soldier = {
        name: nameInput.value,
        rank: rankInput.value,
        role: roleInput.value,
        company: companyInput.value,
        status: statusOption.value,
        time: 5
    };
    
    // הוספת המשימה למערך 
    soldiers.push(soldier);
    
    // שמירת המשימות (נניח שאחסון מקומי)
    saveSoldiers();
    
    // רענון הרשימה
    renderSoldiers();
    
    // ניקוי שדה הקלט לאחר הוספת המשימה
    nameInput.value = ''
    rankInput.value = ''
    roleInput.value = ''
    companyInput.value = ''
    
}
const submitBtn = document.querySelector('#submit-btn')
submitBtn.addEventListener('click',addSoldier)

function saveSoldiers() {
    
    localStorage.setItem('soldiers', JSON.stringify(soldiers));
}
function loadSoldiers() {
        renderSoldiers();
    
}

// פונקציה לרנדר את המשימות בטבלה
function renderSoldiers(soldiersf = soldiers) {
    debugger
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // מנקה את התוכן הקיים
    
    soldiersf.forEach(soldier => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.innerText = soldier.name
        row.appendChild(nameCell);
        
        const tankCell = document.createElement('td');
        tankCell.innerText = soldier.tank
        row.appendChild(tankCell);
        
        const roleCell = document.createElement('td');
        roleCell.innerText = soldier.role
        row.appendChild(roleCell);

        const companyCell = document.createElement('td');
        companyCell.innerText = soldier.company
        row.appendChild(companyCell);
        

        const actionsCell = document.createElement('td');
        
        // // כפתור לסימון המשימה כהושלמה/לא הושלמה
        // const toggleButton = document.createElement('button');
        // toggleButton.innerText = todo.isDone ? 'בטל סיום' : 'סמן כהושלם';
        // toggleButton.addEventListener('click', function() {
        //     todo.isDone = !todo.isDone;
        //     saveSoldiers(); // שמירה לאחר שינוי
        //     renderSoldiers(); // רענון הרשימה
        // });
        // actionsCell.appendChild(toggleButton);
        
        // כפתור לעדכון המשימה
        // const editButton = document.createElement('button');
        // editButton.innerText = 'עדכן משימה';
        // editButton.addEventListener('click', function() {
            
        //     currentTodoId = todo.id; // זוכר את ה-ID של המשימה הנוכחית
        //     const popup = document.querySelector('.popup');
        //     popup.style.display = 'flex';
        //     const bodyContainer = document.querySelector('.body-container');
        //     bodyContainer.style.display = 'none';
        //     const body = document.querySelector('body')
        //     body.style.background = 'grey'
            
        //     const anulBtn = document.querySelector('.cansel-btn')
        //     anulBtn.addEventListener('click', () =>{
        //         const popup = document.querySelector('.popup');
        //         const bodyContainer = document.querySelector('.body-container')
        //         const body = document.querySelector('body')
        //         popup.style.display = 'none';
        //         bodyContainer.style.display = 'block';
        //         body.style.background = 'linear-gradient(120deg, #f6d365, #fda085)'
                
        //     })
        //     const editButton = document.querySelector('.edit-btn');
        //     editButton.addEventListener('click' , ()=>{
        //         const popup = document.querySelector('.popup');
        //         const bodyContainer = document.querySelector('.body-container')
        //         const body = document.querySelector('body')
        //         const input = document.querySelector('.pop-input')
        //         todo.text = input.value
        //         saveTodos();
        //         renderTodos();
        //         popup.style.display = 'none';
        //         bodyContainer.style.display = 'block';
        //         body.style.background = 'linear-gradient(120deg, #f6d365, #fda085)'
                
        //     })
        // });
        // actionsCell.appendChild(editButton);
        
        
        // כפתור למחיקת המשימה
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'מחק';
        deleteButton.addEventListener('click', function() {
            soldiersf = soldiersf.filter(s => s.name !== soldier.name);
            saveSoldiers(); // שמירה לאחר מחיקה
            renderSoldiers(); // רענון הרשימה
        });
        actionsCell.appendChild(deleteButton);
        
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });
}



// בעת הטעינה של הדף, טוען את המשימות מ-LocalStorage
document.addEventListener('DOMContentLoaded', function() {
    loadSoldiers();
});
