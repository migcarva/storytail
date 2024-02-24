import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Pressable, Platform } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, View, Button } from 'tamagui';

import { useSupabase } from '@/src/lib/supabase/SupabaseContext';
import { SecureStoreAdapter } from '@/src/lib/supabase/secureStoreAdapter';
import { isIphone } from '@/src/utils/deviceInfo';

const SignIn: React.FC = () => {
  const { getAppleOAuthUrl, getGoogleOAuthUrl, setOAuthSession } = useSupabase();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      WebBrowser.warmUpAsync();
    }

    return () => {
      if (Platform.OS !== 'web') {
        WebBrowser.coolDownAsync();
      }
    };
  }, []);

  const extractParamsFromUrl = (url: string) => {
    const params = new URLSearchParams(url.split('#')[1]);
    const data = {
      access_token: params.get('access_token'),
      expires_in: parseInt(params.get('expires_in') || '0', 10),
      refresh_token: params.get('refresh_token'),
      token_type: params.get('token_type'),
      provider_token: params.get('provider_token'),
    };

    return data;
  };

  const onSignInWithGoogle = async () => {
    setLoading(true);

    try {
      const url = await getGoogleOAuthUrl();
      if (!url) return;

      const result = await WebBrowser.openAuthSessionAsync(
        url,
        `${Constants.expoConfig!.extra!.BUNDLE_ID}://home/`,
        {
          showInRecents: true,
        },
      );

      if (result.type === 'success') {
        const data = extractParamsFromUrl(result.url);

        if (!data.access_token || !data.refresh_token) return;

        setOAuthSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });

        // You can optionally store Google's access token if you need it later
        SecureStoreAdapter.setItem('google-access-token', JSON.stringify(data.provider_token));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSignInWithApple = async () => {
    setLoading(true);

    try {
      const url = await getAppleOAuthUrl();
      if (!url) return;

      const result = await WebBrowser.openAuthSessionAsync(
        url,
        `${Constants.expoConfig!.extra!.BUNDLE_ID}://home/`,
        {
          showInRecents: true,
        },
      );

      if (result.type === 'success') {
        const data = extractParamsFromUrl(result.url);

        if (!data.access_token || !data.refresh_token) return;

        setOAuthSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });

        // You can optionally store Apple access token if you need it later
        SecureStoreAdapter.setItem('apple-access-token', JSON.stringify(data.provider_token));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View flex={1} justifyContent="center">
      <Spinner visible={loading} />

      <Button size="$1" onPress={onSignInWithGoogle} disabled={loading} marginBottom="$1">
        <Ionicons name="logo-google" size={16} />
        <Text fontSize="$2">{loading ? 'Loading...' : 'Sign in with Google'}</Text>
      </Button>

      {isIphone && (
        <Button
          size="$1"
          onPress={onSignInWithApple}
          disabled={loading}
          // paddingBottom="$1"
          // style={{ marginBottom: 16, width: '100%' }}
        >
          <Ionicons name="logo-apple" size={16} />
          <Text fontSize="$2">{loading ? 'Loading...' : 'Sign in with Apple'}</Text>
        </Button>
      )}

      <Link href="/reset" asChild>
        <Pressable>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>

      <Link href="/signup" asChild>
        <Pressable>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default SignIn;
