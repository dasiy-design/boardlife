const tabSwiper = document.querySelector('.search-tab');
const tabBtn = tabSwiper.querySelectorAll('.tab-button');
// const tabBtnClose = tabBtn.querySelector('.xi-close');


// tabBtnClose.addEventListener('click', function(){
  
//   console.log(tabBtnClose);
//   const pe = tabBtn.parentElement;
//   console.log(pe);
//   pe.remove();
// });

const delItem = (event) => {
  const target = event.target.parentElement;
  console.log(target);
  target.remove();    
};

// tabBtnClose.addEventListener('click', delItem);



tabBtn.forEach(button => {
  button.addEventListener('click', delItem);
});