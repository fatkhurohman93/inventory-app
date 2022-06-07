export const filterAny = (params: { [Key: string]: any }) => {
  const key = Object.keys(params)[0];
  if (params[key] !== undefined) return { [key]: params[key] };
  else return {};
};
