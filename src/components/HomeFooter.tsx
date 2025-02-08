import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import TargetaHome from './TargetaHome';
import axios from 'axios';
import { fetchCardInfo } from '../services/TargetasServices';
import { Card } from '../constants/card.types';

interface Ingreso{
  nombreCliente:string
  paisCliente:string
  fechaVenta:Date
  montoTotalVenta:number
}

export default function HomeFooter() {
  const [ingresos,setIngresos] = useState<Card[]>([]);
  const [carga,setCarga] = useState(true);

  useEffect(() => {
    const obtenerDatos = async() =>{
      const datos = await fetchCardInfo();
      setIngresos(datos);
      setCarga(false);
    };
    obtenerDatos();
  }, []);

  if (carga) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View>
      <Text className="font-bold text-2xl m-4">Actividades Recientes</Text>

      {ingresos.length === 0?(
        <Text>No hay ventas recientes</Text>
      ):(
        ingresos.map((item,index)=>(
          <TargetaHome 
          key={`venta-${index}`}
          nombreCliente={item.nombreCliente}
          paisCliente={item.paisCliente}
          fechaVenta={item.fechaVenta}
          montoTotalVenta={item.montoTotalVenta}
          />
        ))
      )}
    </View>
  );
}
