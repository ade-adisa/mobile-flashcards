import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries } from '../actions'
import { getDecks } from '../utils/api'
import { white } from '../utils/colors'


class DecksListView extends Component { 

    componentDidMount() {
        const { dispatch } = this.props

        getDecks()
        .then((entries) => dispatch(receiveEntries(entries)))
    }


  render() {  
    
    const {entries} = this.props
    const deckCount = Object.keys(entries).length

    if (deckCount === 0) {
      return(
        <View style={{flex: 1, padding: 15, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.textMain}>No decks yet</Text>
        </View>
      )
    }

      return (
          <ScrollView style={styles.container}>
              {/* <TextButton children={'Clear All'} onPress={deleteDecks} /> */}
              {/* <Text>{JSON.stringify(this.props)}</Text> */}
              {Object.keys(entries).map((entry) => {
                const { deckID, deckTitle, questionsList } = entries[entry]
                  return (
                    <TouchableOpacity style={[styles.listItem]} key={entry} onPress={() => this.props.navigation.navigate('Dashboard', {entryId : deckID})}>
                        <Text style={styles.textMain}>{deckTitle}</Text>
                        { questionsList.length === 0 ? <Text>No cards</Text> : <Text>{questionsList.length} Cards</Text> }
                    </TouchableOpacity>
                  )
              })}
          </ScrollView>
      )
  }
}


function mapStateToProps (entries) {
    return {entries}
}

export default connect(mapStateToProps)(DecksListView)



const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 10,
      marginTop: 30,
      marginRight: 10,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    textMain:{
      fontSize: 25,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listItem:{
      padding: 20,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: white,
      borderRadius: Platform.OS === 'ios' ? 16 : 2,
      shadowRadius: 3,
      shadowOpacity: 0.8,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
    } 
  })