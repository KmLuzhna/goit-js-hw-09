import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const firstDelayInput = document.querySelector('input[name="delay"]');
const delayStepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};


function  addSubmit(event) {
  event.preventDefault();
  let delay = Number(firstDelayInput.value);
  let step = Number(delayStepInput.value)
  let amount = Number(amountInput.value)
  for ( let i = 1; i <= amount; i ++) {
    if ( i > 1){
      delay += step;
    }
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
};
form.addEventListener('submit', addSubmit);
