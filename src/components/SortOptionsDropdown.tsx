import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const sortOptions = [
  {
    label: "Type af begivenhed",
    value: "type",
  },
  {
    label: "Antal deltagere (mange til få)",
    value: "numberOfParticipants",
  }
];

const SortOptionsDropdown = ({ onChange, sortOption }: Props) => {
  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortOption)?.label ||
    sortOptions[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sorter efter: {selectedSortLabel}
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      {sortOptions.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionsDropdown;