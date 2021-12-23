export function toc() {
  const headings = document.querySelectorAll(
    '.post h2, .post h3, .post h4, .post h5, .post h6',
  );

  if (headings.length > 2) {
    const post = document.querySelector('.mel-post__item');
    const details = document.createElement('details');
    details.setAttribute('class', 'mel-toc__content');
    const summary = document.createElement('summary');
    summary.innerHTML = '<strong>What&apos;s Inside</strong>';
    details.append(summary);

    headings.forEach((el) => {
      const p = document.createElement('p');
      p.setAttribute('class', 'toc-' + el.tagName.toLocaleLowerCase());
      const a = document.createElement('a');
      a.setAttribute('class', 'mel-toc__link');

      a.textContent = el.textContent;
      a.href = '#' + el.id;
      p.append(a);
      details.append(p);
    });

    post.prepend(details);
  }
}
