import { User } from "./models/User";

const user = new User({ name: "new user", age: 10 });

user.events.on("change", () => {
  console.log("sdads");
});

user.events.trigger("change")
