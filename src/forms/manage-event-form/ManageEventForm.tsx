import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import FacilitiesSection from "./FacilitiesSection";
import EventSection from "./EventSection";
import ImageSection from "./ImageSection";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { useEffect } from "react";
import { MyEvent } from "@/types";

const formSchema = z
  .object({
    type: z.string({
      required_error: "Type af begivenhed er påkrævet",
    }),
    city: z.string({
      required_error: "Lokations navn er påkrævet",
    }),
    description: z.string({
      required_error: "Beskrivelse er påkrævet",
    }),
    numberOfParticipants: z.coerce.number({
      required_error: "Antal deltagere er påkrævet",
      invalid_type_error: "Antal deltagere skal være et tal",
    }),
    facilities: z.array(z.string()).nonempty({
      message: "Mindst én facilitet er påkrævet",
    }),
    eventItems: z.array(
      z.object({
        name: z.string().min(1, "Navn er påkrævet"),
        price: z.coerce.number().min(0, "Pris skal være et positivt tal"),
      })
    ),
    imageUrls: z.array(z.string()).optional(),
    imageFile: z
      .instanceof(File, { message: "Billede er påkrævet" })
      .optional(),
  })
  .refine((data) => data.imageUrls || data.imageFile, {
    message: "Enten et billede URL eller et billede fil er påkrævet",
    path: ["imageFile"],
  });

type EventFormData = z.infer<typeof formSchema>;

type Props = {
  event?: MyEvent;
  onSave: (eventFormData: FormData) => void;
  isLoading: boolean;
};

const ManageEventForm = ({ onSave, isLoading, event }: Props) => {
  const form = useForm<EventFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facilities: [],
      eventItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!event) {
      return;
    }

    // Update the form with event data
    const updatedEvent = {
      ...event,
      imageUrls: event.imageUrls || [],
    };

    form.reset(updatedEvent);
  }, [form, event]);

  const onSubmit = (formDataJson: EventFormData) => {
    // TODO - convert formDataJson to FormData
    const formData = new FormData();

    formData.append("type", formDataJson.type);
    formData.append("city", formDataJson.city);
    formData.append("description", formDataJson.description);
    formData.append(
      "numberOfParticipants",
      formDataJson.numberOfParticipants.toString()
    );
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    formDataJson.eventItems.forEach((eventItem, index) => {
      formData.append(`eventItems[${index}][name]`, eventItem.name);
      formData.append(
        `eventItems[${index}][price]`,
        eventItem.price.toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray=50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <FacilitiesSection />
        <Separator />
        <EventSection />
        <Separator />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">Gem begivenhed</Button>
        )}
      </form>
    </Form>
  );
};

export default ManageEventForm;
