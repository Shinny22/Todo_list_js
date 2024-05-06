const todo_input = document.querySelector("#todo_input");
const add_task = document.querySelector("#add_task");
let items = JSON.parse(localStorage.getItem("todos")) || [];

// Sauvegarde des tâches dans le stockage local
function create_local_storage() {
	localStorage.setItem("todos", JSON.stringify(items));
}

// Ajout d'une tâche
function add_taskLocalStorage(task) {
	items.push(task);
	create_local_storage();
}
function delete_taskLocalStorage(task) {
	items.delete(task);
	localStorage.removeItem(task);
}

// Événement pour ajouter une tâche lorsque le bouton est cliqué
add_task.addEventListener("click", () => {
	let task = todo_input.value.trim();

	if (task !== "") {
		add_taskLocalStorage(task);
		printTasks();
		todo_input.value = "";
	}
});

// Fonction pour créer un bouton de suppression
function createButtonDelete(taskElement) {
	let buttonDelete = document.createElement("label");
	buttonDelete.classList = "btn btn-danger btn-sm ms-2 ms-auto";
	buttonDelete.innerHTML = '<i class="bi bi-trash"></i>';

	buttonDelete.addEventListener("click", () => {
		taskElement.remove();
		delete_taskLocalStorage(task);
	});

	return buttonDelete;
}

// Fonction pour créer un bouton de modification
function createButtonModify(label) {

	let buttonModify = document.createElement("label");
	buttonModify.classList = "btn btn-primary btn-sm ms-2";
	buttonModify.innerHTML = '<i class="bi bi-pencil"></i>';

    buttonModify.addEventListener("click", () => {
		label.textContent = prompt("ENTER LA TACHE A MODIFIER")
		
	});
	return buttonModify;
}

// Affichage des tâches
function printTasks() {
	let tasksContainer = document.querySelector("#tasksContainer");
	tasksContainer.innerHTML = "";

	items.forEach((element) => {
		let taskElement = document.createElement("li");
		taskElement.classList = "todo list-group-item d-flex align-items-center";

		// Création de l'étiquette
		let label = document.createElement("label");
		label.classList = "ms-2 form-check-label";
		label.textContent = element;

		// Création de la case à cocher
		let inputCheck = document.createElement("input");
		inputCheck.type = "checkbox";
		inputCheck.classList = "form-check-input";

		// Ajout d'un gestionnaire d'événements pour mettre à jour le style lorsque la case à cocher est cochée ou décochée
		inputCheck.addEventListener("change", () => {
			taskCompleted(label, inputCheck);
		});

		// Ajout des éléments à la tâche
		taskElement.appendChild(inputCheck);
		taskElement.appendChild(label);
		taskElement.appendChild(createButtonDelete(taskElement));
		taskElement.appendChild(createButtonModify(label));

		// Ajout de la tâche à la liste des tâches
		tasksContainer.appendChild(taskElement);

		// Mettre à jour le style initial
		taskCompleted(label, inputCheck);
	});
}

// Fonction pour indiquer qu'une tâche est terminée
function taskCompleted(label, inputCheck) {
	if (inputCheck.checked) {
		label.style.cssText =
			"font-style: italic; color: gray; text-decoration: line-through;";
	} else {
		label.style.cssText = "";
	}
}

// Appel de la fonction pour afficher les tâches initiales
printTasks();
