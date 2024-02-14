import './style/style.css'
import {printLog, printError} from './script/helper/printLog.js'
import { displayController } from './script/displayController.js';
import { projectsData } from './script/projectsData.js';

let projectList = new projectsData();
let display = new displayController(projectList);