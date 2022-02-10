
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const completedTask = document.querySelector(".completed-tasks");

loadToList();
todoButton.addEventListener("click", addToList);


function loadToList(list = JSON.parse(localStorage.getItem("list"))) {

    if (list) {
        list.forEach(function(todo) {
            const newTodo = document.createElement("li");
            newTodo.id = todo.id;

            const label = document.createElement("label");
            label.innerHTML = todo.data;

            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "name";
            checkbox.className = "checkbox";

            if (todo.isCompleted) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }

            newTodo.appendChild(checkbox);
            newTodo.appendChild(label);

            if (checkbox.checked) {
                completedTask.appendChild(newTodo);
            } else {
                todoList.appendChild(newTodo);
            }

            checkbox.addEventListener('click', function() {
                const parent = this.parentNode;
                parent.remove();

                var index;
                if (checkbox.checked) {
                    completedTask.appendChild(parent);
                    changeState(parent.id);

                } else {
                    todoList.appendChild(parent);
                    changeState(parent.id);

                }
            });

        });



    } else {
        return null;
    }
}


function addToList(event) {
    event.preventDefault();
    const data = todoInput.value;
    console.log(data);

    if (data) {
        const list = !localStorage.getItem("list") ? [] :
            JSON.parse(localStorage.getItem("list"));

        const currentTodo = {
            id: new Date().getTime(),
            data: data,
            isCompleted: false
        }
        loadToList([currentTodo]);
        list.push(currentTodo);
        localStorage.setItem("list", JSON.stringify(list));

    }
}


//
function changeState(id) {
    const temp = JSON.parse(localStorage.getItem("list"));
    var index = temp.findIndex(std => std.id == id); 
    if (temp[index].isCompleted) {
        temp[index].isCompleted = false;
    } else {
        temp[index].isCompleted = true;
    }
    localStorage.setItem("list", JSON.stringify(temp));

}
