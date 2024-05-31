import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import EventItemInput from "./EventItemInput";

const EventSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "eventItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Begivenheder</h2>
        <FormDescription>
          Angiv navn og pris for hver begivenhed
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="eventItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <EventItemInput
                index={index}
                removeEventItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Tilføj begivenhed
      </Button>
    </div>
  );
};

export default EventSection;
