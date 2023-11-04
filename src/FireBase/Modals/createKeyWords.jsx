export default function createKeyWords(name) {
  const stringName = name.toLowerCase();
  const arrKeywords = [];
  const arrName = stringName.split("");
  let curName = "";
  let douLetter = "";
  let triLetter = "";
  arrName.forEach((letter, index) => {
    curName += letter;
    if (index > 1) {
      douLetter = arrName[index - 1] + arrName[index];
      arrKeywords.push(douLetter);
    }
    if (index > 2) {
      triLetter = arrName[index - 2] + arrName[index - 1] + arrName[index];
      arrKeywords.push(triLetter);
    }
    arrKeywords.push(curName);
  });
  return arrKeywords;
}
