import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{
        headerShown: false
      }}/>
      <Stack.Screen name="image-preview" />
    </Stack>
  )
}