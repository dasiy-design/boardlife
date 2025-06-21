// 네비게이션 아이템들 가져오기
const navLinks = document.querySelectorAll(".nav-bar a");

// 각 링크에 클릭 이벤트 추가
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    // 실제 페이지 이동을 방지 (데모 목적)
    if (this.getAttribute("href") === "#") {
    }

    // 모든 링크에서 active 클래스 제거
    navLinks.forEach((l) => l.classList.remove("active"));

    // 클릭된 링크에 active 클래스 추가
    this.classList.add("active");

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
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

// 터치 디바이스 지원
navLinks.forEach((link) => {
  link.addEventListener("touchstart", function () {
    this.style.backgroundColor = "#bbdefb";
  });

  link.addEventListener("touchend", function () {
    setTimeout(() => {
      if (!this.classList.contains("active")) {
        this.style.backgroundColor = "";
      }
    }, 200);
  });
});
