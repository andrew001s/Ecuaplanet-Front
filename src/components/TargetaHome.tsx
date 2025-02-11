import { View, Text, Image } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
//<Text className="text-justify font-normal text-[#9095A0]">{descripcion}</Text>
interface TargetaHomeProps {
  nombreCliente: string;
  paisCliente: string;
  fechaVenta: Date;
  montoTotalVenta: number;
}

export default function TargetaHome({
  nombreCliente,
  paisCliente,
  fechaVenta,
  montoTotalVenta,
}: TargetaHomeProps) {
  const getFlagEmoji = (pais: string) => {
    switch (pais) {
      case 'Alemania':
        return '🇩🇪';
      case 'Japón':
        return '🇯🇵';
      case 'Ecuador':
        return '🇪🇨';
      case 'Australia':
        return '🇦🇺';
      default:
        return '🏳️';
    }
  };
  return (
    <View className="flex-1">
      <View className="rounded-2xl border flex-row py-4 my-1 border-[#9095A0]">
        <View className="mx-5">
          <MaterialCommunityIcons
            name="arrow-bottom-right-thin-circle-outline"
            size={30}
            color="green"
            style={{ transform: [{ rotate: '270deg' }] }}
          />
        </View>

        <View className="flex-1 ">
          <Text className="font-bold text-start">Venta a {nombreCliente}</Text>
          <Text className="font-normal text-start text-[#9095A0]">
            {paisCliente} {getFlagEmoji(paisCliente)} -{' '}
            {fechaVenta instanceof Date
              ? fechaVenta.toLocaleDateString()
              : fechaVenta}
          </Text>
        </View>

        <View className="mx-5">
          <Text className="text-green-500 font-bold">+${montoTotalVenta}</Text>
        </View>
      </View>
    </View>
  );
}
