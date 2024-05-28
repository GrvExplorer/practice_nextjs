const fetchUsers = async () => {
  try {
    const users = await fetch("http://dummyjson.com/users", {
      cache: "no-cache",
    });
    const usersJson = await users.json();
    return usersJson.users;
  } catch (error) {
    console.log(error);
  }
};

async function Users() {
  const users = await fetchUsers();
  return (
    <div>
      {users &&
        users?.map(({ firstName, lastName, age }, i) => (
          <div className={"flex flex-col gap-4"} key={i}>
            <p>
              {firstName} {lastName} age: {age}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Users;
