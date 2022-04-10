/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = [...document.querySelectorAll('section')];
const navBar = document.getElementById('navbar__list');


/**/// End Global Variables


// build the nav
(() => {
    for (sec of sections) {
        const li = document.createElement('li');
        li.innerHTML = `<a  href="#${sec.id}" data-nav='${sec.id}'class= "menu__link">${sec.dataset.nav}</a>`;
      navBar.appendChild(li);
  }
})();

// Add class 'active' to section when near top of viewport

const sectionInView = () => {
  const observer = new IntersectionObserver(
    function (elements) {
     elements.forEach((elemnt) => {
       // console.log(elemnt)
        let activeLink = navBar.querySelector(`[data-nav=${elemnt.target.id}]`);
         if (elemnt.isIntersecting) {
            // Set sections as active
          elemnt.target.classList.add("your-active-class");
          activeLink.classList.add("active");
          location.hash = `${elemnt.target.id}`;
        } else {
          elemnt.target.classList.remove("your-active-class");
          activeLink.classList.remove("active");
        }
      });
    },
    // options //
    {
      threshold: 0.7,
      rootMargin: "50px",
   
  }
  );
   document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
};
// Scroll to anchor ID using scrollTO event
sectionInView();

//////////////////////////////////////////////////////////



// Scroll to section on link click
navBar.addEventListener("click", (el) => {
  el.preventDefault();
  if (el.target.dataset.nav) {
    document
      .getElementById(`${el.target.dataset.nav}`)
      .scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      location.hash = `${el.target.dataset.nav}`;
    }, 170);
  }
});



