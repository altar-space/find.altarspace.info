
const layers = document.querySelectorAll('.image-layer');
const image7 = document.getElementById('image7');
const scrollArrow = document.querySelector('.scroll-arrow');

//img7 is positioned at the bottom of total scrollable page
function placeImage7() {
    const img6 = document.getElementById('image6');
    const image7 = document.getElementById('image7');

    const img6Top = img6.offsetTop;
    const offset = 300; // px distance you want between image6 and image7

    image7.style.top = `${img6Top + offset}px`;

    //const body = document.body;
    //const html = document.documentElement;
    //const pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    //const imgHeight = image7.offsetHeight;
    //image7.style.top = `${pageHeight - imgHeight}px`;
}

//parallex effects
let ticking = false;
let lastScrollY = 0;

function updateParallax() {
    const scrollY = window.scrollY;
    lastScrollY = scrollY;
    
    layers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed);
        // use transform3d for hardware acceleration
        layer.style.transform = `translate3d(0, ${scrollY * (speed - 1)}px, 0)`;
    });
    
    ticking = false;
}

function requestUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}


// fade in text after key images load
const images = Array.from(document.querySelectorAll('.image-layer')).slice(0, 3);
let loaded = 0;
images.forEach(img => {
    if (img.complete) {
    loaded++;
    if (loaded >= images.length) showText();
    } else {
    img.onload = () => {
        loaded++;
        if (loaded >= images.length) showText();
    }
    }
});
function showText() {
    document.getElementById('text-content').style.opacity = '1';
}

// fade out down arrow when past img5
function fadeOutArrow() {
    const image5 = document.getElementById('image5');
    const image5Bottom = image5.offsetTop + image5.clientHeight;
    if (window.scrollY > image5Bottom) {
        scrollArrow.style.opacity = 0;
    } else {
        scrollArrow.style.opacity = 1;
    }
}

//update window on load and resize
window.addEventListener('scroll', () => {
    updateParallax();
    requestUpdate();
    fadeOutArrow();
});
window.addEventListener('resize', () => {
    placeImage7();
    updateParallax();
});

window.addEventListener('load', () => {
    placeImage7();
    updateParallax();
});