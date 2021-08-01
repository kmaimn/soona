interface IWordCount {
  [key: string]: number;
}

export const countWords = (sentence: string): IWordCount | Error => {
  try
  {
    if(!sentence || sentence === '')
    {
      return new Error('Please enter a phrase to continue.')
    }

    const standardizedPhrase = sentence.replace(/[^\w\s',]/g, '') // rm special chars
        .replace(/\s/g, ' ') // rm whitespace
        .replace(/\s'|'\s|'$/g, ' ') // rm single quotes
        .replace(/,/g, ' ') // add space for commas
        .replace(/ +/g, ' ') // rm extra spaces
        .replace(/^ | $/g, '') // rm trailing/leading spaces
        .toLocaleLowerCase();

    const wordsArr = standardizedPhrase.split(' ');

    const distinctWords: string[] = [...new Set(wordsArr)];

    return distinctWords.reduce<IWordCount>((acc, curr) => {
      acc[curr] = wordsArr.filter(word => word === curr).length;
      return acc;
    },{})
  }
  catch(error)
  {
    return error;
  }
};
