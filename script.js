const list = document.querySelector('.list');
const newTaskModalTrigger = document.querySelector('.newTaskModalTrigger');
const editButton = document.querySelector('.editButton');
const addBtn = document.querySelector('.add');


// it will turn an empty array if the LocalStorage was empty
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIcon, editSpan, deleteIcon, deleteSpan, li, taskSpan;

// add task
addBtn.addEventListener('click', e => {
	e.preventDefault();
	const taskInput = document.querySelector('.taskInput');
	if (taskInput.value == '' || taskInput.value == null) return;
	tasks.push({
		title: taskInput.value,
		done: false,
		id: tasks.length + 1
	});
	// save value of the input in LocalStorage
	localStorage.setItem('tasks', JSON.stringify(tasks));
	renderDOM(taskInput.value);
	let allLi = document.querySelectorAll('li');
	for (let liIndex = 0; liIndex < allLi.length; liIndex++) {
		allLi[liIndex].setAttribute('id', `${tasks[liIndex].id}`);
	}
	taskInput.value = '';
})

// render tasks in DOM
renderDOM = task => {
	editIcon = `<i class="far fa-edit"></i>`;
	editSpan = `<span class='edit-task' data-toggle="modal" onclick="" data-target="#editModal" data-whatever="@fat">${editIcon}</span>`;
	deleteIcon = `<i class="far fa-trash-alt"></i>`;
	deleteSpan = `<span class='delete-task' data-toggle="modal" onclick="" data-target="#deleteModal" data-whatever="@fat"">${deleteIcon}</span>`;
	taskSpan = `<span onclick="completed(this)" class="taskText">${task}<span/>`;
	li = `<li class='taskLi' onclick="selectedTask(this)" id="">${editSpan}${deleteSpan}${taskSpan}</li>`;

	list.innerHTML += li;
};

// selected task
let selectedLi;
let selectedId;
let selectedIndex;
let selectedTaskSpan;
selectedTask = el => {
	selectedLi = el;
	selectedId = el.id;
	selectedTaskSpan = el.children[2];
};

// completed task
completed = el => {
	selectedId = el.parentElement.id;
	selectedTaskSpan = el.parentElement.children[2];
	selectedTaskSpan.classList.toggle('completed');
	selectedIndex = tasks.findIndex(item => {
		return item.id == selectedId;
	});
	let completedTask = tasks[selectedIndex];
	completedTask.done
		? (completedTask.done = false)
		: (completedTask.done = true);
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

// load tasks from LocalStorage
tasks.forEach(item => {
	const spans = document.getElementsByClassName('taskText');
	renderDOM(item.title);
	if (item.done) {
		for (const doneIndex of spans) {
			doneIndex.classList.add('completed');
		}
	}
});

// set unique id for each li

let allLi = document.querySelectorAll('li');
for (let liIndex = 0; liIndex < allLi.length; liIndex++) {
	allLi[liIndex].setAttribute('id', `${tasks[liIndex].id}`);
}

// edit task and save changes on localStorage
editButton.addEventListener('click', e => {
	e.preventDefault()
	const editTaskInput = document.querySelector('.editTaskInput');
	if (editTaskInput.value == '' || editTaskInput.value == null) return;
	selectedIndex = tasks.findIndex(item => {
		return item.id == selectedId;
	});
	console.log(selectedTaskSpan);
	selectedTaskSpan.innerText = editTaskInput.value;
	console.log(selectedTaskSpan);
	selectedLi.innerHTML = `${editSpan}${deleteSpan} <span onclick="completed(this)" class="taskText">${editTaskInput.value}<span/>`;
	
	tasks[selectedIndex].title = editTaskInput.value;
	tasks[selectedIndex].done = false;
	localStorage.setItem('tasks', JSON.stringify(tasks));
	editTaskInput.value = '';
})

deleteTask = () => {
	selectedIndex = tasks.findIndex(item => {
		return item.id == selectedId;
	});
	tasks.splice(selectedIndex, 1);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	// selectedLi.style.display = 'none';
	list.removeChild(selectedLi);
};

/* Developed with <3 by Pooria Faramarzian ^_^ */
