import { Stack } from "expo-router";
import './globals.css';
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
export default function RootLayout() {
  return (
    <View className="flex-1 bg-primary">
      <StatusBar hidden={true}/>
      <Stack screenOptions={{
        animation: 'fade',
        gestureEnabled: true,
        }}>
        <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
        <Stack.Screen name="movies/[id]" options={{headerShown:false , presentation:"modal"}}/> 
      </Stack>
    </View>
  )
}
