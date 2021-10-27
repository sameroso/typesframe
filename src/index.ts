import { UserEdit } from "./Views/UserEdit";
import { User } from "./models/User";

const user = User.buildUser({ name: "Samer", age: 20 });
const root = document.getElementById("root");

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
} else {
  throw new Error("Root element not found");
}
