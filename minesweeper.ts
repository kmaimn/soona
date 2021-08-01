type stringOrNumber = string | number;

interface ICountMines {
    tableArr: stringOrNumber[][],
    rowIndex: number,
    currentCount: number,
    cellIndex: number,
    rowType: 'above' | 'below'
}

export const annotate = (input: string[]): string[] => {
    let tableArr: stringOrNumber[][] = [];

    if(input.length === 0 || input.some(x => x === ''))
    {
       return input;
    }

    // create new array with row counts;
    input.forEach((row) => {
        let counter = 0;
        let rowArr: stringOrNumber[] = [];

        for(let i = 0; i < row.length; i++)
        {
            if(row.charAt(i) === '*')
            {
                rowArr.push("*")
            }
            else if (row.charAt(i) === ' ')
            {
                if(row.charAt(i - 1) === "*")
                {counter++}
                if(row.charAt(i + 1) === "*")
                {counter++}

                rowArr.push(counter)
                counter = 0;
            }
        }
        tableArr.push(rowArr)
    })

    // get new counts with rows above/below current
    if(input.length > 1)
    {
            let finalArr: string[] = [];
            
            tableArr.forEach((row, index) => {
            row.forEach((cell, i) => {
                if(cell !== "*")
                {
                    if(index < 1)
                    {
                        const aboveCount = countMines({tableArr, rowIndex: index, currentCount: cell,  cellIndex: i, rowType: 'above'})
                        tableArr[index][i] = aboveCount === 0 ? ' ' : aboveCount;
                    }
                    else if(index < input.length-1)
                    {
                        const aboveCount = countMines({tableArr, rowIndex: index, currentCount: cell,  cellIndex: i,  rowType: 'above'})
                        const finalCount = countMines({tableArr, rowIndex: index, currentCount: aboveCount,  cellIndex: i,  rowType: 'below'})

                        tableArr[index][i] = finalCount === 0 ? ' ' : finalCount;
                    }
                    else
                    {
                        const beforeCount = countMines({tableArr, rowIndex: index, currentCount: cell,  cellIndex: i,  rowType: 'below'})

                        tableArr[index][i] = beforeCount === 0 ? ' ' : beforeCount;
                    }
                }
            })

            finalArr[index] = row.toLocaleString().replace(/,/g,'');
        })
            
            return finalArr;
    }
    else
    {
        return [tableArr.toLocaleString().replace(/,/g,'').replace(/0/g, ' ')];
    }

    return tableArr;
};

const countMines = ({
    tableArr,
    rowIndex,
    currentCount,
    cellIndex,
    rowType
}: ICountMines) => => {
    let newCount = currentCount;
    if(rowType === 'above')
    {
        if(tableArr[rowIndex + 1][cellIndex - 1] === "*"){newCount ++}
        if(tableArr[rowIndex + 1][cellIndex] === "*"){newCount ++}
        if(tableArr[rowIndex + 1][cellIndex + 1] === "*"){newCount ++}
    }
    else if(rowType === 'below')
    {
        if(tableArr[rowIndex - 1][cellIndex - 1] === "*"){newCount ++}
        if(tableArr[rowIndex - 1][cellIndex] === "*"){newCount ++}
        if(tableArr[rowIndex - 1][cellIndex + 1] === "*"){newCount ++}
    }

    return newCount;
}
