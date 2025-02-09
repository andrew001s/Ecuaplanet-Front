import React, { useContext } from 'react';
import { ScrollView, Text, View, TouchableHighlight, Pressable, TouchableOpacity} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function HomeBody() {
  const router=useRouter();
  const { user } = useContext(AuthContext);
  
  const handleChatPress = (categoria:string)=>{
      router.push(`/Chat&&${categoria}`)
  };

    // Mapeo de clases de Tailwind para los colores
    const cardClasses = {
      cultivo: "bg-cultivo",
      produccion: "bg-produccion",
      ventas: "bg-ventas",
    };
    const iconos = {
      cultivo: (
        <MaterialCommunityIcons name="flower-tulip-outline" size={50} color="white" />
      ),
      produccion: (
        <MaterialCommunityIcons name="package-variant" size={50} color="white" />
      ),
      ventas: <FontAwesome6 name="money-bill-trend-up" size={40} color="white" />,
    };
  
    const preferencias = user?.preferencias || [0, 0, 0];
    const categorias = [
      { nombre: "Cultivo", valor: preferencias[0], clase: cardClasses.cultivo, icono: iconos.cultivo },
      { nombre: "Producción", valor: preferencias[1], clase: cardClasses.produccion, icono: iconos.produccion },
      { nombre: "Ventas", valor: preferencias[2], clase: cardClasses.ventas, icono: iconos.ventas },
    ];
    categorias.sort((a, b) => b.valor - a.valor);

    return (
 
      <View className="flex-row h-64 w-full gap-1">
        <TouchableHighlight
          className="bg-[#7f55e0] justify-center rounded-3xl w-1/2"
          onPress={() => handleChatPress(categorias[0].nombre.toLowerCase())}
          underlayColor={'#6A4EBD'}
        >
          <View className="justify-center items-center">
            {categorias[0].icono}
            <Text className="text-white font-bold text-xl">
              {categorias[0].nombre.toUpperCase()}
            </Text>
          </View>
        </TouchableHighlight>

        
        <View className="w-1/2 justify-between">
          <TouchableHighlight
            className="bg-[#22CCB2] flex-1 justify-center rounded-3xl mb-1"
            onPress={() => handleChatPress(categorias[1].nombre.toLowerCase())}
            underlayColor="#1A9E87"
          >
            <View className="justify-center items-center">
              {categorias[1].icono}
              <Text className="text-white font-bold text-xl">
                {categorias[1].nombre.toUpperCase()}
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            className="bg-[#379AE6] flex-1 justify-center rounded-3xl "
            onPress={() => handleChatPress(categorias[2].nombre.toLowerCase())}
            underlayColor="#2B7BC1"
          >
            <View className="justify-center items-center">
              {categorias[2].icono}
              <Text className="text-white font-bold text-xl">
                {categorias[2].nombre.toUpperCase()}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
  );
}

