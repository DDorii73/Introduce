// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 애니메이션
    initScrollAnimation();
    
    // 스크롤 투 탑 버튼
    initScrollTopButton();
    
    // 네비게이션 활성화
    initNavigation();
    
    // 부드러운 스크롤
    initSmoothScroll();
    
    // 인트로 섹션 애니메이션
    initIntroAnimation();
});

// 스크롤 애니메이션 초기화
function initScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    
    // Intersection Observer 옵션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Intersection Observer 생성
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 각 섹션 관찰 시작
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 스크롤 투 탑 버튼 초기화
function initScrollTopButton() {
    const scrollTopButton = document.getElementById('scrollTop');
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    // 버튼 클릭 이벤트
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 네비게이션 활성화 초기화
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', function() {
        let current = '';
        
        // 현재 보이는 섹션 찾기
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        // 네비게이션 링크 활성화
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// 부드러운 스크롤 초기화
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 인트로 섹션 애니메이션 초기화
function initIntroAnimation() {
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
        introSection.style.opacity = '1';
    }
}

// 페이지 로드 시 첫 번째 섹션에 visible 클래스 추가
window.addEventListener('load', function() {
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.classList.add('visible');
    }
});

