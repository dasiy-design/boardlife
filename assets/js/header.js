// document.addEventListener('DOMContentLoaded', function() {
//     const menuIcon = document.querySelector('.menu-icon');
//     const tabMenu = document.querySelector('.tab-menu');
//     const closeIcon = document.querySelector('.xi-close');
//     const dimmedOverlay = document.querySelector('.dimmed-overlay'); // 추가: 딤드 오버레이 요소 선택

//     // 햄버거 메뉴 아이콘 클릭 시 탭 메뉴 열기
//     if (menuIcon) {
//         menuIcon.addEventListener('click', function() {
//             if (tabMenu) {
//                 tabMenu.classList.add('active');
//                 document.body.classList.add('menu-open');
//                 if (dimmedOverlay) { // 딤드 오버레이 활성화
//                     dimmedOverlay.classList.add('active');
//                 }
//             }
//         });
//     }

//     // 닫기 버튼 클릭 시 탭 메뉴 닫기
//     if (closeIcon) {
//         closeIcon.addEventListener('click', function() {
//             if (tabMenu) {
//                 tabMenu.classList.remove('active');
//                 document.body.classList.remove('menu-open');
//                 if (dimmedOverlay) { // 딤드 오버레이 비활성화
//                     dimmedOverlay.classList.remove('active');
//                 }
//             }
//         });
//     }

//     // 메뉴 바깥 영역 클릭 시 메뉴 닫기 (딤드 오버레이 포함)
//     document.addEventListener('click', function(e) {
//         // 클릭한 요소가 메뉴 아이콘, 탭 메뉴 내부, 딤드 오버레이 자체가 아닌 경우
//         // 또는 딤드 오버레이가 클릭되었을 때 메뉴 닫기
//         if (tabMenu && tabMenu.classList.contains('active')) { // 메뉴가 열려있을 때만
//             if (e.target === dimmedOverlay || (!menuIcon.contains(e.target) && !tabMenu.contains(e.target) && !dimmedOverlay.contains(e.target))) {
//                 tabMenu.classList.remove('active');
//                 document.body.classList.remove('menu-open');
//                 if (dimmedOverlay) {
//                     dimmedOverlay.classList.remove('active');
//                 }
//             }
//         }
//     });

//     // --- 서브메뉴 토글 기능 (이전과 동일) ---
//     const toggleIcons = document.querySelectorAll('.toggle-submenu-icon');
//     toggleIcons.forEach(function(icon) {
//         icon.addEventListener('click', function(e) {
//             e.preventDefault();
//             const menuItem = this.closest('.menu-item');
//             const submenu = menuItem.querySelector('.submenu');
//             if (submenu) {
//                 if (!submenu.classList.contains('active')) {
//                     const allSubmenus = document.querySelectorAll('.submenu.active');
//                     const allIcons = document.querySelectorAll('.toggle-submenu-icon.active');
//                     allSubmenus.forEach(function(menu) {
//                         menu.classList.remove('active');
//                     });
//                     allIcons.forEach(function(otherIcon) {
//                         otherIcon.classList.remove('active');
//                         otherIcon.classList.remove('xi-minus');
//                         otherIcon.classList.add('xi-plus');
//                     });
//                 }
//                 submenu.classList.toggle('active');
//                 this.classList.toggle('active');
//                 if (submenu.classList.contains('active')) {
//                     this.classList.remove('xi-plus');
//                     this.classList.add('xi-minus');
//                 } else {
//                     this.classList.remove('xi-minus');
//                     this.classList.add('xi-plus');
//                 }
//             }
//         });
//     });

//     // --- 메뉴 카테고리 클릭 시 서브메뉴 토글 (이전과 동일) ---
//     const menuCategories = document.querySelectorAll('.menu-category');
//     menuCategories.forEach(function(category) {
//         category.addEventListener('click', function(e) {
//             const menuItem = this.closest('.menu-item');
//             const toggleIcon = menuItem.querySelector('.toggle-submenu-icon');
//             if (toggleIcon) {
//                 toggleIcon.click();
//             }
//         });
//     });
// })

document.addEventListener, function(){
    음 모르겠다
}