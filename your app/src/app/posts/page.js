"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetchUsers = async () => {
  const randomNum = Math.random() * 10 + 1;
  console.log(parseInt(randomNum));
  try {
    // noStore()
    // const users = await fetch(
    //   `https://dummyjson.com/products?limit=${parseInt(randomNum)}&skip=10&select=title,price`,
    // );
    const users = await fetch(
      "https://dummyjson.com/products?limit=10&skip=10&select=title,price",
    );
    const usersJson = await users.json();
    return usersJson.products;
  } catch (error) {
    console.log(error);
  }
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Posts() {
  const navigate = useRouter();
  const randomNum = Math.floor(Math.random() * 10) + 1
  const { data, error, isLoading } = useSWR(
    `https://dummyjson.com/products?limit=${randomNum}&skip=10&select=title,price`,
    fetcher, 
  );
  console.log(randomNum);

  if (isLoading) return <h1>This Page is Loading...</h1>;
  console.log(data);

  if (error) return <h1>Error on this page.</h1>;

  return (
    <div>
      This is a Great Post.
      <button onClick={() => navigate.push("/")}>
        {" "}
        Navigate to Home screen.
      </button>
      <div>
        {data.products &&
          data.products?.map(({ title, price, id }, i) => (
            <div className={"flex flex-col gap-4"} key={i}>
              <p>
                {title}: ${price}: {id}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
