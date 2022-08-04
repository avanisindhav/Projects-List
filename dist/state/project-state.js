import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.listners = [];
    }
    addListner(listnerFn) {
        this.listners.push(listnerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListners();
    }
    moveProject(projectId, newStatus) {
        const prj = this.projects.find((prj) => prj.id === projectId);
        if (prj && prj.status !== newStatus) {
            prj.status = newStatus;
            this.updateListners();
        }
    }
    updateListners() {
        for (const listnerFn of this.listners) {
            listnerFn(this.projects.slice());
        }
    }
}
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map