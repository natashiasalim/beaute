function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
    if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}



window.onscroll = function() {
    let navbar = document.getElementsByTagName("nav")[0];
    let dropdownContents = document.getElementsByClassName('dropdown-content'); 
    let hamburger = document.getElementsByClassName("hamburger")[0];

    if(window.pageYOffset < 50) {
        for(let i = 0; i < dropdownContents.length; ++i){
            dropdownContents[i].style.backgroundColor = "rgba(255,255,255,0.3)";
        }
        addClass(navbar,'transparent');
        removeClass(navbar,'opaque');
        addClass(hamburger,'transparent');
        removeClass(hamburger,'opaque');
        // hamburger.style.backgroundColor = "rgba(0,0,0,0)";
        hamburger.style.top = "55px";
    }
    else {
        for(let i = 0; i < dropdownContents.length; ++i){
            dropdownContents[i].style.backgroundColor = "rgba(255,255,255,0.7)";
        }
        // dropdownContents.style.backgroundColor = rgba(255,255,255,0.8);
        addClass(navbar,'opaque');
        removeClass(navbar,'transparent');
        addClass(hamburger,'opaque');
        removeClass(hamburger,'transparent');
        // hamburger.style.backgroundColor = "rgba(0,0,0,0)";
        hamburger.style.top = "0px";
    } 
} 
 

function toggleHamburger() {
    let hamburgerToggle = document.getElementById("hamburger-toggle");
    var x = document.getElementsByClassName('hamburger-content')[0];
    if (x.style.display === "none" || window.getComputedStyle(x).display === "none") {
        hamburgerToggle.style.backgroundColor = "rgba(255,255,255,0.6)";
        x.style.display = "block";
    } else {
        hamburgerToggle.style.backgroundColor = "rgba(255,255,255,0)";
        x.style.display = "none";
    }
} 

function toggleSignUp(){
    let signUpModal = document.getElementById('signup-modal');
    let display = signUpModal.style.display === "none" ||  window.getComputedStyle(signUpModal).display === "none"? "block" : "none";
    signUpModal.style.display = display;
}

function toggleArticleSignUp(){
    let signUpModals = document.getElementsByClassName('article-signup-modal');
    for (let i = 0; i < signUpModals.length; i++) {
        const signUpModal = signUpModals[i];
        let display = signUpModal.style.display === "none" ||  window.getComputedStyle(signUpModal).display === "none"? "block" : "none";
        signUpModal.style.display = display;
    }
}

function toggleSearchBar(){
    let searchBars = document.getElementsByClassName('search-bar');
    for (let i = 0; i < searchBars.length; i++) {
        const searchBar = searchBars[i];
        let display = searchBar.style.display === "none" ||  window.getComputedStyle(searchBar).display === "none"? "block" : "none";
        searchBar.style.display = display;
    }
}


function initFavoritesSlider(){
    let hamburger = document.getElementsByClassName("hamburger")[0];
    hamburger.style.top = "55px";

    const carousel = document.querySelector("[data-target='carousel']");

    if(carousel === null)
        return;

    // let first = carousel.firstElementChild.cloneNode(true);
    // let last = carousel.lastElementChild.cloneNode(true);
    // carousel.insertBefore(last, carousel.firstElementChild);
    // carousel.appendChild(first);

    const card = carousel.querySelector("[data-target='card']");
    const leftButton = document.getElementById('favorites-slider-nav-left');
    const rightButton = document.getElementById('favorites-slider-nav-right');
    const mobileLeftButton = document.getElementById('favorites-slider-mobile-nav-left');
    const mobileRightButton = document.getElementById('favorites-slider-mobile-nav-right');
    const carouselWidth = carousel.offsetWidth;
    const cardStyle = card.currentStyle || window.getComputedStyle(card)
    const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
    const cardWidth = Number(cardStyle.width.match(/\d+/g)[0]);

    const cardCount = carousel.querySelectorAll("[data-target='card']").length;

    let offset = 0;

    const maxX = -(cardWidth + 2* cardMarginRight);

    function handleFavoritesSliderCaption(offset){
        let topCaption = "How To Choose Your";
        let bottomCaption = "PLANT - BASED MILK";
        if(offset === 0){
            topCaption = "How To Choose Your";
            bottomCaption = "PLANT - BASED MILK";
        }
        else if(offset === maxX || offset === -(cardWidth + cardMarginRight)){
            topCaption = "Your Holiday";
            bottomCaption = "MOVIE - GUIDE";
        }
        else if(offset === -maxX || offset === (cardWidth + cardMarginRight)){
            topCaption = "Your Playlist For";
            bottomCaption = "A - GOOD NIGHT SLEEP";
        }
        document.getElementById('favorites-slider-caption-top').innerHTML = topCaption;
        document.getElementById('favorites-slider-caption-bottom').innerHTML = bottomCaption;
    }

    mobileLeftButton.addEventListener("click", function() {
        if (offset !== cardWidth + cardMarginRight) {
            offset += cardWidth + cardMarginRight;
            console.log(offset);
            carousel.style.transform = `translateX(${offset}px)`;
            handleFavoritesSliderCaption(offset);    
        }
    })

    leftButton.addEventListener("click", function() {
        if (offset !== -maxX) {
            offset += cardWidth + 2* cardMarginRight;
            console.log(offset);
            carousel.style.transform = `translateX(${offset}px)`;
            handleFavoritesSliderCaption(offset);    
        }
    })
    
    mobileRightButton.addEventListener("click", function() {
        if (offset !== -(cardWidth + cardMarginRight)) {
            offset -= cardWidth + cardMarginRight;
            console.log(offset);
            carousel.style.transform = `translateX(${offset}px)`;
            handleFavoritesSliderCaption(offset);    
        }
    })

    rightButton.addEventListener("click", function() {
        if (offset !== maxX) {
            offset -= cardWidth + 2* cardMarginRight;
            console.log(offset);
            carousel.style.transform = `translateX(${offset}px)`;
            handleFavoritesSliderCaption(offset);    
        }
    })
}


function initSwipeSlider(){
  const slider = document.getElementsByClassName("swipe-slider");
  if(slider === null)
    return;
  for (let i = 0; i < slider.length; i++) {
    let isDown = false;
    let startX;
    let scrollLeft;
      
    let items = slider[i].children;
    let centerIndex = Math.ceil(items.length/2) - 1;
    items[centerIndex].scrollIntoView({ inline: 'center'});
    document.getElementsByTagName('body')[0].scrollIntoView(true);
    
    slider[i].addEventListener('mousedown', (e) => {
      isDown = true;
      slider[i].classList.add('active');
      startX = e.pageX - slider[i].offsetLeft;
      scrollLeft = slider[i].scrollLeft;
    });
    
    slider[i].addEventListener('touchstart', (e) => {
      isDown = true;
      slider[i].classList.add('active');
      startX = e.touches[0].pageX - slider[i].offsetLeft;
      scrollLeft = slider[i].scrollLeft;
    });
    
    slider[i].addEventListener('mouseleave', () => {
      isDown = false;
      slider[i].classList.remove('active');
    });
    
    slider[i].addEventListener('touchend', () => {
      isDown = false;
      slider[i].classList.remove('active');
    });
    
    slider[i].addEventListener('mouseup', () => {
      isDown = false;
      slider[i].classList.remove('active');
    });
    
    slider[i].addEventListener('touchcancel', () => {
      isDown = false;
      slider[i].classList.remove('active');
    });
    
    slider[i].addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider[i].offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider[i].scrollLeft = scrollLeft - walk;
      console.log(walk);
    });
    
    slider[i].addEventListener('touchmove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - slider[i].offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider[i].scrollLeft = scrollLeft - walk;
      console.log(walk);
    });
  }
}

//document onload
// document.addEventListener("DOMContentLoaded", function() {
//     initSwipeSlider();
// });
