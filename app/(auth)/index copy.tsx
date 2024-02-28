import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import * as z from 'zod';

import { Button, Form, FormField, FormInput } from '@/src/components/ui';
import { useSupabase } from '@/src/hooks/useSupabase';
import SignInForm from '@/src/components/auth/SignInForm';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Please enter at least 8 characters.')
    .max(64, 'Please enter fewer than 64 characters.'),
});

export default function WelcomeScreen() {
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
    <View className="flex-1 bg-blue px-2 pt-10">
      <View className="flex gap-y-0.75">
        <Text className="text-4 font-headingbold tracking-widest leading-none text-purple">
          Imagine Create Discover
        </Text>
        <Text className="text-2.5 font-body text-purple w-[70vw]">
          Unleash <Text className="font-bodybold underline">Your</Text> Story with{' '}
          <Text className="font-bodybold underline">Storytail</Text>
        </Text>
      </View>

      <View className="flex flex-1 relative">
        <SignInForm />
      </View>
    </View>
  );
}
