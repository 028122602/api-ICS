const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
const consonantsLower = "bcdfghjklmnpqrstvwxyz";
const consonantsUpper = "BCDFGHJKLMNPQRSTVWXYZ";

function isVowel(char) {
  return vowels.includes(char);
}

function nextConsonant(char) {
  if (consonantsLower.includes(char)) {
    const index = consonantsLower.indexOf(char);
    return consonantsLower[(index + 1) % consonantsLower.length];
  } else if (consonantsUpper.includes(char)) {
    const index = consonantsUpper.indexOf(char);    
    return consonantsUpper[(index + 1) % consonantsUpper.length];
  }
  return char;
}

export function translateToAlien(text) {
  let checkNumber = text.match(/\d$/); // check for number from end of string only 1 digit
  if (checkNumber) return "Invalid original text format";
  let translatedText = "UBCO ";
  let words = text.split(/\s+/);
  let wordCount = words.length;

  for (let char of text) {
    if (isVowel(char)) {
      translatedText += char + char;
    } else if (
      consonantsLower.includes(char) ||
      consonantsUpper.includes(char)
    ) {
      translatedText += nextConsonant(char);
    } else {
      translatedText += char;
    }
  }

  translatedText += wordCount;
  return translatedText;
}

export function translateToOriginal(text) {
  if (!text.startsWith("UBCO ")) return "Invalid alien text format";
  text = text.slice(5); // remove 'UBCO '
  let words = text.match(/\d+$/); // check for number from end of string stuctures example [ '2', index: 14, input: 'Jeemmoo Xoosmf2', groups: undefined ]

  if (!words) return "Invalid alien text format";
  let wordCount = parseInt(words[0]);
  text = text.slice(0, -words[0].length); // remove word count

  let originalText = "";
  let i = 0;
  while (i < text.length) {
    let char = text[i];
    if (isVowel(char) && text[i + 1] === char) {
      originalText += char;
      i += 2;
    } else if (
      consonantsLower.includes(char) ||
      consonantsUpper.includes(char)
    ) {
      let prevIndex;
      if (consonantsLower.includes(char)) {
        prevIndex = consonantsLower.indexOf(char) - 1;
        if (prevIndex < 0) prevIndex = consonantsLower.length - 1;
        originalText += consonantsLower[prevIndex];
      } else {
        prevIndex = consonantsUpper.indexOf(char) - 1;
        if (prevIndex < 0) prevIndex = consonantsUpper.length - 1;
        originalText += consonantsUpper[prevIndex];
      }
      i++;
    } else {
      originalText += char;
      i++;
    }
  }

  if (originalText.split(/\s+/).length !== wordCount)
    return "Word count mismatch";

  return originalText;
}

export function detectLanguage(text) {
  return text.startsWith("UBCO");
}
