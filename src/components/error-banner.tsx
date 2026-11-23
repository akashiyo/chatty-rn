import { Pressable, StyleSheet, Text, View } from 'react-native';

type ErrorBannerProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.message}>{message}</Text>
      <Pressable onPress={onRetry} style={styles.button}>
        <Text style={styles.buttonText}>Réessayer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    borderRadius: 14,
    backgroundColor: '#F7EFFA',
    borderWidth: 1,
    borderColor: '#E4D5EC',
    padding: 12,
  },
  message: {
    color: '#71557F',
    lineHeight: 20,
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#9674A8',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
