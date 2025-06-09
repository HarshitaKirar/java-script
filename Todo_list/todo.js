document.addEventListener("DOMContentLoaded", () => {
  //challenge 1
  const todoInput = document.getElementById("todo-input");
  const taskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let arr = JSON.parse(localStorage.getItem("arr")) || [];
  arr.forEach((task) => renderTask(task));

  taskButton.addEventListener("click", function () {
    const todoTask = todoInput.value.trim(); //remove the space before or after text
    if (todoTask == "") return; //if anybody inserted blank string

    const newTask = {
      //creating a unique id for every new item
      id: Date.now(),
      text: todoTask,
      completed: false,
    };
    arr.push(newTask);
    savetasks();
    renderTask(newTask);
    todoInput.value = ""; //clear the input task
  });

  //challenge2
  //storing in local storage
  function renderTask(Task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", Task.id);
    if (Task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${Task.text}</span>
    <button>delete</button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      Task.completed = !Task.completed;
      li.classList.toggle("completed");
      savetasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      arr = arr.filter((t) => t.id !== Task.id);
      li.remove();
      savetasks();
    });

    todoList.appendChild(li);
  }

  function savetasks() {
    localStorage.setItem("arr", JSON.stringify(arr)); //localstorage:invoke the api of local storage
    //can't add arr directly or any complex datatype convert it into string first simple way is jSON
  }
});
