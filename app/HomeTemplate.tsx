import React, { useContext, useState, useEffect, useRef} from 'react';
import { useAuth } from '../src/hooks/useAuth';
import { View,ScrollView } from 'react-native';
import { AuthContext } from '../src/context/AuthContext';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import HomeHeader from '../src/components/HomeHead';
import HomeBody from '../src/components/Home';
import { StatusBar } from 'expo-status-bar';
import HomeFooter from '../src/components/HomeFooter';

function HomeTemplate() {
  const { user } = useContext(AuthContext);
  const { handleLogout } = useAuth();
  const router = useRouter();
  // se esat agregando los componentes para el home
  return (
    <ScrollView>
      <View className="flex-1">
        <View className="mt-8">
          <View className="flex-1 justify-center items-center">
            <HomeHeader nombre={user?.nombre} apellido={user?.apellido}/>
            <HomeBody/>
            <StatusBar style="auto"/>
          </View>         
        </View>
        <HomeFooter/>
      </View>
    </ScrollView>
  );
}

export default HomeTemplate;
