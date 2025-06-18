import { useColors } from "@/src/hooks";
import { NormalLayout } from "@/src/layout";
import { Slot } from "expo-router";
import React from "react";

export default function MyCartLayout(): React.ReactElement {
  const { white } = useColors();

  return (
    <NormalLayout
      withGoBackBtn
      customBackgroundColor={white}
      withSafeArea={false}
    >
      <Slot />
    </NormalLayout>
  );
}
