import { Registration } from "@/types";
import { Progress } from "./ui/progress";
import { REGISTRATION_STATUS } from "@/config/registration-status-config";

type Props = {
  registration: Registration;
};

const RegistrationStatusHeader = ({ registration }: Props) => {
  const getRegistrationStatusInfo = () => {
    return (
      REGISTRATION_STATUS.find((o) => o.value === registration.status) ||
      REGISTRATION_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>
          {" "}
          Status på din tilmelding: {getRegistrationStatusInfo().label}
        </span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getRegistrationStatusInfo().progressValue}
      />
    </>
  );
};

export default RegistrationStatusHeader;
