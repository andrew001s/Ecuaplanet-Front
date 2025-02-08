import { View, Text, Image } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
//<Text className="text-justify font-normal text-[#9095A0]">{descripcion}</Text>
interface TargetaHomeProps{
  nombreCliente:string
  paisCliente:string
  tipoCliente:string
  idPedido:number
  montoTotalVenta:number
}

export default function TargetaHome( {nombreCliente,paisCliente,tipoCliente,idPedido,montoTotalVenta}:TargetaHomeProps) {
  return (
    <View className="flex-1 p-3">
      <View>
        <View className="rounded-3xl border flex-row m-1 p-3 items-center justify-between relative border-[#9095A0]">
          <View className="absolute top-3 left-3 pt-3">
            <MaterialCommunityIcons
              name="arrow-bottom-right-thin-circle-outline"
              size={30}
              color="green"
            />
          </View>
          <View className="flex-1 pl-10 pr-20">
            <Text className="font-bold">Cliente: <Text className="font-normal">{nombreCliente}</Text></Text>
            <Text className="font-bold">Tipo de Cliente: <Text className="font-normal">{tipoCliente}</Text></Text>
            <Text className="font-bold">País: <Text className='font-normal'>{paisCliente}</Text></Text> 
            <Text className="font-bold">Pedido: <Text className='font-normal'>#{idPedido}</Text></Text>
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
