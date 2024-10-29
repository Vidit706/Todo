let tableBody = document.getElementById("todoTableBody");
let prioritySelect = document.getElementById("prioritySelect");
let statusSelect = document.getElementById("statusSelect");


function displayTodo(arr) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    tableBody.innerHTML = ""
    arr.map((el, i) => {
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");


        // Restore functionality
        let restore = document.createElement("button")
        restore.textContent = "Restore"
        restore.class = "restoreBtn"
        restore.addEventListener("click", function () {
            let archive = JSON.parse(localStorage.getItem("archive"));
            let todos = JSON.parse(localStorage.getItem("todos")) || [];
            let filteredData = archive.filter((ele, index) => {
                return i != index;
            });

            todos.push(el)
            localStorage.setItem("todos", JSON.stringify(todos))
            localStorage.setItem("archive", JSON.stringify(filteredData))
            displayTodo(filteredData);
        });

        // Delete functionality
        let deletebtn = document.createElement("button")
        deletebtn.textContent = "Delete"
        deletebtn.class = "deleteBtn"
        deletebtn.addEventListener("click", function () {
            let archive = JSON.parse(localStorage.getItem("archive"));
            let filteredData = archive.filter((ele, index) => {
                return i != index;
            });

            localStorage.setItem("archive", JSON.stringify(filteredData))
            displayTodo(filteredData);
        });

        td1.innerText = el.name;
        td2.innerText = el.priority;
        td3.innerText = el.status;
        td4.append(restore);
        td5.append(deletebtn)
        deletebtn.style.backgroundColor = "red"
        deletebtn.style.borderRadius = "5px"
        deletebtn.style.color = "white"
        deletebtn.style.border = "red"


        if (el.priority == "medium") {
            td2.style.backgroundColor = "yellow"
        } else if (el.priority == "high") {
            td2.style.backgroundColor = "red"
        }

        let tr = document.createElement("tr");
        tr.append(td1, td2, td3, td4, td5);
        tableBody.append(tr);
    })

}
let archive = JSON.parse(localStorage.getItem("archive"))
displayTodo(archive);


// select status functionality
statusSelect.id = "statusselect"
statusSelect.addEventListener("change", function () {
    // console.log(statusSelect.value)
    let archive = JSON.parse(localStorage.getItem("archive")) ;
    let filteredData = archive.filter((el, i) => {
        if (el.status == statusSelect.value) {
            return el;
        }
    })
   
    displayTodo(filteredData);
});

prioritySelect.id = "prioritySelect"
prioritySelect.addEventListener("change", function () {

    let archive = JSON.parse(localStorage.getItem("archive")) ;
    let filteredData = archive.filter((el, i) => {
        if (el.priority == prioritySelect.value) {
            return el;
        }
    })
   
    displayTodo(filteredData);
});