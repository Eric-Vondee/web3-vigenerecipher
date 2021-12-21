const { generateUUID } = require("./id-generator");
const prompt = require('prompt');
/**
 * 
 * key: used for encryption
 * Number: length of randomized
 */
let randomizedKey;
 const VigenereCipher = {
  _tabulaRecta: {
    a: "abcdefghijklmnopqrstuvwxyz",
    b: "bcdefghijklmnopqrstuvwxyza",
    c: "cdefghijklmnopqrstuvwxyzab",
    d: "defghijklmnopqrstuvwxyzabc",
    e: "efghijklmnopqrstuvwxyzabcd",
    f: "fghijklmnopqrstuvwxyzabcde",
    g: "ghijklmnopqrstuvwxyzabcdef",
    h: "hijklmnopqrstuvwxyzabcdefg",
    i: "ijklmnopqrstuvwxyzabcdefgh",
    j: "jklmnopqrstuvwxyzabcdefghi",
    k: "klmnopqrstuvwxyzabcdefghij",
    l: "lmnopqrstuvwxyzabcdefghijk",
    m: "mnopqrstuvwxyzabcdefghijkl",
    n: "nopqrstuvwxyzabcdefghijklm",
    o: "opqrstuvwxyzabcdefghijklmn",
    p: "pqrstuvwxyzabcdefghijklmno",
    q: "qrstuvwxyzabcdefghijklmnop",
    r: "rstuvwxyzabcdefghijklmnopq",
    s: "stuvwxyzabcdefghijklmnopqr",
    t: "tuvwxyzabcdefghijklmnopqrs",
    u: "uvwxyzabcdefghijklmnopqrst",
    v: "vwxyzabcdefghijklmnopqrstu",
    w: "wxyzabcdefghijklmnopqrstuv",
    x: "xyzabcdefghijklmnopqrstuvw",
    y: "yzabcdefghijklmnopqrstuvwx",
    z: "zabcdefghijklmnopqrstuvwxy"
  }
}

function encryption(plainText, keyword){
    if( typeof(plainText) !== "string" ){
      return "invalid plainText. Must be string, not " + typeof(plainText);
    }
    if( typeof(keyword) !== "string" ){
      return "invalid keyword. Must be string, not " + typeof(keyword);
    }

    plainText = plainText.toLowerCase();
    keyword = keyword.match(/[a-z]/gi).join("").toLowerCase();
    var encryptedText = "";
    var specialCharacterCount = 0;

    for( var i = 0; i < plainText.length; i++ ){
      var keyLetter = (i - specialCharacterCount) % keyword.length;
      var keywordIndex = VigenereCipher._tabulaRecta.a.indexOf(keyword[keyLetter]);

      if( VigenereCipher._tabulaRecta[plainText[i]] ){
        encryptedText += VigenereCipher._tabulaRecta[plainText[i]][keywordIndex];
      }else{
        encryptedText += plainText[i];
        specialCharacterCount++;
      }
    }

    return encryptedText;
  }
  prompt.start();

  //
  // Get two properties from the user: text and key
  //
  prompt.get(['Key', 'Text'], function (err, result) {
    randomizedKey = generateUUID(10, result.Key)
    const encryptedText = encryption(result.Text, randomizedKey)
    console.log('Your text to be encrypted is: ' + result.Text);
    console.log('Your key is: ' + randomizedKey);
    console.log('Your encrypted text is:' + encryptedText)
  });
