// Referencias necesarias
const listItems = document.getElementById("list-items");
const taskInput = document.getElementById("input");
const btnAdd = document.getElementById("btn-add");
const buttons = document.querySelectorAll("button");

// Arrey para guardar las tareas
let tasks = [];

function addTaskToList(taskList, task) {
  return [...taskList, task];
}

function renderListTasks(taskList) {
  listItems.innerHTML = "";

  taskList.forEach((element, index) => {
    const itemLi = document.createElement("li");
    itemLi.classList.add("item");
    itemLi.textContent = element;
    itemLi.dataset.id = index;

    const containerButtons = document.createElement("div");
    containerButtons.classList.add("container-buttons");

    const btnUnderline = document.createElement("button");
    btnUnderline.classList.add("btn-underline");
    btnUnderline.textContent = "Completada";
    btnUnderline.name = "underline";
    // btnUnderline.dataset.id = tasks.length - 1;

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-delete");
    btnDelete.textContent = "Borrar";
    btnDelete.name = "delete";
    // btnDelete.dataset.id = tasks.length - 1;

    containerButtons.appendChild(btnUnderline);
    containerButtons.appendChild(btnDelete);

    itemLi.appendChild(containerButtons);

    listItems.appendChild(itemLi);
  });
}

btnAdd.addEventListener("click", () => {
  const inputValue = taskInput.value.trim();

  if (inputValue === "") {
    showError("No escribiste nada en el input.");
    return;
  }

  const task = addTaskToList(tasks, inputValue);
  // se actualiza el valor del arreglo original a la referencia de la funcion agregar
  tasks = task;
  // con esta llamada mostramos lo que hay en el arreglo
  renderTasks(task);

  // limpiar input despues de agregar tarea
  inputText.value = "";
});

listItems.addEventListener("click", (e) => {
  const target = e.target;

  if (target) {
    // obtengo el name del boton para verificar cual fue cliceado
    const btnName = target.name;

    // con closest 'li' obtengo el objeto html al que pertenece osea el li element
    const elementLi = target.closest("li");

    if (elementLi !== null) {
      const elementLiId = elementLi.dataset.id;
      //console.log(`elementLiId, su tipo de dato es ${typeof elementLiId}`);

      if (btnName === "underline") {
        toggleTaskCompleted(elementLi);
      } else if (btnName === "delete") {
        if (tasks.length !== 0) {
          // Filtramos la tarea por índice para eliminarla (basado en data-id)
          tasks = removeTaskById(tasks, elementLiId);
          renderListTasks(tasks);
        } else {
          console.log("El arreglo esta vacio");
        }
      }
    }
  }
});

function toggleTaskCompleted(element) {
  element.classList.toggle("toggle-underline");
}

function removeTaskById(arrTasks, idItem) {
  return arrTasks.filter((_, index) => index !== parseInt(idItem));
}

function showError(message) {
  const p = document.createElement("p");
  p.textContent = message;
  p.classList.add("error-message");
  listItems.appendChild(p);
}
