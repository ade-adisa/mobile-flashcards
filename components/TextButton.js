import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default function TextButton({ linkText, onPress}) {
  return (
      <TouchableOpacity style={{alignItems: 'center', marginTop: 20, marginBottom: 70}} onPress={onPress}>
        <Text style={{color: '#E53224', fontWeight: 'bold'}}>{linkText}</Text>
      </TouchableOpacity>
  )
}
