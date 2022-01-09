export function modalHandler() {
  const openSearch = document.querySelector('#search-open');
  const openMenu = document.querySelector('#menu-open');
  const closeSearch = document.querySelector('#search-close');
  const closeMenu = document.querySelector('#menu-close');

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openedModal = document.querySelector('.mel-overlay.open');
      openedModal.classList.remove('open');
    }
  });

  openSearch.addEventListener('click', launchModal);
  openMenu.addEventListener('click', launchModal);
  closeSearch.addEventListener('click', closeModal);
  closeMenu.addEventListener('click', closeModal);

  function launchModal(e) {
    document.body.style.overflowY = 'hidden';
    const { targetModal } = getTargets(e);
    e.currentTarget.setAttribute('aria-expanded', true);
    targetModal.querySelector('input') &&
      targetModal.querySelector('input').focus();
    targetModal.classList.add('open');
  }

  function closeModal(e) {
    document.body.style.overflowY = 'auto';
    const { targetModal, targetBtn } = getTargets(e);
    targetModal.classList.remove('open');
    targetBtn.setAttribute('aria-expanded', false);
  }

  function getTargets(el) {
    const targetId = el.currentTarget.id;
    const id = targetId.split('-')[0];
    const targetModal = document.querySelector(`#${id}`);
    const targetBtn = document.querySelector(`#${id}-open`);
    return { targetId, targetModal, targetBtn };
  }
}
