
import { getMenuByCategory } from "@/services/foodMenuService"
import { FoodItem } from "@/types/food-item"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  params: {
    id: string
  }
}

export default async function CategoryMenuPage({ params }: Props) {
  const items: FoodItem[] = await getMenuByCategory(params.id)

  if (items.length === 0) {
    return (
      <div className="p-10 text-center text-muted-foreground text-sm">
        No se encontraron alimentos en la categoría <b>{params.id}</b>.
      </div>
    )
  }

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 capitalize">Menú: {params.id}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition">
            <CardHeader className="p-0 relative aspect-[4/3]">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover rounded-t-md"
              />
            </CardHeader>
            <CardContent className="pt-2">
              <CardTitle className="text-sm font-semibold">{item.name}</CardTitle>
              <p className="text-xs text-muted-foreground line-clamp-2">{item.dsc}</p>
              <p className="text-sm font-bold mt-2">${item.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}