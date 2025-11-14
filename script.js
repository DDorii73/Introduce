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
    
    // 프로필 이미지 로딩 처리
    initProfileImage();
});

// 스크롤 애니메이션 초기화
function initScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    
    // Intersection Observer 옵션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Intersection Observer 생성
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 한 번만 실행되도록 관찰 중지
                observer.unobserve(entry.target);
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
    const introSection = document.querySelector('.intro-section');
    
    // 스크롤 이벤트 리스너 (throttle 적용)
    let ticking = false;
    
    function updateActiveSection() {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;
        
        // 인트로 섹션 체크
        if (introSection) {
            const introTop = introSection.offsetTop;
            const introBottom = introTop + introSection.offsetHeight;
            
            if (scrollPosition >= introTop && scrollPosition < introBottom) {
                current = 'intro';
            }
        }
        
        // 다른 섹션들 체크
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // 네비게이션 링크 활성화
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateActiveSection);
            ticking = true;
        }
    });
    
    // 초기 활성화
    updateActiveSection();
}

// 부드러운 스크롤 초기화
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const logoLink = document.querySelector('.logo a');
    
    // 네비게이션 링크 처리
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            let targetSection;
            
            if (targetId === '#intro') {
                targetSection = document.querySelector('.intro-section');
            } else {
                targetSection = document.querySelector(targetId);
            }
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 로고 링크 처리
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const introSection = document.querySelector('.intro-section');
            if (introSection) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // CTA 버튼 처리
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
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

// 프로필 이미지 로딩 초기화
function initProfileImage() {
    const profileImage = document.getElementById('profileImage');
    const profilePlaceholder = document.getElementById('profilePlaceholder');
    
    if (!profileImage || !profilePlaceholder) return;
    
    let triedFormats = [];
    
    // 이미지가 로드되지 않을 경우 여러 형식 시도
    const handleImageError = function() {
        // 여러 형식 시도
        const imageFormats = ['IMG_0308.jpg', 'IMG_0308.JPG', 'IMG_0308.png', 'IMG_0308.PNG', 'IMG_0308.webp', 'IMG_0308.WEBP', 'IMG_0308.HEIC'];
        
        // 현재 시도한 형식 찾기
        const currentSrc = this.src.split('/').pop();
        const currentIndex = imageFormats.findIndex(format => currentSrc === format);
        
        // 다음 형식 시도
        if (currentIndex >= 0 && currentIndex < imageFormats.length - 1) {
            this.src = imageFormats[currentIndex + 1];
        } else {
            // 모든 형식 실패 시 플레이스홀더 표시
            this.style.display = 'none';
            if (profilePlaceholder) {
                profilePlaceholder.style.display = 'flex';
            }
        }
    };
    
    profileImage.addEventListener('error', handleImageError);
    
    // 이미지 로드 성공 시 플레이스홀더 숨김
    profileImage.addEventListener('load', function() {
        if (profilePlaceholder) {
            profilePlaceholder.style.display = 'none';
        }
        this.style.display = 'block';
    });
    
    // 초기 로드 확인 - HEIC는 브라우저에서 지원되지 않을 수 있음
    setTimeout(() => {
        if (!profileImage.complete || profileImage.naturalHeight === 0) {
            // HEIC가 로드되지 않으면 JPG 시도
            if (profileImage.src.includes('.HEIC')) {
                profileImage.src = 'IMG_0308.jpg';
            } else {
                handleImageError.call(profileImage);
            }
        } else {
            if (profilePlaceholder) {
                profilePlaceholder.style.display = 'none';
            }
        }
    }, 100);
}

