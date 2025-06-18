document.addEventListener('DOMContentLoaded', () => {
    const bestRankUl = document.querySelector('#best-ranking .best-rank');
    const originalLis = Array.from(bestRankUl.children);
    const originalCount = originalLis.length;
    let liWidth; // 초기화 시점에 정확히 계산될 예정

    // 이 부분이 중요: 복제본이 추가되기 전 원본 <li>들의 개수와 너비를 먼저 확인하여 디버깅에 활용
    // console.log("Original li count:", originalCount);
    // if (originalLis[0]) {
    //     console.log("Initial li width (before clones):", originalLis[0].offsetWidth);
    // }

    let currentIndex = 0; // 초기값은 0으로 설정하고, appendClones 후 2로 변경
    let isTransitioning = false;
    let autoPlayInterval;

    const prevButton = document.querySelector('.nav-button.prev-best');
    const nextButton = document.querySelector('.nav-button.next-best');

    let liElements = []; // 복제본 포함한 전체 <li> 요소들

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

        // 복제본이 추가되었으므로 전체 슬라이드 업데이트
        liElements = Array.from(bestRankUl.children);
        // 초기 인덱스는 첫 번째 원본 슬라이드 (앞에 2개 복제본이 있으므로 인덱스 2)
        currentIndex = 2; // 여기가 중요!
        // console.log("Total slides with clones:", liElements.length);
        // console.log("Initial currentIndex:", currentIndex);
    }

    // 슬라이더 위치 업데이트
    function updateSliderPosition(instant = false) {
        if (instant) {
            bestRankUl.style.transition = 'none';
        } else {
            bestRankUl.style.transition = 'transform 0.5s ease-in-out';
        }

        // liWidth가 아직 계산되지 않았을 경우를 대비한 방어 코드
        if (!liWidth && liElements[2]) { // liWidth가 없으면 (초기 로딩 시) 첫 번째 원본 li에서 계산
            liWidth = liElements[2].offsetWidth;
            // console.log("Calculated liWidth:", liWidth);
        }

        bestRankUl.style.transform = `translateX(${-currentIndex * liWidth}px)`;
        // console.log(`TranslateX: ${-currentIndex * liWidth}px`);

        if (instant) {
            isTransitioning = false;
        }
    }

    // ... (나머지 JavaScript 코드는 동일) ...

    // 초기화 함수 호출
    appendClones(); // 루프를 위한 복제본 먼저 추가

    // liWidth는 복제본 추가 후 정확히 계산되어야 합니다.
    // liElements[2]는 첫 번째 원본 슬라이드를 가리킵니다.
    if (liElements.length > 2) { // 복제본까지 최소 3개 (앞 복제본, 원본1, 뒤 복제본)
        liWidth = liElements[2].offsetWidth; // 첫 번째 원본 슬라이드의 너비로 기준 잡기
        // console.log("Final calculated liWidth after clones:", liWidth);
        updateSliderPosition(true); // 초기 위치 설정 (즉시)
        updateSlideClasses(); // 초기 클래스 설정
    }

    startAutoPlay(); // 자동 재생 시작 (선택 사항)
});
