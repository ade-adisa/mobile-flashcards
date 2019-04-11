import React, { Component } from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'
import TextButton from './TextButton'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'


class Quiz extends Component {
  state = {
    cardCount: 0,
    correctCount: 0,
    displayAnswer: false
  }
  
  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }
  
  answerToggle = () => {
    // Toggle between question and answer.
    this.setState((state) => ({
      displayAnswer: !state.displayAnswer
    }))
  }

  correctAction = () => { 
    // Set quiz answer state
    this.setState((state) => ({
      cardCount: state.cardCount + 1,
      correctCount: state.correctCount + 1, //Increment to next question.
      displayAnswer: false
    }))    
  }
  
  incorrectAction = () => {   
    // Set quiz answer state
    this.setState((state) => ({
      cardCount: state.cardCount + 1, //Increment to next question.
      displayAnswer: false
    }))    
  } 
  
  restartQuiz = () => {
    this.setState({
      cardCount: 0,
      correctCount: 0,
      displayAnswer: false
    })
  }
    
  render() {
    const { cardCount, correctCount, displayAnswer } = this.state
    const { entryId }  = this.props.navigation.state.params
    const { entries }  = this.props;
    const deck = entries[entryId]

    if (deck.questionsList.length === 0) {
      return (
        <View style={{flex: 1, padding: 15, alignItems: 'stretch', justifyContent: 'center'}}>
          <Text style={styles.mainBlackText}>Sorry, you cannot take a quiz because there are no cards in the deck</Text>
        </View>
      )
    }
    
    return (
      <View style={styles.container}>
        {deck.questionsList.length > cardCount ?
          <View>
            <Text style={styles.counter}>{cardCount + 1} / {deck.questionsList.length}</Text>
            {displayAnswer === true ?
              <View style={styles.card}><Text style={styles.mainText}>{deck.questionsList[cardCount].answer}</Text></View>
            : 
            <View style={styles.card}><Text style={styles.mainText}>{deck.questionsList[cardCount].question}</Text></View>
            } 
            {/* The below if/else statement is to show different button text config based on displayAnswer toggle state */}
            {displayAnswer === true ? 
            <TextButton linkText={'Show Question'} onPress={this.answerToggle}/> 
            : 
            <TextButton linkText={'Show Answer'} onPress={this.answerToggle}/> 
            }   
            <SubmitButton buttonTitle={'Correct'} onPress={this.correctAction}/>
            <SubmitButton buttonTitle={'Incorrect'} onPress={this.incorrectAction}/>
          </View>
        :
          <View style={styles.resultContainer}>
            <Text style={styles.mainBlackText}>{(correctCount / deck.questionsList.length * 100).toFixed(1)}% Correct!</Text>
            <SubmitButton buttonTitle={'Back to Deck'} onPress={() => this.props.navigation.navigate('Dashboard',{ entryId : entryId })}/>
            <SubmitButton buttonTitle={'Retake Quiz'} onPress={this.restartQuiz}/>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  counter: {
    marginRight: 15,
    fontSize: 14,
    textAlign: 'right',
  },
  mainText: {
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
  },
  mainBlackText: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  card:{
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 60,
    paddingBottom: 60,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'crimson',
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

const mapStateToProps = (entries) => ({ entries })

export default connect(mapStateToProps)(Quiz)