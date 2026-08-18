import {useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Button, Dialog, Input, ThemeProvider} from '@shukhratisakdjanov-cyber/faster-mobile';

function ExampleScreen() {
  const [email, setEmail] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const emailError = email.length > 0 && !email.includes('@') ? 'Enter a valid email' : undefined;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Faster Mobile</Text>
        <Text style={styles.description}>Native component-library verification screen</Text>

        <View style={styles.section}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            clearable
            errorMessage={emailError}
            testID="email-input"
          />
        </View>

        <View style={styles.section}>
          <Button accessibilityLabel="Open confirmation dialog" fullWidth onPress={() => setDialogVisible(true)}>
            Open dialog
          </Button>
        </View>

        <Text accessibilityLiveRegion="polite" style={styles.status}>
          {confirmed ? 'Action confirmed' : 'No action confirmed'}
        </Text>

        <Dialog
          visible={dialogVisible}
          title="Confirm action"
          onDismiss={() => setDialogVisible(false)}
          primaryAction={{
            label: 'Confirm',
            onPress: () => { setConfirmed(true); setDialogVisible(false); },
          }}
          secondaryAction={{label: 'Cancel', onPress: () => setDialogVisible(false)}}>
          <Text>Confirm this action to continue.</Text>
        </Dialog>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return <ThemeProvider><ExampleScreen /></ThemeProvider>;
}

const styles = StyleSheet.create({
  safeArea: {backgroundColor: '#FFFFFF', flex: 1},
  content: {flexGrow: 1, padding: 24},
  title: {color: '#4B4B4B', fontSize: 30, fontWeight: '500', lineHeight: 38},
  description: {color: '#4B4B4B', fontSize: 14, lineHeight: 22, marginTop: 8},
  section: {marginTop: 24},
  status: {color: '#4B4B4B', marginTop: 24},
});
