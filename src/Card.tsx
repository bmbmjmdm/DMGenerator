
import React, { createContext, useState } from 'react';
import {
  View,
} from 'react-native';

type CardProps = {
  icon?: React.JSX.Element,
  rows?: React.JSX.Element[],
  children?: React.JSX.Element | React.JSX.Element[]
}


function Card ({icon, rows, children} : CardProps): React.JSX.Element {
  return (
    <View style={{
      borderRadius: 10,
      backgroundColor: "white",
      padding: 20,
      margin: 20,
      flexDirection: 'row',
      alignSelf: 'flex-end',
      boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)'
    }}>
      {children ? children : (
        <>
          <View style={{
            flexDirection: "column",
            flex: rows?.length ? 3 : 0,
            rowGap: 10
          }}>
            {rows}
          </View>
          <View style={{
            alignItems: "center",
            justifyContent: "center"
          }}>
            {icon}
          </View>
        </>
      )}
    </View>
  )
}



export default Card;
