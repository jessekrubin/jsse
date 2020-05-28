export const camel2snake = (str: string) => {
  return str[0].toLowerCase() + str.slice(1, str.length)
    .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};
