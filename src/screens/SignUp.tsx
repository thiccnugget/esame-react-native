import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { ScreenFC } from "../utils/ScreenFC";
import { useDispatch } from "react-redux";
import { signUp } from "../utils/redux/actions/accountActions";

const SignUp: ScreenFC<"SignUp"> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const dispatch = useDispatch();


  const handleSignUp = () => {
    //Impedisci la registrazione se non tutti i campi sono compilati
    if (
      email &&
      password &&
      firstName &&
      lastName &&
      country &&
      city &&
      phone 
    ) {
      dispatch(
        //esegui la funzione di signup ed esegui automaticamente il login
        signUp({
          email,
          password,
          firstName,
          lastName,
          country,
          city,
          phone,
          isLogged: true,
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
     
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#B5B5B5"
          onChangeText={(value) => setFirstName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#B5B5B5"
          onChangeText={(value) => setLastName(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#B5B5B5"
          maxLength={2}
          autoCapitalize={"characters"}
          onChangeText={(value) => setCountry(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#B5B5B5"
          onChangeText={(value) => setCity(value.trim())}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="numeric"
          placeholderTextColor="#B5B5B5"
          onChangeText={(value) => setPhone(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#B5B5B5"
          onChangeText={(value) => setEmail(value.trim())}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#B5B5B5"
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
        />
      </View>
      <Button
        title="Sign Up"
        onPress={handleSignUp}
        disabled={
          //Disabilita il pulsante se non tutti i campi sono compilati
          !(
            email &&
            password &&
            firstName &&
            lastName &&
            country &&
            city &&
            phone
          )
        }
      />
      <View style={styles.Text}>
        <Text
          style={styles.signupText}
         onPress={() => navigation.navigate("Login")}>
          Or Sign In</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signupText: {
    marginRight: 5,
    fontSize: 16,
    color: "#1E90FF",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profilePicPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#D1D1D1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profilePicText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    fontSize: 16,
  },
  Text: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});

export default SignUp;
