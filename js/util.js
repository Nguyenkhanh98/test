const gcd = (a, b) => {
  if (a === 0) { return b; }
  return gcd(b % a, a);
};

const lcm = (a, b) => (a / gcd(a, b)) * b;

const lowestFraction = (num, den) => {
  const commonFactor = gcd(den, num);
  return {
    den: parseInt(den / commonFactor, 10),
    num: parseInt(num / commonFactor, 10),
  };
};

const randomMinCD = (x, min) => {
  const listCD = [];

  for (let i = min; i < x; i++) {
    if (x % i === 0) listCD.push(i);
  }
  return listCD[Math.floor(Math.random() * listCD.length)];
};

function numToSSColumn(num) {
  let s = ''; let
    t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = (num - t) / 26 | 0;
  }
  return s || undefined;
}

const separateNumber = (number) => {
  let num1;

  let ratio;

  if (number % 5 === 0) {
    ratio = 5;
  } else if (number % 3 === 0) {
    ratio = 3;
  } else if (number % 2 === 0) {
    ratio = 2;
  }

  if (ratio) {
    const k = Math.floor(Math.random() * (Math.floor(number / ratio) - 2) + 1);
    num1 = ratio * k;

    if (num1 > MAX_NUMBER / 2) {
      num1 = number - num1;
    }
  } else {
    num1 = Math.floor(Math.random() * (number - 2) + 1);
  }
  const lowest = lowestFraction(num1, number - num1);

  if (lowest.den > 10 || lowest.num > 10) {
    return separateNumber(number);
  }

  return [num1, number - num1];
};

const randomFalseResult = (exceptValue, max, min) => {
  const falseResult = Math.floor(Math.random() * (max - min) + min);

  return falseResult === exceptValue ? randomFalseResult(exceptValue, max, min) : falseResult;
};

class Fraction {
  constructor(_numberator, _denominator) {
    if (_numberator && _denominator) {
      const { num, den } = lowestFraction(_numberator, _denominator);
      this.numberator = num;
      this.denominator = den;
    } else {
      this.numberator = 0;
      this.denominator = 1;
    }
  }

  print() {
    console.log(`${this.numberator}/${this.denominator}`);
  }

  get fraction() {
    return {
      numberator: this.numberator,
      denominator: this.denominator,
    };
  }

  setFraction(fraction) {
    this.numberator = fraction.numberator;
    this.denominator = fraction.denominator;
    return this;
  }

  add(numAdd, denAdd) {
    let denResult = gcd(denAdd, this.denominator);
    denResult = (denAdd * this.denominator) / denResult;
    const numResult = ((numAdd) * (denResult / denAdd)
     + (this.denominator) * (denResult / this.denominator));

    const { num, den } = lowestFraction(numResult, denResult);

    this.denominator = num;
    this.denominator = den;
    return this;
  }

  subtract(numValue, denValue) {
    let denResult = gcd(denValue, this.denominator);
    denResult = (denValue * this.denominator) / denResult;

    const numResult = ((this.denominator) * (denResult / this.denominator)
    - (numValue) * (denResult / denValue));

    const { num, den } = lowestFraction(numResult, denResult);

    this.numberator = num;
    this.denominator = den;
    return this;
  }

  divide(numValue, denValue) {
    const denResult = this.denominator * numValue;
    const numResult = this.numberator * denValue;

    const { num, den } = lowestFraction(numResult, denResult);
    this.numberator = num;
    this.denominator = den;
    return this;
  }
}
