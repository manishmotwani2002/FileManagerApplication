export const debounce = (func: any, wait: number) => {
  let timeout: any;
  return (val: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(val), wait);
  };
};
