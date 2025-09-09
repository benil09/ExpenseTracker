import { styles } from "@/assets/styles/auth.styles.js"; // check if named export
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors.js";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setError("Additional verification may be required.");
      }
    } catch (err) {
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("Invalid email or password. Please try again with correct password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      {error ? (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={20} color={COLORS.expense} style={{ marginRight: 8 }} />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={() => setError("")} style={{ marginLeft: "auto" }}>
            <Ionicons name="close" size={20} color={COLORS.expense} />
          </Pressable>
        </View>
      ) : null}

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        style={styles.input}
      />

      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry
        autoCorrect={false}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Link href="sign-up">
          <Text style={styles.linkText}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
