// export const dynamic = 'force-dynamic'
// import { unstable_noStore as noStore} from 'next/cache'

import Link from "next/link";

const fetchUsers = async () => {
  const randomNum = Math.random() * 10 + 1;
  console.log(parseInt(randomNum));
  try {
    // noStore()
    const users = await fetch(
      `https://dummyjson.com/products?limit=${parseInt(randomNum)}&skip=10&select=title,price`,
      // {
      //   next: {
      //     revalidate: 60,
      //   }
      // },
      // {
      //   cache: 'no-cache'
      // }
    );
    const usersJson = await users.json();
    return usersJson.products;
  } catch (error) {
    console.log(error);
  }
};

async function Users() {
  const users = await fetchUsers();
  console.log(users);
  return (
    <div>
      <Link href={"/"}>Home Page</Link>
      {users &&
        users?.map(({ title, price, id }, i) => (
          <div className={"flex flex-col gap-4"} key={i}>
            <p>
              {title}: ${price}: {id}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Users;
