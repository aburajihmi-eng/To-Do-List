let taskList = document.getElementById("taskList");

window.onload = loadTasks;

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (text === "") return;

  let task = { text: text, done: false };
  saveTask(task);
  renderTask(task);

  input.value = "";
}

function renderTask(task) {
  let li = document.createElement("li");
  li.textContent = task.text;

  if (task.done) li.classList.add("completed");

  li.onclick = () => {
    task.done = !task.done;
    updateStorage();
    li.classList.toggle("completed");
  };

  let del = document.createElement("span");
  del.textContent = "🗑️";
  del.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    removeTask(task.text);
  };

  li.appendChild(del);
  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(renderTask);
}

function updateStorage() {
  let tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.childNodes[0].textContent,
      done: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}