
document.addEventListener('DOMContentLoaded', () => {
    const bestRankUl = document.querySelector('#best-ranking .best-rank');
    const originalLis = Array.from(bestRankUl.children);
    const originalCount = originalLis.length;
    const liOuterWidth = originalLis[0].offsetWidth + 0;
    
    // 루프를 위한 복제본 개수: 넉넉하게 3개씩 앞뒤로 추가.
    const clonesToPrepend = 3;
    const clonesToAppend = 3;

    let currentIndex = clonesToPrepend; // 초기 인덱스는 첫 번째 원본 슬라이드 (앞에 붙은 복제본 개수만큼 이동)
    let isTransitioning = false;
    let autoPlayInterval;

    const prevButton = document.querySelector('.nav-button.prev-best');
    const nextButton = document.querySelector('.nav-button.next-best');

    function appendClones() {
        // 뒤에서부터 복사하여 앞에 붙임
        for (let i = 0; i < clonesToPrepend; i++) {
            const cloneIndex = (originalCount - clonesToPrepend + i) % originalCount;
            const clone = originalLis[cloneIndex].cloneNode(true);
            clone.classList.add('clone');
            bestRankUl.prepend(clone);
        }
        // 앞에서부터 복사하여 뒤에 붙임
        for (let i = 0; i < clonesToAppend; i++) {
            const cloneIndex = i % originalCount;
            const clone = originalLis[cloneIndex].cloneNode(true);
            clone.classList.add('clone');
            bestRankUl.append(clone);
        }
        liElements = Array.from(bestRankUl.children);
        updateSliderPosition(true); // 즉시 초기 위치 설정
        updateSlideClasses(); // 클래스 업데이트
    }

    let liElements = [];

    // 슬라이더 위치 업데이트
    function updateSliderPosition(instant = false) {
        if (instant) {
            bestRankUl.style.transition = 'none';
        } else {
            bestRankUl.style.transition = 'transform 0.5s ease-in-out';
        }

        const offset = (liElements.length / 2 - (currentIndex + 0.5)) * liOuterWidth;
        const bestWrapWidth = document.querySelector('.best-wrap').offsetWidth;
        const targetTranslateX = (bestWrapWidth / 2) - (liOuterWidth / 2) - (currentIndex * liOuterWidth);

        bestRankUl.style.transform = `translateX(${targetTranslateX}px)`;

        if (instant) {
            // transitionend 이벤트가 발생하지 않으므로 여기서 isTransitioning을 해제합니다.
            isTransitioning = false; 
        }
    }

    // 슬라이드 클래스 업데이트 (active, prev-slide, next-slide)
    function updateSlideClasses() {
        liElements.forEach((li, index) => {
            li.classList.remove('active', 'prev-slide', 'next-slide');

            // 실제 원본 슬라이드의 인덱스를 계산하여 적용
            // currentIndex는 복제본 포함한 전체 liElements 배열에서의 인덱스
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
        
        // 첫 번째 원본 슬라이드의 인덱스: clonesToPrepend
        // 마지막 원본 슬라이드의 인덱스: clonesToPrepend + originalCount - 1

        if (currentIndex >= originalCount + clonesToPrepend) { // 마지막 원본 슬라이드를 넘어섰을 때
            currentIndex = clonesToPrepend + (currentIndex - (originalCount + clonesToPrepend));
            updateSliderPosition(true); // 첫 번째 원본 슬라이드로 즉시 이동
        } else if (currentIndex < clonesToPrepend) { // 첫 번째 원본 슬라이드 이전으로 넘어섰을 때
            currentIndex = originalCount + clonesToPrepend - (clonesToPrepend - currentIndex);
            updateSliderPosition(true); // 마지막 원본 슬라이드로 즉시 이동
        }
        updateSlideClasses();
    }

    // 자동 재생
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 1500);
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
        updateSliderPosition(true);
        updateSlideClasses();
    });

    // 마우스 오버 시 자동 재생 중지, 벗어나면 다시 시작
    const bestRankingSection = document.getElementById('best-ranking');
    if (bestRankingSection) {
        bestRankingSection.addEventListener('mouseenter', stopAutoPlay);
        bestRankingSection.addEventListener('mouseleave', startAutoPlay);
    }

    // 초기화 함수 호출
    appendClones(); // 루프를 위한 복제본 먼저 추가 및 liElements 업데이트

    // 초기 위치 설정 (즉시)
    updateSliderPosition(true);

    // 자동 재생 시작
    startAutoPlay();
});