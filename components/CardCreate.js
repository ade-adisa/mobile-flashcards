import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import QuestionInput from './QuestionInput'
import SubmitButton from './SubmitButton'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { submitCard } from '../utils/api'


class CardCreate extends Component {

    state = {
        question: '',
        answer: '',
      }

    questionInput = (text) => {
        this.setState((state) => {
            return {
                question: text,
            }
        })
    }

    answerInput = (text) => {
        this.setState((state) => {
            return {
                answer: text,
            }
        })
    }


    //Add Card
    submit = () => {
        const { entryId }  = this.props.navigation.state.params

        if (this.state.question !== '' && this.state.answer !== '') {          
            submitCard(entryId, this.state).then(() => { //Save to 'DB'
                this.props.dispatch(addCard(entryId, this.state)) //Update Redux
                this.setState(() => ({
                    question: '',
                    answer: '',
                }))
            })
            this.props.navigation.navigate('Dashboard') //Route back 
        }
    }


  render() {
    const { question,answer }  = this.state;
    const { entryId }  = this.props.navigation.state.params

    return (
      <View style={styles.container}>
      <Text style={styles.headerText}>Add Card</Text>
        <QuestionInput placeholder = {'Insert question'} value = {question} actionForText = {text => this.questionInput(text)}/> 
        <QuestionInput placeholder = {'Insert answer'} value = {answer} actionForText = {text => this.answerInput(text)}/> 
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <SubmitButton buttonTitle={'Submit'} onPress={() => this.submit()}/>
            <SubmitButton buttonTitle={'Cancel'} onPress={() => this.props.navigation.navigate('Dashboard', {entryId : entryId})}/>
        </View>
      </View>
    )
  }
} 


const mapStateToProps = (entries) => ({ entries })

export default connect(mapStateToProps)(CardCreate)



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',  //Vertical
      justifyContent: 'center', //Horizontal
    },
    headerText:{
      margin: 30,
      justifyContent: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 25,
    }
  })