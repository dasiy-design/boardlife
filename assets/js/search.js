const tabSwiper = document.querySelector('.search-tab');
const tabBtnClose = document.querySelectorAll('.xi-close');
tabBtnClose.forEach((btnClose) => {
  btnClose.addEventListener('click', () => {
    const tabButton = btnClose.closest('.tab-button') || btnClose.parentElement.closest('.tab-button');
    
    if (tabButton) {
      tabButton.classList.add('close');
    }
  });
});