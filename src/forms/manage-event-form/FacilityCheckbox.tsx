import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  facility: string;
  field: ControllerRenderProps<FieldValues, "facilities">;
}

const FacilityCheckbox = ({ facility, field }: Props) => {
    return (
        <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
            <FormControl>
                <Checkbox className="bg-white" checked={field.value.includes(facility)}
                onCheckedChange={(checked) => {
                    if (checked) {
                        field.onChange([...field.value, facility]);
                    } else {
                        field.onChange(
                            field.value.filter((value: string) => value !== facility)
                        );
                    }
                }}
                />
            </FormControl>
            <FormLabel className="text-sm font-normal">{facility}</FormLabel>
        </FormItem>
    );
};

export default FacilityCheckbox;