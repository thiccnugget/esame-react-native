import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Linking, Modal } from "react-native";
import { CustomScreenFC } from "../utils/ScreenFC";
import { useDispatch, useSelector } from "react-redux";
import { AccountProps, deleteAcc } from "../utils/redux/actions/accountActions";
import EditProfile from "./EditProfile";

const ProfileScreen: CustomScreenFC<"Profile"> = ({ navigation }) => {
  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );

  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  //Renderizza una View con i dettagli dell'utente loggato
  //nel momento in cui si clicca il pulsante di cancellazione
  //si apre una modal per confermare la scelta dell'utente
  return (
    <View style={styles.container}>

      {/* Modal per la cancellazione dell'account */}
      <Modal
        animationType="slide"
        visible={isVisible}
        onRequestClose={() => {
          setVisible(!isVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Do you want to delete your account?</Text>
            <Text
              style={{color: "red", marginVertical: 15}}
              onPress={() => dispatch(deleteAcc())}
            >
              Yes
            </Text>
            
            <Text
              style={{color:"blue"}}
              onPress={() => setVisible(!isVisible)}
            >
              No
            </Text>
          </View>
        </View>
      </Modal>

      <View style={styles.contentContainer}>
        <Text style={styles.name}>
          {account.firstName} {account.lastName}
        </Text>
        <View style={styles.dataContainer}>
          <Text style={styles.data}>
            Location: {account.city}, {account.country}
          </Text>
          <Text style={styles.data}>
            <Button
              //link per inviare una email
              onPress={() => Linking.openURL(`mailto:${account.email}`)}
              title={account.email}
            />
          </Text>
          <Text style={styles.data}>
            <Button
            //link per aprire il telefono
              onPress={() => Linking.openURL(`tel:${account.phone}`)}
              title={account.phone}
            />
          </Text>
        </View>

        <Text style={styles.actionButtons}>
          <Button
            title="Edit Account"
            onPress={() => {
              //reindirizza a editProfile
              navigation.navigate("EditProfile")
            }}
          />
        </Text>

        <Text style={styles.actionButtons}>
          <Button
            title="Delete Account"
            onPress={() => {
              //visualizza la modal per eliminare l'account
              setVisible(true);
            }}
          />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    marginBottom: 10,
    textAlign: "center",

  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  dataContainer: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  data: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  }
});

export default ProfileScreen;
