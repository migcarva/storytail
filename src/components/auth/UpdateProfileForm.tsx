import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, View } from 'react-native';
import * as z from 'zod';

import { Button, Form, FormField, FormInput } from '@/src/components/ui';
import { useSupabase } from '@/src/hooks/useSupabase';
import useUserStore from '@/src/lib/stores/user';

const formSchema = z.object({
  username: z.string(),
  full_name: z.string(),
});

export default function UpdateProfileForm() {
  const { session, updateProfile, getProfile } = useSupabase();
  const { username, setUsername, updatedAt, setUpdatedAt, fullName, setFullName } = useUserStore();

  useEffect(() => {
    if (session) getUserData();
    if (session?.user.updated_at !== updatedAt) getUserData();
  }, [session, updatedAt]);

  async function getUserData() {
    try {
      const { data } = await getProfile();
      if (data) {
        setUsername(data.username);
        setUpdatedAt(data.updated_at);
        setFullName(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      full_name: '',
    },
    values: {
      username: username || '',
      full_name: fullName || '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await updateProfile(data.username, data.full_name);
      setUsername(data.username);
      setUpdatedAt(data.full_name);
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
