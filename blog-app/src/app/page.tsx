"use client";
import Image from "next/image";
import { useEffect } from "react";

const addrest = async () => {
  try {
    const res = await fetch("/api/add-post", {
      method: "POST",
      body: JSON.stringify({
        title: "Hello Blog",
        description: "This is me gaurav.",
      }),
    });
    const convert = await res.json() 
    console.log(convert);
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  useEffect(() => {
    addrest()
  }, []);

  return <main>Hello World.

    <button onClick={addrest} className="bg-black text-2xl rounded-lg text-white px-4 py-2">
      Click Me
    </button>
  </main>;
}
