import { Registration } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  registration: Registration;
};

const RegistrationStatusDetails = ({ registration }: Props) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Detaljer: </span>
        <span>{registration.deliveryDetails.name}</span>
        <span>
          {registration.deliveryDetails.email},{" "}
          {registration.deliveryDetails.phone}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Info om begvivenhed: </span>
        <ul>
          {registration.cartItems.map((item) => (
            <li>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Pris</span>
        <span>{registration.totalAmount / 100} DKK,-</span>
      </div>
    </div>
  );
};

export default RegistrationStatusDetails;
