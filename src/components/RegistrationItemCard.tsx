import { Registration, RegistrationStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { REGISTRATION_STATUS } from "@/config/registration-status-config";
import { useEffect, useState } from "react";
import { useUpdateMyEventRegistration } from "@/api/MyEventApi";

type Props = {
  registration: Registration;
};

const RegistrationItemCard = ({ registration }: Props) => {
  const { updateEventStatus, isLoading } = useUpdateMyEventRegistration();

  const [status, setStatus] = useState<RegistrationStatus>(registration.status);

  useEffect(() => {
    setStatus(registration.status);
  }, [registration.status]);

  const handleStatusChange = async (newStatus: RegistrationStatus) => {
    await updateEventStatus({
      registrationId: registration._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Kundenavn:
            <span className="ml-2 font-normal">
              {registration.deliveryDetails.name}
            </span>
          </div>
          <div>
            Kontakt info:
            <span className="ml-2 font-normal">
              {registration.deliveryDetails.email},{" "}
              {registration.deliveryDetails.phone}
            </span>
          </div>
          <div>
            Pris i alt:
            <span className="ml-2 font-normal">
              {registration.totalAmount / 100} DKK,-
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-cpl gap-2">
          {registration.cartItems.map((cartItem) => (
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Hvad er status for denne tilmelding?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) =>
              handleStatusChange(value as RegistrationStatus)
            }
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {REGISTRATION_STATUS.map((status) => (
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationItemCard;
