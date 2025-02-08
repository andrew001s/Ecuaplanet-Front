import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import TargetaHome from './TargetaHome';
import axios from 'axios';

export default function HomeFooter() {
  const [ingresos,setIngresos] = useState([]);
  const [carga,setCarga] = useState(true);
  const fetchIngresos=async()=>{
    console.log("Llamado a la API...");
    try{
      const response = await axios.get ("http://192.168.100.35:8080/api/ingresos/max-venta");
      console.log("Datos recibidos:", response.data)
      setIngresos(response.data)
    }catch(error){
      console.error("Error al obtener datos",error.message)
    }finally{
      setCarga(false);
    }
  };

  useEffect(() => {
    fetchIngresos();
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
