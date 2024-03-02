import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import * as z from 'zod';

import { Button, Form, FormField, FormInput } from '@/src/components/ui';
import { useProfile } from '@/src/hooks/useProfile';
import { useAuthStore } from '@/src/services/auth';

const formSchema = z.object({
  username: z.string(),
  full_name: z.string(),
});

export default function UpdateProfileForm() {
  const { user } = useAuthStore();
  const { username, full_name, handleProfileUpdate } = useProfile(user!.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      full_name: '',
    },
    values: {
      username: username || '',
      full_name: full_name || '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      handleProfileUpdate({
        username: data.username,
        full_name: data.full_name,
      });
      form.reset();
    } catch (error: Error | any) {
      console.log(error.message);
    }
  }

  return (
    <>
      <View className="py-4">
        <Form {...form}>
          <View className="gap-1.5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormInput
                  label="Username"
                  placeholder="Username"
                  autoCapitalize="none"
                  autoComplete="username"
                  autoCorrect={false}
                  keyboardType="default"
                  className="bg-input rounded-lg"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormInput
                  label="Full name"
                  placeholder="Your name"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect={false}
                  keyboardType="default"
                  className="bg-input rounded-lg"
                  {...field}
                />
              )}
            />
          </View>
        </Form>
        <View className="pt-3 pb-2.5">
          <Button size="default" variant="default" onPress={form.handleSubmit(onSubmit)}>
            {form.formState.isSubmitting ? <ActivityIndicator size="small" /> : 'Update profile'}
          </Button>
        </View>
      </View>
    </>
  );
}
