## running and play
npm install then npm start to start server at port 3000 then use this link http://localhost:3000/

## How your solution works
Detailed Steps
## Initialization: 
`Define arrays for vowels (vowels) and consonants (consonantsLower, consonantsUpper). Define helper functions isVowel and nextConsonant.`
##  translateToAlien Function:
Initialization: `Start the translated text with the prefix UBCO.`
## Translation Rules:
Vowels: `Each vowel in the text is doubled.`
Consonants: `Each consonant is shifted to the next consonant in the alphabet, preserving the case.`
Non-alphabetic Characters: `Non-alphabetic characters remain unchanged.`
Final Character Check:  `Ensures that the last character is not a digit. If it is, it is replaced with 'x'.`
Word Count: `The number of words in the original text is appended to the end of the translated text.`
## translateToOriginal Function:
Remove Prefix: `Strip the UBCO prefix.`
Parse Word Count: `Extract and remove the word count from the end of the text.`
## Reverse Translation Rules:
Vowels: `Reduce doubled vowels to a single vowel.`
Consonants: `Shift each consonant back to the previous consonant in the alphabet, preserving the case.`
Non-alphabetic Characters: `Non-alphabetic characters remain unchanged.`
Word Count Check: `Verify that the word count matches the number of words in the translated text.`
## detectLanguage Function:
Prefix Check: `Check if the text starts with the UBCO prefix to determine if it is in the alien language.`


## Reasons for the Technical Decisions
Character Handling: `Doubling vowels and shifting consonants maintain readability and make the transformation distinctive and reversible.`
Final Character Check: `Ensuring the last character is not a digit prevents confusion and ensures consistent formatting.`
Word Count: `Appending the word count verifies translation integrity and aids in reversing the translation.`

## If you have more time, what should i do?
Performance Optimization: `Optimize the translation algorithms for better performance, especially when handling large texts or high volumes of requests.`
Comprehensive Error Handling: `Implement more error handling to manage cases and invalid inputs`
Uses: `Games and Puzzles: It could be used in games, puzzles, or educational tools to create a layer of complexity that users must decode.`
