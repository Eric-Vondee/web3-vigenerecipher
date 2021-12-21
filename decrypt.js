const prompt = require('prompt');
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

function decryption(encryptedText, keyword){
    if( typeof(encryptedText) !== "string" ){
      return "invalid encryptedText. Must be string, not " + typeof(encryptedText);
    }
    if( typeof(keyword) !== "string" ){
      return "invalid keyword. Must be string, not " + typeof(keyword);
    }

    encryptedText = encryptedText.toLowerCase();
    keyword = keyword.match(/[a-z]/gi).join("").toLowerCase();
    var decryptedText = "";
    var specialCharacterCount = 0;

    for( var i = 0; i < encryptedText.length; i++ ){
      var keyLetter = (i - specialCharacterCount) % keyword.length;
      var keyRow = VigenereCipher._tabulaRecta[keyword[keyLetter]];

      if( keyRow.indexOf(encryptedText[i]) !== -1 ){
        decryptedText += VigenereCipher._tabulaRecta.a[keyRow.indexOf(encryptedText[i])];
      }else{
        decryptedText += encryptedText[i];
        specialCharacterCount++;
      }
    }

    return decryptedText;
  }
  prompt.start();

  //
  // Get two properties from the user: text and key
  //
  prompt.get(['Key', 'Text'], function (err, result) {
    const decryptedTexts = decryption(result.Text, result.Key)
    console.log('Your text to be decrypted is: ' + result.Text);
    console.log('Your key is: '  +  result.Key);
    console.log('Your decrypted text is:' + decryptedTexts)
  });