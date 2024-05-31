import { type EventItem } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  eventItem: EventItem;
  addToCart: () => void;
};

const EventItemComponent = ({ eventItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{eventItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">{eventItem.price} DKK,-</CardContent>
    </Card>
  );
};

export default EventItemComponent;
