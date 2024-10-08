export const limitText = (text: string, limit: number, suffix: string = "(...)"): string => {
  if (text.length > limit) {
    return text.substring(0, limit) + suffix;
  }
  return text;
};
