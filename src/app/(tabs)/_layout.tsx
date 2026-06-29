import { NativeTabs } from "expo-router/build/native-tabs/NativeTabs";

export default function RootNavigator() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
