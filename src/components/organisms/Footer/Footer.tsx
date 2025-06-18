import { ButtonIconGroup, PressableButton, Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import {
  Image,
  Linking,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type FooterProps = {
  style?: StyleProp<ViewStyle>;
};

const Footer: React.FC<FooterProps> = ({ style }) => {
  const { primaryColor400, white } = useColors();

  const handleSocialPress = (id: string) => {
    if (id === "facebook") {
      Linking.openURL("https://www.facebook.com/pawlusironmongery");
    } else if (id === "instagram") {
      Linking.openURL("https://www.instagram.com/pawlusironmongery");
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: primaryColor400 }, style]}
    >
      <ButtonIconGroup
        data={[
          { id: "facebook", icon: "facebook-icon", iconColor: white },
          { id: "instagram", icon: "instagram-icon", iconColor: white },
        ]}
        onItemPress={(item) => handleSocialPress(item.id)}
        direction="horizontal"
        spacing={0}
        containerStyle={styles.socialIcons}
      />

      <View style={styles.contactSection}>
        <Typography size="textSM" weight="semiBold" color={white}>
          Contacts
        </Typography>
        <Typography
          size="textSM"
          weight="semiBold"
          color={white}
          style={styles.emailText}
        >
          Email: sales@pawlus.mt
        </Typography>
      </View>

      <View style={styles.linksSection}>
        <PressableButton
          onPress={() => handleLinkPress("https://pawlus.mt/terms/rental.php")}
        >
          <Typography size="textSM" weight="medium" color={white}>
            Privacy Policy
          </Typography>
        </PressableButton>
        <PressableButton
          onPress={() => handleLinkPress("https://pawlus.mt/terms/general.php")}
        >
          <Typography size="textSM" weight="medium" color={white}>
            Terms of Service
          </Typography>
        </PressableButton>
        <PressableButton
          onPress={() => handleLinkPress("https://pawlus.mt/terms/general.php")}
        >
          <Typography size="textSM" weight="medium" color={white}>
            Cookie Policy
          </Typography>
        </PressableButton>
      </View>

      <View style={styles.divider} />

      <View style={styles.poweredBy}>
        <Image
          source={require("../../../assets/images/poweredby.png")}
          style={styles.poweredByImg}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingBottom: 25,
    paddingHorizontal: 16,
  },
  socialIcons: {
    marginBottom: 52,
    marginLeft: -8,
    alignItems: "flex-start",
  },
  contactSection: {
    marginBottom: 24,
  },
  emailText: {
    marginTop: 8,
  },
  linksSection: {
    marginBottom: 35,
    gap: 16,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "hsla(229, 54%, 44%, 1)",
  },
  poweredBy: {
    marginTop: 24,
  },
  poweredByImg: {
    width: 150,
    height: 34,
    resizeMode: "contain",
  },
});

export default React.memo(Footer);
