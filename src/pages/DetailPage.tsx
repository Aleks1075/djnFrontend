import { useParams } from "react-router-dom";
import { useGetEvent } from "@/api/EventApi";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import EventInfo from "@/components/EventInfo";
import EventItemComponent from "@/components/EventItemComponent";
import { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import OrderSummary from "@/components/OrderSummary";
import { EventItem } from "../types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/RegistrationApi";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { eventId } = useParams();
  const { event, isLoading } = useGetEvent(eventId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${eventId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (eventItem: EventItem) => {
    setCartItems((prevCartItems) => {
      // 1. Check if the item is already in the cart
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === eventItem._id
      );
      // 2. If it is, update the quantity
      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === eventItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        // 3. If it is not, add it to the cart
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: eventItem._id,
            name: eventItem.name,
            price: eventItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${eventId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${eventId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!event) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        eventItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      eventId: event._id,
      deliveryDetails: {
        email: userFormData.email as string,
        name: userFormData.name,
        phone: userFormData.phone,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !event) {
    return "Indlæser...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={event.imageUrls[0]}
          className="rounded-mg object-cover h-full w=full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <EventInfo event={event} />
          <span className="text-2xl font-bold tracking-tight">
            Info om {event.type}
          </span>
          {event.eventItems.map((eventItem) => (
            <EventItemComponent
              eventItem={eventItem}
              addToCart={() => addToCart(eventItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              event={event}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
