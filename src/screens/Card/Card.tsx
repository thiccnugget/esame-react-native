import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { Data } from "../../utils/Data";

interface Props {
  item: Data;
  onPress: () => void;
}

const Card = ({ item, onPress }: Props) => {
  //item: dato da API; onPress: callback
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={styles.cardContainer}>
        <Image
          source={{
            uri: item.picture.large,
          }}
          style={styles.image}
        />
        <Text>{item.name.first} {item.name.last}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
    height: 170,
    width: "100%",
    padding: 15,
    marginVertical: 20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 80,
    marginBottom:15
  },
  description: {
    fontWeight: "bold",
    padding: 4,
  },
  tail: {
    padding: 4,
    width: 120,
  },
});

export default Card;
