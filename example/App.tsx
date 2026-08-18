import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Button, Dialog, Input, ThemeProvider } from '@shukhratisakdjanov-cyber/faster-mobile';

export default function App() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.screen}>
        <Text accessibilityLiveRegion="polite">Pressed {count} times</Text>
        <Button onPress={() => setCount((value) => value + 1)}>Continue</Button>
        <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" clearable />
        <Button variant="outline" onPress={() => setDialogVisible(true)}>Open dialog</Button>
        <Dialog visible={dialogVisible} title="Continue?" onDismiss={() => setDialogVisible(false)} primaryAction={{ label: 'Confirm', onPress: () => setDialogVisible(false) }}>
          Confirm the action to continue.
        </Dialog>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, gap: 16, justifyContent: 'center', padding: 24 } });
