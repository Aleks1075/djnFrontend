import { MyEvent } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  event: MyEvent;
};

const EventInfo = ({ event }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {event.type}
        </CardTitle>
        <CardDescription>
          {event.city}, {event.numberOfParticipants} deltagere
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {event.facilities.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < event.facilities.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default EventInfo;
