import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { submitDeck} from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import QuestionInput from './QuestionInput'
import SubmitButton from './SubmitButton'

class CreateDeckView extends Component {

  state = {
    deckID: 0,
    deckTitle: '',
    questionsList: []
  }

  deckInput = (text) => {
    this.setState((state) => {
        return {
          deckID: Date.now(),
          deckTitle: text,
        }
    })
  }
  

  //Add Deck
  submit = () => {
    const entry = this.state //Add button ID, unique per deck, set when deck is created
    const key = this.state.deckID

    if (this.state.deckTitle === undefined || this.state.deckTitle == null || this.state.deckTitle.length <= 0) {
      alert('You cannot submit a blank title')
    } else {
      //Update Redux
      this.props.dispatch(addEntry({
        [key]: entry
      }))

      this.setState(() => ({
        deckID: 0,
        deckTitle: '',
        questionsList: []
      }))

      //Route to Home on submission of deck title
      // this.props.navigation.navigate('DecksListView') //Routes to Decks List
      this.props.navigation.navigate('Dashboard', {entryId : key})
    
      //Save to 'DB'
      submitDeck({ key, entry})
    }
  }

  render() {
    const { deckTitle }  = this.state ;

    return (
      <View style={styles.container}>
        {/* <Text>{JSON.stringify(this.state)}</Text> */}
        <Text style={styles.headerText}>What is the title of your new deck</Text>
        <QuestionInput placeholder={'Insert deck title here'} value={deckTitle} actionForText={text => this.deckInput(text)}/> 
        <SubmitButton buttonTitle={'Submit'} onPress={this.submit}/>
      </View>   
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',  //Vertical
    justifyContent: 'center' //Horizontal
  },
  headerText: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
})

const mapStateToProps = (entries) => ({ entries })

export default connect(mapStateToProps)(CreateDeckView)