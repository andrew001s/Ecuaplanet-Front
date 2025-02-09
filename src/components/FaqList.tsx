import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const initialFaqCultivo = {
  text: ['Resumen de cultivo', 'Cultivo de Freedom', '¿Cuantas Variedades de flores hay?'],
};

const FaqList = ({ onSelectFaq }: { onSelectFaq: (text: string) => void }) => {
  const generateKey = (message: string) => `${message}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <View className="flex-col mb-4 justify-start pr-2 items-end">
      {initialFaqCultivo.text.map((item) => (
        <TouchableOpacity
          key={generateKey(item)}
          className="bg-[#FFFFFF96] m-0.5 border border-[#999DF080] border-solid pr-6 pl-6 pt-3 pb-3 rounded-[6px]"
          style={{ maxWidth: '90%', flexShrink: 1 }}
          onPress={() => onSelectFaq(item)}
        >
          <Text className="text-black">{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FaqList;
