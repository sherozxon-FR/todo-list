const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");

const createInput = document.getElementById("create-input");
const erroressage = document.getElementById("error-message");
const listItem = document.getElementById("listItem");
const listContainer = document.getElementById("listContainer");
const Delete = document.getElementById("delete");
const Edit = document.getElementById("edit");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeEL = document.getElementById("close");

// console.log(formCreate, createInput, erroressage, listContainer, listItem, Delete, Edit);

// times

const FullYear = document.getElementById("FullYear");
const Hour = document.getElementById("hour");
const Second = document.getElementById("second");
const Minutes = document.getElementById("minutes");

// console.log(FullYear, Hour, Second, Minutes );

// locol storage check

let editItem;

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) {
  showTodos();
}

//   set todos storage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

// time

function getTime() {
  const now = new Date();
  const Day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const Month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const Year = now.getFullYear();
  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  const month = [
    "junuary",
    "february",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "Octember",
    "November",
    "December",
  ];

  const month_title = now.getMonth();
  FullYear.textContent = `${Day}, ${month[month_title]}, ${Year}`;
  Hour.textContent = `${hour} : `;
  Minutes.textContent = `${minutes} :`;
  Second.textContent = `${second} `;

  return `${hour}: ${minutes} / ${Day}: ${Month}: ${Year}`;
}
setInterval(getTime, 1000);

// DeleteItem

function DeleteItem(id) {
  const DeleteTodo = todos.filter((item, i) => {
    return i !== id;
  });

  todos = DeleteTodo;
  setTodos(); // set local storege
  showTodos(); // getlocal storage
}

//EditTodo
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formEdit["create-input"].value.trim();
  formEdit.reset();
  if (todoText.length) {
    todos.splice(editItem, 1, {
      text: todoText,
      time: getTime(),
      completed: false,
    });
    setTodos();
    showTodos();

    close();
  } else {
    showMessage("message-edit", "Please  enter some text...");
  }
});

function EditTodo(id) {
  open();
  editItem = id;
}
overlay.addEventListener("click", close);
closeEL.addEventListener("click", close);
document.addEventListener("keydown", (e) => {
  if (e.which == 13) {
    close();
  }
});
function open() {
  modal.classList.remove("hiden");
  overlay.classList.remove("hiden");
}
function close() {
  modal.classList.add("hiden");
  overlay.classList.add("hiden");
}

// SetComleted
function SetComleted(id) {
  const SetComleted = todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });
  // alert('nimadur hatoo');

  todos = SetComleted;
  setTodos();
  showTodos();
}

// show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listContainer.innerHTML = "";
  todos.forEach((element, index) => {
    listContainer.innerHTML += `
     <div   ondblclick=(SetComleted(${index})) class="listItem  
     ${element.completed == true ? "complated" : ""}" 

  id="listItem ">
     <li class="list" id="listCreate">${element.text}  </li>
          <p></p> <p></p>
      <p class="times" id="times">${element.time}</p>
    <div class="image">
  <img  onclick=(EditTodo(${index})) src="./image/edit.webp" alt="edit" width="15" height="15" id="edit" />
  <img   onclick=(DeleteItem(${index}))
    src="./image/delete.webp"
    alt=" delete"
    width="15"
    height="15"
    id="delete"
  />
</div>
</div> `;
  });
}

//   error message
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

//   add todos
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["create-input"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), completed: false });
    setTodos();
    showTodos();
  } else {
    showMessage("error-message", "Please  enter some text...");
  }
});

//edit todo
