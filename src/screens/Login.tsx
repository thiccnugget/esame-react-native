import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ScreenFC } from "../utils/ScreenFC";
import { useDispatch } from "react-redux";
import { login } from "../utils/redux/actions/accountActions";

const Login: ScreenFC<"Login"> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  //ritorna una View con un titolo e un form per eseguire il login
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Sign In</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value.trim())}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <Button
          title="Sign In"
          onPress={() => {
            email &&
              password &&
              dispatch(
                //esegui il login
                login({
                  email,
                  password,
                  isLogged: true,
                })
              );
          }}
        />
        <View style={styles.signupContainer}>
          <Text 
            //Naviga alla pagina di registrazione
            onPress={() => navigation.navigate("SignUp")}
            style={styles.signupText}>
              Or Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    marginRight: 5,
    fontSize: 16,
    color: "#1E90FF",
  },
});

export default Login;
