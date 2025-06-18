import { SkeletonBox } from "@/src/components";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const ProductDetailsSkeletonView = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <SkeletonBox height={300} style={styles.productWrapper} />

        <SkeletonBox height={24} style={{ marginBottom: 12 }} />
        <SkeletonBox height={24} width="40%" style={{ marginBottom: 32 }} />

        <SkeletonBox height={16} width="80%" style={{ marginBottom: 8 }} />
        <SkeletonBox height={16} width="60%" style={{ marginBottom: 8 }} />

        <SkeletonBox
          height={20}
          width="30%"
          style={{ marginTop: 48, marginBottom: 16 }}
        />
        <SkeletonBox height={40} />

        <SkeletonBox
          height={20}
          width="30%"
          style={{ marginTop: 32, marginBottom: 16 }}
        />
        <SkeletonBox height={40} />

        <SkeletonBox
          height={20}
          width="30%"
          style={{ marginTop: 32, marginBottom: 16 }}
        />
        <SkeletonBox height={44} width="70%" />

        <View style={styles.actionWrapper}>
          <SkeletonBox height={44} style={{ flex: 1 }} />
          <SkeletonBox
            height={44}
            width={44}
            style={{ marginLeft: 8, borderRadius: 22 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsSkeletonView;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
  },
  productWrapper: {
    marginTop: 16,
    marginBottom: 40,
  },
  actionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 48,
  },
});
