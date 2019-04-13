# mobile-flashcards

This is my iteration of the final assessment project for Udacity's React Fundamentals course. The Project here is a flashcard application, with ability to create new decks, set new questions and also test on these questions.

## Installation

To use the application, you are to:

* cd into the root folder (mobile-flashcards)
* install all project dependencies with `npm install`
* start the app with `npm start` or `expo start`

## What you are getting and structure
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── package.json # You are not required to modify this file.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
├── actions
│   ├── index.js # Reducer action creators.
├── reducers
│   ├── index.js # Reducers.
├── assets
│   ├── icon.png # You may replace, not used presently.
│   ├── splash.png # You may replace, not used presently.
├── utils
│   ├── colors.js # Colour codes for app-wide reuse are declared here.
│   ├── helpers.js # Contains helper code, majorly to handle notifications now.
│   ├── api.js # Contains helper methods, used throughout the app, majorly dealing with asynStorage saves and fetch.
├── App.js # This is the root of your app. Navigation code is also handled here.
└── src
    ├── CreateDeckView.js # This View is where the deck is created.
    ├── DecksListView.js # This is a list view of all created decks, shows a message when no decks are created yet.
    ├── DeckDetail.js # View dedicated to individual decks, you may route to quizes here or card creation view.
    ├── CardCreate.js # View containing field for creating addiotional cards.
    ├── Quiz.js # View with code for quiz taking, retakes and navigation back.
    ├── SubmitButton.js # To minimise repeated code, this view helps for reuse wherever standard buttons are required.
    ├── TextButton.js # This text component view is used wherever text only buttons are required.
    └── QuestionInput.js # Also helps for code reuse, this is used wherever form fields are required.
```

## Running the tests

You may test the application on a live device (iOS or Android) using [Expo](http://expo.github.io "Expo"), or run on a iOS or Android simulator on your computer

## Built with

The application was built using

* VS Code - Code Editor
* React Native - Language

## License

This project is licensed under the MIT License