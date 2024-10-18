const inputBox = document.querySelector(".inputBox");
const  taskList = document.querySelector(".tasklist");

function addbutton(){
    if(inputBox.value === ""){
        alert("You must write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML=inputBox.value;
        taskList.appendChild(li);
        let span = document.createElement("span")
        span.innerHTML= "\u00D7";
        li.appendChild(span);
    }
    inputBox.value="";
    saveData();
}
taskList.addEventListener("click", function (event) {
  if(event.target.tagName === "LI")  {
    event.target.classList.toggle("checked")
    saveData();
  }
  else if(event.target.tagName === "SPAN"){
    event.target.parentElement.remove();
    saveData();
  }
},false);

function saveData() {
    localStorage.setItem("data", taskList.innerHTML)
}
function showData() {
    taskList.innerHTML = localStorage.getItem("data")
}
showData();