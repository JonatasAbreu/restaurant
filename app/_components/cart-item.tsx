import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Trash } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClik = () => {
    decreseProductQuantity(cartProduct.id);
  };

  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(cartProduct.id);
  };

  const handleRemoveClick = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 ">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className=" flex items-center gap-1">
            <h4 className=" text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClik}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="block w-3 text-sm">{cartProduct.quantity}</span>
            <Button
              className="h-7 w-7 "
              size="icon"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemoveClick}
        className="h-7 w-7  border border-solid border-muted-foreground "
      >
        <Trash size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
