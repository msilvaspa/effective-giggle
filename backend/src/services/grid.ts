const X_SIZE = process.env.X_SIZE ?? 10;
const Y_SIZE = process.env.Y_SIZE ?? 10;
const BIAS_QUANTITY = process.env.BIAS_QUANTITY ?? 20;

const randomIntPositiveInterval = (max: number) => {
    return Math.floor(Math.random() * (max - 1 + 1) + 1);
}

const generateRandomNumbers = (numberGenerator: (max: number) => number) => (max: number) => {
    const arr: number[] = [];
    for (let i = 0; i < +BIAS_QUANTITY; i++) {
        arr.push(numberGenerator(max))
    }
    return arr;
}

const padStartNumber = (e: number) => e.toString().padStart(2, '0');

const populateWithBias = (arr: any[][], bias: string) => {
    generateRandomNumbers(randomIntPositiveInterval)(99)
        .map(padStartNumber)
        .map(e => ({ x: e[0], y: e[1] }))
        .forEach(({ x: _x, y: _y }) => arr[+_x][+_y] = bias);
}

export default async (x: number = +X_SIZE, y: number = +Y_SIZE) => (valueGenerator: () => string) => (bias: string = '') => {
    const arr: Array<any[]> = [];
    for (let i = 0; i < x; i++) {
        arr.push([]);
        arr[i].push(new Array(y));
        for (let j = 0; j < y; j++) {
            arr[i][j] = valueGenerator();
        }
    }
    if (bias) populateWithBias(arr, bias);
    return arr;
}

const countOccurrence = (grid: Array<string[]>) => (letter: string) => {
    let count = 0;
    grid.forEach(arr => {
        arr.forEach(v => {
            if (v === letter) count += 1;
        })
    })
    if (count > 9) {
        const divideBy = count % 9;
        return Math.floor(count / divideBy);
    }
    return count;
}

export const generateCode = async (grid: Array<string[]>) => {
    const seconds = padStartNumber(new Date().getSeconds());
    const firstNumber = +seconds.split('')[0];
    const secondNumber = +seconds.split('')[1];
    const firstLetter = grid[firstNumber][secondNumber];
    const secondLetter = grid[secondNumber][firstNumber];
    const occurenceCounter = countOccurrence(grid);
    const firstLetterCount = occurenceCounter(firstLetter);
    const secondLetterCount = occurenceCounter(secondLetter);
    return `${firstLetterCount}${secondLetterCount}`;
}
