// script.js
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
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

     // --- GSAP Setup ---
     gsap.registerPlugin(ScrollTrigger);


    let currentSectionIndex = 0; // Track current section

    // --- Helper Function to Show a Specific Section ---
    function showSection(index) {
        sections.forEach((section, i) => {
            section.style.display = i === index ? 'block' : 'none';
        });
    }

    // --- Start Screen Logic ---
    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        container.style.display = 'block';
        showSection(0); // Show the first section (Mouth)
    });

    // --- Next Button Logic ---
    nextButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
          //Specific animations and transitions based on current section
            if (index === 0) { //Mouth Section
                 animateMouth();
            } else if(index === 1){
                 animateEsophagus();
            } else if (index === 2){
                animateStomach();
            }
            else if(index === 3){
                animateSmallIntestine();
            }else if(index === 4){
                animateLargeIntestine();
            }
            currentSectionIndex = index + 1;
             if (currentSectionIndex < sections.length) {
                showSection(currentSectionIndex);
             }
        });
    });
    // --- Mouth Animation ---
    function animateMouth() {
        // Simulate swallowing (simple for now, expand later)
        gsap.to(food, {
            duration: 1,
            x: mouthGraphic.offsetLeft - food.offsetLeft + mouthGraphic.offsetWidth / 2 - food.offsetWidth / 2,
            y: mouthGraphic.offsetTop - food.offsetTop + mouthGraphic.offsetHeight / 2 - food.offsetHeight/2,
            scale: 0.5, // Shrink as it "goes down"
            opacity: 0,
            ease: "power1.in",
             onComplete: () => {
                food.style.display = 'none'; // Hide the food
            }
        });
    }
    // --- Esophagus Animation ---
    function animateEsophagus() {
          // Reset foodBolus position and make it visible
         foodBolus.style.top = '0';
         foodBolus.style.left = '5px'; // Center within the tube
         foodBolus.style.display = 'block';

        gsap.to(foodBolus, {
            duration: 3,
            y: esophagusTube.offsetHeight - foodBolus.offsetHeight,
            ease: "power1.inOut",
              onComplete: () => {
                foodBolus.style.display = 'none'; // Hide after reaching the end
            }
        });
    }
    // --- Stomach Animation ---
      function animateStomach(){
        gsap.to(chyme, {
            duration: 4,
            ease: "power1.inOut",
        });
    }
    // --- Small Intestine Animation ---
    function animateSmallIntestine(){
       gsap.to(chyme, {
            scrollTrigger: {
                trigger: sections[4],
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            y: smallIntestineTube.offsetHeight - chyme.offsetHeight,
              onComplete: () => {
                chyme.style.display = 'none'; // Hide after reaching the end
            }
        });
    }
     // --- Large Intestine Animation ---
       function animateLargeIntestine(){
          chyme.style.display = 'block';
          chyme.style.top = "0"; //Reset the position
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
                chyme.style.display = 'none'; // Hide after reaching the end
            }
        });
    }

    // --- Restart Button Logic ---
    restartButton.addEventListener('click', () => {
        currentSectionIndex = 0;
        showSection(currentSectionIndex); // Show first section
        startScreen.style.display = 'flex'; // Show start screen again
        container.style.display = 'none';   //Hide the contanier
         // Reset food positions and visibilities for a new journey
          food.style.display = 'block'; // show food
          food.style.opacity = '1';  // Reset opacity from mouth animation
          food.style.scale = '1';   //Reset the scale
          food.style.left = '20px'; // Reset position
          food.style.top = '20px';
          food.style.x = '0'; // Reset GSAP transforms
          food.style.y = '0';
          chyme.style.top = "0"; //Reset the position
          chyme.style.left = '15px'
          chyme.style.y = '0' // Reset GSAP transforms
    });

});