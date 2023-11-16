export const deserializer = <T>(data: T) => {
  const temp = JSON.parse(data as string) as T;
  return temp;
};