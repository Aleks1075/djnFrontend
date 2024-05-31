import { useGetMyRegistrations } from "@/api/RegistrationApi";
import RegistrationStatusDetails from "@/components/RegistrationStatusDetails";
import RegistrationStatusHeader from "@/components/RegistrationStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const RegistrationStatusPage = () => {
  const { registrations, isLoading } = useGetMyRegistrations();

  if (isLoading) {
    return "Indlæser...";
  }

  if (!registrations || registrations.length === 0) {
    return "Du har ikke nogen registreringer";
  }

  return (
    <div className="space-y-10">
      {registrations.map((registration) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <RegistrationStatusHeader registration={registration} />
          <div className="grid gap-10 md:grid-cols-2">
            <RegistrationStatusDetails registration={registration} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={registration.event.imageUrls[0]}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegistrationStatusPage;
