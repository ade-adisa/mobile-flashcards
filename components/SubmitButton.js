import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { purple, white } from '../utils/colors'

export default function SubmitButton({ buttonTitle, onPress }) {
  return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={styles.btnText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    btn: {
      backgroundColor: purple, //'#E53224', //My Red
      margin: 14,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.7,
      shadowRadius: 2,
      elevation: 2
    },
    btnText: {
      color: white,
      padding: 10,
      fontSize: 14,
    },
  })
