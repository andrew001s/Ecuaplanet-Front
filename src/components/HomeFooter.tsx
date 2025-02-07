import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import TargetaHome from './TargetaHome';

function VentasRecientes(){
  const [ingresos,setIngresos] = useState([]);
  const [carga,setCarga] = useState(true);

  useEffect(()=>{
    fetch("http://localhost:8080/api/ingresos/max-venta")
    .then(response => response.json())
    .then(data =>{
      console.log("Datos Recibidos: ",data)
      setIngresos(data);
      setCarga(false);
    })
    .catch(error =>{
      console.error("Error al obtener los datos",error)
      setCarga(false);
    });
  },[]);
  if(carga){
    return <Text>Cargando...</Text>
  }

  return <HomeFooter ingreso={ingresos}/>
}
export default function HomeFooter({ ingreso}) {
  console.log("Datos en HomeFooter:",ingreso)
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
