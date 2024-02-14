import { printLog } from "./printLog.js";
import { newDiv, newImg, newP, newButton, newInput } from "./htmlElementsMaker.js";
import PlusIcon from '../../resource/images/plus.png'
import CheckIcon from '../../resource/images/check.png'
import CrossIcon from '../../resource/images/remove.png'
import EyeIcon from '../../resource/images/eye.png'
import EditIcon from '../../resource/images/editing.png'
import TrashIcon from '../../resource/images/trash-can.png'

export function generateProjectItemDiv(projectName){
    const newProjectItem = newDiv("projectItem");

    const projectItemName = newP(projectName);
    newProjectItem.appendChild(projectItemName);

    return newProjectItem;
}

export function generateAllTaskItems(taskContainer, projectList, projectIndex) {
    if (projectList == null) {
        return;
    }

    var projectListJson = projectList.getProjectList();
    if (projectListJson == null) {
        return;
    }

    if (projectListJson.projects.lenght < projectIndex)
    {
        return;
    }

    var project = projectListJson.projects[projectIndex];
    
    if (project.tasks.length <= 0 )
    {
        return;
    }

    let taskIndex = 0;
    project.tasks.forEach(element => {
        generateTaskItem(taskContainer, element, projectList, project, taskIndex);
        taskIndex++;
    });
}

export function generateTaskItem(taskContainer, element, projectList, project, taskIndex, isNewTask=false){
    var taskName = element.name;
    var dueDate = element.dueDate;
    var priority = element.priority;
    var description = element.description;
    
    const newTaskItem = newDiv('taskItemCollapse');
    const newTaskHeader = newDiv('taskHeader');
    const newTaskInfo = newDiv('taskInfo');
    const taskNameHtmlP = newP(taskName, 'taskName');
    newTaskInfo.append(taskNameHtmlP);

    let taskDateOnly = dueDate;
    var newDate = "Due Date: " + dueDate;
    const taskDate = newP(newDate, 'taskDate');
    newTaskInfo.append(taskDate);

    const priorityDiv = newDiv();
    switch (priority){
        case 'P0':
            priorityDiv.className = 'priority0Color';
            break;
        case 'P1':
            priorityDiv.className = 'priority1Color';
            break;
        case 'P2':
            priorityDiv.className = 'priority2Color';
            break;
        default:
            priorityDiv.className = 'priority0Color';
            break;
    }

    const priorityTag = newP(priority, 'priorityTag');
    priorityDiv.appendChild(priorityTag);
    newTaskInfo.append(priorityDiv);

    newTaskHeader.appendChild(newTaskInfo);

    const taskAction = newDiv('taskItemActions');
    var viewButton = newButton('taskButton');
    var viewPic = newImg(EyeIcon);
    viewButton.appendChild(viewPic);
    taskAction.appendChild(viewButton);

    var editButton = newButton('taskButton');
    var editPic = newImg(EditIcon);
    editButton.appendChild(editPic);
    taskAction.appendChild(editButton);

    var deleteButton = newButton('taskButton');
    var trashPic = newImg(TrashIcon);
    deleteButton.appendChild(trashPic);
    taskAction.appendChild(deleteButton);

    newTaskHeader.appendChild(taskAction);
    newTaskItem.appendChild(newTaskHeader);

    const newTaskBody = newDiv('taskBody');
    const taskDescription = newP(description);
    newTaskBody.appendChild(taskDescription);

    newTaskItem.appendChild(newTaskBody);

    const newTaskHeaderEdit = newDiv('taskHeaderEdit');
    const newTaskTitleDiv = newDiv('taskTitleDiv');
    const taskNameEditHtmlP = newP('Title: ', 'taskName');
    const taskNameInput = newInput('text','taskNameEditInput','-',false);
    taskNameInput.defaultValue = taskNameHtmlP.innerHTML;
    newTaskTitleDiv.appendChild(taskNameEditHtmlP);
    newTaskTitleDiv.appendChild(taskNameInput);
    newTaskHeaderEdit.appendChild(newTaskTitleDiv);

    const newTaskDateDiv = newDiv('taskDateDiv');
    const taskDueDateEdit = newP('Due Date: ', 'taskDate');
    const taskDueDateEditInput = newInput('date','taskNameDateInput','-',false);
    taskDueDateEditInput.defaultValue = taskDateOnly;
    newTaskDateDiv.appendChild(taskDueDateEdit);
    newTaskDateDiv.appendChild(taskDueDateEditInput);
    newTaskHeaderEdit.appendChild(newTaskDateDiv);

    const newTaskPriorityDiv = newDiv('taskPriorityDiv');
    const taskPriorityEdit = newP('Priority: ', 'taskPriority');
    const taskPrioritySelect = document.createElement('select');
    taskPrioritySelect.className = 'prioritySelection';
    var option0 = document.createElement("option");
    option0.text = "P0";
    taskPrioritySelect.add(option0);
    var option1 = document.createElement("option");
    option1.text = "P1";
    taskPrioritySelect.add(option1);
    var option2 = document.createElement("option");
    option2.text = "P2";
    taskPrioritySelect.add(option2);

    for(var i, j = 0; i = taskPrioritySelect.options[j]; j++) {
        if(i.value == priorityTag.innerHTML) {
            taskPrioritySelect.selectedIndex = j;
            break;
        }
    }

    newTaskPriorityDiv.appendChild(taskPriorityEdit);
    newTaskPriorityDiv.appendChild(taskPrioritySelect);
    newTaskHeaderEdit.appendChild(newTaskPriorityDiv);

    newTaskItem.appendChild(newTaskHeaderEdit);

    const newTaskBodyEdit = newDiv('taskBodyEdit');
    const taskDescriptionEdit = newP('Desription: ', 'taskDescription');
    const taskDescriptionEditInput = newInput('text','taskDescriptionEditInput','-',true);
    taskDescriptionEditInput.defaultValue = taskDescription.innerHTML;
    newTaskBodyEdit.appendChild(taskDescriptionEdit);
    newTaskBodyEdit.appendChild(taskDescriptionEditInput);

    newTaskItem.appendChild(newTaskBodyEdit);

    const taskEditButtons = newDiv('taskEditActions');
    var cancelEditButton = newButton('taskEditButton');
    var crossPic = newImg(CrossIcon);
    cancelEditButton.appendChild(crossPic);
    taskEditButtons.appendChild(cancelEditButton);

    var acceptEditButton = newButton('taskEditButton');
    var checkPic = newImg(CheckIcon);
    acceptEditButton.appendChild(checkPic);
    taskEditButtons.appendChild(acceptEditButton);

    newTaskItem.appendChild(taskEditButtons);

    viewButton.addEventListener("click", function() {
        if (newTaskBody.style.display === "block") {
            newTaskBody.style.display = "none";
        } else {
            newTaskBody.style.display = "block";
        }
    });
    
    editButton.addEventListener("click", function() {
        newTaskHeader.style.display = "none";
        newTaskBody.style.display = "none";

        newTaskHeaderEdit.style.display = "flex";
        newTaskBodyEdit.style.display = "flex";
        taskEditButtons.style.display = "flex";
    });

    
    deleteButton.addEventListener("click", function() {
        project.tasks.splice(taskIndex, 1);
        taskContainer.removeChild(newTaskItem);

        projectList.updateList();
    });

    cancelEditButton.addEventListener("click", function() {
        if(isNewTask){
            project.tasks.splice(taskIndex, 1);
            taskContainer.removeChild(newTaskItem);

            projectList.updateList();
            return;
        }

        newTaskHeader.style.display = "flex";
        newTaskBody.style.display = "none";

        newTaskHeaderEdit.style.display = "none";
        newTaskBodyEdit.style.display = "none";
        taskEditButtons.style.display = "none";

        taskNameInput.defaultValue = taskNameHtmlP.innerHTML;
        taskDueDateEditInput.defaultValue = taskDateOnly;
        taskDescriptionEditInput.defaultValue = taskDescription.innerHTML;

        for(var i, j = 0; i = taskPrioritySelect.options[j]; j++) {
            if(i.value == priorityTag.innerHTML) {
                taskPrioritySelect.selectedIndex = j;
                break;
            }
        }
    });

    acceptEditButton.addEventListener("click", function() {
        newTaskHeader.style.display = "flex";
        newTaskBody.style.display = "none";

        newTaskHeaderEdit.style.display = "none";
        newTaskBodyEdit.style.display = "none";
        taskEditButtons.style.display = "none";

        taskNameHtmlP.innerHTML = taskNameInput.value;
        taskDateOnly = taskDueDateEditInput.value;
        taskDate.innerHTML = "Due Date: " + taskDateOnly;
        
        switch (taskPrioritySelect.value){
            case 'P0':
                priorityDiv.className = 'priority0Color';
                break;
            case 'P1':
                priorityDiv.className = 'priority1Color';
                break;
            case 'P2':
                priorityDiv.className = 'priority2Color';
                break;
            default:
                priorityDiv.className = 'priority0Color';
                break;
        }

        priorityTag.innerHTML = taskPrioritySelect.value;

        taskDescription.innerHTML = taskDescriptionEditInput.value;

        element.name = taskNameInput.value;
        element.dueDate = taskDueDateEditInput.value;
        element.priority = taskPrioritySelect.value;
        element.description = taskDescriptionEditInput.value;

        projectList.updateList();
    });

    if(isNewTask){
        newTaskHeader.style.display = "none";
        newTaskBody.style.display = "none";

        newTaskHeaderEdit.style.display = "flex";
        newTaskBodyEdit.style.display = "flex";
        taskEditButtons.style.display = "flex";
    }

    taskContainer.appendChild(newTaskItem)
}


export function refreshMainPanel(projectList, projectNameDiv, taskContainer,  createTaskContainer, selectedIndex) {
    var currentProjectName = "";

    if (projectList != null) {
        currentProjectName = projectList.getProjectList().projects[selectedIndex].project;
    }

    projectNameDiv.innerHTML = currentProjectName;

    while (taskContainer.hasChildNodes()) {
        taskContainer.removeChild(taskContainer.firstChild);
    }
    
    generateAllTaskItems(taskContainer, projectList,selectedIndex);

    if (currentProjectName == "")
    {
        createTaskContainer.style.display = "none";
    } else
    {
        createTaskContainer.style.display = "flex";
    }
}