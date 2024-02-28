import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import * as z from 'zod';

import { Button, Form, FormField, FormInput } from '@/src/components/ui';
import { useSupabase } from '@/src/hooks/useSupabase';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Please enter at least 8 characters.')
    .max(64, 'Please enter fewer than 64 characters.'),
});

export default function SignIn() {
  const { signInWithPassword } = useSupabase();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await signInWithPassword(data.email, data.password);

      form.reset();
    } catch (error: Error | any) {
      console.log(error.message);
    }
  }

  return (
    <>
      <View className="flex-1 py-4 px-2">
        <Form {...form}>
          <View className="gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  label="Email"
                  placeholder="Email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormInput
                  label="Password"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  {...field}
                />
              )}
            />
          </View>
        </Form>
        <Button size="default" variant="default" onPress={form.handleSubmit(onSubmit)}>
          {form.formState.isSubmitting ? <ActivityIndicator size="small" /> : 'Sign in'}
        </Button>
        <Text
          className="font-body text-1 text-purple text-center "
          onPress={() => {
            router.replace('/signup');
          }}>
          Don't have an account? <Text className="text-1.25">Sign up</Text>
        </Text>
      </View>
    </>
  );
}
