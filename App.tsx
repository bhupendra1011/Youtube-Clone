import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import VideoScreen from './screens/VideoScreen';
import Amplify, { Auth, DataStore } from 'aws-amplify'
import config from './src/aws-exports'

import { User } from './src/models';

import { withAuthenticator } from "aws-amplify-react-native";


Amplify.configure(config)


function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = "dark";//useColorScheme();



  // sync user from cognito to amplify DataStore
  // once user is logged in 
  useEffect(() => {

    const saveUserToDB = async () => {
      // get user form cognitio
      const userInfo = await Auth.currentAuthenticatedUser();
      if (!userInfo) return;

      const userId = userInfo.attributes.sub;
      console.log(userId);

      // check if it exits in DB , if not save in DB
      const user = (await DataStore.query(User)).find(user => user.sub === userId);
      if (!user) {
        //save to DB
        await DataStore.save(new User({
          sub: userId,
          name: userInfo.attributes.email,
          subscribers: 0
        }))

      } else {
        console.log("user exists in DB already")
      }

    };
    saveUserToDB();


  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
