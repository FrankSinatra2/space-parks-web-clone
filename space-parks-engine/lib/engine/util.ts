
export function range(size: number, startAt: number = 0): number[] {
  return [...Array.from(Array(size).keys())].map(i => i + startAt);
}
