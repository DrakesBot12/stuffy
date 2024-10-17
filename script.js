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
      const isStills = window.location.pathname.endsWith('gallery_stills.html');
      const contentDiv = document.getElementById(isStills ? 'contents-s' : 'contents-a');
      const folders = ['square', 'poster', 'banner'];
      const mediaType = isStills ? 'stills' : 'animations';
      const fileExtension = isStills ? 'webp' : 'webm';

      const createMediaElement = (src, folder, index) => {
          if (isStills) {
              const img = document.createElement('img');
              img.src = src;
              img.alt = `${folder} ${index}`;
              img.classList.add('stills_img', folder);
              return img;
          } else {
              const video = document.createElement('video');
              video.src = src;
              video.autoplay = true;
              video.loop = true;
              video.muted = true;
              video.playsInline = true;
              video.controls = false;
              video.classList.add('stills_img', folder);
              return video;
          }
      };

      
      const loadMedia = async (folder) => {
          let index = 1;
          while (true) {
              const mediaSrc = `../src/${mediaType}/${folder}/${index}.${fileExtension}`;
              try {
                  const response = await fetch(mediaSrc, { method: 'HEAD' });
                  if (!response.ok) break;
                  const mediaElement = createMediaElement(mediaSrc, folder, index);
                  contentDiv.appendChild(mediaElement);
                  index++;
              } catch (error) {
                  console.error(`Error loading media: ${error}`);
                  break;
              }
          }
      };

      folders.forEach(folder => loadMedia(folder));
}