import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, Button } from "react-native";
import Card from "./Card/Card";
import { Data } from "../utils/Data";
import { CustomScreenFC } from "../utils/ScreenFC";
import { TextInput } from "react-native-gesture-handler";
  

const HomeScreen: CustomScreenFC<"Home"> = ({ navigation }) => {
  const [users, setUsers] = useState<Array<Data>>([]);
  const [message, setMessage] = useState("Loading ...");
  const [quantity, setQuantity] = useState<number>(5);


  const handleChange = (qty: number | typeof NaN) : void => {
    qty && qty > 0 ? setQuantity(qty) : setQuantity(5);
  }

  const getData = async () => {
    try {
      //prova a prelevare 25 utenti random e metterli in un array
      const data = await fetch(`https://randomuser.me/api/?results=${quantity}`);
      const res = await data.json();
      if (data.status === 200) {
        setUsers(res.results);
      }
      //in caso di errore, nulla succede
    } catch (err) {
      setMessage("Data couldn't be fetched from the server");
    }
  };

  // Preleva i dati al render della schermata 
  // ed al cambiamento della quantità di profili da prelevare
  useEffect(() => {
    getData();
  }, [quantity]);

  return (
    <View style={styles.container}>
      {//Renderizza le Card se l'array contiene oggetti (caso più probabile)
      users.length > 0 ? (            
        <>
        <Text style={{textAlign:"center", marginTop:15}}>Users quantity</Text>
        <View style={styles.inputContainer}>
          
          <Button onPress={()=>{setQuantity(quantity > 1 ? quantity-1 : 1 )}}  title="-"/>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            placeholderTextColor="#B5B5B5"
            keyboardType={"numeric"}
            value={quantity.toString()}
            onChangeText={(value) => handleChange(parseFloat(value))}
          />
          <Button onPress={()=>{setQuantity(quantity+1)}} title="+"/>


        </View>

        <FlatList
          data={users}
          keyExtractor={(item) => item.email}
          showsVerticalScrollIndicator={false}
          //Renderizza una Card per ogni elemento restituito dall'API
          renderItem={({ item }) => (
            <Card
              item={item}
              onPress={() => {
                //Ogni card reindirizza alla pagina di dettaglio
                navigation.navigate("Detail", { item });
              }}
            />
          )}
        />
      </>
      //Stampa un messaggio di caricamento o errore se i dati non sono ancora presenti nell'array
      ) : (
          <Text style={{marginTop:15}}>{message}</Text>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  inputContainer:{
    alignSelf: "center",
    width:"50%",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginTop:10,
  },
  quantityButton:{
    width:20,
    marginHorizontal:15
  },
  input: {
    height: 50,
    width:100,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
  },
  cardContainer: {
    backgroundColor: "#f2f2f2",
    height: 200,
    borderRadius: 16,
    alignItems: "flex-end",
    padding: 24,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default HomeScreen;
