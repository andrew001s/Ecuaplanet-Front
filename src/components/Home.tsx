import React, { useContext } from 'react';
import { ScrollView, Text, View, TouchableHighlight, Pressable, TouchableOpacity} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function HomeBody() {
  const router=useRouter();
  const { user, setUser } = useContext(AuthContext);
  
  const handleChatPress = (categoria:string)=>{
    const newPreferencias = [...user?.preferencias];

    // Aumentar la preferencia correspondiente dependiendo de la categoría
    if (categoria === "cultivo") {
      newPreferencias[0] += 1;
    } else if (categoria === "produccion") {
      newPreferencias[1] += 1;
    } else if (categoria === "ventas") {
      newPreferencias[2] += 1;
    }

    // Actualizar las preferencias globalmente
    setUser((prevState) => ({
      ...prevState,
      preferencias: newPreferencias,
    }));
    console.log('Preferencias actualizadas:', newPreferencias);

    router.push(`/ChatTemplate?category=${categoria}&user=${user?.nombre}`);
  };

    const cardClasses = {
      cultivo: "bg-[#7f55e0]",
      produccion: "bg-[#379AE6]",
      ventas: "bg-[#22CCB2]",
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
      { nombre: "Cultivo", valor: preferencias[0], clase: cardClasses.cultivo, icono: iconos.cultivo, colorSecundario: "#6A4EBD" },
      { nombre: "Produccion", valor: preferencias[1], clase: cardClasses.produccion, icono: iconos.produccion, colorSecundario: "#2B7BC1" },
      { nombre: "Ventas", valor: preferencias[2], clase: cardClasses.ventas, icono: iconos.ventas, colorSecundario: "#1A9E87" },
    ];
    categorias.sort((a, b) => b.valor - a.valor);

    return (
 
      <View className="flex-row h-64 w-full gap-1 bg-white">
        <TouchableHighlight
          className={`${categorias[0].clase} flex-1 justify-center rounded-3xl`}
          onPress={() => handleChatPress(categorias[0].nombre.toLowerCase())}
          underlayColor={categorias[0].colorSecundario}
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
            className={`${categorias[1].clase} flex-1 justify-center rounded-3xl mb-1`}
            onPress={() => handleChatPress(categorias[1].nombre.toLowerCase())}
            underlayColor={categorias[1].colorSecundario}
          >
            <View className="justify-center items-center">
              {categorias[1].icono}
              <Text className="text-white font-bold text-xl">
                {categorias[1].nombre.toUpperCase()}
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            className={`${categorias[2].clase} flex-1 justify-center rounded-3xl`}
            onPress={() => handleChatPress(categorias[2].nombre.toLowerCase())}
            underlayColor={categorias[2].colorSecundario}
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

