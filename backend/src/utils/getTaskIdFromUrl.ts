
export const getTaskIdFromUrl = (req: Request): number | null => {
  const id = req
    .url
    .split("/")
    .pop();
  return id && !isNaN(Number(id)) ? Number(id) : null;
};
