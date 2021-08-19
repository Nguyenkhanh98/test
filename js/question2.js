const MAX_MUTIPLES = 10;
const MAX_NUMBER = 300;

const generateQuestion = (counter = 1) => {
  if (counter === 0) {
    return null;
  }

  const ratioRedtoBluAtLast = lowestFraction(1, Math.floor(Math.random() * 4) + 1);

  const minCmPercentAllow = ratioRedtoBluAtLast.den * 10;

  const maxRatioPercent = Math.min(Math.floor(100 / minCmPercentAllow), MAX_MUTIPLES - 1);

  const percentBlueLeft = Math.floor(Math.random() * (maxRatioPercent - 1) + 1) * minCmPercentAllow;

  const lowestPercentBlueLeft = lowestFraction(percentBlueLeft, 100);

  const ratioRedtoBlu = lowestFraction(ratioRedtoBluAtLast.num * lowestPercentBlueLeft.num,
    ratioRedtoBluAtLast.den * lowestPercentBlueLeft.den);

  const unitIncludeBlueUsed = ratioRedtoBlu.den + ratioRedtoBlu.num;

  const maxCmOfBead = Math.floor(MAX_NUMBER / unitIncludeBlueUsed);
  const minCmOfBead = Math.ceil(maxCmOfBead / 2);
  const cmOfBead = Math.floor(Math.random() * (maxCmOfBead - minCmOfBead) + minCmOfBead);

  const totalBeadIncludeBlueUsedAtLast = unitIncludeBlueUsed * cmOfBead;
  const redBeadUsed = 40 + counter;
  const totalBeads = redBeadUsed + totalBeadIncludeBlueUsedAtLast;

  const percentBlue = {
    used: {
      num: 100 - percentBlueLeft,
      den: 100,
      lowest: lowestFraction(100 - percentBlueLeft, 100),
    },
    left: lowestPercentBlueLeft,
  };

  return {
    ratioRedtoBluAtLast,
    percentBlue,
    unitIncludeBlueUsed,
    totalBeadIncludeBlueUsedAtLast,
    totalBeads,
    redUsed: totalBeads - totalBeadIncludeBlueUsedAtLast,
  };
};

const container = document.getElementById('main');

for (let i = 1; i <= 20; i++) {
  const data = generateQuestion(i);
  const {
    ratioRedtoBluAtLast,
    percentBlue,
    unitIncludeBlueUsed,
    totalBeadIncludeBlueUsedAtLast,
    totalBeads,
    redUsed,
  } = data;

  const unitsLeft = ratioRedtoBluAtLast.num + ratioRedtoBluAtLast.den;
  const countUnit = totalBeadIncludeBlueUsedAtLast / unitIncludeBlueUsed;

  const question = `
  <article class = "main__question">
            <header>
                <h5>
                    Question ${i}
                </h5>
            </header>

            <section>
                <article class = "main__question__description">
                    <div>
                        Ann had a total of ${totalBeads} red and blue beads. She used ${redUsed} red beads and ${percentBlue.used.num}% of the blue 
                        beads. After that, the ratio of the number of red beads to blue beads Ann had was ${ratioRedtoBluAtLast.num}: ${ratioRedtoBluAtLast.den}.
                    </div>
                    
                    <section>
                        a) What fraction of her blue beads did Ann use? Give your answer in the simplest form. 
                    </section>
                    <section>
                        b) How many beads did Ann have in the end
                    </section>
                </article>

                <article class = "main__question__description">
                    <header>
                        <h6>
                            Worked solution:
                        </h6>
                    </header>

                    <section class = "main__question__description__step">
                        <article >
                            <header class="main__question__description__step__header--padding">
                                a)
                            </header>
                            <section>
                                Fraction of blue beads used = ${percentBlue.used.num}/${percentBlue.used.den} = ${percentBlue.used.lowest.num}/${percentBlue.used.lowest.den}
                            </section>
                        </article>

                        <article>
                            <header class="main__question__description__step__header--padding">
                                b)
                            </header>
                            <section>
                                <div>Fraction of blue beads left = 1 - ${percentBlue.used.lowest.num}/${percentBlue.used.lowest.den} = ${percentBlue.left.num}/${percentBlue.left.den}</div>
                                <div>Total number of units in the end = ${ratioRedtoBluAtLast.num} + ${ratioRedtoBluAtLast.den}= ${unitsLeft}</div>
                                <div>${unitIncludeBlueUsed} units = ${totalBeads} – ${redUsed} = ${totalBeadIncludeBlueUsedAtLast}</div>
                                <div>1 unit = ${totalBeadIncludeBlueUsedAtLast} ÷ ${unitIncludeBlueUsed} = ${totalBeadIncludeBlueUsedAtLast / unitIncludeBlueUsed}</div>
                                <div>${unitsLeft} units = ${countUnit} x ${unitsLeft} = <u><b>${unitsLeft * countUnit}</b></u></div>
                            </section>
                        </article>

                    </section>
                </article>

            </section>
        </article>

  `;

  container.insertAdjacentHTML('beforeend', question);
}
