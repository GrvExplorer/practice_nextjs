import { fetchRecipes, fetchSearchRecipe } from "@/lib/api/fetchData";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Rating from "../ui/Ratings";

async function Recipes({ searchParams }: any) {
  // !! export const dynamic = 'force-dynamic'

  // !! Making dynamic from fetch using => cache: 'no-cache'

  let { recipes, total, skip, limit } = await fetchRecipes();

  if (searchParams.q) {
    const res = await fetchSearchRecipe(searchParams.q);
    recipes = res.recipes;
  } else {
    const res = await fetchRecipes();
    recipes = res.recipes;
  }

  if (searchParams.mealType) {
    console.log(searchParams);
    if (searchParams.mealType != null)
      recipes = recipes.filter(
        (v: Object[]) => v.mealType == searchParams.mealType,
      );
  }

  // const recipes = [
  //   {
  //     id: 1,
  //     name: "Classic Margherita Pizza",
  //     ingredients: [
  //       "Pizza dough",
  //       "Tomato sauce",
  //       "Fresh mozzarella cheese",
  //       "Fresh basil leaves",
  //       "Olive oil",
  //       "Salt and pepper to taste",
  //     ],
  //     instructions: [
  //       "Preheat the oven to 475°F (245°C).",
  //       "Roll out the pizza dough and spread tomato sauce evenly.",
  //       "Top with slices of fresh mozzarella and fresh basil leaves.",
  //       "Drizzle with olive oil and season with salt and pepper.",
  //       "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
  //       "Slice and serve hot.",
  //     ],
  //     prepTimeMinutes: 20,
  //     cookTimeMinutes: 15,
  //     servings: 4,
  //     difficulty: "Easy",
  //     cuisine: "Italian",
  //     caloriesPerServing: 300,
  //     tags: ["Pizza", "Italian"],
  //     userId: 45,
  //     image: "https://cdn.dummyjson.com/recipe-images/1.webp",
  //     rating: 4.6,
  //     reviewCount: 3,
  //     mealType: ["Dinner"],
  //   },
  // ];

  return (
    <div className="w-full">
      <div className="z-0 grid grid-cols-1 gap-4 bg-[url(/background.jpg)] bg-cover bg-no-repeat px-8 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-16">
        {recipes.map(
          (
            {
              id,
              name,
              difficulty,
              cuisine,
              tags,
              image,
              userId,
              rating,
              reviewCount,
              mealType,
            }: any,
            i: number,
          ) => (
            <div
              className="flex h-fit gap-3 rounded-xl bg-green-200 px-4 py-2 text-white"
              key={i}
            >
              <div>
                <Image
                  src={image}
                  alt={name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>

              <div className="">
                <div className="flex w-full flex-col gap-1">
                  <Link href={`/recipes/${id}`}>
                    <p className="w-32 truncate text-xl font-medium md:overflow-visible lg:w-fit">
                      {name}
                    </p>
                  </Link>

                  <div className="flex justify-between md:min-w-[232px]">
                    <p className="text-gray-100">{cuisine}</p>
                    <p className="text-gray-100">{mealType}</p>

                    <p
                      className={`${difficulty == "Easy" && "text-green-500"} ${
                        difficulty == "Medium" && "font-semibold text-red-800"
                      } ${difficulty == "Hard" && "font-bold text-red-800"} `}
                    >
                      {difficulty}
                    </p>
                  </div>
                </div>


                <div className="flex w-full items-center justify-between gap-4">
                  <Rating rating={rating} />
                  <p className="mt-4 text-center text-yellow-300">
                    ( {reviewCount} )
                  </p>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default Recipes;
