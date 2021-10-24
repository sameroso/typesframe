import axios from "axios";
import { User } from "./models/User";

axios.post("http://localhost:3000/users", {
  name: "myname",
  age: 20,
});

const user = new User({ name: "Samer Kayali", age: 10 });

user.on("change", () => {
  console.log("change #1");
});
user.on("change", () => {
  console.log("change #2");
});
user.on("save", () => {
  console.log("Save was triggered");
});

user.trigger("change");
