import { MyEvent } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getMyEvent = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyEventRequest = async ():Promise<MyEvent> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/event`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get event');
        }

        return response.json();
    };

    const { data: event, isLoading } = useQuery('fetchMyEvent', getMyEventRequest);

    return { event, isLoading };
};

export const createMyEvent = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyEventRequest = async (eventFormData: FormData):Promise<MyEvent> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/event`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: eventFormData,
        });

        if (!response.ok) {
            throw new Error('Failed to create event');
        }

        return response.json();
    };

    const { mutate: createEvent, isLoading, isSuccess, isError } = useMutation(createMyEventRequest);

    if (isSuccess) {
        toast.success('Event created');
    }

    if (isError) {
        toast.error('Unable to create event');
    }

    return { createEvent, isLoading };
};

export const updateMyEvent = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyEventRequest = async (eventFormData: FormData):Promise<MyEvent> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/event`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: eventFormData,
        });

        if (!response.ok) {
            throw new Error('Failed to update event');
        }

        return response.json();
    };

    const { mutate: updateEvent, isLoading, isSuccess, isError } = useMutation(updateMyEventRequest);

    if (isSuccess) {
        toast.success('Event updated');
    }

    if (isError) {
        toast.error('Unable to update event');
    }

    return { updateEvent, isLoading };
};