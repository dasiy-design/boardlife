







// Best ranking
document.addEventListener('DOMContentLoaded', () => {
    const bestRankUl = document.querySelector('#best-ranking .best-rank');
    const originalLis = Array.from(bestRankUl.children); // 원본 <li> 요소들
    const originalCount = originalLis.length; // 원본 <li> 개수
    let liWidth = originalLis[0].offsetWidth; // 각 <li>의 너비 (border, padding 포함)
    let currentIndex = 0; // 현재 활성화된 슬라이드 인덱스 (0부터 시작)
    let isTransitioning = false; // 전환 중인지 여부
    let autoPlayInterval; // 자동 재생 인터벌 ID

    const prevButton = document.querySelector('.nav-button.prev-best');
    const nextButton = document.querySelector('.nav-button.next-best');

    // 루프를 위한 복제본 생성 및 추가 (양쪽에 2개씩 추가하여 부드러운 루프 구현)
    function appendClones() {
        // 뒤에서 2개 복사하여 앞에 붙임
        for (let i = 0; i < 2; i++) {
            const clone = originalLis[originalCount - 2 + i].cloneNode(true);
            clone.classList.add('clone');
            bestRankUl.prepend(clone);
        }
        // 앞에서 2개 복사하여 뒤에 붙임
        for (let i = 0; i < 2; i++) {
            const clone = originalLis[i].cloneNode(true);
            clone.classList.add('clone');
            bestRankUl.append(clone);
        }
        // 복제본 포함한 전체 슬라이드 업데이트
        liElements = Array.from(bestRankUl.children);
        // 초기 인덱스는 첫 번째 원본 슬라이드 (앞에 2개 복제본이 있으므로 인덱스 2)
        currentIndex = 2;
        updateSliderPosition(true); // 즉시 초기 위치 설정
        updateSlideClasses(); // 클래스 업데이트
    }

    let liElements = []; // 복제본 포함한 전체 <li> 요소들

    // 슬라이더 위치 업데이트
    function updateSliderPosition(instant = false) {
        if (instant) {
            bestRankUl.style.transition = 'none'; // 즉시 이동 시 전환 효과 제거
        } else {
            bestRankUl.style.transition = 'transform 0.5s ease-in-out'; // 전환 효과 적용
        }

        // 현재 인덱스에 맞춰 translateX 값 계산
        // - (currentIndex * liWidth) 만큼 이동하여 해당 슬라이드를 중앙으로
        // + liWidth / 2 로 슬라이드의 중심이 ul의 중심에 오도록
        // - (bestRankUl.offsetWidth / 2) + (liWidth / 2)
        // 위 코드는 ul이 best-wrap 내에서 왼쪽으로 정렬되어 있을 때 사용됩니다.
        // 현재 ul은 left: 50%; transform: translateX(-50%)로 중앙 정렬되어 있으므로,
        // 단순히 -currentIndex * liWidth 만으로 이동합니다.
        bestRankUl.style.transform = `translateX(${-currentIndex * liWidth}px)`;

        // 즉시 이동 시에는 즉시 isTransitioning 해제
        if (instant) {
            isTransitioning = false;
        }
    }

    // 슬라이드 클래스 업데이트 (active, prev-slide, next-slide)
    function updateSlideClasses() {
        liElements.forEach((li, index) => {
            li.classList.remove('active', 'prev-slide', 'next-slide');

            if (index === currentIndex) {
                li.classList.add('active');
            } else if (index === currentIndex - 1) {
                li.classList.add('prev-slide');
            } else if (index === currentIndex + 1) {
                li.classList.add('next-slide');
            }
        });
    }

    // 다음 슬라이드로 이동
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateSliderPosition();
    }

    // 이전 슬라이드로 이동
    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateSliderPosition();
    }

    // 전환 완료 이벤트 핸들러
    function handleTransitionEnd() {
        isTransitioning = false;
        
        // 마지막 복제 슬라이드 (마지막 원본 뒤의 첫 번째 복제본)에 도달했을 때
        // 총 슬라이드 개수는 originalCount (원본) + 4 (복제본)
        // 인덱스는 0부터 시작하므로, 마지막 복제본은 totalSlides - 2
        // 실제 원본 슬라이드 범위는 인덱스 2 부터 originalCount + 1 까지
        const totalSlidesWithClones = liElements.length;
        
        if (currentIndex >= totalSlidesWithClones - 2) { // 마지막 원본 슬라이드를 넘어섰을 때
            currentIndex = originalCount - (totalSlidesWithClones - currentIndex) + 2; // 원본 인덱스 2부터 originalCount까지
            updateSliderPosition(true); // 첫 번째 원본 슬라이드로 즉시 이동
        }
        // 첫 번째 복제 슬라이드 (첫 번째 원본 앞의 마지막 복제본)에 도달했을 때
        else if (currentIndex < 2) { // 첫 번째 원본 슬라이드 이전으로 넘어섰을 때
            currentIndex = originalCount - (2 - currentIndex) + 2; // 원본 인덱스 2부터 originalCount까지
            updateSliderPosition(true); // 마지막 원본 슬라이드로 즉시 이동
        }
        updateSlideClasses();
    }

    // 자동 재생 (선택 사항)
    function startAutoPlay() {
        stopAutoPlay(); // 기존 인터벌 정리
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 2000); // 2초마다 슬라이드 전환
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 이벤트 리스너 연결
    bestRankUl.addEventListener('transitionend', handleTransitionEnd);
    if (nextButton) nextButton.addEventListener('click', nextSlide);
    if (prevButton) prevButton.addEventListener('click', prevSlide);

    // 윈도우 크기 변경 시 슬라이드 너비 재계산 및 위치 조정
    window.addEventListener('resize', () => {
        if (originalLis[0]) {
            liWidth = originalLis[0].offsetWidth; // 현재 <li>의 너비 다시 계산
            updateSliderPosition(true); // 슬라이더 위치 초기화 (트랜지션 없이)
            updateSlideClasses(); // 클래스 업데이트
        }
    });

    // 마우스 오버 시 자동 재생 중지, 벗어나면 다시 시작
    const bestRankingSection = document.getElementById('best-ranking');
    if (bestRankingSection) {
        bestRankingSection.addEventListener('mouseenter', stopAutoPlay);
        bestRankingSection.addEventListener('mouseleave', startAutoPlay);
    }

    // 초기화 함수 호출
    appendClones(); // 루프를 위한 복제본 먼저 추가

    // liWidth는 복제본 추가 후 정확히 계산될 수 있도록 초기화 시점 조정
    // `offsetWidth`는 border, padding을 포함한 요소의 너비를 반환합니다.
    if (liElements.length > 0) {
        liWidth = liElements[2].offsetWidth; // 복제본 제외, 첫 번째 원본 슬라이드의 너비
        updateSliderPosition(true); // 초기 위치 설정 (즉시)
    }

    startAutoPlay(); // 자동 재생 시작 (선택 사항)
});
