import { User, UserProps } from "./models/User";
import { UserList } from "./Views/UserList";
import { Collection } from "./models/Collection";

// const user = User.buildUser({ name: "Samer", age: 20 });
const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on("change", () => {
  const root = document.getElementById("root");

  if (root) {
    const userList = new UserList(root, users);
    userList.render();
  } else {
    throw new Error("Root element not found");
  }
});


users.fetch()

// const root = document.getElementById("root");

// if (root) {
//   const userEdit = new UserEdit(root, user);
//   userEdit.render();
// } else {
//   throw new Error("Root element not found");
// }
