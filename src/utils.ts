export const shuffleArray = <T>(array: T[]): T[] => {
    const newArray : [number, T][] = array.map(x => [Math.random(), x])
    newArray.sort((a, b) => a[0] - b[0])
    return newArray.map(x => x[1])
}