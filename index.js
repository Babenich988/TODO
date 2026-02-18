let add = document.getElementById("add");
let list=document.getElementById("list");
let doneLast=document.getElementById("doneLast");
let clean=document.getElementById("clean");
let doneById=document.getElementById("doneById");
let currentFilter = "all";
let tasks = [];
let a = 0;
let deleteButtons = document.getElementsByClassName("delete");
let div = document.getElementById("menu")
let button_all=document.createElement("button");
button_all.textContent="Все";
button_all.addEventListener("click", function(){
    currentFilter = "all";
    updateApp();
})
let button_active=document.createElement("button");
button_active.textContent="Активные";
button_active.addEventListener("click", function(){
    currentFilter = "active";
    updateApp();
})
let button_done=document.createElement("button");
button_done.addEventListener("click", function(){
    currentFilter = "done";
    updateApp();
})
div.append(button_all);
div.append(button_active);
div.append(button_done);
button_done.textContent="Выполненные";
add.addEventListener("click", function () {
    let text = document.getElementById("text").value;
    tasks.push({
        id: a,
        text: text,
        done: false
    });
    a++;
    updateApp();
});
doneById.addEventListener("click", function(){
    let id=document.getElementById("taskId").value;
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].id===Number(id)){
            tasks[i].done=!tasks[i].done;
            updateApp();
        }
    }
})
clean.addEventListener("click", function(){
    tasks=[];
    a=0;
    updateApp();
})
doneLast.addEventListener("click", function () {
    tasks[tasks.length - 1].done = !tasks[tasks.length - 1].done;
    updateApp();
})
function updateApp() {
    renderTasks();
}
function renderTasks() {
    list.innerHTML="";
    let filteredTasks = tasks;
    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => task.done === false);
    }
    else if (currentFilter === "done") {
        filteredTasks = tasks.filter(task => task.done === true);
    }
    for (let task of filteredTasks){
        let status = task.done === false ? "[]" : "[X]";
        let res = status+task.text;
        let div = document.createElement("div");
        div.className="list";
        let span = document.createElement("span");
        span.textContent=res;
        let button = document.createElement("button");
        button.textContent="Удалить";
        button.dataset.id = task.id;
        button.addEventListener("click", function(){
            const id = Number(this.dataset.id);
            // удаляем товар из корзины
            tasks = tasks.filter(item => item.id !== id);
            renderTasks();
        })
        let button_del=document.createElement("button");
        button_del.textContent=task.done===false?"Выполнить":"Отменить";
        button_del.dataset.id = task.id;
        button_del.addEventListener("click", function(){
            const id = Number(this.dataset.id);
            const task = tasks.find(t => t.id === id); // ищем по id
            task.done = !task.done;
            renderTasks();
        })
        let button_vis=document.createElement("button");
        button_vis.textContent=task.done===true?'Скрыть':'Показать';
        button_vis.addEventListener("click", function(){
            const div=this.parentElement;
            const span=div.querySelector("span");
            if(this.textContent==="Скрыть"){
                span.style.display="none";
                this.textContent="Показать";
            }
            else{
                span.style.display="inline";
                this.textContent="Скрыть";
            }
        })
        div.append(span);
        div.append(button);
        div.append(button_del);
        div.append(button_vis);
        list.append(div);
        // list.innerHTML += `<span>${res}</span><button type='button' data-id='${task.id}' class='delete'>Удалить</button><br>`;
    }
    // удаление одного товара по id
    // for (let i = 0; i < deleteButtons.length; i++) {
    //     deleteButtons[i].addEventListener("click", function () {
    //         const list = this.parentElement;
    //         const del = list.querySelector(".delete");
    //         const id = Number(del.dataset.id);
    //         // удаляем товар из корзины
    //         tasks = tasks.filter(item => item.id !== id);
    //         renderTasks();
    //     });
    // }
}

