export default function createKeyWords(name) {
  const stringName = name.toLowerCase();
  const arrName = [];
  let curName = "";
  stringName.split("").forEach((letter) => {
    curName += letter;
    arrName.push(curName);
  });
  return arrName;
}
