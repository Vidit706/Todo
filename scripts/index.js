let addTodoButton = document.getElementById("addBtn");
let tableBody = document.getElementById("todoTableBody");
let inputTitle = document.getElementById("todoName");
let prioritySelect = document.getElementById("priority");

addTodoButton.addEventListener("click", function () {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    if (todos.title == "") {
        alert("todo cannot be empty");

    }
    else {
        let singletodo = {
            name: inputTitle.value,
            priority: prioritySelect.value,
            status: "Pending🔃" // by default have another option "Completed✅"

        }
        todos.push(singletodo);
        localStorage.setItem("todos", JSON.stringify(todos))
        alert("todos added sucessfully");
        displayTodo(todos);
    }



})


function displayTodo(arr) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    tableBody.innerHTML = ""
    arr.map((el, i) => {
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let stabtn = document.createElement("button");
        stabtn.textContent = el.status
        stabtn.class = "toggle"
        stabtn.addEventListener("click", function () {
            if (el.status == "Pending🔃") {
                el.status = "Completed✅"
            } else {
                el.status = "Pending🔃"
            }
            localStorage.setItem("todos", JSON.stringify(arr))
            displayTodo(arr)
        })
        let archiveBtn = document.createElement("button")
        archiveBtn.textContent = "Archive"
        archiveBtn.class = "archiveBtn"
        archiveBtn.addEventListener("click", function () {
            let filterdData = arr.filter((ele, index) => {
                return index != i;
            });
            // console.log(filterdData)
            let archive = JSON.parse(localStorage.getItem("archive")) || []
            archive.push(el)
            localStorage.setItem("archive",JSON.stringify(archive));
            localStorage.setItem("todos", JSON.stringify(filterdData));
            displayTodo(filterdData);
        })

        td1.innerText = el.name;
        td2.innerText = el.priority;
        td3.append(stabtn);


        if (el.priority == "medium") {
            td2.style.backgroundColor = "yellow"
        } else if (el.priority == "high") {
            td2.style.backgroundColor = "red"
        }
        td4.append(archiveBtn)
        let tr = document.createElement("tr");
        tr.append(td1, td2, td3, td4);
        tableBody.append(tr);
    })

}
let todos = JSON.parse(localStorage.getItem("todos")) || [];
displayTodo(todos);