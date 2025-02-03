import { View, Text, Image } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function HomeFooter() {
    const flor="Claveles";
    const descripcion="Los claveles, con su vibrante variedad de colores y alta resistencia, se posicionan como la flor favorita del mercado. Su versatilidad en arreglos y celebraciones respalda su liderato en ventas.";
    const ingreso=3000;
    const egreso=6000;
    const fecha="Sábado 01/02/25"
  return (
    <View className="flex-1 p-3">
        <Text className="font-semibold text-2xl pl-3">Actividades Recientes</Text>
        <View>
            <Text className="font-normal mt-5 pl-3 text-[#9095A0]">{fecha}</Text>
            <View className="rounded-3xl border flex-row m-5 p-3 items-center justify-between relative border-[#9095A0]">
                <View className="absolute top-3 left-3 pt-3">
                    <MaterialCommunityIcons name="arrow-bottom-right-thin-circle-outline" size={30} color="black" />
                </View>
                <View className="flex-1 pl-10 pr-20">
                    <Text className="font-bold"> Flor más vendida: {flor}</Text>
                    <Text className="text-justify font-normal text-[#9095A0]">{descripcion}</Text>
                </View>
                <View className="absolute top-3 right-3 pt-3">
                    <Text className="text-green-500 font-bold">
                        +${ingreso}
                    </Text>
                </View>
            </View>
        </View>
        <View>
            <View className="rounded-3xl border-solid border flex-row m-5 p-3 items-center justify-between relative border-[#9095A0]">
                <View className="absolute top-3 left-3 pt-3">
                    <MaterialCommunityIcons name="arrow-top-left-thin-circle-outline" size={30} color="black" />
                </View>
                <View className="flex-1 pl-10 pr-20">
                    <Text className="font-bold">Flor más vendida: {flor}</Text>
                    <Text className="text-justify font-normal text-[#9095A0]">{descripcion}</Text>
                </View>
                <View className="absolute top-3 right-3 pt-3">
                    <Text className="text-red-500 font-bold">
                        -${egreso}
                    </Text>
                </View>
            </View>
        </View>
    </View>
  )
}