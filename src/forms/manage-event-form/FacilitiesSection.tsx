import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { facilitiesList } from "@/config/event-options";
import { useFormContext } from "react-hook-form";
import FacilityCheckbox from "./FacilityCheckbox";

const FacilitiesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Faciliteter</h2>
            <FormDescription>
                Angiv de faciliteter, der er tilgængelige på lokationen
            </FormDescription>
        </div>
        <FormField control={control} name="facilities" render={({ field }) => (
            <FormItem>
                <div className="grid md:grid-cols-5 gap-1">
                    {facilitiesList.map((facilityItem) => (
                        <FacilityCheckbox facility={facilityItem} field={field} />
                    ))}
                </div>
                <FormMessage />
            </FormItem>
            )}
         />
    </div>
  );
};

export default FacilitiesSection;