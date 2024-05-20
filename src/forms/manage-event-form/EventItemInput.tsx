import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const EventItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`eventItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
            Navn på begivenhed <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Navn på begivenhed"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`eventItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
            Pris <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="0.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        Fjern
      </Button>
    </div>
  );
};

export default EventItemInput;