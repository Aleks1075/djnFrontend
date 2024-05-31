import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetchImages = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchImages = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/gallery`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    return response.json();
  };

  return useQuery("fetchImages", fetchImages);
};

export const useUploadImage = () => {
  const { getAccessTokenSilently } = useAuth0();

  const uploadImage = async (formData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/gallery`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload Image Error Response:", errorText);
      throw new Error("Failed to upload image");
    }

    return response.json();
  };

  return useMutation(uploadImage, {
    onSuccess: () => {
      toast.success("Image uploaded successfully.");
    },
    onError: (error: unknown) => {
      console.error("Upload Image Error:", error);
      if (error instanceof Error) {
        toast.error(`Failed to upload image: ${error.message}`);
      }
    },
  });
};
