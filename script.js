
document.addEventListener('DOMContentLoaded', () => {

    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const container = document.getElementById('container');
    const sections = document.querySelectorAll('.section'); // All sections
    const nextButtons = document.querySelectorAll('.next-button');
    const restartButton = document.getElementById('restart-button');
    const food = document.querySelector('.food'); //Mouth Section
    const mouthGraphic = document.querySelector('.organ-graphic');
    const foodBolus = document.querySelector('.food-bolus');
    const esophagusTube = document.querySelector('.esophagus-tube');
    const chyme = document.querySelector('.chyme');
    const smallIntestineTube = document.querySelector('.small-intestine-tube');
    const largeIntestineTube = document.querySelector('.large-intestine-tube');
    const apple = document.getElementById('apple');
    const mouth = document.getElementById('mouth-graphic');
    const crunchingSound = document.getElementById('crunching-sound');
    const mouthNextButton = document.querySelector('#mouth .next-button');


    gsap.registerPlugin(ScrollTrigger);

    let currentSectionIndex = 0; 

    function showSection(index) {
        sections.forEach((section, i) => {
            section.style.display = i === index ? 'block' : 'none';
        });
    }

    function createBackButton() {
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.classList.add('back-button'); 

        backButton.addEventListener('click', () => {
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                showSection(currentSectionIndex);
                resetSectionState(currentSectionIndex);
            }
        });

        return backButton;
    }

    sections.forEach((section) => {
        if (section.id !== 'mouth') {
            section.appendChild(createBackButton());
        }
    });

    mouthNextButton.style.display = 'none';

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        container.style.display = 'block';
        showSection(0); 
    });

    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    apple.addEventListener('mousedown', (event) => {
        isDragging = true;
        apple.classList.add('dragging');

        const appleRect = apple.getBoundingClientRect(); 
        dragOffsetX = event.clientX - appleRect.left;
        dragOffsetY = event.clientY - appleRect.top;

        document.body.style.cursor = 'none';

    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            apple.style.left = (event.clientX - dragOffsetX) + 'px';
            apple.style.top = (event.clientY - dragOffsetY) + 'px';
        }
    });
 document.addEventListener('mouseup', (event) => {
        if (isDragging) {
            isDragging = false;
            apple.classList.remove('dragging');

            const appleRect = apple.getBoundingClientRect();
            const mouthRect = mouth.getBoundingClientRect();

            if (appleRect.left < mouthRect.right &&
                appleRect.right > mouthRect.left &&
                appleRect.top < mouthRect.bottom &&
                appleRect.bottom > mouthRect.top) {

                apple.style.display = 'none';
                crunchingSound.play();
                mouthNextButton.style.display = 'block';

            } else {
                apple.style.left = '20px'; 
                apple.style.top = '20px';  
            }
              document.body.style.cursor = 'auto';
        }
    });
   nextButtons.forEach((button, index) => {
       button.addEventListener('click', () => {
           
           if (index === 0) { 

           } else if (index === 1) {
               animateEsophagus();
           } else if (index === 2) {
               animateStomach();
           } else if (index === 3) {
               animateSmallIntestine();
           } else if (index === 4) {
               animateLargeIntestine();
           }
           currentSectionIndex = index + 1;
           if (currentSectionIndex < sections.length) {
               showSection(currentSectionIndex);
           }
       });
   });

   function resetSectionState(index) {
       switch (index) {
           case 0: 
               mouthNextButton.style.display = 'none';
               food.style.display = 'block';
               food.style.opacity = '1';
               food.style.scale = '1';
               food.style.left = '20px';
               food.style.top = '20px';
               food.style.x = '0';
               food.style.y = '0';
               break;
           case 1: 
             foodBolus.style.top = '0';
             foodBolus.style.left = '5px';
             foodBolus.style.display = 'block';
             foodBolus.style.y = '0';
             break;
           case 2:
             break;
           case 3: 
              chyme.style.display = 'block';
              break;
           case 4: 
               chyme.style.top = "0";
               chyme.style.left = '15px'
               chyme.style.y = '0'
               chyme.style.display = 'block';
               break;
           case 5: 
               chyme.style.top = "0";
               chyme.style.left = '15px'
               chyme.style.y = '0'
               chyme.style.display = 'block';
               break;
       }
   }

   function animateEsophagus() {
       foodBolus.style.top = '0';
       foodBolus.style.left = '5px';
       foodBolus.style.display = 'block';

       gsap.to(foodBolus, {
           duration: 3,
           y: esophagusTube.offsetHeight - foodBolus.offsetHeight,
           ease: "power1.inOut",
           onComplete: () => {
               foodBolus.style.display = 'none';
           }
       });
   }

     function animateStomach(){
       gsap.to(chyme, {
           duration: 4,
           ease: "power1.inOut",
       });
   }

   function animateSmallIntestine() {
       gsap.to(chyme, {
           scrollTrigger: {
               trigger: sections[4],
               start: "top top",
               end: "bottom top",
               scrub: true,
           },
           y: smallIntestineTube.offsetHeight - chyme.offsetHeight,
           onComplete: () => {
               chyme.style.display = 'none';
           }
       });
   }

   function animateLargeIntestine() {
       chyme.style.display = 'block';
       chyme.style.top = "0";
       chyme.style.left = '15px'
       chyme.style.y = '0'
       gsap.to(chyme, {
           scrollTrigger: {
               trigger: sections[5],
               start: "top top",
               end: "bottom top",
               scrub: true,
           },
           y: largeIntestineTube.offsetHeight - chyme.offsetHeight,
           onComplete: () => {
               chyme.style.display = 'none';
           }
       });
   }

   restartButton.addEventListener('click', () => {
       mouthNextButton.style.display = 'none';
       currentSectionIndex = 0;
       showSection(currentSectionIndex);
       startScreen.style.display = 'flex';
       container.style.display = 'none';
       food.style.display = 'block';
       food.style.opacity = '1';
       food.style.scale = '1';
       food.style.left = '20px';
       food.style.top = '20px';
       food.style.x = '0';
       food.style.y = '0';
       chyme.style.top = "0";
       chyme.style.left = '15px'
       chyme.style.y = '0'
        document.body.style.cursor = 'auto';
   });
});
