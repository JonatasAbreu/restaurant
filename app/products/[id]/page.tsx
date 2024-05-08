import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProdcutDetails from "../_components/product-details";
import ProductImage from "../_components/product-image";

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
  return (
    <div>
      {/* IMAGEM */}
      <ProductImage product={product} />

      {/* TITULO E PREÇO */}
      <ProdcutDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductPage;
