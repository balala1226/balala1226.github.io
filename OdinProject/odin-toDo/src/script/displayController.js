import '../style/style.css'
import { printLog, printError } from './helper/printLog.js';
import ProfilePic from '../resource/images/profile-user.png'
import PlusIcon from '../resource/images/plus.png'
import CheckIcon from '../resource/images/check.png'
import CrossIcon from '../resource/images/remove.png'

import { newDiv, newImg, newP, newButton, newInput } from './helper/htmlElementsMaker.js';
import { projectsData } from './projectsData.js';
import { generateAllTaskItems, generateProjectItemDiv, refreshMainPanel, generateTaskItem } from './helper/uiUpdater.js';

export class displayController {
    constructor(projectList){
        this.htmlBody = document.getElementsByTagName('BODY')[0];

        const htmlHeader = document.createElement('HEADER');
        const headerText = newP('TO DO');
        htmlHeader.appendChild(headerText);
        
        this.htmlBody.appendChild(htmlHeader);

        const contentDiv = newDiv('-','content');

        this.sidePanel = this.initializeSidePanel(projectList);
        contentDiv.appendChild(this.sidePanel);

        this.mainPanel = this.initializeMainPanel(projectList);
        contentDiv.appendChild(this.mainPanel);
        
        this.htmlBody.appendChild(contentDiv);
    }

    initializeSidePanel(projectList){
        const sidePanelDiv = newDiv('-','sidePanel');

        const profileDiv = newDiv('-','profile');
        var profilePic = newImg(ProfilePic);
        profileDiv.appendChild(profilePic);
        const profileName = newP('Profile Name', '-','profileName')
        profileDiv.appendChild(profileName);
        sidePanelDiv.appendChild(profileDiv);

        const projectsDiv = newDiv('-','projects');

        const projectsHeaderContainer = newDiv('-','projectsHeaderContainer');
        const projectsText = newP('Projects');
        projectsHeaderContainer.appendChild(projectsText);
        projectsDiv.appendChild(projectsHeaderContainer);

        this.projectsList = newDiv('-','projectsList');

        let currentIndex = 0;
        
        if (projectList.getProjectList() != null) {
            projectList.getProjectList().projects.forEach(element => {
                var newProjectItem = generateProjectItemDiv(element.project);
                this.projectsList.appendChild(newProjectItem);
                element.id = currentIndex;
                newProjectItem.addEventListener("click", function() {
                    var projectNameDiv = document.getElementById('projectName');
                    var taskContainer = document.getElementById('taskContainer');
                    var createTaskContainer = document.getElementById('createTaskContainer');
                    refreshMainPanel(projectList, projectNameDiv, taskContainer, createTaskContainer,element.id);
                    projectList.setCurrentProjectId(element.id);
                });
                currentIndex++;
            });
        }

        projectsDiv.appendChild(this.projectsList);

        const addProjectContainer = newDiv('-','addProjectContainer');
        var addIcon = newImg(PlusIcon);
        addProjectContainer.appendChild(addIcon);
        const addProjectText = newP('Add Projects');
        addProjectContainer.appendChild(addProjectText);
        projectsDiv.appendChild(addProjectContainer);

        const newProjectContainer = newDiv('-','newProjectContainer');
        const newProjectFormContainer = document.createElement('form');
        newProjectFormContainer.id = 'newProjectFormContainer';
        const newProjectText = newP('Project Name:');
        newProjectFormContainer.appendChild(newProjectText);

        const projectNameInputBox = newInput('text','-','projectNameInputBox',true);
        projectNameInputBox.autofocus = true;
        
        newProjectFormContainer.appendChild(projectNameInputBox);
        newProjectFormContainer.appendChild(projectNameInputBox);
        newProjectContainer.appendChild(newProjectFormContainer);

        const newProjectButtons = newDiv('-','newProjectButtons');
        var cancelAddButton = newButton('addProjectsButton');
        cancelAddButton.innerHTML = 'Cancel';
        newProjectButtons.appendChild(cancelAddButton);


        var addNewProjectButton = newButton('addProjectsButton');
        addNewProjectButton.innerHTML = 'Add';
        newProjectButtons.appendChild(addNewProjectButton);
        newProjectContainer.appendChild(newProjectButtons);

        addProjectContainer.addEventListener("click", function() {
            projectNameInputBox.value = '';
            addProjectContainer.style.display = 'none';
            newProjectContainer.style.display = 'flex';
        });

        cancelAddButton.addEventListener("click", function() {
            newProjectContainer.style.display = 'none';
            addProjectContainer.style.display = 'flex';
        });

        addNewProjectButton.addEventListener("click", function() {
            projectList.addNewProject(projectNameInputBox.value);
            newProjectContainer.style.display = 'none';
            addProjectContainer.style.display = 'flex';

            var projectsList = document.getElementById('projectsList');

            while (projectsList.hasChildNodes()) {
                projectsList.removeChild(projectsList.firstChild);
            }

            if (projectList.getProjectList() != null) {
                currentIndex = 0;

                projectList.getProjectList().projects.forEach(element => {
                    var newProjectItem = generateProjectItemDiv(element.project);
                    projectsList.appendChild(newProjectItem);
                    element.id = currentIndex;

                    newProjectItem.addEventListener("click", function() {
                        var projectNameDiv = document.getElementById('projectName');
                        var taskContainer = document.getElementById('taskContainer');
                        var createTaskContainer = document.getElementById('createTaskContainer');
                        refreshMainPanel(projectList, projectNameDiv, taskContainer, createTaskContainer,element.id);
                        projectList.setCurrentProjectId(element.id);
                    });
                    currentIndex++;
                });
                
                var lastIndex = currentIndex -1;
                var projectNameDiv = document.getElementById('projectName');
                var taskContainer = document.getElementById('taskContainer');
                var createTaskContainer = document.getElementById('createTaskContainer');
                refreshMainPanel(projectList, projectNameDiv, taskContainer, createTaskContainer,lastIndex);
                projectList.setCurrentProjectId(lastIndex);
            }
        });

        projectsDiv.appendChild(newProjectContainer);

        sidePanelDiv.appendChild(projectsDiv);

        return sidePanelDiv;
    }

    initializeMainPanel(projectList){
        const mainPanelDiv = newDiv('-','mainPanel');
        var currentProjectName = "";

        if (projectList.getProjectList() != null) {
            currentProjectName = projectList.getProjectList().projects[0].project;
        }

        this.projectName = newP(currentProjectName,'-','projectName');
        
        mainPanelDiv.appendChild(this.projectName);

        this.taskContainer = newDiv('-','taskContainer');
        mainPanelDiv.appendChild(this.taskContainer);
        
        generateAllTaskItems(this.taskContainer, projectList,0);

        this.createTaskContainer = newDiv('-','createTaskContainer');
        const addTaskIcon = newImg(PlusIcon);
        const addTaskText = newP('Create Task');
        this.createTaskContainer.appendChild(addTaskIcon);
        this.createTaskContainer.appendChild(addTaskText);
        mainPanelDiv.appendChild(this.createTaskContainer);

        if (currentProjectName == "")
        {
            this.createTaskContainer.style.display = "none";
        }

        this.createTaskContainer.addEventListener("click", function() {
            var currentTaskContainer = document.getElementById('taskContainer');

            var project = projectList.getProjectList().projects[projectList.getCurrentProjectId()];
            var newTask = projectList.addNewTask(project);
            var taskLenght = project.tasks.lenght - 1;
            generateTaskItem(currentTaskContainer, newTask,projectList, project, taskLenght, true);
        });


        return mainPanelDiv;
    }
}
