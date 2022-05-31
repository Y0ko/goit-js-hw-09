import Notiflix from 'notiflix';

const refs = {
  formEll: document.querySelector('.form'),
  delayEll: document.querySelector("input[name='delay']"),
  stepEll: document.querySelector("input[name='step']"),
  amountEll: document.querySelector("input[name='amount']"),
};

refs.formEll.addEventListener('submit', onCreateBtnPromise);

function onCreateBtnPromise(e) {
  e.preventDefault();

  let delay = Number(refs.delayEll.value);
  const position = refs.amountEll.value;
  let step = Number(refs.stepEll.value);

  for (let i = 1; i <= position; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
