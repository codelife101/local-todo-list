//Selectors

const toDoInput = document.querySelector(".toDoInput");
const toDoBtn = document.querySelector(".toDoBtn");
const toDoList = document.querySelector(".toDoList");
const filterOption = document.querySelector(".filterToDo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getToDos);
toDoBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterToDo);

// Funtions

function addToDo(event) {
  //prevent form from submitting
  event.preventDefault();
  //   toDo Div
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("toDo");
  //Create Li
  const newToDo = document.createElement("li");
  newToDo.innerText = toDoInput.value;
  newToDo.classList.add("toDoItem");
  toDoDiv.appendChild(newToDo);

  saveLocalToDos(toDoInput.value);

  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completedBtn");
  toDoDiv.appendChild(completedButton);

  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trashBtn");
  toDoDiv.appendChild(trashButton);
  //appened to list
  toDoList.appendChild(toDoDiv);
  toDoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trashBtn") {
    const toDo = item.parentElement;
    toDo.classList.add("fall");
    removeLocalToDos(toDo);
    toDo.addEventListener("transitionend", function () {
      toDo.remove();
    });
  }

  if (item.classList[0] === "completedBtn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterToDo(e) {
  const toDos = toDoList.childNodes;

  toDos.forEach(function (toDo) {
    switch (e.target.value) {
      case "all":
        toDo.style.display = "flex";
        break;
      case "completed":
        if (toDo.classList.contains("completed")) {
          toDo.style.display = "flex";
        } else {
          toDo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!toDo.classList.contains("completed")) {
          toDo.style.display = "flex";
        } else {
          toDo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalToDos(toDo) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  toDos.push(toDo);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function removeLocalToDos(toDo) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  console.log(toDo);
  const toDoIndex = toDo.children[0].innerText;
  toDos.splice(toDos.indexOf(toDoIndex), 1);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function getToDos() {
  console.log("hello");
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  toDos.forEach(function (toDo) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("toDo");
    //Create Li
    const newToDo = document.createElement("li");
    newToDo.innerText = toDo;
    newToDo.classList.add("toDoItem");
    toDoDiv.appendChild(newToDo);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completedBtn");
    toDoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trashBtn");
    toDoDiv.appendChild(trashButton);
    //appened to list
    toDoList.appendChild(toDoDiv);
  });
}
