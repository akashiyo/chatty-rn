import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type ChatInputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0 && !disabled;

  const send = () => {
    if (!canSend) return;
    onSend(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Écris ton message..."
        placeholderTextColor="#9A8AAB"
        style={styles.input}
        editable={!disabled}
        multiline
        maxLength={2000}
        onSubmitEditing={send}
        blurOnSubmit={false}
      />
      <Pressable
        onPress={send}
        disabled={!canSend}
        style={({ pressed }) => [
          styles.button,
          !canSend && styles.buttonDisabled,
          pressed && canSend && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Envoyer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5DCF2',
    padding: 6,
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 9,
    color: '#493A5C',
    fontSize: 16,
  },
  button: {
    minHeight: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#A78BC7',
    paddingHorizontal: 14,
  },
  buttonDisabled: {
    backgroundColor: '#D9CEE7',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
