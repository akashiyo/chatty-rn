import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function LoadingBubble() {
  return (
    <View style={styles.row}>
      <View style={styles.bubble}>
        <ActivityIndicator size="small" color="#A78BC7" />
        <Text style={styles.text}>Chatty réfléchit...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    backgroundColor: '#FFFDFF',
    borderWidth: 1,
    borderColor: '#E7DEEF',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  text: {
    color: '#927EA4',
    fontSize: 15,
  },
});
