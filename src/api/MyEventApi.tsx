import { MyEvent, Registration } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getMyEvent = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyEventRequest = async (): Promise<MyEvent> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/event`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get event");
    }

    return response.json();
  };

  const { data: event, isLoading } = useQuery(
    "fetchMyEvent",
    getMyEventRequest
  );

  return { event, isLoading };
};

export const getMyEvents = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyEventsRequest = async (): Promise<MyEvent[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/event`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get events");
    }

    return response.json();
  };

  const {
    data: events,
    isLoading,
    refetch,
  } = useQuery("fetchMyEvents", getMyEventsRequest);

  return { events, isLoading, refetch };
};

export const createMyEvent = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyEventRequest = async (
    eventFormData: FormData
  ): Promise<MyEvent> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/event`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: eventFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    return response.json();
  };

  const {
    mutate: createEvent,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(createMyEventRequest);

  useEffect(() => {
    if (isSuccess) toast.success("Event created");
    if (isError) toast.error("Unable to create event");
  }, [isSuccess, isError]);

  return { createEvent, isLoading };
};

export const updateMyEvent = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyEventRequest = async (
    eventId: string,
    eventFormData: FormData
  ): Promise<MyEvent> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/event/${eventId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: eventFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to update event");
    }

    return response.json();
  };

  const {
    mutate: updateEvent,
    isLoading,
    isSuccess,
    isError,
  } = useMutation((data: { eventId: string; eventFormData: FormData }) =>
    updateMyEventRequest(data.eventId, data.eventFormData)
  );

  useEffect(() => {
    if (isSuccess) toast.success("Event updated");
    if (isError) toast.error("Unable to update event");
  }, [isSuccess, isError]);

  return { updateEvent, isLoading };
};

export const deleteMyEvent = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteMyEventRequest = async (eventId: string): Promise<void> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/event/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete event");
    }

    return response.json();
  };

  const {
    mutate: deleteEvent,
    isLoading,
    reset,
  } = useMutation(deleteMyEventRequest, {
    onSuccess: () => {
      toast.success("Event deleted");
      reset();
    },
    onError: () => {
      toast.error("Unable to delete event");
      reset();
    },
  });

  return { deleteEvent, isLoading };
};

export const useGetMyEventRegistrations = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyEventRegistrationsRequest = async (): Promise<Registration[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/event/registration`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch registrations");
    }

    return response.json();
  };

  const { data: registrations, isLoading } = useQuery(
    "fetchMyEventRegistrations",
    getMyEventRegistrationsRequest
  );

  return { registrations, isLoading };
};

type UpdateStatusRegistrationRequest = {
  registrationId: string;
  status: string;
};

export const useUpdateMyEventRegistration = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyEventRegistration = async (
    updateStatusRegistrationRequest: UpdateStatusRegistrationRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/event/registration/${updateStatusRegistrationRequest.registrationId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: updateStatusRegistrationRequest.status,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }
    return response.json();
  };

  const {
    mutateAsync: updateEventStatus,
    isLoading,
    isSuccess,
    isError,
    reset,
  } = useMutation(updateMyEventRegistration);

  if (isSuccess) {
    toast.success("Tilmelding opdateret");
  }

  if (isError) {
    toast.error("Kunne ikke opdatere tilmelding");
    reset();
  }

  return { updateEventStatus, isLoading };
};
