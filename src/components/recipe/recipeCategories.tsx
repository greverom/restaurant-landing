"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CATEGORIES } from "@/data/categories"

export default function RecipeCategories() {
  const router = useRouter()

  const handleClick = (id: string) => {
    router.push(`/recetas/${id}`) 
  }

  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold mb-6">Categorías de Recetas</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((category) => (
          <Card
            key={category.id}
            onClick={() => handleClick(category.id)}
            className="cursor-pointer hover:shadow-lg transition"
          >
            <CardHeader className="p-0 h-36 relative">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover rounded-t-md"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-base font-medium text-center">
                {category.name}
              </CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}