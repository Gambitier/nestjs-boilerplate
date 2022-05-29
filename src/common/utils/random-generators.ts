export function getRandomNumberBetween(min: number, max: number): number {
  const randomNumber: number = Math.random() * (max - min) + min;
  return Math.floor(randomNumber);
}
