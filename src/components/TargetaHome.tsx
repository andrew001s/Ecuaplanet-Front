import { View, Text, Image } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
//<Text className="text-justify font-normal text-[#9095A0]">{descripcion}</Text>
export default function TargetaHome() {
  const nombreCliente = 'Florist Paradise Ltd.';
  const paisCliente = 'Alemania';
  const tipoCliente = 'Extranjero';
  const idPedido = 4;
  const montoTotalVenta = 180.0;
  return (
    <View className="flex-1 p-3">
      <Text className="font-semibold text-2xl pl-3">Actividades Recientes</Text>
      <Text className="font-normal mt-5 pl-3 text-[#9095A0]">01/02/2025</Text>
      <View>
        <View className="rounded-3xl border flex-row m-5 p-3 items-center justify-between relative border-[#9095A0]">
          <View className="absolute top-3 left-3 pt-3">
            <MaterialCommunityIcons
              name="arrow-bottom-right-thin-circle-outline"
              size={30}
              color="black"
            />
          </View>
          <View className="flex-1 pl-10 pr-20">
            <Text className="font-bold">Cliente:</Text>{' '}
            <Text>{nombreCliente}</Text>
            <Text className="font-bold">Tipo de Cliente:</Text>{' '}
            <Text>{tipoCliente}</Text>
            <Text className="font-bold">País:</Text> <Text>{paisCliente}</Text>
            <Text className="font-bold">Pedido:</Text>{' '}
            <Text>#{nombreCliente}</Text>
            <Text className="font-bold">Cliente:</Text>{' '}
            <Text>{nombreCliente}</Text>
          </View>
          <View className="absolute top-3 right-3 pt-3">
            <Text className="text-green-500 font-bold">
              +${montoTotalVenta}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
