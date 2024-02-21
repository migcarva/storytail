import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, View, Button } from 'tamagui';

import { Env } from '@/env';
import { useSupabase } from '@/src/lib/supabase/SupabaseContext';
import { SecureStoreAdapter } from '@/src/lib/supabase/secureStoreAdaptar';
import { isIphone } from '@/src/utils/deviceInfo';

const SignIn: React.FC = () => {
  const { getAppleOAuthUrl, getGoogleOAuthUrl, setOAuthSession } = useSupabase();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
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
        `${Constants.expoConfig!.extra!.BUNDLE_ID ?? Env.BUNDLE_ID}://home/`,
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
        `${Constants.expoConfig!.extra!.BUNDLE_ID ?? Env.BUNDLE_ID}://home/`,
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
    <View style={styles.container}>
      <Spinner visible={loading} />

      <Button
        onPress={onSignInWithGoogle}
        disabled={loading}
        style={{ marginBottom: 16, width: '100%' }}>
        <Ionicons name="logo-google" size={20} />
        <Text>{loading ? 'Loading...' : 'Sign in with Google'}</Text>
      </Button>

      {isIphone && (
        <Button
          onPress={onSignInWithApple}
          disabled={loading}
          style={{ marginBottom: 16, width: '100%' }}>
          <Ionicons name="logo-apple" size={20} />
          <Text>{loading ? 'Loading...' : 'Sign in with Google'}</Text>
        </Button>
      )}

      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>

      <Link href="/signup" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#513175',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default SignIn;
