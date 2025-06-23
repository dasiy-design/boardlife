// 네비게이션 아이템들 가져오기
const navLinks = document.querySelectorAll(".nav-bar a");

// secondary 색상 정의
const secondaryColor = "#2196F3"; // 원하는 secondary 색상으로 변경
const defaultColor = "#666";

// 각 링크에 클릭 이벤트 추가
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    // 실제 페이지 이동을 방지 (데모 목적)
    if (this.getAttribute("href") === "#") {
      e.preventDefault();
    }

    // 모든 링크에서 active 클래스 제거 및 기본 색상으로 변경
    navLinks.forEach((l) => {
      l.classList.remove("active");
      l.style.color = defaultColor;
      const icon = l.querySelector("i");
      if (icon) icon.style.color = defaultColor;
    });

    // 클릭된 링크에 active 클래스 추가 및 secondary 색상 적용
    this.classList.add("active");
    this.style.color = secondaryColor;
    const activeIcon = this.querySelector("i");
    if (activeIcon) activeIcon.style.color = secondaryColor;

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
  
  // 먼저 모든 링크를 기본 색상으로 설정
  navLinks.forEach((link) => {
    link.style.color = defaultColor;
    const icon = link.querySelector("i");
    if (icon) icon.style.color = defaultColor;
  });
  
  // 현재 페이지에 해당하는 링크 활성화
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.style.color = secondaryColor;
      const activeIcon = link.querySelector("i");
      if (activeIcon) activeIcon.style.color = secondaryColor;
    }
  });
});

// 터치 디바이스 지원
navLinks.forEach((link) => {
  link.addEventListener("touchstart", function () {
    if (!this.classList.contains("active")) {
      this.style.backgroundColor = "#f0f0f0";
    }
  });

  link.addEventListener("touchend", function () {
    setTimeout(() => {
      if (!this.classList.contains("active")) {
        this.style.backgroundColor = "";
      }
    }, 200);
  });
});