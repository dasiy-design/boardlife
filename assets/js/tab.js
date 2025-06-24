// document.addEventListener('DOMContentLoaded', function () {
//   const dropdown = document.getElementById('Dropdown');
//   const dropdownMenu = dropdown.querySelector('.dropdown-menu');
//   const selectedText = dropdown.querySelector('.selected-text');

//   // 드롭다운 토글
//   dropdown.addEventListener('click', (e) => {
//     e.stopPropagation();
//     dropdownMenu.classList.toggle('open');
//   });

//   // 항목 선택 시 텍스트 변경 및 닫기
//   dropdownMenu.querySelectorAll('li').forEach(item => {
//     item.addEventListener('click', (e) => {
//       e.stopPropagation(); // ← 이것도 추가
//       selectedText.textContent = item.textContent;
//       dropdownMenu.classList.remove('open');
//     });
//   });

//   // 외부 클릭 시 닫기
//   document.addEventListener('click', () => {
//     dropdownMenu.classList.remove('open');
//   });
// });