export default function filterTruthyValues(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
}