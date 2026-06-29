import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { DATABASE_NAME } from "@/core/constants/database";
import { seed } from "@/core/helpers/database/seed";
import { drop } from "@/core/helpers/database/drop";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider
        onInit={async (db) => {
          if (__DEV__) {
            await drop(db);
            await seed(db);
          }
        }}
        databaseName={`${DATABASE_NAME}.db`}
      >
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="lessons/[lesson-section-name]/[lesson-session-id]"
              options={{
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="import-lesson-form"
              options={{
                animation: "slide_from_right",
              }}
            />
          </Stack>
        </QueryClientProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
