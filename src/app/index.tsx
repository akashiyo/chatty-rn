import { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChatHeader } from "@/components/chat-header";
import { ChatInput } from "@/components/chat-input";
import { ErrorBanner } from "@/components/error-banner";
import { LoadingBubble } from "@/components/loading-bubble";
import { MessageBubble } from "@/components/message-bubble";
import { sendChatMessage } from "@/services/ai";
import type { ChatMessage } from "@/types/chat";

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Bonjour ! Je suis ton assistant IA. Comment puis-je t’aider ?",
};

export default function HomeScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState("");
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const scrollToLatest = () => {
    listRef.current?.scrollToEnd({ animated: true });
  };

  const sendMessage = async (text: string, isRetry = false) => {
    const trimmedText = text.trim();
    if (!trimmedText || isLoading) return;

    setError(null);
    setLastRequest(trimmedText);
    setIsLoading(true);

    if (!isRetry) {
      setMessages((current) => [
        ...current,
        { id: `user-${Date.now()}`, role: "user", content: trimmedText },
      ]);
    }

    try {
      const history = isRetry
        ? messages.filter(
            (message, index) =>
              !(
                index === messages.length - 1 &&
                message.role === "user" &&
                message.content === trimmedText
              ),
          )
        : messages;
      const reply = await sendChatMessage(history, trimmedText);
      setMessages((current) => [
        ...current,
        { id: `assistant-${Date.now()}`, role: "assistant", content: reply },
      ]);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Une erreur inattendue est survenue.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const startNewConversation = () => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    setLastRequest("");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ChatHeader onNewChat={startNewConversation} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={scrollToLatest}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          ListFooterComponent={
            isLoading ? (
              <LoadingBubble />
            ) : error ? (
              <ErrorBanner
                message={error}
                onRetry={() => sendMessage(lastRequest, true)}
              />
            ) : undefined
          }
        />
        <View style={styles.inputContainer}>
          <ChatInput
            onSend={(text) => sendMessage(text)}
            disabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F3FC",
  },
  keyboardView: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  inputContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#F7F3FC",
  },
});
