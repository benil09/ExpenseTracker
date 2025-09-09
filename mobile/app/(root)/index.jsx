import { SignOutButton } from "@/components/SignOutButton";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import {styles} from "@/assets/styles/auth.styles.js"

export default function Page() {
  const { user } = useUser();

  return (
    <View>
      <SignedIn>
        <Text >
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
        <Text >
          Welcome to home page
        </Text>

        <SignOutButton style={styles.button} />
      </SignedIn>
      <SignedOut>
      </SignedOut>
    </View>
  );
}

