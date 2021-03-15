import { usePermissions } from "expo-permissions";
import * as Permissions from "expo-permissions";
import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [permission, askForPermission] = usePermissions(Permissions.CAMERA, {
    ask: true,
  });

  if (!permission || permission.status !== "granted") {
    return (
      <SafeAreaView>
        <Text>Permission is not granted</Text>
        <Button title="Grant permission" onPress={askForPermission} />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
