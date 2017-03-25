// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// console.log(jokes['setup'])
// console.log(jokes['punchline'])

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

var updateJokes = function () {
  var stringifiedJokes = JSON.stringify(jokes)
  if (stringifiedJokes != null) {
    window.localStorage.setItem('jokes', stringifiedJokes)
  }
  updatePage()
}

var getJokes = function () {
  var stringifiedJokes = window.localStorage.getItem('jokes')
  if (stringifiedJokes != null) {
    jokes = JSON.parse(stringifiedJokes)
  }
}

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  var newJoke = jokes[requestedJokeKey]
  if (newJoke) {
    jokeBox.innerHTML =
      '<p>' + newJoke.setup + '</p>' +
      '<p>' + newJoke.punchline + '</p>'
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  getJokes()
  updateJokesMenu()
  updateDisplayedJoke()
  clearNewInput()
}

var clearNewInput = function () {
  document.getElementById('rememberJoke').value = ''
  document.getElementById('forgetJoke').value = ''
  document.getElementById('setup').value = ''
  document.getElementById('punchline').value = ''
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Remembering and forgetting jokes
var jokeForget = document.getElementById('forget')
var jokeRemember = document.getElementById('remember')

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)

jokeForget.addEventListener('click', function () {
  var forgetJoke = document.getElementById('forgetJoke').value
  delete jokes[forgetJoke]
  updateJokes()
})

jokeRemember.addEventListener('click', function () {
  var rememberJoke = document.getElementById('rememberJoke').value
  var jokeSetup = document.getElementById('setup').value
  var jokePunchline = document.getElementById('punchline').value
  jokes[rememberJoke] = {setup: jokeSetup, punchline: jokePunchline}
  updateJokes()
})
