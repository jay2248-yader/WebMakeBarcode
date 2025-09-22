
export const sanitizeInput = (str) => {
  if (typeof str !== "string") return "";
  return str.replace(/['";]/g, "").trim();
};
