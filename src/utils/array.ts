export const makeIndexArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i);
};

export const makeArrayStartingWithOne = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i + 1);
};

export function shuffleArray<T = any>(array: T[]) {
  const result = array.slice();
  result.sort(() => Math.random() - 0.5);
  return result;
}
