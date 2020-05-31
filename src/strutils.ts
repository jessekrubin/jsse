export const camel2snake = (str: string) => {
  return str[0].toLowerCase() + str.slice(1, str.length)
    .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

export const pascal2camel = (str: string) => {
    return str[0].toLowerCase() + str.slice(1, str.length);
};

export const snake2camel = (str: string):string =>
    str.toLowerCase().replace(/([-_][a-z])/g, group =>
        group
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
    );
