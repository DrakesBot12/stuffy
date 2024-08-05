const screenTextsParts = document.querySelectorAll('.text-parts');
const screenContainerImg = document.querySelector('.screen-background');
const leftImg = screenContainerImg.querySelector('.left-img');
const rightImg = screenContainerImg.querySelector('.right-img');
const orangeStroke = document.querySelector('.orange-stroke');
const leftText = document.querySelector('.left-text');
const rightText = document.querySelector('.right-text');

function handleMouseEvent(part, isEnter) {
    const isLeft = part.classList.contains('screen-container__left');
    const activeImg = isLeft ? leftImg : rightImg;
    const inactiveImg = isLeft ? rightImg : leftImg;
    const activeText = isLeft ? leftText : rightText;

    part.style.filter = isEnter ? 'saturate(50%)' : 'none';
    activeImg.style.transform = isEnter ? 'scale(1.05)' : 'scale(1)';
    activeImg.style.filter = isEnter ? 'saturate(150%)' : 'saturate(100%)';
    inactiveImg.style.filter = isEnter ? 'saturate(50%)' : 'saturate(100%)';
}

screenTextsParts.forEach(part => {
    part.style.transition = 'filter 0.3s ease';
    leftImg.style.transition = rightImg.style.transition = 'transform 0.3s ease, filter 0.3s ease';
    orangeStroke.style.transition = 'all 0.3s ease';
    leftText.style.transition = rightText.style.transition = 'all 0.3s ease';

    part.addEventListener('mouseenter', () => handleMouseEvent(part, true));
    part.addEventListener('mouseleave', () => handleMouseEvent(part, false));
});

screenTextsParts.forEach(part => {
    part.addEventListener('mouseenter', () => {
        if (part.classList.contains('screen-container__left')) {
            leftText.classList.add('white-stroke_hover');
        }
        if (part.classList.contains('screen-container__right')) {
            rightText.classList.add('white-stroke_hover');
            orangeStroke.classList.add('orange-stroke_hover');
        }
    });

    part.addEventListener('mouseleave', () => {
        if (part.classList.contains('screen-container__left')) {
            leftText.classList.remove('white-stroke_hover');
        }
        if (part.classList.contains('screen-container__right')) {
            rightText.classList.remove('white-stroke_hover');
            orangeStroke.classList.remove('orange-stroke_hover');
        }
    });
});