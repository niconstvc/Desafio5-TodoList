const taskList = document.querySelector("#tableList");
const taskInput = document.querySelector("#newTask");
const btnAggTask = document.querySelector("#aggTask");
const statistics = document.querySelector("#statistics");
const statistics1 = document.querySelector("#statistics1");

let idCounter = 3;

const tasks = [
  {
    id: Date.now(),
    description: "Despertar",
    ID: 16,
    completed: false,
  },
  {
    id: Date.now(),
    description: "Bañarse",
    ID: 60,
    completed: false,
  },
  {
    id: Date.now(),
    description: "Irse a trabajar",
    ID: 24,
    completed: true,
  },
];

function renderList() {
  let html = "";
  tasks.forEach(function (task) {
    html += ` 
      <tr>
          <td>
              <p>${task.ID}</p>
          </td>
          <td>
              <p ${task.completed ? 'class="taskColor"' : ""}>${
      task.description
    }</p>
          </td>
          <td>
              <label for="checkbox${task.ID}">
                  <input type="checkbox" id="${task.ID}" ${
      task.completed ? "checked" : ""
    }>
              </label>
          </td>
          <td>
              <button class="btn-2" onclick="deletes(${
                task.id
              })"><p style="color: red;">X</p></button>
          </td>
      </tr>`;
  });
  taskList.innerHTML = html;

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const taskId = parseInt(this.id);
      const index = tasks.findIndex((task) => task.ID === taskId);
      updateTaskStatus(index);
      renderList();
    });
  });

  updateStacts();
  concatenateCompletedTasks(tasks);
}

let updateStacts = () => {
  statistics.innerHTML = `
<li class="total">Total tareas: <strong>${tasks.length}</strong></li>
`;
};

function deletes(id) {
  const index = tasks.findIndex((ele) => ele.id == id);
  tasks.splice(index, 1);
  renderList(tasks);
}

function updateTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
}

function countCompletedTasks(tasks) {
  const completedTasks = tasks.filter((task) => task.completed === true);
  return completedTasks.length;
}

function concatenateCompletedTasks(tasks) {
  const completedCount = countCompletedTasks(tasks);
  statistics1.innerHTML = `
<li class="total">Total tareas realizadas: <strong>${completedCount}</strong></li>
`;
}

btnAggTask.addEventListener("click", () => {
  const taskName = taskInput.value;
  idCounter++;

  if (taskName) {
    tasks.push({
      id: Date.now(),
      description: taskName,
      ID: idCounter,
      completed: false,
    });

    taskInput.value = "";

    renderList();
  }
});

renderList();