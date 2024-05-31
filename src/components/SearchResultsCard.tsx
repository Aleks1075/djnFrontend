import { MyEvent } from "../types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Dot, Trophy } from "lucide-react";

type Props = {
  event: MyEvent;
};

const SearchResultsCard = ({ event }: Props) => {
  return (
    <Link
      to={`/detail/${event._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={event.imageUrls[0]}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {event.type}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {event.facilities.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < event.facilities.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Begivenheds Elementer</h4>
            {event.eventItems.map((item) => (
              <div key={item._id} className="flex items-center mt-2">
                <Trophy className="mr-2" />
                <span className="mr-4">{item.name}</span>
                <Banknote className="mr-2" />
                <span>{item.price} DKK,-</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;
