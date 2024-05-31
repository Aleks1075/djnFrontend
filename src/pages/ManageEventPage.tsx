import {
  createMyEvent,
  getMyEvents,
  updateMyEvent,
  deleteMyEvent,
  useGetMyEventRegistrations,
} from "@/api/MyEventApi";
import RegistrationItemCard from "@/components/RegistrationItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageEventForm from "@/forms/manage-event-form/ManageEventForm";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MyEvent } from "@/types";
import { toast } from "sonner";

const ManageEventPage = () => {
  const { createEvent, isLoading: isCreateLoading } = createMyEvent();
  const { events, isLoading: isGetAllLoading, refetch } = getMyEvents();
  const { updateEvent, isLoading: isUpdateLoading } = updateMyEvent();
  const { deleteEvent, isLoading: isDeleteLoading } = deleteMyEvent();
  const { registrations } = useGetMyEventRegistrations();

  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);
  const [action, setAction] = useState<string>("");

  const handleDelete = async (eventId: string) => {
    await deleteEvent(eventId);
    refetch();
  };

  useEffect(() => {
    if (action !== "update" && action !== "create") {
      setSelectedEvent(null);
    }
    refetch();
  }, [action, refetch]);

  const handleEventSave = async (formData: FormData) => {
    if (action === "create") {
      await createEvent(formData);
      toast.success("Begivenhed oprettet");
    } else if (action === "update" && selectedEvent) {
      await updateEvent({
        eventId: selectedEvent._id,
        eventFormData: formData,
      });
      toast.success("Begivenhed opdateret");
    }
    refetch();
    setAction("");
    setSelectedEvent(null);
  };

  return (
    <Tabs defaultValue="registrations">
      <TabsList>
        <TabsTrigger value="registrations">Tilmeldinger</TabsTrigger>
        <TabsTrigger value="manage-event" onClick={() => setAction("create")}>
          Opret ny
        </TabsTrigger>
        <TabsTrigger value="manage-event" onClick={() => setAction("update")}>
          Opdater
        </TabsTrigger>
        <TabsTrigger value="manage-event" onClick={() => setAction("delete")}>
          Slet
        </TabsTrigger>
        <TabsTrigger value="manage-event" onClick={() => setAction("view")}>
          Se alle
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="registrations"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {registrations?.length} Tilmeldinger
        </h2>
        {registrations?.map((registration) => (
          <RegistrationItemCard
            key={registration._id}
            registration={registration}
          />
        ))}
      </TabsContent>

      <TabsContent value="manage-event">
        {action === "create" && (
          <ManageEventForm
            onSave={handleEventSave}
            isLoading={isCreateLoading}
          />
        )}

        {action === "update" && (
          <>
            <div className="space-y-5 bg-gray-50 p-10 rounded-lg">
              {isGetAllLoading ? (
                <p>Indlæser begivenheder...</p>
              ) : (
                events?.map((event) => (
                  <div
                    key={event._id}
                    className="flex items-center justify-between"
                  >
                    <p>
                      {event.type} - {event.city}
                    </p>
                    <Button onClick={() => setSelectedEvent(event)}>
                      Opdater
                    </Button>
                  </div>
                ))
              )}
            </div>
            {selectedEvent && (
              <ManageEventForm
                event={selectedEvent}
                onSave={handleEventSave}
                isLoading={isUpdateLoading}
              />
            )}
          </>
        )}

        {action === "delete" && (
          <div className="space-y-5 bg-gray-50 p-10 rounded-lg">
            {isGetAllLoading ? (
              <p>Indlæser begivenheder...</p>
            ) : (
              events
                ?.filter((event) => event._id !== selectedEvent?._id) // Removing deleted event from the list immediately
                .map((event) => (
                  <div
                    key={event._id}
                    className="flex items-center justify-between"
                  >
                    <p>
                      {event.type} - {event.city}
                    </p>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(event._id)}
                      disabled={isDeleteLoading}
                    >
                      {isDeleteLoading ? "Sletter..." : "Slet"}
                    </Button>
                  </div>
                ))
            )}
          </div>
        )}

        {action === "view" && (
          <div className="space-y-5 bg-gray-50 p-10 rounded-lg">
            <h2 className="text-2xl font-bold">Alle begivenheder</h2>
            {isGetAllLoading ? (
              <p>Indlæser begivenheder...</p>
            ) : (
              events?.map((event) => (
                <div
                  key={event._id}
                  className="p-4 bg-white rounded-lg shadow-md"
                >
                  <p>
                    <strong>Type:</strong> {event.type}
                  </p>
                  <p>
                    <strong>By:</strong> {event.city}
                  </p>
                  <p>
                    <strong>Beskrivelse:</strong> {event.description}
                  </p>
                  <p>
                    <strong>Deltagere:</strong> {event.numberOfParticipants}
                  </p>
                  <p>
                    <strong>Faciliteter:</strong> {event.facilities.join(", ")}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ManageEventPage;
