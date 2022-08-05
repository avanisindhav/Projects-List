import { Project, ProjectStatus } from "../models/project";

type Listner<T> = (items: T[]) => void;

class State<T> {
  protected listners: Listner<T>[] = [];

  addListner(listnerFn: Listner<T>) {
    this.listners.push(listnerFn);
  }
}

// Project state Management class
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);

    this.updateListners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const prj = this.projects.find((prj) => prj.id === projectId);

    if (prj && prj.status !== newStatus) {
      prj.status = newStatus;
      this.updateListners();
    }
  }

  private updateListners() {
    for (const listnerFn of this.listners) {
      listnerFn(this.projects.slice());
    }
  }
}
export const projectState = ProjectState.getInstance();
