import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const initialFaqCultivo = {
  text: ['Resumen de cultivo', 'Cultivo de Freedom', '¿Cuantas Variedades de flores hay?'],
};

const FaqList = ({ onSelectFaq }: { onSelectFaq: (text: string) => void }) => {
  const generateKey = (message: string) => `${message}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <View className="flex-col mb-4 justify-start pr-2 items-start">
      {initialFaqCultivo.text.map((item) => (
        <TouchableOpacity
          key={generateKey(item)}
          className="bg-[#DEE1E6FF] m-2 border border-[#b5bac4] border-solid pr-6 pl-6 pt-3 pb-3 shadow-sm rounded-[16px]"
          style={{ maxWidth: '90%', flexShrink: 1 }}
          onPress={() => onSelectFaq(item)}
        >
          <Text className="text-[#323842FF]">{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FaqList;
