import { shuffleArray } from "./utils";

export const farenheitToCelsius = (farenheit: number): number => {
    return (farenheit - 32) * (5 / 9);
}

export const celsiusToFarenheit = (celsius: number): number => {
    return (celsius * (9 / 5)) + 32;
}

export const importantCelsiusTemps = [
    -20,
    -5,
    0, // freezing point of water
    5,
    20, // warm summer day in finland
    24, // warm summer day in finland
    30, // hot summer day in finland
    37, // human body temperature
    40, // very hot weather
    80, // sauna
    100, // boiling point of water
    120, // very hot sauna
    220 // typical oven temperature
]

export const importantFarenheitTemps = [
    0,
    32,
    100
]

type question = {
    question: string,
    verify: (input : string) => boolean,
    humanReadableSolution: string
}

export const easyFToCProblemSet = () : question[] => {
    const fTemps1 = importantCelsiusTemps.map(x => Math.ceil(celsiusToFarenheit(x)))
    const fTemps2 = importantCelsiusTemps.map(x => Math.floor(celsiusToFarenheit(x)))
    const fTemps3 = importantFarenheitTemps

    const fTemps4 = fTemps1.map(x => x + 2)
    const fTemps5 = fTemps2.map(x => x - 2)

    const fTemps = [...fTemps1, ...fTemps2, ...fTemps3, ...fTemps4, ...fTemps5]

    const questions = fTemps.map(x => {
        return {
            question: `${x}°F`,
            verify: (input : string) => {
                return Math.abs(farenheitToCelsius(x) - parseInt(input)) < 1
            },
            humanReadableSolution: `${farenheitToCelsius(x).toFixed(2)}°C`
        }
    })

    // scramble
    const questionsScrambled = shuffleArray(questions)
    return questionsScrambled
}