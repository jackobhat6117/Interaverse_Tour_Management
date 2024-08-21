export default function filterTruthyValues(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
}

export function filterOutNullValues(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null || value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
}