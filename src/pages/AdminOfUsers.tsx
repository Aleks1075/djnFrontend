import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchUsers, useDeleteUser } from "@/api/MyUserApi";

const AdminOfUsers = () => {
  const { data: users, refetch, isLoading, isError } = useFetchUsers();
  const { mutate: deleteUser } = useDeleteUser();

  const [localUsers, setLocalUsers] = useState<any[]>([]);
  const [action, setAction] = useState<string>("view");

  useEffect(() => {
    if (users) {
      const filteredUsers = users.filter((user) => user.role === "customer");
      console.log("Filtered Users: ", filteredUsers); // Log filtered users
      setLocalUsers(filteredUsers);
    }
  }, [users]);

  const handleDelete = async (userId: string) => {
    await deleteUser(userId, {
      onSuccess: () => {
        setLocalUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        toast.success("Bruger er slettet!");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [action, refetch]);

  return (
    <Tabs value={action} onValueChange={setAction}>
      <TabsList>
        <TabsTrigger value="view">Se brugere</TabsTrigger>
        <TabsTrigger value="delete">Slet brugere</TabsTrigger>
      </TabsList>

      <TabsContent
        value="view"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">Registrerede Brugere</h2>
        {isLoading ? (
          <p>Indlæser brugere...</p>
        ) : isError ? (
          <p>Kunne ikke indlæse brugere. Prøv igen senere.</p>
        ) : (
          localUsers.map((user: any) => (
            <div key={user._id} className="p-4 bg-white rounded-lg shadow-md">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Navn:</strong> {user.name}
              </p>
              <p>
                <strong>Tlf. nr.:</strong> {user.phone}
              </p>
            </div>
          ))
        )}
      </TabsContent>

      <TabsContent
        value="delete"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">Slet Brugere</h2>
        {isLoading ? (
          <p>Indlæser brugere...</p>
        ) : isError ? (
          <p>Kunne ikke indlæse brugere. Prøv igen senere.</p>
        ) : (
          localUsers.map((user: any) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <div>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Navn:</strong> {user.name}
                </p>
                <p>
                  <strong>Tlf. nr.:</strong> {user.phone}
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDelete(user._id)}
              >
                Slet Bruger
              </Button>
            </div>
          ))
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AdminOfUsers;
