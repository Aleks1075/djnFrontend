import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Detaljer</h2>
        <FormDescription>Udfyld detaljerne for begivenheden</FormDescription>
      </div>
      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type af begivenhed</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex-gap-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Lokation</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Beskrivelse af begivenhed</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="numberOfParticipants"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Antal deltagere</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailsSection;
