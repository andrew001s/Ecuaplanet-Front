import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

const initialFaqCultivo = 
  [
    'Resumen de cultivo',
    'Cultivo de Freedom',
    '¿Cuantas Variedades de flores hay?',
  ]
;

interface FaqListProps {
  onSelectFaq: (text: string) => void;
  type: string;
}

const FaqList = ({ onSelectFaq, type }: FaqListProps) => {
  const generateKey = (message: string) =>
    `${message}-${Math.random().toString(36).substr(2, 9)}`;
  const [faq, setFaq] = useState<string[]>([]);

  useEffect(() => {
    if (type === 'cultivo') {
      setFaq(initialFaqCultivo);
    }
  }
    , [type]);

  return (
    <View className="flex-col mb-4 justify-start pr-2 items-start">
      {faq.map((item) => (
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
