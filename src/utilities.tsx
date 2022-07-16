const hasOwn = {}.hasOwnProperty;
export const classNames = function (): string | undefined {
  const classes = [];

  for (
    let i = 0;
    i < arguments.length;
    i++ //IE makes problems here with for (...of...) when there are undefined values
  ) {
    let arg = arguments[i];
    if (!arg) continue;

    let argType = typeof arg;

    if (argType === "string" || argType === "number") classes.push(arg);
    else if (Array.isArray(arg) && arg.length) {
      let inner = classNames.apply(null, arg as any); //recursive call
      if (inner) classes.push(inner);
    } else if (argType === "object") {
      for (let key in arg) if (hasOwn.call(arg, key) && arg[key]) classes.push(key);
    }
  }

  return classes.join(" ") || undefined;
};

export const pick = (arr: any[], amount: number = 1): any[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amount);
};
