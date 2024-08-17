document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const progressBar = document.getElementById('progress-bar');
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    let tasks = [];
  
    // Add Task Event Listener
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        taskInput.value = '';
        updateProgress();
      }
    });
  
    // Add Task Function
    function addTask(taskText) {
      const li = document.createElement('li');
      const taskSpan = document.createElement('span');
      taskSpan.className = 'task-text';
      taskSpan.textContent = taskText;
  
      const completeBtn = document.createElement('button');
      completeBtn.className = 'complete';
      completeBtn.textContent = '✔️';
      completeBtn.addEventListener('click', () => toggleComplete(li));
  
      const editBtn = document.createElement('button');
      editBtn.className = 'edit';
      editBtn.textContent = '✎';
      editBtn.addEventListener('click', () => editTask(taskSpan));
  
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete';
      deleteBtn.textContent = '🗑';
      deleteBtn.addEventListener('click', () => deleteTask(li));
  
      li.appendChild(taskSpan);
      li.appendChild(completeBtn);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
  
      tasks.push({ text: taskText, completed: false });
    }
  
    // Toggle Complete Task
    function toggleComplete(taskItem) {
      taskItem.classList.toggle('completed');
      const taskText = taskItem.querySelector('.task-text').textContent;
      tasks = tasks.map(task =>
        task.text === taskText ? { ...task, completed: !task.completed } : task
      );
      updateProgress();
    }
  
    // Edit Task Function
    function editTask(taskSpan) {
      const newTaskText = prompt('Edit Task:', taskSpan.textContent);
      if (newTaskText) {
        const taskText = taskSpan.textContent;
        tasks = tasks.map(task =>
          task.text === taskText ? { ...task, text: newTaskText } : task
        );
        taskSpan.textContent = newTaskText;
      }
    }
  
    // Delete Task Function
    function deleteTask(taskItem) {
      const taskText = taskItem.querySelector('.task-text').textContent;
      taskList.removeChild(taskItem);
      tasks = tasks.filter(task => task.text !== taskText);
      updateProgress();
    }
  
    // Update Progress Bar
    function updateProgress() {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.completed).length;
      const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
      
      progressBar.style.width = `${percentage}%`;
  
      if (completedTasks === totalTasks && totalTasks > 0) {
        startConfetti();
      }
    }
  
    // Confetti Animation
    function startConfetti() {
      canvas.style.display = 'block';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const confettiPieces = generateConfetti();
      let confettiTimer = 0;
  
      function updateConfetti() {
        if (confettiTimer > 100) {
          canvas.style.display = 'none'; // Hide canvas after animation
          return;
        }
        confettiTimer++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        confettiPieces.forEach(piece => {
          ctx.fillStyle = piece.color;
          ctx.beginPath();
          ctx.arc(piece.x, piece.y, piece.size, 0, Math.PI * 2);
          ctx.fill();
          piece.y += piece.speed;
  
          if (piece.y > canvas.height) {
            piece.y = 0;
          }
        });
  
        requestAnimationFrame(updateConfetti);
      }
  
      updateConfetti();
    }
  
    function generateConfetti() {
      const confettiPieces = [];
      for (let i = 0; i < 100; i++) {
        confettiPieces.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 2,
          speed: Math.random() * 3 + 1,
          color: `hsl(${Math.random() * 360}, 100%, 80%)`
        });
      }
      return confettiPieces;
    }
  });
    