const tasksList = document.querySelector(".task_list");
const addBtn = document.querySelector(".add_btn");
const numOfTasksText = document.querySelector(".num_of_tasks");
const inputText = document.querySelector("input[type='text']");
const placeHolder = document.querySelector(".container2");
const veiwTasks = document.querySelector(".container1");
const showAll = document.querySelector(".diplay_all");
const showCompleted = document.querySelector(".display_completed");
const showActive = document.querySelector(".display_active");
const taskTitle = document.querySelector("span");

let tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks == null) tasks = [];
let active = false;
let completed = false;
let fromDisplayBtn = false;

tasksList.addEventListener("change", function (e) {
  if (e.target.type === "checkbox") {
    taskCompleted(e);
  }
});
addBtn.addEventListener("click", addTask);
showAll.addEventListener("click", () => displayTasks(false, false));
showActive.addEventListener("click", () => displayTasks(true, false));
showCompleted.addEventListener("click", () => displayTasks(false, true));
tasksList.addEventListener("click", function (e) {
  if (e.target.closest(".delete_btn")) deleteTask(e);
});
tasksList.addEventListener("click", function (e) {
  if (e.target.closest(".edit_button")) editTask(e);
});

displayTasks();

function addTask() {
  let taskExit = false;
  const newTask = {
    taskName: inputText.value,
    taskStatus: false,
  };
  if (newTask.taskName == "" || newTask.taskName.replaceAll(" ", "") == "") {
    alert("ADD YOUR TASK!!");
    return;
  }
  tasks.forEach(function (task) {
    if (task.taskName.toLowerCase() === newTask.taskName.toLowerCase()) {
      alert("This task exits already!!");
      inputText.value = "";
      taskExit = true;
    }
  });
  if (taskExit) return;
  tasks.push(newTask);
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  if (tasks.length >= 1) {
    placeHolder.style.display = "none";
    veiwTasks.style.display = "flex";
  }
  numOfTasksText.innerText = `${tasks.length}`;
  const task = document.createElement("div");
  task.className = "task animate__animated animate__fadeInUp";
  task.innerHTML = `
        <div class="subContainer">
          <input type="checkbox" ${task.taskStatus ? "checked" : ""} /> <span class="task_name ${task.taskStatus ? "checked" : ""}">${newTask.taskName}</span>
        </div>
        <div class="buttonContainer2">
          <button class="edit_button">
            <svg class="edit-svgIcon" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
          </button>
          <button class="btn delete_btn">
            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
              <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
            </svg>
          </button>
        </div>`;
  tasksList.appendChild(task);
  inputText.value = "";
  return;
}
function displayTasks(active, completed) {
  const numOfTasks = tasks.length;
  if (numOfTasks >= 1) {
    placeHolder.style.display = "none";
    veiwTasks.style.display = "flex";
  }
  numOfTasksText.innerText = `${numOfTasks}`;
  if (active === true) {
    tasksList.innerHTML = ``;
    showAll.style.color = "#6a7282";
    showActive.style.color = "black";
    showCompleted.style.color = "#6a7282";
    tasks.forEach(function (task) {
      if (task.taskStatus === false) {
        tasksList.innerHTML += ` 
          <div class="task animate__animated animate__fadeInUp">
            <div class="subContainer">
              <input type="checkbox" ${task.taskStatus ? "checked" : ""} /> <span class="task_name ${task.taskStatus ? "checked" : ""}">${task.taskName}</span>
            </div>
            <div class="buttonContainer2">
              <button class="edit_button">
              <svg class="edit-svgIcon" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button>
            <button class="btn delete_btn">
              <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
              </svg>
            </button>
            </div>
          </div>`;
      }
    });
  } else if (completed === true) {
    tasksList.innerHTML = ``;
    showAll.style.color = "#6a7282";
    showActive.style.color = "#6a7282";
    showCompleted.style.color = "black";
    tasks.forEach(function (task) {
      if (task.taskStatus === true) {
        tasksList.innerHTML += `
          <div class="task animate__animated animate__fadeInUp">
            <div class="subContainer">
              <input type="checkbox" ${task.taskStatus ? "checked" : ""} /> <span class="task_name ${task.taskStatus ? "checked" : ""}">${task.taskName}</span>
            </div>
            <div class="buttonContainer2">
              <button class="edit_button">
              <svg class="edit-svgIcon" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button>
            <button class="btn delete_btn">
              <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
              </svg>
            </button>
            </div>
          </div>`;
      }
    });
  } else {
    tasksList.innerHTML = ``;
    showAll.style.color = "black";
    showActive.style.color = "#6a7282";
    showCompleted.style.color = "#6a7282";
    tasks.forEach(function (task) {
      tasksList.innerHTML += ` 
        <div class="task animate__animated animate__fadeInUp">
          <div class="subContainer">
            <input type="checkbox" ${task.taskStatus ? "checked" : ""} /> <span class="task_name ${task.taskStatus ? "checked" : ""}">${task.taskName}</span>
          </div>
          <div class="buttonContainer2">
            <button class="edit_button">
            <svg class="edit-svgIcon" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
          </button>
          <button class="btn delete_btn">
            <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
              <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
            </svg>
          </button>
          </div>
        </div>`;
    });
  }
}
function deleteTask(e) {
  const deleteBtn = e.target;
  const taskElement = deleteBtn.closest(".task");
  const deleteTaskName = taskElement.querySelector(".task_name").innerText;
  tasks.forEach(function (task, index) {
    if (deleteTaskName == task.taskName) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  if (!tasks.length) {
    placeHolder.style.display = "flex";
    veiwTasks.style.display = "none";
  }
  numOfTasksText.innerText = `${tasks.length}`;
  taskElement.remove();
}
function editTask(e) {
  const editBtn = e.target;
  const taskElement = editBtn.closest(".task");
  const taskNameElement = taskElement.querySelector(".task_name");
  let newTaskName = prompt("Enter the task new name:");
  tasks.forEach(function (task, index) {
    if (taskNameElement.innerText == task.taskName) {
      task.taskName = newTaskName;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskNameElement.innerText = newTaskName;
}
function taskCompleted(e) {
  const checkbox = e.target;
  const checkTaskName = checkbox.closest(".task").querySelector(".task_name");
  tasks.forEach(function (task) {
    if (checkTaskName.innerText == task.taskName) {
      task.taskStatus = checkbox.checked;
    }
  });
  checkTaskName.classList.toggle("checked", checkbox.checked);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
