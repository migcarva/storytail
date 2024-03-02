import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import * as z from 'zod';

import { Button, Form, FormField, FormInput } from '@/src/components/ui';
import { resetPassword } from '@/src/services/auth';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

export default function ResetPasswordForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await resetPassword(data.email);

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
          </View>
        </Form>
        <View className="pt-3 pb-2.5">
          <Button size="default" variant="default" onPress={form.handleSubmit(onSubmit)}>
            {form.formState.isSubmitting ? (
              <ActivityIndicator size="small" />
            ) : (
              'Reset your password'
            )}
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
