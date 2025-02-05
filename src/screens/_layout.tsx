import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import HomeScreen from './HomeTemplate'
import LoadingScreen from './LoadingScreen'
import LoginScreen from './LoginScreen';

const Layout = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
          setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }
    
    return (
        <View className="flex-1 bg-white">
            {isAuthenticated ? <HomeScreen /> : <LoginScreen />}
        </View>
    );
};

export default Layout;