document.addEventListener('DOMContentLoaded', () => {
    const createProjectButton = document.getElementById('createProject');
    const projectNameInput = document.getElementById('projectName');
    const projectDescriptionInput = document.getElementById('projectDescription');
    const projectDueDateInput = document.getElementById('projectDueDate');
    const projectsContainer = document.getElementById('projects');
    const projectTemplate = document.getElementById('projectTemplate').content;

    
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    for (const project of savedProjects) {
        createProject(project.name, project.description, project.dueDate);
    }

    createProjectButton.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();
        const projectDescription = projectDescriptionInput.value.trim();
        const projectDueDate = projectDueDateInput.value.trim();
        if (projectName && projectDescription && projectDueDate) {
            createProject(projectName, projectDescription, projectDueDate);
           
            savedProjects.push({ name: projectName, description: projectDescription, dueDate: projectDueDate });
            localStorage.setItem('projects', JSON.stringify(savedProjects));
            projectNameInput.value = '';
            projectDescriptionInput.value = '';
            projectDueDateInput.value = '';
        } else {
            alert('Please enter a project name, description, and due date.');
        }
    });

    function createProject(projectName, projectDescription, projectDueDate) {
        const newProject = document.importNode(projectTemplate, true);
        newProject.querySelector('.project-title').textContent = projectName;
        newProject.querySelector('.project-due-date').textContent = `Due: ${projectDueDate}`;

        newProject.querySelector('.delete-project').addEventListener('click', (e) => {
            e.target.closest('.project').remove();
          
            const index = savedProjects.findIndex(project => project.name === projectName);
            if (index > -1) {
                savedProjects.splice(index, 1);
                localStorage.setItem('projects', JSON.stringify(savedProjects));
            }
           
            showPopup(`Project  has been deleted.`);
        });

        newProject.querySelector('.view-project').addEventListener('click', (e) => {
            
            const descriptionCard = newProject.querySelector('.description-card');
            descriptionCard.textContent = projectDescription;
            descriptionCard.style.display = 'block'; 
        });

        newProject.querySelector('.description-card').addEventListener('click', (e) => {
            e.target.style.display = 'none';
        });

        newProject.querySelector('.move-to-trash').addEventListener('click', (e) => {
            e.target.closest('.project').remove();
            
            const index = savedProjects.findIndex(project => project.name === projectName);
            if (index > -1) {
                savedProjects.splice(index, 1);
                localStorage.setItem('projects', JSON.stringify(savedProjects));
            }
            
            showPopup(`Project has been moved to trash.`);
        });

        projectsContainer.appendChild(newProject);
    }

    function showPopup(message) {
        const popup = document.getElementById('popup');
        const popupMessage = document.getElementById('popup-message');
        popupMessage.textContent = message;
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 2000);
    }
});