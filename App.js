import React from 'react'
import { 
  View,
  Platform,
  StatusBar,
  Text,
  StyleSheet,
  SectionList,
  Image,
  Slider,
  TouchableHighlight,
  TouchableNativeFeedback, //Only support on Android, gives a ripple effect, also doenst work with Text child, requires a background={TNF.SelectableBackground()}
  TouchableOpacity,
  TouchableWithoutFeedback //Doenst work with Text child, You need a view as it's first child
} from 'react-native'
import AddEntry from './components/AddEntry' 
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator, DrawerNavigator, createNavigationContainer } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import QuestionInput from './components/QuestionInput'

function FlashCardStatusBar ({ backgroundColor, ...props }) {
  return (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
  )
}

function Deck () {
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Deck</Text>
        <SectionList 
          sections={[
            {data: ['Deck 1', 'Questions: 0']},
            {data: ['Deck 2', 'Questions: 2']}
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          keyExtractor={(item, index) => index}
        />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Deck: {
    screen: Deck,
    navigationOptions: {
      tabBarLabel: 'Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='folder' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: QuestionInput,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <  FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 0,
      shadowOpacity: 1
    }
  }
})

const TabsContainer = createAppContainer(Tabs)

export default class App extends React.Component {
 
  render() {
    return (
      <Provider store = {createStore(reducer)}>
      {/* <View style={styles.container}> */}
      <View style={{flex: 1}}>
      <FlashCardStatusBar backgroundColor={purple} barStyle='light-content'/>
      {/* <AddEntry /> */}
      <TabsContainer />
      
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginTop: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff'
  },
  img:{
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textMain:{
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
})