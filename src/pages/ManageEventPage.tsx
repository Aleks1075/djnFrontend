import { createMyEvent, getMyEvent, updateMyEvent } from "@/api/MyEventApi";
import ManageEventForm from "@/forms/manage-event-form/ManageEventForm";

const ManageEventPage = () => {
  const { createEvent, isLoading: isCreateLoading } = createMyEvent();
  const { event } = getMyEvent();
  const { updateEvent, isLoading: isUpdateLoading } = updateMyEvent();

  const isEditing = !!event;

  return (
    <ManageEventForm 
    event={event} 
    onSave={isEditing ? updateEvent : createEvent} 
    isLoading={isCreateLoading || isUpdateLoading} 
    />
  );
};

export default ManageEventPage;