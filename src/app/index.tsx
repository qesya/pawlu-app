import { useColors } from "@/src/hooks";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useGetLocationsIndexAPI } from "../services";
import { useLocationStore } from "../store";

const { width } = Dimensions.get("window");

export default function Index() {
  const { white } = useColors();
  const scale = useSharedValue(1);

  const { setLocation } = useLocationStore();
  const { data } = useGetLocationsIndexAPI();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  useEffect(() => {
    const waitForMinimumTime = new Promise((resolve) =>
      setTimeout(resolve, 1000),
    );

    const waitForData = new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (data && data.length > 0) {
          setLocation(data[0]);
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });

    Promise.all([waitForMinimumTime, waitForData]).then(() => {
      router.navigate("/home");
    });
  }, [data]);

  return (
    <View style={[styles.container, { backgroundColor: white }]}>
      <Animated.Image
        source={require("../assets/images/app-logo.png")}
        style={[styles.logo, animatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
  },
});
