document.addEventListener('DOMContentLoaded', function() {

    //question table selection
    const qt = document.querySelectorAll('.questions-tick');

    qt.forEach(function(button) {
        button.addEventListener('click', function() {
            const nextRow = button.parentNode.parentNode.nextElementSibling;
            const tdElement = nextRow.querySelector('.questions-answer');
            const isHidden = tdElement.hasAttribute('hidden');
            
            const tdElements = document.querySelectorAll('.questions-table .questions-answer');
            tdElements.forEach(function(td) {
                td.setAttribute('hidden', '');
            });

            if (isHidden) {
                tdElement.removeAttribute('hidden');
            } else {
                tdElement.setAttribute('hidden', '');
            }
        });
    });

    //right side promo slider

    const img_promo = document.querySelectorAll(".imgpromo-banner");
    const btn_promo = document.querySelector(".ellipse");
    const arrow_up = document.querySelector(".arrow-up");
    const img_slider = document.querySelectorAll(".img-slider");
    const price = document.querySelectorAll(".small-price");
    const desc = document.querySelectorAll(".desc" );
    
    const handleClick = function() {
      const firstImg = img_slider[0];
      const firstImgSrc = firstImg.src;
    
      const firstPromo = img_promo[0];
      const firstPromoSrc = firstPromo.src;
    
      const firstPrice = price[0].textContent;
      const firstDesc = desc[0].textContent;
    
      for (let i = 0; i < img_slider.length - 1; i++) {
        const currentImg = img_slider[i];
        const nextImg = img_slider[i + 1];
        currentImg.src = nextImg.src;
    
        const currentPromo = img_promo[i];
        const nextPromo = img_promo[i + 1];
        currentPromo.src = nextPromo.src;
    
        const currentPrice = price[i];
        const nextPrice = price[i + 1];
        currentPrice.textContent = nextPrice.textContent;
    
        const currentDesc = desc[i];
        const nextDesc = desc[i + 1];
        currentDesc.textContent = nextDesc.textContent;
      }
    
      const lastImg = img_slider[img_slider.length - 1];
      lastImg.src = firstImgSrc;
    
      const lastPromo = img_promo[img_promo.length - 1];
      lastPromo.src = firstPromoSrc;
    
      const lastPrice = price[price.length - 1];
      lastPrice.textContent = firstPrice;
    
      const lastDesc = desc[desc.length - 1];
      lastDesc.textContent = firstDesc;
    };
    
    btn_promo.addEventListener('click', handleClick);
    arrow_up.addEventListener('click', handleClick);
    
   

    //main slider

    const sel_slider = document.querySelectorAll(".img-pick");
    const img_target = document.querySelector(".img-target");
    const img2 = document.querySelector('#img-2');
    let selectedSliderIndex = -1; 
    
    sel_slider.forEach(function(pick, index) {
      pick.addEventListener('click', function() {
        sel_slider.forEach(function(pick) {
          pick.classList.remove("img-border");
        });
        pick.classList.add("img-border");
        img_target.src = pick.src;
        img2.style.backgroundImage = `url('${img_target.src}')`;
        selectedSliderIndex = index; // Update the selected index
    
        // Transfer the selection to the mobile slider
        if (selectedMobileIndex !== -1) {
          sel_mobile[selectedMobileIndex].classList.remove("img-border");
        }
        selectedMobileIndex = selectedSliderIndex;
        if (selectedMobileIndex !== -1) {
          sel_mobile[selectedMobileIndex].classList.add("img-border");
          img_target_mobile.src = sel_mobile[selectedMobileIndex].querySelector("img").src;
        }
      });
    });
    
    //ZOOM

    const zoomer = (function() {
        const img1 = document.querySelector('#img-1');
        const img2 = document.querySelector('#img-2');
      
        img2.style.backgroundImage = `url('${img1.src}')`;
      
        const imgContainer = document.querySelector('#img-zoomer-box');
        const imgContainerRect = imgContainer.getBoundingClientRect();
        const img2Rect = img2.getBoundingClientRect();
      
        const img2Width = img2Rect.width;
        const img2Height = img2Rect.height;
        const imgContainerWidth = imgContainerRect.width;
        const imgContainerHeight = imgContainerRect.height;
      
        document.querySelector('#img-zoomer-box').addEventListener('mousemove', function(e) {
          const x = e.pageX - this.offsetLeft;
          const y = e.pageY - this.offsetTop;
          const imgWidth = img1.offsetWidth;
          const imgHeight = img1.offsetHeight;
          let xperc = (x / imgWidth) * 100;
          let yperc = (y / imgHeight) * 100;
      
          if (x > 0.01 * imgWidth) {
            xperc += 0.25 * xperc;
          }
      
          if (y >= 0.01 * imgHeight) {
            yperc += 0.25 * yperc;
          }
      
          img2.style.backgroundPositionX = (xperc - 9) + '%';
          img2.style.backgroundPositionY = (yperc - 9) + '%';
      
          const left = x - img2Width / 2;
          const top = y - img2Height / 2;
      
          img2.style.left = Math.max(Math.min(left, imgContainerWidth - img2Width), 0) + 'px';
          img2.style.top = Math.max(Math.min(top, imgContainerHeight - img2Height), 0) + 'px';
      
          // Enlarge img-2 by 35%
          const scale = 1.35;
          img2.style.transform = `scale(${scale})`;
        });
      })();
      
    //main slider mobile

    const sel_mobile = document.querySelectorAll(".img-circle");
    const img_target_mobile = document.querySelector(".img-target");
    let selectedMobileIndex = -1; 
    
    sel_mobile.forEach(function(pick, index) {
      pick.addEventListener('click', function() {
        sel_mobile.forEach(function(pick) {
          pick.classList.remove("img-border");
        });
        pick.classList.add("img-border");
        img_target_mobile.src = pick.querySelector("img").src;
        selectedMobileIndex = index; // Update the selected index
    
        // Transfer the selection to the other slider
        if (selectedSliderIndex !== -1) {
          sel_slider[selectedSliderIndex].classList.remove("img-border");
        }
        selectedSliderIndex = selectedMobileIndex;
        if (selectedSliderIndex !== -1) {
          sel_slider[selectedSliderIndex].classList.add("img-border");
          img_target.src = sel_slider[selectedSliderIndex].src;
          img2.style.backgroundImage = `url('${img_target.src}')`;
        }
      });
    });

    //the other mobile slider

    const strip = document.querySelector('.strip');
    const part = document.querySelector('.part');
    const mobilePics = document.querySelectorAll('.mobile-pic');
    
    let isDragging = false;
    let initialX = 0;
    
    part.addEventListener('mousedown', function(event) {
      isDragging = true;
      initialX = event.clientX - part.offsetLeft;
    });
    
    document.addEventListener('mousemove', function(event) {
      if (isDragging) {
        const stripWidth = strip.offsetWidth;
        const partWidth = part.offsetWidth;
        const newPosition = event.clientX - strip.getBoundingClientRect().left - initialX;
        const clampedPosition = Math.max(0, Math.min(newPosition, stripWidth - partWidth));
    
        part.style.left = clampedPosition + 'px';
    
        const maxTranslateX = stripWidth - partWidth;
        const translateX = (clampedPosition / maxTranslateX) * 172;
    
        mobilePics.forEach(function(pic) {
          pic.style.transform = `translateX(-${translateX}%)`;
        });
      }
    });
    
    document.addEventListener('mouseup', function(event) {
      isDragging = false;
    });
    
    
});
