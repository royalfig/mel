export function upButtonHandler() {
  const upButton = document.querySelector('.mel-up-button');
  document.addEventListener('scroll', (e) => {
    const scrollPos = window.scrollY;
    const scrollHeight = document.body.clientHeight;

    if (scrollPos / scrollHeight > 0.15) {
      upButton.classList.add('mel-show-up-button');
    } else {
      upButton.classList.remove('mel-show-up-button');
    }
  });

  upButton.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });
}
