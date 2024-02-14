import { printLog } from "./helper/printLog";
import { isLocalStorageAvailable, localSave, getLocalSave } from "./helper/storageHelper";

const project = {
    "id": 0,
    "project": "",
    "tasks":[]
}

const task = {
    "name": "",
    "description":"",
    "dueDate":"",
    "priority":""
}

export class projectsData{
    constructor(){
        this.projectListKey = 'projectListKey';
        this.projectList = {
            "projects": [],
            "currentProjectId": 0
        };

        var localProjectList = getLocalSave(this.projectListKey);
        printLog('localProjectList ' + localProjectList);
        if (localProjectList != null && localProjectList != "" && localProjectList != undefined){
            var localProjectListJson = JSON.parse(localProjectList);
            this.projectList.projects = localProjectListJson.projects;
            printLog('Local load');
        }

        if (this.projectList.projects.length > 0 ){
            return;
        }

        this.generateDummyProject();
        printLog('Default load');
    }

    getCurrentProjectId(){
        return this.projectList.currentProjectId;
    }

    setCurrentProjectId(value){
        this.projectList.currentProjectId = value;
    }

    addNewProject(projectName) {
        var newProject = Object.create(project);
        newProject.project = projectName;
        newProject.tasks = [];

        this.projectList.projects.push(newProject);

        localSave(this.projectListKey, JSON.stringify(this.projectList));
        printLog('Local save ' + JSON.stringify(this.projectList));
        return newProject;
    }

    getProjectList(){
        if (this.projectList.projects.length <= 0)
        {
            return null;
        }

        return this.projectList;
    }

    getProjectListString(){
        if (this.projectList.projects.length <= 0)
        {
            return null;
        }

        return JSON.stringify(this.projectList);
    }

    addNewTask(project, taskName ="", description="", dueDate="2020-01-01", priority="P0"){
        var newTask = Object.create(task);
        newTask.name = taskName;
        newTask.description = description;
        newTask.dueDate = dueDate;
        newTask.priority = priority;

        project.tasks.push(newTask);

        localSave(this.projectListKey, JSON.stringify(this.projectList));
        printLog('Local save ' + JSON.stringify(this.projectList));
        return newTask;
    }

    generateDummyProject(){
        var newProject = this.addNewProject('Sample');

        this.addNewTask(newProject, 'Test', 'random description', '2027-03-09', 'P0');
        this.addNewTask(newProject, 'Test 2', 'random description 2', '2020-12-30', 'P1');
    }

    updateList(){
        localSave(this.projectListKey, JSON.stringify(this.projectList));
        printLog('Local save ' + JSON.stringify(this.projectList));
    }
}