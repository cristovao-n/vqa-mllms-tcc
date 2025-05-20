import seedrandom from "seedrandom";

export function shuffleArray(arr, seed) {
    const rng = seedrandom(seed);
    return [...arr].sort(() => 0.5 - rng());
}
