export function launchModal(whichModal) {
  document.body.style.overflowY = 'hidden';

  whichModal.classList.add('open');
  const input = whichModal.querySelector('input');

  if (input) input.focus();
  whichModal
    .querySelector('.btn')
    .addEventListener('click', closeModal.bind(whichModal));

  document.documentElement.addEventListener(
    'keyup',
    closeModalByEsc.bind(whichModal),
  );
}

function closeModalByEsc(e) {
  if (e.key === 'Escape') closeModal.apply(this);
}
// debounce
export function closeModal(e) {
  console.log(e, this);
  this.classList.remove('open');
  document.body.style.overflowY = 'auto';
  if (e) e.currentTarget.removeEventListener('click', closeModal);
  document.documentElement.removeEventListener('keyup', closeModalByEsc);
}
