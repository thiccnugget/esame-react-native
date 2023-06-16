import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import RootStackParams from "../utils/RootStackParams";
import DetailScreen from "../screens/Details";
import HomeScreen from "../screens/Home";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/Profile";
import ROUTES from "./routes";
import { useDispatch, useSelector } from "react-redux";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import { AccountProps, logout } from "../utils/redux/actions/accountActions";
import EditProfile from "../screens/EditProfile";
import Profile from "../screens/Profile";

const Stack = createStackNavigator<RootStackParams>();
const Drawer = createDrawerNavigator();

const AuthStack: React.FC = () => {
  //Schermata di accesso / registrazione
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.Login}
        component={Login}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "rgb(79,172,217)" },
        }}
      />
      <Stack.Screen
        name={ROUTES.SignUp}
        component={SignUp}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "rgb(79,172,217)" },
        }}
      />
    </Stack.Navigator>
  );
};


const MainMenu: React.FC = () => {

  const dispatch = useDispatch();
  //Sidebar
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={() => dispatch(logout())} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen name={ROUTES.Home} component={HomeScreen} />
        <Drawer.Screen name={ROUTES.Profile} component={ProfileScreen} />
      </Drawer.Navigator>
    </>
  );
};

const HomeStack: React.FC = () => {
  const { account } = useSelector(
    (state: { accountReducer: AccountProps }) => state.accountReducer
  );
  return (
    <NavigationContainer>
      {account && account.isLogged ? (
        //visualizza la sidebar solo se l'utente è loggato
        <Stack.Navigator>
          <Stack.Screen
            name={ROUTES.MainMenu}
            component={MainMenu}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: "rgb(255,255,255)" },
            }}
          />
          <Stack.Screen name={ROUTES.EditProfile} component={EditProfile} />
          <Stack.Screen name={ROUTES.Profile} component={Profile} />
          <Stack.Screen name={ROUTES.Detail} component={DetailScreen} />
        </Stack.Navigator>
      ) : (
        //visualizza lo screen di accesso / registrazione
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
export default HomeStack;

