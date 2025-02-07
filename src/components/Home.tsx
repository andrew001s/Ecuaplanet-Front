import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function HomeBody() {
  const flor = 'Claveles';
  const descripcion =
    'Los claveles, con su vibrante variedad de colores y alta resistencia, se posicionan como la flor favorita del mercado. Su versatilidad en arreglos y celebraciones respalda su liderato en ventas.';
  const ingreso = 3000;
  const egreso = 6000;
  const fecha = '01/02/2025';
  //bg-[#636AE8]py-[90px] px-10 rounded-3xl shadow-lg 5-[180px]
  //bg-[#22CCB2] ventas: bg-[#22CCB2] bg-emerald-500 py-8 px-10 rounded-3xl mb-6 w-[180px] shadow-lg
  //produccion:bg-[#7F55E0] py-8 px-8 rounded-3xl mb-2 w-[180px] shadow-lg
  return (
    <ScrollView>
      <View className="flex flex-row items-start justify-between pr-4 pl-4">
        <TouchableHighlight
          className="bg-[#636AE8] py-[85px] px-10 rounded-3xl shadow-lg w-[170px]"
          onPress={() => alert('Listo el botón de cultivo')}
          underlayColor={'#4C58D1'}
        >
          <View className="justify-center text-center items-center">
            <MaterialCommunityIcons
              name="flower-tulip-outline"
              size={80}
              color={'white'}
            />
            <Text className="text-white font-extrabold text-[20px] leading-[24px]">
              CULTIVO
            </Text>
          </View>
        </TouchableHighlight>
        <View className="flex flex-col items-center ml-5">
          <TouchableHighlight
            className="bg-[#22CCB2] py-8 px-10 rounded-3xl mb-3 w-[150px] shadow-lg"
            onPress={() => alert('Listo el botón de ventas')}
            underlayColor="#1A9E87"
          >
            <View className="justify-center text-center items-center">
              <MaterialIcons name="point-of-sale" size={50} color="white" />
              <Text className="text-white font-extrabold text-[20px] leading-[24px]">
                VENTAS
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            className="bg-[#7F55E0] py-8 px-8 rounded-3xl mb-2 w-[150px] shadow-lg "
            onPress={() => alert('Listo el botón de Producción')}
            underlayColor="#6A4EBD"
          >
            <View className="justify-center text-center items-center">
              <MaterialCommunityIcons
                name="package-variant"
                size={50}
                color="white"
              />
              <Text className="text-white font-extrabold text-[14px] leading-[24px]">
                PRODUCCIÓN
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
}
