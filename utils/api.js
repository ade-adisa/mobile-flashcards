import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'Flashcards:storage'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
        return JSON.parse(results)
    })
}

export function getDeck( key ) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => {
      const data = JSON.parse(results)
      return data[key]
  })
}

export function submitDeck({ key, entry }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: entry,
    }))
}

export function submitCard( key, card ) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((result) => {
        const decks = JSON.parse(result)
        const deck = decks[key]
        deck.questionsList.push(card)
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
          [key]: { ...deck }
        }))
      })
  }

export function deleteDeck (key) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
        console.log('DELETED')
    })
}


export async function deleteDecks () {
    try {
        AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)  //Removes all keys
        console.log('Selection removed from disk.');
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
}