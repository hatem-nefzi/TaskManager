const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskStatus = document.getElementById('taskStatus');
const taskList = document.getElementById('taskList');


function fetchTasks() {
  fetch('http://localhost:8081/tasks')
    .then(response => response.json())
    .then(data => {
      taskList.innerHTML = ''; 
      data.tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.title} - ${task.status}`;
        taskList.appendChild(taskItem);
      });
    });
}


taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const newTask = {
    title: taskTitle.value,
    description: taskDescription.value,
    status: taskStatus.value
  };

  
  fetch('http://localhost:8081/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Task added successfully') {
      fetchTasks(); 
      taskForm.reset(); 
    } else {
      alert('Failed to add task');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error adding the task');
  });
});


fetchTasks();
