import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import * as z from 'zod';

import { Button, Form, FormField, FormInput } from '@/src/components/ui';
import { useAuthStore } from '@/src/services/auth';

const formSchema = z
  .object({
    email: z.string().email('Please enter a valid email address.'),
    password: z
      .string()
      .min(8, 'Please enter at least 8 characters.')
      .max(64, 'Please enter fewer than 64 characters.')
      .regex(/^(?=.*[a-z])/, 'Your password must have at least one lowercase letter.')
      .regex(/^(?=.*[A-Z])/, 'Your password must have at least one uppercase letter.')
      .regex(/^(?=.*[0-9])/, 'Your password must have at least one number.')
      .regex(/^(?=.*[!@#$%^&*])/, 'Your password must have at least one special character.'),
    confirmPassword: z.string().min(8, 'Please enter at least 8 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Your passwords do not match.',
    path: ['confirmPassword'],
  });

export default function SignUpForm() {
  const router = useRouter();
  const { signUp } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await signUp(data.email, data.password);
      form.reset();
    } catch (error: Error | any) {
      console.error(error.message);
    }
  }

  return (
    <>
      <View className="flex-1 py-4">
        <Form {...form}>
          <View className="gap-1.5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  // label="Email"
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
                  // label="Password"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormInput
                  // label="Confirm Password"
                  placeholder="Confirm password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  {...field}
                />
              )}
            />
          </View>
        </Form>
        <View className="pt-3 pb-2.5">
          <Button size="default" variant="default" onPress={form.handleSubmit(onSubmit)}>
            {form.formState.isSubmitting ? <ActivityIndicator size="small" /> : 'Sign in'}
          </Button>
        </View>
        <View className="flex flex-row justify-center gap-x-1">
          <Text
            className="font-body text-1 text-black text-center"
            onPress={() => {
              router.navigate('/');
            }}>
            Already have an account? <Text className="text-bodybold">Sign in</Text>
          </Text>
        </View>
      </View>
    </>
  );
}
