// Component Base class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEle: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateEle = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    this.hostEl = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(this.templateEle.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostEl.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
