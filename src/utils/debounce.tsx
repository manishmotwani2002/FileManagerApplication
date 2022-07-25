// export const debounce = (func: any, wait: number) => {
//   let timeout: any;
//   return (val: any) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(val), wait);
//   };
// };

// export const debounce = (func:any, delay:number) => {
//   let debounceTimer:any
//   return function() {
//       const context = this
//       const args = arguments
//           clearTimeout(debounceTimer)
//               debounceTimer
//           = setTimeout(() => func.apply(this, args), delay)
//   }
// }

export const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
