import React from "react";
import { View, Text, StyleSheet, Button, Image, Linking } from "react-native";
import { ScreenFC } from "../utils/ScreenFC";

const DetailScreen: ScreenFC<"Detail"> = ({ route }) => {

  //Ritorna una View con i dettagli dell'utente cliccato
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: route.params?.item.picture.large }}
          style={styles.image}
        />
        <Text style={styles.name}>
          {route.params?.item.name.first} {route.params?.item.name.last}
        </Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>
             Location: {route.params?.item.nat}
             {", "}
            {route.params?.item.location.city}
          </Text>
          <Text style={styles.details}>
            <Button
              onPress={() =>
                //link per inviare una email all'indirizzo dell'utente
                Linking.openURL(`mailto:${route.params?.item.email}`)
              }
              title={route.params?.item.email}
            />
          </Text>
          <Text style={styles.details}>
            <Button
            //link per telefonare al numero dell'utente
              onPress={() => Linking.openURL(`tel:${route.params?.item.cell}`)}
              title={route.params?.item.cell}
            />
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
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
  detailsContainer: {
    backgroundColor: "#f2f2f2",
    marginBottom: 20,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  }
});

export default DetailScreen;
