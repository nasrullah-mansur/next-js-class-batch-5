export const generateEightDigitNumber = (): number => {
    const min = 10_000_000;
    const max = 99_999_999;
    const range = max - min + 1; // 90,000,000

    // Rejection sampling avoids modulo bias
    const maxUnbiased = Math.floor(0x1_0000_0000 / range) * range;
    const buffer = new Uint32Array(1);

    let randomValue = 0;
    do {
        crypto.getRandomValues(buffer);
        randomValue = buffer[0];
    } while (randomValue >= maxUnbiased);

    return min + (randomValue % range);
};