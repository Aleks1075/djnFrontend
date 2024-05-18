import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Navn er påkrævet").max(255, "Navn er for langt"),
    phone: z.string().min(8, "Telefonnummer er påkrævet").max(255, "Telefonnummer er for langt"),
});

type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
}

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
            <div>
                <h2 className="text-2xl font-bold">Din Profil</h2>
                <FormDescription>
                    Her kan du se og ændre dine oplysninger
                </FormDescription>
            </div>
            <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input {...field} disabled  className="bg-white"/>
                    </FormControl>
                </FormItem>
            )} />
            <div className="flex flex-col md:flex-row gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>Navn</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>Tlf. nummer</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            </div>
            {isLoading ? (
            <LoadingButton /> 
            ) : ( 
            <Button type="submit" className="bg-yellow-500">Gem</Button>
            )}
        </form>
    </Form>
  )
};

export default UserProfileForm;