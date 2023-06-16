import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { CustomScreenFC } from "../utils/ScreenFC";
import { useDispatch, useSelector } from "react-redux";
import { AccountProps, signUp } from "../utils/redux/actions/accountActions";
import { ScrollView } from "react-native-gesture-handler";

const EditScreen: CustomScreenFC<"EditProfile"> = ({ navigation }) => {
  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );
  const [email, setEmail] = useState<string>(account.email);
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>(account.firstName);
  const [lastName, setLastName] = useState<string>(account.lastName);
  const [country, setCountry] = useState<string>(account.country);
  const [city, setCity] = useState<string>(account.city);
  const [phone, setPhone] = useState<string>(account.phone);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    //Registrazione (modifica) possibile solo se tutti i campi del form sono compilati
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
        //Tramite dispatch, passa i nuovi dati al reducer signUp per sovrascrivere i dati utente
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
      navigation.navigate("Profile");
    }
  };

  //Ritorna una View con un form già compilato con i dati attuali dell'utente
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Edit Profile</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#B5B5B5"
            onChangeText={(value) => setFirstName(value)}
            value={firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#B5B5B5"
            onChangeText={(value) => setLastName(value)}
            value={lastName}
          />
         
          <TextInput
            style={styles.input}
            placeholder="Country"
            placeholderTextColor="#B5B5B5"
            maxLength={2}
            autoCapitalize={"characters"}
            onChangeText={(value) => setCountry(value)}            
            value={country}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#B5B5B5"
            onChangeText={(value) => setCity(value)}
            value={city}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#B5B5B5"
            onChangeText={(value) => setPhone(value)}
            keyboardType="numeric" //tastiera in modalità numerica
            value={phone}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#B5B5B5"
            keyboardType="email-address" //tastiera in modalità email
            onChangeText={(value) => setEmail(value.trim())} //esegui il trim della email
            value={email}
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
          title="Save"
          color="#FA4A0C"
          onPress={handleSignUp}
          //disabilita il pulsante se non tutti i campi sono compilati
          disabled={
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
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
  bottomText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});

export default EditScreen;
