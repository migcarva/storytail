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
  return (
    <View className="flex-1 bg-blue px-2 pt-10">
      <Button size="default" variant="default" onPress={() => {}}>
        default
      </Button>
      <Button size="default" variant="destructive" onPress={() => {}}>
        destructive
      </Button>
      <Button size="default" variant="outline" onPress={() => {}}>
        outline
      </Button>
      <Button size="default" variant="secondary" onPress={() => {}}>
        secondary
      </Button>
      <Button size="default" variant="ghost" onPress={() => {}}>
        ghost
      </Button>
      <Button size="default" variant="link" onPress={() => {}}>
        link
      </Button>

      <Button size="default" variant="default" onPress={() => {}}>
        Size default
      </Button>
      <Button size="sm" variant="default" onPress={() => {}}>
        Size sm
      </Button>
      <Button size="lg" variant="default" onPress={() => {}}>
        Size lg
      </Button>
    </View>
  );
}
