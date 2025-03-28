// ---=== Execute code after the DOM is fully loaded ===---
document.addEventListener('DOMContentLoaded', function() {

    // ---=== Update Footer Year ===---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ---=== Reset Form Fields on Load ===---
    // Note: This runs *after* the DOM is ready, ensuring the form exists.
    const contactForm = document.getElementById("form"); // Assuming your form has id="form" based on original code
    if (contactForm) {
        contactForm.reset();
    } else {
        // If the form ID is different, update the getElementById above.
        // Let's find it more robustly within the contact section if the ID wasn't set explicitly.
        const formInSection = document.querySelector('#contact form');
        if(formInSection) {
            formInSection.reset();
            // Consider adding id="contact-form" to the form tag in HTML for better selection
            // e.g., <form id="contact-form" action="#" method="POST">
        }
    }


    // ---=== Particles.js Configuration ===---
    // Ensure the particles.min.js library is loaded before this runs.
    // Also check if the target element exists.
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80, // Number of particles
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#ffffff", "#00ffff", "#ff00ff"] // Particle colors (white, cyan, magenta)
                },
                "shape": {
                    "type": "circle", // Shape type (circle, edge, triangle, polygon, star, image)
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.6, // Base opacity
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3, // Base size
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150, // Max distance for links
                    "color": "#ffffff", // Link color
                    "opacity": 0.3, // Link opacity
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3, // Particle speed
                    "direction": "none", // Movement direction (none, top, top-right, etc.)
                    "random": true,
                    "straight": false,
                    "out_mode": "out", // Behavior when particles leave canvas (out, bounce)
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true, // Enable hover interactivity
                        "mode": "grab" // Interaction mode on hover (grab, bubble, repulse)
                    },
                    "onclick": {
                        "enable": true, // Enable click interactivity
                        "mode": "push" // Interaction mode on click (push, remove, bubble, repulse)
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.7
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4 // Number of particles to push on click
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true // Adjusts for high-density displays
        });
    } else if (typeof particlesJS === 'undefined') {
        console.warn("particles.js library not loaded yet or failed to load.");
    } else {
        console.warn("Element with ID 'particles-js' not found for particle initialization.");
    }


    // ---=== Simple Scroll Animation Trigger ===---
    const sections = document.querySelectorAll('section');
    const checkVisibility = () => {
        // Use a more robust check for window.innerHeight
        const triggerBottom = (window.innerHeight || document.documentElement.clientHeight) / 5 * 4; // Trigger when section is 80% visible

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            } else {
                // Optional: remove class if you want animation to replay when scrolling up
                // section.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check on load


    // ---=== Smooth Scrolling for Nav Links, Logo, and CTA ===---
    // Select all anchor links pointing to an ID within the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            try {
                const targetElement = document.querySelector(targetId);
                const header = document.querySelector('header'); // Find header dynamically

                if (targetElement) {
                    const headerOffset = header ? header.offsetHeight : 0; // Get header height, default to 0 if not found
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20; // Adjust scroll position slightly below header

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                } else {
                    console.warn(`Smooth scroll target element "${targetId}" not found.`);
                }
            } catch (error) {
                // Handle potential errors with invalid selectors (though '#' should be safe)
                console.error(`Error finding smooth scroll target: ${error}`);
            }
        });
    });

});