import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry} from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { getDailyReminderValue } from '../utils/helpers'
import { QuestionInput } from './QuestionInput'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
    onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

// export default class AddEntry extends Component {
class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((state) => {
      const count = state[metric] + step
        return {
          ...state,
          [metric]: count > max ? max : count
        }
    })
  }

  decrement = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((state) => {
      const count = state[metric] - step
        return {
          ...state,
          [metric]: count < 0 ? 0 : count
        }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    //Update Redux
    this.props.dispatch(addEntry({
      [key]: entry
    }))


    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))

    //Route to Home

    //Save to 'DB'
    submitEntry({ key, entry})

    //Clear Local Notifications
  }

  reset = () => {
    const key = timeToString()

    // Update Redux
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))

    // Route to Home

    // Update 'DB'
    removeEntry(key)
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons
          name='ios-happy'
          size={100}
          />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
          <View>
  
            {/* <DateHeader date = {(new Date()).toLocaleDateString()}/> */}
            {/* <QuestionInput placeholder = {'Questions here'}/> */}
            {Object.keys(metaInfo).map((key) => {
              const { getIcon, type, ...rest } = metaInfo[key]
              const value = this.state[key]

              return (
                <View key = {key}>
                {getIcon()}
                {type === 'slider'
                ? <UdaciSlider 
                value = {value}
                onChange = {(value) => this.slide(key, value)}
                {...rest}   
                />
                : <UdaciSteppers
                value ={value}
                onIncrement= {() => this.increment(key)}
                onDecrement= {() => this.decrement(key)}
                {...rest} 
                />
              }
                </View>
              )
            })}

            <SubmitBtn onPress={this.submit}/>
          </View>   
    )
  }
}

const styles = StyleSheet.create({
  // iosSubmitBtn
})

function mapStateToProps (state) {
  const key = timeToString()
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'

  }
}

export default connect(mapStateToProps)(AddEntry)