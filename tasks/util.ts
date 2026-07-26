export const HTML_REGEX = /(<([^>]+)>)/gi;

export const mapAbilities = (tokens: any) => {
  const tokenKeys = Object.keys(tokens);
  tokenKeys.forEach(
    (key) => (tokens[key] = tokens[key].replace(HTML_REGEX, "")),
  );
  return tokens;
};

export const removeExtraneousWhitespacesFromString = (string: string) => {
  if (!string) {
    return "";
  }

  return string.replace(/\s+/g, " ").trim();
};

export const cleanupArray = (array: string[]) => {
  if (!array) {
    return [];
  }

  return array.filter((n) => removeExtraneousWhitespacesFromString(n));
};

export type SpecialBonusLookup = Record<string, Record<string, string>>;

export const resolveSpecialBonusPlaceholders = (
  abilities: Record<string, { dname?: string }>,
  lookup: SpecialBonusLookup,
) => {
  Object.entries(abilities).forEach(([name, ability]) => {
    const values = lookup[name];
    if (!ability.dname || !values) {
      return;
    }

    ability.dname = ability.dname.replace(
      /\{s:([^}]+)\}/g,
      (placeholder, key) => values[key] ?? placeholder,
    );
  });
};
