import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Material from '@expo/vector-icons/build/MaterialCommunityIcons';
import './global.css';
import HomeBody from './src/components/Home';
import HomeHeader from './src/components/HomeHead';
import HomeFooter from './src/components/HomeFooter';

export default function App() {
  return (
    <ScrollView>
      <View className="flex-1">
        <View className="mt-8">
        <View className="flex-1 justify-center items-center">
            <HomeHeader />
            <HomeBody />
            <StatusBar style="auto" />
          </View>
        </View>
        <HomeFooter />
      </View>
    </ScrollView>
  );
}
