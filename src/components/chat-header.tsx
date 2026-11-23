import { Pressable, StyleSheet, Text, View } from 'react-native';

type ChatHeaderProps = {
  onNewChat: () => void;
};

export function ChatHeader({ onNewChat }: ChatHeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Chatty</Text>
        <Text style={styles.subtitle}>Assistant IA</Text>
      </View>
      <Pressable onPress={onNewChat} style={styles.button}>
        <Text style={styles.buttonText}>Nouvelle conversation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E7DEEF',
    backgroundColor: '#FCFAFF',
  },
  title: {
    color: '#493A5C',
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    color: '#927EA4',
    fontSize: 13,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#F0E9F7',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#8061A4',
    fontWeight: '700',
    fontSize: 13,
  },
});
