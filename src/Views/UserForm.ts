import { User } from "../models/User";
export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  bindModel() {
    this.model.on("change", () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:#set-age": this.onSetAgeClick,
      "click:#set-name": this.onSetNameClick,
    };
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");

    const name = input.value;
    this.model.set({ name });
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
        <div>
            <h1>User Form</h1>
            <input />
            <div>User Name:${this.model.get("name")}</div>
            <div>User Age:${this.model.get("age")}</div>
            <button id="set-name"> Change name </button>
            <button id="set-age">Set Random Age</button>
        </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
