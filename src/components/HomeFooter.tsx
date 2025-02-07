import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import TargetaHome from './TargetaHome';

export default function HomeFooter({ingreso = []}) {
  const [ingresos,setIngresos] = useState([]);
  const [carga,setCarga] = useState(true);
  const prueba=async()=>{
    console.log("prueab async")
    await fetch("http://localhost:8080/api/ingresos/max-venta",{
      method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        console.log('Éxito:', data);
    })
    .catch((error) => {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
    } else if (error.request) {
        console.error('No se recibió respuesta del servidor.');
    } else {
        console.error('Error al configurar la solicitud:', error);
    }
    });
  }
  useEffect(()=>{
    prueba()
  },[]);
  if(carga){
    return <Text>Cargando...</Text>
  }

  return (
    <View>
      {ingreso.map((item)=>{
        return(
        <TargetaHome
        key={item.idPedido.toString()}
        nombreCliente={item.nombreCliente}
        paisCliente={item.paisCliente}
        tipoCliente={item.tipoCliente}
        idPedido={item.idPedido}
        montoTotalVenta={item.montoTotalVenta}
        />
      )})}
    </View>
  );
}
