// Slide first section below fixed header
document.addEventListener('DOMContentLoaded', function () {
  let header = document.querySelector('header');
  let headerHeight = header.offsetHeight;
  let firstSection = document.querySelector('section');
  if (firstSection) {
    firstSection.style.paddingTop = `${headerHeight + 100}px`;
    // transparent header if first section has background-image set to an url
    if (hasBackgroundImageWithURL(firstSection)) {
      header.classList.add('transparent');
    }
  }
}, false);

const header = document.querySelector('header');

// Change header color when scrolled
let scrollUp = false;
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
    if (!scrollUp) {
      createScrollUp();
      scrollUp = true;
    }
  } else {
    header.classList.remove('scrolled');
    if (scrollUp) {
      removeScrollUp();
      scrollUp = false;
    }
  }
});

//animations on scroll

const animation_elements = document.querySelectorAll('[data-animation]');
if (animation_elements.length >= 1) {
  animation_elements.forEach((el, i ) => {
    el.style.visibility = 'hidden';
  });
  const options = {
    threshold: 0.5
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationName = entry.target.getAttribute('data-animation');
        entry.target.style.visibility = 'visible';
        entry.target.classList.add('animated');
        observer.unobserve(entry.target)
      }
      else {
        entry.target.classList.remove('animated')
      }

    })
  }, options);
  
  animation_elements.forEach((el, i ) => {
    observer.observe(el);
  });

}

function hasBackgroundImageWithURL(element) {
  const computedStyle = window.getComputedStyle(element);
  const backgroundImageValue = computedStyle.getPropertyValue('background-image');

  // Use a regular expression to check for a URL pattern
  const urlPattern = /url\(["']?(https?:\/\/[^\)"']+)["']?\)/i;

  if (urlPattern.test(backgroundImageValue)) {
    return true;
  }

  for (let i = 0; i < element.children.length; i++) {
    if (hasBackgroundImageWithURL(element.children[i])) {
      return true;
    }
  }

  return false;
}

let videoLinks = document.querySelectorAll('[data-video-link]');

if (videoLinks.length >= 1) {
  const body = document.querySelector('body');
  videoLinks.forEach(youtubeLink => {
    youtubeLink.addEventListener('click', function (e) {
      e.preventDefault();
      createOverlay();
      body.style.overflow = 'hidden';
      const overlay = document.querySelector('.overlay');
      const videoUrl = this.getAttribute('href');
      const youtubeFrame = overlay.querySelector('#youtube-frame');
      const videoContainer = overlay.querySelector('.video-container');
      youtubeFrame.setAttribute('src', videoUrl);
      overlay.style.display = 'flex';
      overlay.addEventListener('click', (e) => {
        if (e.target !== videoContainer) {
          closeVideo();
        }
      })
    });
  })
}


// Open the overlay with the YouTube video

// Close the overlay
function closeVideo() {
  const body = document.querySelector('body');
  const overlay = document.querySelector('.overlay');
  const youtubeFrame = overlay.querySelector('#youtube-frame');
  const videoContainer = overlay.querySelector('.video-container');
  youtubeFrame.setAttribute('src', ''); // Stops video playback
  videoContainer.style.transform = 'scale(0)';
  setTimeout(() => {
    overlay.remove();
    body.style.overflow = 'auto';
  }, 200)

}

function createOverlay() {
  let body = document.querySelector('body');
  let overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.innerHTML = `
  <div class="video-container">
      <span class="close-button" onclick="closeVideo()"><i class="fa-solid fa-xmark"></i></span>
      <iframe id="youtube-frame" width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>
  </div>`;
  body.appendChild(overlay);
}


function createScrollUp() {
  let body = document.querySelector('body');
  let upBtn = document.createElement('a');
  upBtn.setAttribute('href', '#top');
  upBtn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`
  upBtn.classList.add('up-btn');
  body.appendChild(upBtn);
}

function removeScrollUp() {
  let upBtn = document.querySelector('.up-btn');
  upBtn.remove();
}
console.log('end of js');