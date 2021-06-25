/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Foundation, Ionicons, AntDesign, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { View, Text, Image, SafeAreaView } from "react-native";
const logo = require("../assets/images/logo.png");

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import VideoScreen from '../screens/VideoScreen';
import VideoUploadScreen from '../screens/VideoUploadScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        labelPosition: "below-icon"
      }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="compass-outline" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="New"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="pluscircleo" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Subscription"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="subscriptions" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="video-collection" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/





// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function CustomHeader() {
  return (
    <SafeAreaView style={{ backgroundColor: "#141414" }}>
      <View style={{
        margin: 10, padding: 5, flexDirection: 'row', alignItems: "center", justifyContent: "space-between"
      }}>
        <Image resizeMode="contain" style={{ width: 100, height: 25 }} source={logo} />
        <View style={{ flexDirection: 'row', justifyContent: "space-between", width: 150 }}>
          <Feather name="cast" size={30} color="white" />
          <AntDesign name="bells" size={30} color="white" />
          <AntDesign name="search1" size={30} color="white" />
          <FontAwesome name="user-circle-o" size={30} color="white" />
        </View>
      </View>
    </SafeAreaView>
  )
}

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator screenOptions={{
      header: () => <CustomHeader />
    }}>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
      <TabOneStack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}

//for new tab:upload
const TabThreeStack = createStackNavigator<TabTwoParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="VideoUpload"
        component={VideoUploadScreen}
        options={{ headerTitle: 'Upload Video' }}
      />
    </TabThreeStack.Navigator>
  );
}
