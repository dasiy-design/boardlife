document.querySelectorAll(".shop-like i").forEach((heart) => {
  heart.addEventListener("click", function () {
    if (this.classList.contains("xi-heart-o")) {
      // 빈 하트 → 채워진 하트
      this.classList.remove("xi-heart-o");
      this.classList.add("xi-heart");
    } else {
      // 채워진 하트 → 빈 하트
      this.classList.remove("xi-heart");
      this.classList.add("xi-heart-o");
    }
  });
});
