import { facilitiesList } from "@/config/event-options";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (facilities: string[]) => void;
  selectedFacilities: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const FacilitiesFilter = ({
  onChange,
  selectedFacilities,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleFacilitiesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedFacility = event.target.value;
    const isChecked = event.target.checked;
    const newFacilitiesList = isChecked
      ? [...selectedFacilities, clickedFacility]
      : selectedFacilities.filter((facility) => facility !== clickedFacility);

    onChange(newFacilitiesList);
  };

  const handleFacilitiesReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">
          Filtrer efter facilititer
        </div>
        <div
          onClick={handleFacilitiesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-yellow-500"
        >
          Nulstil filter
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {facilitiesList
          .slice(0, isExpanded ? facilitiesList.length : 7)
          .map((facility) => {
            const isSelected = selectedFacilities.includes(facility);
            return (
              <div className="flex">
                <input
                  id={`facility_${facility}`}
                  type="checkbox"
                  className="hidden"
                  value={facility}
                  checked={isSelected}
                  onChange={handleFacilitiesChange}
                />
                <Label
                  htmlFor={`facility_${facility}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {facility}
                </Label>
              </div>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              Vis mindre <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              Vis mere <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default FacilitiesFilter;
