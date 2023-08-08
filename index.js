import _ from "lodash";

// Функция для получения количества десятичных знаков числа
function getDecimalPlaces(num) {
  const match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) return 0;
  return Math.max(
    0,
    // Количество цифр после десятичной точки.
    (match[1] ? match[1].length : 0) -
      // Корректировка для научной нотации.
      (match[2] ? +match[2] : 0)
  );
}

export default function solution(content) {
  const info = content
    .split("\n")
    .slice(1)
    .map((el) => el.split(";"))
    .slice(0, -1);
  // 1 шаг:
  console.log(`Count: ${info.length}`);

  // 2 шаг:
  const currencyCodes = _.uniq(info.map((el) => el[3]))
    .sort()
    .join(", ");
  console.log(`Currency codes: ${currencyCodes}`);

  // 3 шаг:
  const cost = info.map((el) => +el[4]);
  const minCost = Math.min(...cost);
  const maxCost = Math.max(...cost);
  const minDecimalPlaces = getDecimalPlaces(minCost);
  const maxDecimalPlaces = getDecimalPlaces(maxCost);

  console.log(
    `Cost of currency: Min: ${minCost.toFixed(
      minDecimalPlaces
    )}, Max: ${maxCost.toFixed(maxDecimalPlaces)}`
  );

  // 4 шаг:
  const countInRange = cost.filter(
    (value) => value >= 10 && value <= 30
  ).length;
  console.log(`Count currency between 10 and 30: ${countInRange}`);

  // 5 шаг:
  const usdEurChfCosts = info
    .filter((el) => el[3] === "USD" || el[3] === "EUR" || el[3] === "CHF")
    .map((el) => +el[4]);
  const usdEurChfSum = usdEurChfCosts.reduce((acc, value) => acc + value, 0);
  const usdEurChfMean = usdEurChfSum / usdEurChfCosts.length;
  const usdEurChfMeanFloor = Math.floor(usdEurChfMean);

  console.log(`Arithmetic mean for USD, EUR, CHF is ${usdEurChfMeanFloor}`);
}
