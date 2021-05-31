const readline = require('readline-sync')
const state = require('./state.js')

function robot() {
  const content = {
  maximumSentences: 5
 }

  content.searchItem = askAndReturnSearchItem()
  content.prefix = askAndReturnPrefix()
  state.save(content)

function askAndReturnSearchItem() {
  return readline.question('Type a Wikipedia search item:')
 }

function askAndReturnPrefix() {
  const prefixes = ['Who is', 'What is', 'The history of']
  const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option:')
  const selectedPrefixText = prefixes[selectedPrefixIndex]
  return selectedPrefixText	
 }

}

module.exports = robot