"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";

function RootLayoutRecipes({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams);

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      query.set("q", term);
    } else {
      query.delete("q");
    }

    router.replace(`${pathname}?${query.toString()}`);
  }, 300);

  const handleMealType = (type: string) => {
    if (type == 'All'){
      query.delete('mealType')
    }else if (type) {
      query.set("mealType", type);
    } 

    router.replace(`${pathname}?${query.toString()}`);

  };

  return (
    <div className="mb-4">
      <div className="sticky top-0">
        <header className="flex justify-between bg-green-100 px-4 py-2">
          <Link href={"/recipes"}>
            <h1 className="text-3xl font-semibold text-indigo-400 md:text-4xl md:tracking-wide">
              Foody People
            </h1>
          </Link>

          {/* TODO: Making border on parent when focused on search:input */}
          <div className="parent flex items-center gap-2 rounded-xl bg-white px-2 py-1">
            <IoSearch className="text-xl" />
            <input
              defaultValue={searchParams.get("q")?.toString()}
              type="search"
              className="child px-1 focus:outline-none md:text-lg"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </header>

        {/* TODO: Making glass-background link:"https://www.epicweb.dev/tips/creating-glassmorphism-effects-with-tailwind-css" */}

        <div className="flex justify-center gap-10 bg-green-100 pb-8 pt-10 md:text-2xl">
          <button className="rounded bg-green-400 px-2 text-white"
          onClick={() => handleMealType('All')}
          >All</button>
          <button
            className="rounded bg-green-400 px-2 text-white"
            onClick={() => handleMealType("Dinner")}
          >
            Dinner
          </button>
          <button
            className="rounded bg-green-400 px-2 text-white"
            onClick={() => handleMealType("Breakfast")}
          >
            Breakfast
          </button>
          <button
            className="rounded bg-green-400 px-2 text-white"
            onClick={() => handleMealType("Lunch")}
          >
            Lunch
          </button>
          <button
            className="rounded bg-green-400 px-2 text-white"
            onClick={() => handleMealType("Side Dish")}
          >
            Side Dish
          </button>
          <button
            className="rounded bg-green-400 px-2 text-white"
            onClick={() => handleMealType("Dessert")}
          >
            Dessert
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}

export default RootLayoutRecipes;
