import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultsInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:flex-row">
      <span>
        {total} Begivenheder fundet i {city}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-yellow-500"
        >
          Skift by
        </Link>
      </span>
    </div>
  );
};

export default SearchResultsInfo;
