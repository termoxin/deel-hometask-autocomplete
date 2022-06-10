export const removeAccents = (str: string) =>
  str.normalize("NFKD").replace(/\p{Diacritic}/gu, "");
