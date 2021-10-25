import { AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl = "http://localhost:3000/users";
export class User {
  private events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public Attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.Attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.Attributes.get;
  }

  set(update: UserProps): void {
    this.Attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.Attributes.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without id");
    }
    this.sync.fetch(id).then((response: AxiosResponse<UserProps>): void => {
      this.set(response.data);
    });
  }

  save() {
    this.sync
      .save(this.Attributes.getAll)
      .then((response: AxiosResponse<UserProps>): void => {
        this.trigger("save");
      })
      .catch((): void => {
        this.trigger("error");
      });
  }
}
