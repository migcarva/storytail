import { useSignUp } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const SignUp: React.FC = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log('createdSessionId', await completeSignUp);

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            value={firstName}
            placeholder="First Name..."
            onChangeText={setFirstName}
            style={styles.inputField}
          />
          <TextInput
            autoCapitalize="none"
            value={lastName}
            placeholder="Last Name..."
            onChangeText={setLastName}
            style={styles.inputField}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="simon@galaxies.dev"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />

          <Button onPress={onSignUpPress} title="Sign up" color="#513175" />
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              style={styles.inputField}
              onChangeText={setCode}
            />
          </View>
          <Button onPress={onPressVerify} title="Verify Email" color="#513175" />
        </>
      )}
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

export default SignUp;