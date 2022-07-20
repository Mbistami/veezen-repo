export const mergeStyles = (styleArray) =>
  styleArray.map((style) => `${style}`).join(" ");

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getCurrentMonth = (format) =>
  new Date().toLocaleDateString("en-US", { month: format });
