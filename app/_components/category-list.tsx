import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});
  return (
    <div className="grid grid-cols-2 gap-3 ">
      {categories.map((categorty) => (
        <CategoryItem key={categorty.id} category={categorty} />
      ))}
    </div>
  );
};

export default CategoryList;
