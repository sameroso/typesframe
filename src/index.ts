import { User } from "./models/User";

const user = new User({ name: "new user", age: 10 });

user.on("change", () => console.log("User was changed"));
user.set({ name: "Samer", id: 2 });

user.save()
