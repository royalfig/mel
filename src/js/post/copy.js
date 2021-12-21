export function copyHandler() {
  function copy(e) {
    const btn = e.currentTarget;
    const input = document.createElement('input');
    input.value = btn.dataset.url;
    document.documentElement.append(input);
    input.select();
    document.execCommand('copy');

    input.remove();
    btn.classList.add('mel-copied-success');
    const interval = setTimeout(
      () => btn.classList.remove('mel-copied-success'),
      5000,
    );
    console.log('copied');
  }

  const copyBtn = document.querySelector('#copy-button');

  copyBtn.addEventListener('click', copy);
}
