export default (audioPath : string, maxOverlaps = 10) => {
    const audios = new Array(maxOverlaps).fill(0).map(() => new Audio(audioPath))
    let currentAudio = 0
    return {
        play: () => {
            audios[currentAudio].play()
            currentAudio = (currentAudio + 1) % maxOverlaps
        },
        stop: () => {
            audios.forEach(audio => audio.pause())
        }
    }
}
