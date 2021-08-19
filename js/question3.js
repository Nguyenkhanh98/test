const MAX_MUTIPLES = 10;
const MAX_NUMBER = 100;

const generateQuestion = (counter = 1) => {
  if (counter === 0) {
    return null;
  }

  let first = {};
  const used = {};

  first.ratioBlackToWhite = lowestFraction(1, Math.floor(Math.random() * 4 + 2));
  first.minUnits = first.ratioBlackToWhite.num + first.ratioBlackToWhite.den;
  let randomCM = Math.floor((MAX_NUMBER + counter) / (first.minUnits));

  if (randomCM % 2 !== 0) {
    randomCM -= 1;
  }

  first = {
    ...first,
    totalBeads: randomCM * first.minUnits,
    totalBlack: randomCM,
    totalWhite: first.ratioBlackToWhite.den * randomCM,
  };

  const minBlackCD = randomMinCD(first.totalBlack, Math.ceil(first.totalBlack / MAX_MUTIPLES));
  const randomUseBlackRatio = lowestFraction(
    minBlackCD,
    first.totalBlack,
  );

  used.BlackRatio = lowestFraction(
    Math.floor(Math.random() * (randomUseBlackRatio.den - 2) + 1),
    randomUseBlackRatio.den,
  );
  const minWhiteCD = randomMinCD(first.totalWhite, Math.ceil(first.totalWhite / MAX_MUTIPLES));
  const randomUseWhiteRatio = lowestFraction(
    minWhiteCD,
    first.totalWhite,
  );

  used.WhiteRatio = lowestFraction(
    Math.floor(Math.random() * (randomUseWhiteRatio.den - 2) + 1),
    randomUseWhiteRatio.den,
  );

  used.lcm = lcm(used.BlackRatio.den, used.WhiteRatio.den);
  const totalUnits = used.lcm * first.minUnits;

  first.blackUnits = totalUnits / first.minUnits;
  first.whiteUnits = first.blackUnits * first.ratioBlackToWhite.den;

  used.blackUnits = (used.BlackRatio.num * first.blackUnits) / used.BlackRatio.den;
  used.WhiteUnits = (used.WhiteRatio.num * first.whiteUnits) / used.WhiteRatio.den;
  used.totalUnits = used.blackUnits + used.WhiteUnits;

  const fractionBeadUsed = lowestFraction(used.blackUnits + used.WhiteUnits, totalUnits);
  used.fraction = fractionBeadUsed;

  const fractionBeadLeft = new Fraction(1, 1);
  fractionBeadLeft.subtract(fractionBeadUsed.num, fractionBeadUsed.den);

  const totalBeadLeft = first.totalBeads
  - ((used.BlackRatio.num * first.totalBlack) / used.BlackRatio.den)
  - ((used.WhiteRatio.num * first.totalWhite) / used.WhiteRatio.den);

  return {
    first,
    randomCM,
    used,
    totalUnits,
    fractionBeadLeft: fractionBeadLeft.fraction,
    totalBeadLeft,
    beadPerUnit: totalBeadLeft / fractionBeadLeft.fraction.numberator,
  };
};

const container = document.getElementById('main');

for (let i = 1; i <= 20; i++) {
  const data = generateQuestion(i);
  const {
    first,
    beadPerUnit,
    used,
    totalUnits,
    fractionBeadLeft,
    totalBeadLeft,
  } = data;

  console.log(data);
  const question = `<article class="main__question">
<header>
    <h5>
        Question ${i}
    </h5>
</header>

<section>
    <article class="main__question__description">
        <div>
            A box contained black beads and white beads. At first, the number of black beads was 
            ${first.ratioBlackToWhite.num}/${first.ratioBlackToWhite.den} of
            the number of white beads. After ${used.BlackRatio.num}/${used.BlackRatio.den} of the black beads and
             ${used.WhiteRatio.num}/${used.WhiteRatio.den} of the white beads were
            used, ${totalBeadLeft} were left.
        </div>

        <section>
            a) What fraction of the beads were used? Leave your answer in the simplest form.

        </section>
        <section>
            b) How many beads were there in the box at first?
        </section>
    </article>

    <article class="main__question__description">
        <header>
            <h6>
                Worked solution:
            </h6>
        </header>

        <section class="main__question__description__step">
            <article>
                <header class="main__question__description__step__header--padding">
                    a)
                </header>
                <section>
                    <header>
                        Total number of units = ${first.minUnits} x ${used.lcm} = ${totalUnits}
                    </header>
                    <article class ="steps">
                        <header>
                            Before:
                        </header>
                        <div>
                            Number of units of black beads = ${totalUnits} ÷ ${first.minUnits} = ${first.blackUnits}
                        </div>
                        <div>
                        Number of units of white beads = ${first.blackUnits} x ${first.ratioBlackToWhite.den} = ${first.whiteUnits}
                        </div>
                    </article>

                    <article  class ="steps">
                        <header>
                            After:
                        </header>
                        <div>
                            Number of units of black beads used = ${used.BlackRatio.num}/${used.BlackRatio.den} x ${first.blackUnits} = ${used.blackUnits}
                        </div>
                        <div>
                        Number of units of white beads used = ${used.WhiteRatio.num}/${used.WhiteRatio.den} x ${first.whiteUnits} = ${used.WhiteUnits}

                        </div>
                        <div>
                            Number of units of beads used = ${used.blackUnits} + ${used.WhiteUnits} = ${used.totalUnits}
                        </div>

                    </article>
                </section>
                <footer>
                    Fraction of the beads that were used =<u><b>${used.fraction.num}/${used.fraction.den}</b></u>
                </footer>
            </article>

            <article>
                <header class="main__question__description__step__header--padding">
                    b)
                </header>
                <section>
                    <div>Fraction of beads left = 1 – ${used.fraction.num}/${used.fraction.den} = ${fractionBeadLeft.numberator}/${fractionBeadLeft.denominator}</div>
                    <div>${fractionBeadLeft.numberator} units = ${totalBeadLeft} beads</div>
                    <div>1 unit = ${totalBeadLeft} beads ÷ ${fractionBeadLeft.numberator} = ${beadPerUnit}  beads</div>
                    <div>${totalUnits} units = ${totalUnits} beads x ${beadPerUnit} = <u><b>${first.totalBeads}</b></u></div>
                </section>
            </article>

        </section>
    </article>

</section>
</article>`;

  container.insertAdjacentHTML('beforeend', question);
}
