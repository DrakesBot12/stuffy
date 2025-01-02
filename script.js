const screenTextsParts = document.querySelectorAll('.text-parts');
const leftImg = document.querySelector('.left-img');
const rightImg = document.querySelector('.right-img');
const leftText = document.querySelector('.left-text');
const rightText = document.querySelector('.right-text');

function handleMouseEvent(part, isEnter) {
    const isLeft = part.classList.contains('screen-container__left');
    const [activeImg, inactiveImg] = isLeft ? [leftImg, rightImg] : [rightImg, leftImg];
    const activeText = isLeft ? leftText : rightText;

    activeImg.style.transform = `scale(${isEnter ? 1.05 : 1})`;
    activeImg.style.filter = `saturate(${isEnter ? 150 : 100}%)`;
    inactiveImg.style.filter = `saturate(${isEnter ? 50 : 100}%)`;
    
    activeText.classList.toggle('white-stroke_hover', isEnter);
}

function setupTransitions() {
    [
        ...screenTextsParts,
        leftImg,
        rightImg,
        leftText,
        rightText
    ].forEach(el => el?.style.setProperty('transition', 'all 0.3s ease'));
}

function setupEventListeners() {
    ['left', 'right'].forEach(side => {
        const part = document.querySelector(`.screen-container__${side}`);
        if (part) {
            ['mouseenter', 'mouseleave'].forEach(event => {
                part.addEventListener(event, () => handleMouseEvent(part, event === 'mouseenter'));
            });
        }
    });
}

setupTransitions();
setupEventListeners();

if (window.location.pathname.endsWith('gallery_stills.html') || window.location.pathname.endsWith('gallery_animation.html')) {
    const PAGE_CONFIG = {
        stills: {
            id: 'contents-s',
            folder: 'stills',
            extension: 'webp'
        },
        animations: {
            id: 'contents-a',
            folder: 'animations',
            extension: 'webm'
        }
    };

    const isStillsPage = window.location.pathname.endsWith('gallery_stills.html');
    const pageType = isStillsPage ? 'stills' : 'animations';
    const { id, folder, extension } = PAGE_CONFIG[pageType];
    const contentDiv = document.getElementById(id);

    if (!contentDiv) {
        console.error(`Container with id "${id}" not found`);
    }

    const createMediaElement = (src, index) => {
        const element = document.createElement(isStillsPage ? 'img' : 'video');
        const commonProps = {
            src,
            className: 'stills_img',
            alt: `media ${index}`,
            loading: 'lazy'
        };

        Object.assign(element, commonProps);

        if (!isStillsPage) {
            Object.assign(element, {
                autoplay: true,
                loop: true,
                muted: true,
                playsInline: true,
                controls: false
            });
        }

        return element;
    };

    const generateRandomNumbers = (count, max) => {
        const numbers = new Set();
        const maxAttempts = max * 2;
        let attempts = 0;

        while (numbers.size < count && attempts < maxAttempts) {
            numbers.add(Math.floor(Math.random() * max) + 1);
            attempts++;
        }

        return Array.from(numbers);
    };

    const loadMedia = async () => {
        const TOTAL_MEDIA_COUNT = 49;
        const BATCH_SIZE = 5;
        const randomNumbers = generateRandomNumbers(TOTAL_MEDIA_COUNT, TOTAL_MEDIA_COUNT);

        for (let i = 0; i < randomNumbers.length; i += BATCH_SIZE) {
            const batch = randomNumbers.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(async (num) => {
                const mediaSrc = `/src/${folder}/${num}.${extension}`;
                try {
                    const response = await fetch(mediaSrc, { method: 'HEAD' });
                    if (response.ok) {
                        const mediaElement = createMediaElement(mediaSrc, num);
                        contentDiv.appendChild(mediaElement);
                    }
                } catch (error) {
                    console.error(`Failed to load media ${num}:`, error);
                }
            }));
        }
    };

    loadMedia().catch(error => {
        console.error('Failed to load media gallery:', error);
    });
}