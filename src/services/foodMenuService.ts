import { FoodItem } from "@/types/food-item"

const BASE_URL = "https://free-food-menus-api-two.vercel.app"

export async function getMenuByCategory(category: string): Promise<FoodItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/${category}`, { cache: "no-store" })

    if (!res.ok) {
      throw new Error(`Error al obtener los alimentos de la categoría ${category}`)
    }

    const data = await res.json()
    return data as FoodItem[]
  } catch (error) {
    console.error("[getMenuByCategory] →", error)
    return []
  }
}