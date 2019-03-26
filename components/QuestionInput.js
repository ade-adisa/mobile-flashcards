import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function QuestionInput() {
  return (
    <View style={{padding: 10}}>
    <TextInput
      style={{height: 40}}
      placeholder="Type your question here"
    //   onChangeText={(text) => this.setState({text})} //{actionForText}
    />
   </View>
  )
}

//{ placeholder }