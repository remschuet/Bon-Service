import { getUsers } from "@/db/data-access/user";

export async function DisplayUsers() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.email}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
