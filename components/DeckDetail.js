import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SubmitButton from './SubmitButton'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { receiveEntries } from '../actions'
import { getDecks, deleteDeck } from '../utils/api'



class DeckDetail extends Component {

    // componentDidMount() {
    //     //Alternate deck fetch
    //     const { dispatch } = this.props
    //     const { entryId }  = this.props.navigation.state.params

    //     //Alternate deck fetch
    //     getDeck(entryId)
    //     .then((deck) => {return(deck)})
    // }

    //Delete Card
    // delete = () => {
    //     const { entryId }  = this.props.navigation.state.params

    //     // Remove deck identified by 'entryId', from 'DB'
    //     deleteDeck(entryId).then(() =>
    //         // Refetch redux store
    //         getDecks().then(
    //             (entries) => this.props.dispatch(receiveEntries(entries))
    //         )
    //     )
    //     // Route to Home
    //     this.props.navigation.navigate('Home')
    // }


  render() {
    const { entryId }  = this.props.navigation.state.params
    const { entries }  = this.props;
    const deck = entries[entryId]

    return (
      <View style={styles.container}>
      {/* <Text>{JSON.stringify(deck)}</Text> */}
        <Text style={styles.headerText}>{deck.deckTitle}</Text>
        <Text style={{textAlign: 'center', marginBottom: 15}}>{deck.questionsList.length} Cards</Text>
        <SubmitButton buttonTitle={'Add Card'} onPress={() => this.props.navigation.navigate('CardCreate', {entryId : entryId})}/>
        <SubmitButton buttonTitle={'Start Quiz'} onPress={() => this.props.navigation.navigate('Quiz', {entryId : entryId})}/>
        {/* <TextButton linkText={'Delete Deck'} onPress={() => this.delete()} />    */}
      </View>
    )
  }
} 


const mapStateToProps = (entries) => ({ entries })

export default connect(mapStateToProps)(DeckDetail)



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',  //Vertical
      justifyContent: 'center', //Horizontal
    },
    headerText:{
      marginLeft: 30,
      marginRight: 30,
      justifyContent: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 30,
    }
  })