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


const contentsDiv = document.getElementById('contents');

for (let i = 1; i <= 30; i++) {
    for (let folder of ['banner', 'poster', 'square']) {
        const img = document.createElement('img');
        img.src = `../src/stills/${folder}/${i}.webp`;
        img.alt = `${folder} ${i}`;
        img.classList.add('stills_img');
        contentsDiv.appendChild(img);
    }
}
