const readline = require('readline-sync')
const robots = {
    text: require('./robots/text.js')	
}

async function start () {
  const content = {}
  
  content.searchItem = askAndReturnSearchItem()
  content.prefix = askAndReturnPrefix()
  
  await robots.text(content)
  
  function askAndReturnSearchItem() {
    return readline.question('Type a Wikipedia search item:')
  }
  function askAndReturnPrefix() {
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option:')
    const selectedPrefixText = prefixes[selectedPrefixIndex]
	
    return selectedPrefixText	

  }

  console.log(content)
}

start()