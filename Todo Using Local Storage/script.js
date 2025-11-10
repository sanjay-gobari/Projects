let TData = fetchData();

const add_btn = document.querySelector("#task-add");
const todoBox = document.querySelector("#todo-box");
const new_task = document.querySelector("#new-task-input");

const save_todo = document.querySelector("#save-todo");
const clear_todo = document.querySelector("#clear-todo");

const status_box = document.querySelector("#status-box");

const wlcm_msg = document.querySelector("#wlcm-msg")
const today_date = document.querySelector("#today-date")
const current_time = document.querySelector("#current-time")

let update_Status = false;
let current_id = undefined;
let save_status = true;
wlcm();
updateStatus();
// update previous todos
updateList();

// add new todo
add_btn.addEventListener("click", (e) => {
  const current_date = new Date();
  e.preventDefault();        // stop reload of page
  if (!update_Status) {      // check is updating or not
    if (!new_task.value) {   // check if user input value is not empty
      alert("enter task");
      new_task.focus();      // put cursor on input     
      return;
    }
    // console.log(new_task.value)
    save_status=false;
    const cTask = {
      task: new_task.value,
      createdOn: current_date.toLocaleDateString() + "," + current_date.toLocaleTimeString(),
      taskStatus: false,
    }
    new_task.value = "";
    // console.log(cTask)
    TData.push(cTask);
    updateList();
    new_task.focus();
  }
  else {
    if (new_task.value) {
      TData[current_id].task = new_task.value;
      TData[current_id].createdOn = current_date.toLocaleDateString() + "," + current_date.toLocaleTimeString();
      save_status=false;
      update_Status = false;
      new_task.value = ""
      updateList()
      new_task.focus();
    }
    else {
      alert("enter task");
      return;
    }

  }
})
// refresh todo list
function updateList() {
  if (!TData || TData.length == 0) {
    todoBox.innerHTML = "<p class='text-2xl text-center'>No Data</p>";
    return;
  }
  const Cdata = TData.map((elm, i) => {
    return (`
      <div id="li${i}" class="flex flex-col md:flex-row justify-between items-center outline outline-2 outline-offset-2 bg-[#262626] rounded-lg gap-2 p-2 md:p-4 mb-4 mx-2 ${elm.taskStatus ? "outline-green-500/50" : "outline-red-500/50"}">
        <div class="flex items-center gap-2">
          <p>${i + 1}.</p>
          <input id="checkbox-${i}" type="checkbox" class="checkbox-1" ${elm.taskStatus ? "checked" : ""}>
          <p class="break-all">${elm.task}</p>
        </div>
        <div class="flex items-center text-sm md:text-base gap-2">
          <p class="text-gray-400">${elm.createdOn}</p>
          <div class="flex items-center gap-2">
            <button id="edit-${i}" class="button-1 button-edit" title="Edit" ><i class="ri-edit-line pointer-events-none"></i></button>
            <button id="delete-${i}" class="button-1 button-delete" title="Delete"><i class="ri-close-large-line pointer-events-none"></i></button>
          </div>
        </div>
      </div>
  `)
  }).join("")
  if (Cdata) {
    todoBox.innerHTML = Cdata;
  }
  else {
    todoBox.innerHTML = "";
  }
  updateStatus()
}


// perform edit and delete operations
todoBox.addEventListener("click", (ev) => {
  const Cdata = ev.target.id
  const action = Cdata.split("-")[0]
  const id = Cdata.split("-")[1]

  if (action == "delete") {
    save_status=false;
    TData.splice(id, 1)
  }
  else if (action == "edit") {
    update_Status = true;
    new_task.value = TData[id].task
    new_task.focus();
    current_id = parseInt(id);
  }
  else if (action == "checkbox") {
    save_status=false;
    ev.target.checked ? TData[id].taskStatus = true : TData[id].taskStatus = false;
  }
  else { return }
  updateList();
})

// save todo to localstorage
save_todo.addEventListener("click", () => {
  alert("data saved to local storage")
  localStorage.setItem('userTodos', JSON.stringify(TData));
  save_status=true;
  updateStatus();
})
// clear todo from localstorage
clear_todo.addEventListener("click", () => {
  if (confirm("do you want to clear all")) {
    localStorage.setItem('userTodos', null);
    RefreshData()
  }
})

// //clear all
// localStorage.clear();

function fetchData() {
  const storedData = JSON.parse(localStorage.getItem('userTodos'));
  if (storedData) {
    return storedData;
  }
  return [];
}


function RefreshData() {
  TData = [];
  TData = fetchData()
  updateList();
}

// update status

function updateStatus() {
  if (update_Status) {
    status_box.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="py-1 px-2 bg-[#404040] outline outline-yellow-500/75 w-fit rounded-md">
          Updating Task ${current_id + 1}
        </div>
        <button id="cancel-update" class="button-2 hvrt-p" title="Cancel update">
          <i class="ri-close-line pointer-events-none"></i>
        </button>
      </div>
    `;
    const cancelButton = document.querySelector("#cancel-update");
    cancelButton.addEventListener("click", () => {
      new_task.value = "";
      update_Status = false; // Update the status
      updateStatus();        // Refresh the status
    });
  } else {
    status_box.innerHTML = `
      <div class="py-1 px-2 bg-[#404040] outline outline-green-500/75 w-fit rounded-md">
        Adding task
      </div>
    `;
  }
  const elm = document.createElement("div")
if(!save_status){
  elm.innerHTML=`
  <div class="ml-4 py-1 px-2 bg-[#404040] outline outline-red-500/75 w-fit rounded-md">
    Not Saved
  </div>`
  status_box.appendChild(elm)
}
else{
  elm.innerHTML=`
  <div class="ml-4 py-1 px-2 bg-[#404040] outline outline-green-500/75 w-fit rounded-md">
    Saved
  </div>`
  status_box.appendChild(elm)
}
}

// update welcome message and set current day and date
function wlcm() {
  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
  const d = new Date();
  const cHour = d.getHours();
  const cDay = d.getDay();

  if (cHour < 12) {
    wlcm_msg.innerText = `Good Morning,User`;
  }
  else if (cHour >= 12 && cHour < 17) {
    wlcm_msg.innerText = `Good Afternoon,User`;
  }
  else if (cHour >= 17 && cHour < 20) {
    wlcm_msg.innerText = `Good Evening,User`;
  }
  else if (cHour >= 20) {
    wlcm_msg.innerText = `Enjoy the night ahead!,User`;
  }
  today_date.innerText=`${day[cDay]},${d.toLocaleDateString()}`;
  
current_time.innerText=`${new Date().toLocaleTimeString()}`;
setInterval(()=>{
  current_time.innerText=`${new Date().toLocaleTimeString()}`
},1000)
}