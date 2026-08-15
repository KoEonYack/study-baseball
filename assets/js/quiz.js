/**
 * 퀴즈 엔진.
 *
 * <div data-quiz="rules"></div> 형태로 두면 quiz-data.js의 해당 문제 묶음을 렌더링한다.
 * 선택지는 매번 섞어서 보여주므로 정답 위치를 외울 수 없다.
 */

import { QUIZZES } from "../data/quiz-data.js";

const KEYS = ["A", "B", "C", "D", "E"];

/** 배열을 복사해 섞는다 */
function shuffled(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setUp(root) {
  const quiz = QUIZZES[root.dataset.quiz];
  if (!quiz) return;

  let order = [];
  let index = 0;
  let correct = 0;
  let answered = false;

  const prepare = () => {
    order = quiz.questions.map((question) => {
      const paired = question.choices.map((text, i) => ({ text, isAnswer: i === question.answer }));
      return { ...question, shuffledChoices: shuffled(paired) };
    });
    index = 0;
    correct = 0;
  };

  const renderResult = () => {
    const total = order.length;
    const ratio = correct / total;
    const comment =
      ratio === 1
        ? "완벽합니다. 이 부분은 더 볼 게 없습니다."
        : ratio >= 0.6
          ? "잘 하고 있습니다. 틀린 문제만 위로 올라가 다시 읽어보세요."
          : "괜찮습니다. 처음엔 다 그렇습니다. 위 내용을 한 번 더 훑고 다시 풀어보세요.";

    root.innerHTML = `
      <div class="quiz__result">
        <p class="quiz__score">${correct} / ${total}</p>
        <p>${comment}</p>
        <button class="btn btn--primary" type="button" data-quiz-restart>다시 풀기</button>
      </div>
    `;
    root.querySelector("[data-quiz-restart]").addEventListener("click", () => {
      prepare();
      renderQuestion();
    });
  };

  const renderQuestion = () => {
    answered = false;
    const question = order[index];

    root.innerHTML = `
      <div class="quiz__head">
        <h3>${quiz.title}</h3>
        <span class="quiz__counter">${index + 1} / ${order.length}</span>
      </div>
      <p class="quiz__question">${question.q}</p>
      <div class="quiz__choices" data-quiz-choices></div>
      <div data-quiz-feedback></div>
      <div class="quiz__foot" data-quiz-foot></div>
    `;

    const choicesEl = root.querySelector("[data-quiz-choices]");
    const feedbackEl = root.querySelector("[data-quiz-feedback]");
    const footEl = root.querySelector("[data-quiz-foot]");

    question.shuffledChoices.forEach((choice, i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz__choice";
      button.innerHTML = `<span class="quiz__choice-key">${KEYS[i]}</span><span>${choice.text}</span>`;

      button.addEventListener("click", () => {
        if (answered) return;
        answered = true;

        if (choice.isAnswer) correct += 1;

        Array.from(choicesEl.children).forEach((node, nodeIndex) => {
          node.disabled = true;
          if (question.shuffledChoices[nodeIndex].isAnswer) node.classList.add("is-correct");
        });
        if (!choice.isAnswer) button.classList.add("is-wrong");

        feedbackEl.innerHTML = `
          <div class="quiz__feedback" data-result="${choice.isAnswer ? "correct" : "wrong"}">
            <b>${choice.isAnswer ? "정답입니다" : "아쉽네요"}</b>
            ${question.why}
          </div>
        `;

        const next = document.createElement("button");
        next.type = "button";
        next.className = "btn btn--primary";
        next.textContent = index + 1 < order.length ? "다음 문제" : "결과 보기";
        next.addEventListener("click", () => {
          index += 1;
          if (index < order.length) renderQuestion();
          else renderResult();
        });
        footEl.append(next);
        next.focus();
      });

      choicesEl.append(button);
    });
  };

  prepare();
  renderQuestion();
}

document.querySelectorAll("[data-quiz]").forEach(setUp);
