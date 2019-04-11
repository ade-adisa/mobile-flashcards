import React from 'react';
import { View, Text, TextInput } from 'react-native';


export default function QuestionInput({ placeholder, actionForText, value }) {
  return (
    <View style={{marginBottom: 20, marginLeft: 20, marginRight: 20}}>
    <TextInput style={{height: 40, padding: 10, borderWidth: 1, borderRadius: 8}}
        placeholder={placeholder}
        value={value}
        onChangeText={actionForText}
    />
   </View>
  )
}

