export const toCamelCase = (value: string) =>
  // @ts-ignore the array index operator will always work
  value.toLowerCase().replace(/(_\w)/g, (str) => str[1].toUpperCase());

export const toCamelCaseKey = (dictionary) => {
  const env = {};
  Object.keys(dictionary).forEach((key) => {
    env[toCamelCase(key)] = dictionary[key];
  });
  return env;
};

// this is intended for use with zod preprocessing
export const asInteger = (a) => {
  const value = parseInt(a, 10);
  return !isNaN(value) ? value : undefined;
};

export const asFloat = (a) => {
  const value = parseFloat(a);
  return !isNaN(value) ? value : undefined;
};
