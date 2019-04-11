import React from 'react'
import { View, Platform, StatusBar} from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { FontAwesome } from '@expo/vector-icons'
import { Constants } from 'expo'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import CreateDeckView from './components/CreateDeckView' 
import DecksListView from './components/DecksListView'
import DeckDetail from './components/DeckDetail'
import CardCreate from './components/CardCreate'
import Quiz from './components/Quiz'

function FlashCardStatusBar ({ backgroundColor, ...props }) {
  return (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
  )
}

//TABS
const Tabs = createBottomTabNavigator({
  DecksListView: {
    screen: DecksListView,
    navigationOptions: {
      tabBarLabel: 'All Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='folder' size={30} color={tintColor} />
    },
  },
  CreateDeckView: {
    screen: CreateDeckView,
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


// STACK
const Stack = createStackNavigator({
  Home: {
    screen: TabsContainer,
    navigationOptions: {
      title: 'Home',
      header: null 
    }
  }, 
  Dashboard: {
    screen: DeckDetail,
    navigationOptions: {
      title: 'Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      mode: 'modal',
    }
  },
  CardCreate: {
    screen: CardCreate,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      // header: null  //Removes Header
      mode: 'modal',
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      // header: null, 
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

const NavStack = createAppContainer(Stack);


export default class App extends React.Component {
 
  render() {
    return (
      <Provider store = {createStore(reducer)}>
      <View style={{flex: 1}}>
      <FlashCardStatusBar backgroundColor={purple} barStyle='light-content'/>
      {/* <CreateDeckView /> */}
      {/* <TabsContainer /> */}
      <NavStack />
      </View>
      </Provider>
    );
  }
}