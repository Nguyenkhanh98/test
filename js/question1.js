const MAX_MUTIPLES = 10;
const MAX_NUMBER = 100;

const generateQuestion = (counter = 1) => {
  if (counter === 0) {
    return null;
  }

  if (counter % 2 !== 0) {
    counter += 1;
  }

  const class1 = {};
  const class2 = {};

  const mutiples = lowestFraction(20, counter * 2);

  const randomTotalClass = Math.floor(Math.random() * (MAX_MUTIPLES - 5) + 5) * 10;

  const ratioEachClass = Math.min(
    Math.floor(randomTotalClass / mutiples.num),
    Math.floor(randomTotalClass / mutiples.den),
  );

  const totalClass1 = ratioEachClass * mutiples.num;
  const [totalBoyClass1, totalGirlClass1] = separateNumber(totalClass1);

  class1.boys = totalBoyClass1;
  class1.girls = totalGirlClass1;

  const totalClass2 = ratioEachClass * mutiples.den;

  const [totalBoyClass2, totalGirlClass2] = separateNumber(totalClass2);

  class2.boys = totalBoyClass2;
  class2.girls = totalGirlClass2;

  class1.ratioBoyToGirl = lowestFraction(totalBoyClass1, totalGirlClass1);
  class2.ratioBoyToGirl = lowestFraction(totalBoyClass2, totalGirlClass2);

  const result = totalBoyClass1 + totalBoyClass2;

  const maxBoyRatio = Math.floor(Math.max(totalBoyClass1 / totalGirlClass1,
    totalBoyClass2 / totalGirlClass2));

  const listResult = [];

  for (let i = 0; i < 3; i += 1) {
    const falseResult = randomFalseResult(result, maxBoyRatio, MAX_NUMBER);
    listResult.push(falseResult);
  }

  const randomCorrectPosition = Math.floor(Math.random() * 3);

  listResult.splice(randomCorrectPosition, 0, result);

  return {
    class1,
    class2,
    options: listResult,
    ratioClass1ToClass2: mutiples,
  };
};

const container = document.getElementById('main');

for (let i = 1; i <= 20; i++) {
  const data = generateQuestion(i);
  const {
    class1,
    class2,
    options,
    ratioClass1ToClass2,
  } = data;

  const ratioClass1ToClass2Format = ratioClass1ToClass2.den === 1 ? ratioClass1ToClass2.num : `${ratioClass1ToClass2.num}/${ratioClass1ToClass2.den}`;
  const ratioClass1ToClass2Elm = ratioClass1ToClass2Format === 1 ? 'Pupils in Group B are equal with in Group A'
    : `There are ${ratioClass1ToClass2Format} times as many pupils in Group B as in Group A`;
  let answers = '';

  options.forEach((option, index) => {
    answers += `<li>${numToSSColumn(index + 1)}. ${option}</li>`;
  });

  const question = `<article class = "main__question">
    <header>
        <h5>
            Question ${i}
        </h5>
    </header>

    <section>
        <article class = "main__question__description">
            The pupils at a camp are divided into Group A and Group B. The ratio of the number of boys
            to the girls in Group A is ${class1.ratioBoyToGirl.num} : ${class1.ratioBoyToGirl.den}.
             The ratio of the number of boys to girls in Group B is ${class2.ratioBoyToGirl.num} : ${class2.ratioBoyToGirl.den}.
             ${ratioClass1ToClass2Elm}
            . Which of the following options
            could be the total number of boys in both groups?
        </article>

        <article class = "main__question__description">
            <header>
                <h6>
                    Options:
                </h6>
            </header>
            <section class = "main__question__description__options">
                <ul>${answers}
                </ul>
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
                    Using equivalent ratios, let’s make the number of pupils in Group B to be thrice that of
                    Group A.
                </article>

                <article>
                    <header>
                        Group A:
                    </header>
                    <section>
                        <div>Boys:Girls</div>
                        <div>=${class1.ratioBoyToGirl.num} : ${class1.ratioBoyToGirl.den}</div>
                        <div>=${class1.boys}: ${class1.girls}</div>
                        <div>Total number of units = ${class1.boys} +  ${class1.girls} = ${class1.boys + class1.girls}
                        </div>
                    </section>
                </article>

                <article>
                    <header>
                        Group B:
                    </header>
                    <section>
                        <div>Boys:Girls</div>
                        <div>=${class2.ratioBoyToGirl.num} : ${class2.ratioBoyToGirl.den}</div>
                        <div>=${class2.boys}: ${class2.girls}</div>
                        <div>Total number of units = ${class2.boys} +  ${class2.girls} = ${class2.boys + class2.girls}
                        </div>


                    </section>
                </article>

                <article>
                <div> ${class1.boys + class1.girls} / ${class2.boys + class2.girls} = ${ratioClass1ToClass2Format} </div>

                </article>
            </section>

            <footer>Total number of boys in both groups = ${class1.boys} + ${class2.boys} = <u>${class2.boys + class1.boys}</u> </footer>
        </article>

    </section>
</article>`;

  container.insertAdjacentHTML('beforeend', question);
}
