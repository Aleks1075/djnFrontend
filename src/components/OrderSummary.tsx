import { CartItem } from "@/pages/DetailPage";
import { MyEvent } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  event: MyEvent;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalInDKK = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    return totalInDKK;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-1xl font-bold tracking-tight flex justify-between">
          <span>Oversigt</span>
          <span>{getTotalCost()} DKK,-</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              {item.price * item.quantity} DKK,-
            </span>
          </div>
        ))}
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
