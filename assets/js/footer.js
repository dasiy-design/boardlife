// 네비게이션 아이템들 가져오기
const navLinks = document.querySelectorAll(".nav-bar a");

console.log("발견된 링크 수:", navLinks.length);
navLinks.forEach((link, index) => {
  console.log(`링크 ${index}:`, link.href, "active 클래스:", link.classList.contains('active'));
});

// 각 링크에 클릭 이벤트 추가
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    console.log("클릭된 링크:", this.href);
    
    // 실제 페이지 이동을 방지 (데모 목적)
    if (this.getAttribute("href") === "#") {
      e.preventDefault();
    }

    // 모든 링크에서 active 클래스 제거
    navLinks.forEach((l) => {
      l.classList.remove("active");
      console.log("active 제거:", l.href);
    });

    // 클릭된 링크에 active 클래스 추가
    this.classList.add("active");
    console.log("active 추가:", this.href);

    // 클릭 효과 애니메이션
    this.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.style.transform = "";
    }, 150);
  });
});

// 페이지 로드 시 현재 페이지에 해당하는 링크 활성화
window.addEventListener("load", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  console.log("현재 페이지:", currentPage);
  
  // 먼저 모든 active 클래스 제거
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    console.log("링크 확인:", linkHref, "현재 페이지와 같은가?", linkHref === currentPage);
    
    if (linkHref === currentPage) {
      link.classList.add("active");
      console.log("현재 페이지 링크에 active 추가:", linkHref);
    }
  });
});