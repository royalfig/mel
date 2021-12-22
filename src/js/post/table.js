export function makeTablesResponsive() {
  const tables = document.querySelectorAll('table');
  tables.forEach((el) => {
    const old = el.cloneNode(true);
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'mel-table-wrapper');
    wrapper.append(old);
    el.replaceWith(wrapper);
  });
}
