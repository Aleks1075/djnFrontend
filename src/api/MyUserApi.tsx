import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (isError) {
    toast.error(isError.toString());
  }

  return {
    currentUser,
    isLoading,
    isError,
  };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {
  name: string;
  phone: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("Din profil er opdateret!");
  }

  if (isError) {
    toast.error(isError.toString());
    reset();
  }

  return {
    updateUser,
    isLoading,
    isError,
    isSuccess,
    reset,
  };
};

export const useFetchUsers = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchUsers = async (): Promise<User[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const text = await response.text(); // Read the response as text
    console.log("Response text:", text); // Log the response text
    if (!response.ok) {
      console.error(`Failed to fetch users: ${text}`);
      throw new Error(`Failed to fetch users: ${text}`);
    }
    return JSON.parse(text); // Parse the text as JSON
  };

  return useQuery("fetchUsers", fetchUsers);
};

export const useDeleteUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteUserRequest = async (userId: string): Promise<void> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to delete user: ${errorText}`);
      throw new Error(`Failed to delete user: ${errorText}`);
    }
  };

  return useMutation(deleteUserRequest, {
    onSuccess: () => {
      toast.success("Bruger slettet");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
