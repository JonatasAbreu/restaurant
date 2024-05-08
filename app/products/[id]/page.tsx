import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProdcutDetails from "../_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },

    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },

      restaurant: {
        id: product?.restaurant?.id,
      },
    },

    include: {
      restaurant: true,
    },
  });
  return <ProdcutDetails product={product} complementaryProducts={juices} />;
};

export default ProductPage;
