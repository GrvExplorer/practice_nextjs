import { fetchRecipeById } from "@/lib/api/fetchData";
import Image from "next/image";
import { notFound } from "next/navigation";

async function Recipe({ params }: any) {
  const { name, image, rating, reviewCount, mealType, cuisine } =
    await fetchRecipeById(params.id);

  if (!name) notFound();
  console.log(mealType);
  

  return (
    <div className="flex justify-center">
      <Image src={image} alt={name} width={1000} height={250} />
    </div>
  );
}

export default Recipe;
