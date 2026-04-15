/** Russian label: "{n} комментарий" / "комментария" / "комментариев" */
export function formatCommentsCountLabelRu(count: number): string {
  const n = Math.abs(Math.trunc(count));
  const mod100 = n % 100;
  const mod10 = n % 10;
  let word: string;
  if (mod100 >= 11 && mod100 <= 14) {
    word = 'комментариев';
  } else if (mod10 === 1) {
    word = 'комментарий';
  } else if (mod10 >= 2 && mod10 <= 4) {
    word = 'комментария';
  } else {
    word = 'комментариев';
  }
  return `${count} ${word}`;
}
