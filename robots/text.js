const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content) {
  await fecthContentFromWikipedia(content)
  cleanContent(content)
  breakContentIntoSentences(content)
   
async function fecthContentFromWikipedia(content) {
  const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
  const wikipediaAlgorithm       = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
  const wikipediaResponse        = await wikipediaAlgorithm.pipe(content.searchItem)
  const wikipediaContent         = wikipediaResponse.get()
  
  content.sourceContentOriginal = wikipediaContent.content
 }

function cleanContent(content) {
  const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
  const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
    
  content.sourceContentClean = withoutDatesInParentheses

    function removeBlankLinesAndMarkdown(text) {
      const allLines = text.split('\n')
	  
      const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
        if (line.trim().length === 0 || line.trim().startsWith('=')) {
          return false
        }
        return true
      })

      return withoutBlankLinesAndMarkdown.join(' ')
    }
  }

function removeDatesInParentheses(text) {
    return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
  }

function breakContentIntoSentences(content) {
	content.sentences = []

    const sentences = sentenceBoundaryDetection.sentences(content.sourceContentClean)
    sentences.forEach((sentence) => {
      content.sentences.push({
        text: sentence,
        keyword: [],
        images: []
	  })
	})
}	
  
}

module.exports = robot