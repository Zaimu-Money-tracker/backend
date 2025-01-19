export default function Capitals(word: string) {
  const toCapital = word.charAt(0).toUpperCase() + word.slice(1);

  return toCapital;
}
