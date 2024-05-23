import { SearchState } from "@/pages/SearchPage";
import { EventSearchResponse, MyEvent } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetEvent = (eventId?: string) => {
  const getEventByIdRequest = async (): Promise<MyEvent> => {
    const response = await fetch(`${API_BASE_URL}/api/event/${eventId}`);

    if (!response.ok) {
      throw new Error("Failed to get event");
    }

    return response.json();
  };

  const { data: event, isLoading } = useQuery(
    "fetchEvent",
    getEventByIdRequest,
    { enabled: !!eventId }
  );

  return { event, isLoading };
};

export const useSearchEvents = (searchState: SearchState, city?: string) => {
    const createSearchRequest = async (): Promise<EventSearchResponse> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedFacilities", searchState.selectedFacilties.join(","));
      params.set("sortOption", searchState.sortOption);

        const response = await fetch(
            `${API_BASE_URL}/api/event/search/${city}?${params.toString()}`
          );
      
          if (!response.ok) {
            throw new Error("Failed to get event");
          }
      
          return response.json();
        };

        const { data: results, isLoading } = useQuery(
            ["searchEvents", searchState],
            createSearchRequest,
            { enabled: !!city }
            );

            return { results, isLoading };
};