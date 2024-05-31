import { useSearchEvents } from "@/api/EventApi";
import FacilitiesFilter from "@/components/FacilitiesFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionsDropdown from "@/components/SortOptionsDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedFacilties: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedFacilties: [],
    sortOption: "price",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchEvents(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedFacilities = (selectedFacilties: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedFacilties,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    return <span>Indlæser...</span>;
  }

  if (!results?.data || !city) {
    return <span>Ingen resultater fundet</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="facilities-list">
        <FacilitiesFilter
          selectedFacilities={searchState.selectedFacilties}
          onChange={setSelectedFacilities}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Søg efter type af event"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultsInfo total={results.pagination.total} city={city} />
          <SortOptionsDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((event) => (
          <SearchResultsCard event={event} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
