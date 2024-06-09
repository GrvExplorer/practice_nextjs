import next from "next";
import { unstable_noStore } from "next/cache";

export const fetchRecipes = async () => {
  // unstable_noStore()
  try {
    const responses = await fetch("https://dummyjson.com/recipes");
    return responses.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecipeById = async (id: string) => {
  // unstable_noStore()
  try {
    const responses = await fetch(`https://dummyjson.com/recipes/${id}`);
    return responses.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchRecipe = async (q: string) => {
  // unstable_noStore()
  try {
    const responses = await fetch(
      `https://dummyjson.com/recipes/search?q=${q}`,
    );
    return responses.json();
  } catch (error) {
    console.log(error);
  }
};
