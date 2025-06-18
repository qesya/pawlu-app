import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { router, Stack } from "expo-router";
import React, { useMemo } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HeaderMenu } from "@/src/components";
import { useColors } from "@/src/hooks";
import { useGetCartAPI } from "../services";
import { useCartStore } from "../store";

type NormalLayoutProps = {
  children: React.ReactNode;
  title?: string;
  customBackgroundColor?: string;
  customHeaderColor?: string;
  withSafeArea?: boolean;
  withGoBackBtn?: boolean;
};

const getScreenOptions = ({
  title,
  customHeaderColor,
  background,
}: {
  title?: string;
  customHeaderColor?: string;
  background: string;
}): NativeStackNavigationOptions => ({
  gestureEnabled: true,
  title: title ?? "",
  headerTitleAlign: "center",
  headerShadowVisible: false,
  headerBackVisible: false,
  headerStyle: {
    backgroundColor: customHeaderColor ?? background,
  },
});

export default function NormalLayout({
  children,
  title,
  customBackgroundColor,
  customHeaderColor,
  withSafeArea = true,
  withGoBackBtn,
}: Readonly<NormalLayoutProps>) {
  const { white } = useColors();
  const insets = useSafeAreaInsets();

  const backgroundColor = customBackgroundColor ?? white;
  const Container = withSafeArea ? SafeAreaView : View;
  const paddingTop = withSafeArea ? 0 : insets.top;
  const { cartId } = useCartStore();

  const { data } = useGetCartAPI(cartId);

  const cartDetailsData = useMemo(() => {
    if (!data) return 0;

    return data.cart_items.length;
  }, [data]);

  const onGoBack = () => {
    router.back();
  };

  const onHandleGoToCart = () => {
    router.navigate("/my-cart");
  };

  return (
    <Container style={[styles.safeArea, { backgroundColor }]}>
      <Stack.Screen
        options={getScreenOptions({
          title,
          customHeaderColor,
          background: backgroundColor,
        })}
      />

      <View style={{ paddingTop }}>
        <HeaderMenu
          onPressBack={withGoBackBtn ? onGoBack : undefined}
          onCartPress={onHandleGoToCart}
          badgeCount={cartDetailsData}
        />
      </View>

      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
