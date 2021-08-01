export const annotate = (input) => {
    let tableArr = [];

    if(input.length === 0 || input.some(x => x === ''))
    {
       return input;
    }

    // create new array with row counts;
    input.forEach((row) => {
        let counter = 0;
        let rowArr = [];

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

            tableArr[index] = row.toLocaleString().replace(/,/g,'');
        })
    }
    else
    {
        return [tableArr.toLocaleString().replace(/,/g,'').replace(/0/g, ' ')];
    }

    return tableArr;
};

const countMines = ({tableArr, rowIndex, currentCount, cellIndex, rowType}) => {
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
