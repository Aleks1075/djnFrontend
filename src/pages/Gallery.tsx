import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchImages, useUploadImage } from "@/api/GalleryApi";

const Gallery = () => {
  const { data: images, refetch, isLoading, isError } = useFetchImages();
  const { mutate: uploadImage } = useUploadImage();

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Vælg venligst en fil at uploade.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);

    uploadImage(formData, {
      onSuccess: () => {
        toast.success("Billede er uploadet!");
        refetch();
        setFile(null);
        setName("");
        setDescription("");
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(`Kunne ikke uploade billede: ${error.message}`);
        }
      },
    });
  };

  return (
    <div className="space-y-5 bg-gray-50 p-10 rounded-lg">
      <h2 className="text-2xl font-bold">Galleri</h2>

      {isLoading ? (
        <p>Indlæser billeder...</p>
      ) : isError ? (
        <p>Kunne ikke indlæse billeder. Prøv igen senere.</p>
      ) : (
        images.map((image: any) => (
          <div key={image._id} className="p-4 bg-white rounded-lg shadow-md">
            <img
              src={image.imageUrl}
              alt={image.name}
              className="w-full h-auto"
            />
            <p>
              <strong>Navn på billede:</strong> {image.name}
            </p>
            <p>
              <strong>Beskrivelse:</strong> {image.description}
            </p>
          </div>
        ))
      )}

      <div className="space-y-3">
        <Input type="file" onChange={handleFileChange} />
        <Input
          type="text"
          placeholder="Navn på billede"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Beskrivelse af billede"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleUpload}>Upload Billede</Button>
      </div>
    </div>
  );
};

export default Gallery;
