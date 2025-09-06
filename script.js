  document.addEventListener('DOMContentLoaded', function () {
            // --- Mouse Glow Effect ---
            const heroSection = document.querySelector('.hero');
            const glow = document.querySelector('.mouse-glow');
            heroSection.addEventListener('mousemove', (e) => {
                requestAnimationFrame(() => {
                    glow.style.left = `${e.clientX}px`;
                    glow.style.top = `${e.clientY}px`;
                });
            });

            // --- Slider Logic ---
            const slides = document.querySelectorAll('.slide');
            const bgImages = document.querySelectorAll('.bg-image'); // Get background images
            const navNumbers = document.querySelectorAll('.nav-number');
            const progressBar = document.querySelector('.nav-progress');
            let currentSlide = 0;
            const slideIntervalTime = 6000; // 6 seconds
            let slideInterval;

            function showSlide(index) {
                if (index === currentSlide && document.querySelector('.slide.active')) return;

                // Deactivate current elements
                slides[currentSlide].classList.remove('active');
                bgImages[currentSlide].classList.remove('active'); // Deactivate current bg image
                navNumbers[currentSlide].classList.remove('active');

                // Activate new elements
                currentSlide = index;
                slides[currentSlide].classList.add('active');
                bgImages[currentSlide].classList.add('active'); // Activate new bg image
                navNumbers[currentSlide].classList.add('active');

                // Reset and start progress bar animation
                progressBar.style.transition = 'none';
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.transition = `width ${slideIntervalTime / 1000}s linear`;
                    progressBar.style.width = '100%';
                }, 50);
            }

            function nextSlide() {
                const nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            }

            function startSlider() {
                stopSlider();
                slideInterval = setInterval(nextSlide, slideIntervalTime);
                showSlide(currentSlide); // Initial call
            }

            function stopSlider() {
                clearInterval(slideInterval);
            }

            navNumbers.forEach(num => {
                num.addEventListener('click', () => {
                    stopSlider();
                    const slideIndex = parseInt(num.getAttribute('data-slide'));
                    showSlide(slideIndex);
                    startSlider();
                });
            });

            startSlider();
        });







// --- Mobile Menu ---
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));

        // --- Header Scroll Effect ---
        const header = document.querySelector(".header");
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) { header.classList.add("scrolled"); }
            else { header.classList.remove("scrolled"); }
        });

        // --- Initialize AOS ---
        AOS.init({ duration: 1000, once: true });

        // --- Hero Slider Initialization ---
        const heroSlider = new Swiper('.hero-slider', {
            loop: true,
            grabCursor: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
            autoplay: { delay: 6000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            on: {
                init: function () {
                    animateSlide(this.slides[this.activeIndex]);
                },
                slideChangeTransitionStart: function () {
                    // Reset opacity of previous slide's content before animating new slide
                    const previousSlide = this.slides[this.previousIndex];
                    gsap.set(previousSlide.querySelectorAll('.hero-title, .hero-subtitle, .btn, .hero-image-wrapper, .floating-shape'), { opacity: 0 });

                    // Animate the content of the currently active slide
                    animateSlide(this.slides[this.activeIndex]);
                }
            }
        });

        // --- GSAP Animation for Slide Content ---
        function animateSlide(slide) {
            // Ensure elements are initially hidden before animation
            gsap.set(slide.querySelectorAll('.hero-title, .hero-subtitle, .btn, .hero-image-wrapper, .floating-shape'), { opacity: 0 });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.to(slide.querySelector('.hero-title'), { duration: 1, x: 0, opacity: 1, delay: 0.5, clearProps: 'all' })
                .to(slide.querySelector('.hero-subtitle'), { duration: 1, x: 0, opacity: 1 }, "-=0.7")
                .to(slide.querySelector('.btn'), { duration: 0.8, y: 0, opacity: 1 }, "-=0.7")
                .to(slide.querySelector('.hero-image-wrapper'), { duration: 1.2, scale: 1, opacity: 1 }, "-=0.8")
                .to(slide.querySelectorAll('.floating-shape'), { duration: 1.5, scale: 1, opacity: 1, stagger: 0.2 }, "-=1");
        }

        // --- GSAP Header Animation ---
        const headerTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        headerTl.from(".logo", { duration: 0.8, y: -50, opacity: 0, delay: 0.2 });
        headerTl.from(".nav-item", { duration: 0.5, y: -30, opacity: 0, stagger: 0.15 }, "-=0.2");

         // GSAP Number Counting Animation
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.utils.toArray('.stat-number').forEach(number => {
            let target = number.dataset.target;
            gsap.from(number, {
                textContent: 0,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: number,
                    start: "top 80%", // Animation kab start ho
                }
            });
        }); 
 
 
 // Initialize AOS (Animate on Scroll)
        AOS.init({
            duration: 1000,
            once: true,
        });

        // GSAP Number Counting Animation
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.stat-number').forEach(numberElement => {
            const target = parseInt(numberElement.dataset.target, 10);
            const counter = { value: 0 }; // Start value

            gsap.to(counter, {
                value: target,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: numberElement,
                    start: "top 85%", // Animation kab start ho
                },
                onUpdate: () => {
                    numberElement.textContent = Math.ceil(counter.value);
                }
            });
        });


         // Initialize AOS (Animate on Scroll)
        AOS.init({
            duration: 1000,
            once: true,
        });

        // ================== ABOUT US TABS LOGIC ==================
        const tabButtons = document.querySelectorAll(".tab-btn");
        const tabContents = document.querySelectorAll(".about-tab-content");
        const tabImages = document.querySelectorAll(".about-img");

        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const targetContent = button.dataset.target;

                // Animate out current content and image
                const activeContent = document.querySelector(".about-tab-content.active");
                const activeImage = document.querySelector(".about-img.active");
                
                const tl = gsap.timeline();
                tl.to([activeContent, activeImage], {
                    duration: 0.3,
                    opacity: 0,
                    y: 10,
                    ease: "power2.in",
                    onComplete: () => {
                        // Remove active classes
                        tabButtons.forEach(btn => btn.classList.remove("active"));
                        tabContents.forEach(content => content.classList.remove("active"));
                        tabImages.forEach(img => img.classList.remove("active"));

                        // Add active class to the new target
                        button.classList.add("active");
                        const newContent = document.querySelector(`.about-tab-content[data-content="${targetContent}"]`);
                        const newImage = document.querySelector(`.about-img[data-content="${targetContent}"]`);
                        
                        newContent.classList.add("active");
                        newImage.classList.add("active");

                        // Animate in new content and image
                        gsap.fromTo([newContent, newImage], 
                            { opacity: 0, y: -10 }, 
                            { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }
                        );
                    }
                });
            });
        });




         // Initialize AOS (Animate on Scroll)
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });

        // Parallax effect for floating icons AND background
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".team-background-parallax", {
            y: "-30%",
            ease: "none",
            scrollTrigger: {
                trigger: "#team-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });

        gsap.utils.toArray(".floating-success-elements .icon").forEach(icon => {
            const speed = icon.dataset.speed || 1;
            gsap.to(icon, {
                y: "-50vh" * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: "#team-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
        });


         // Initialize AOS (Animate on Scroll)
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });

        gsap.registerPlugin(ScrollTrigger);
        
        // GSAP Number Counting Animation
        gsap.utils.toArray('.milestone-number').forEach(numberElement => {
            const target = parseInt(numberElement.dataset.target, 10);
            const counter = { value: 0 }; // Start value

            gsap.to(counter, {
                value: target,
                duration: 2.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: numberElement,
                    start: "top 85%",
                },
                onUpdate: () => {
                    numberElement.textContent = Math.ceil(counter.value).toLocaleString('en-IN'); // Indian comma style
                }
            });
        });

        // Parallax for floating icons
        gsap.utils.toArray(".milestones-floating-icons .icon").forEach(icon => {
            const speed = icon.dataset.speed || 1;
            gsap.to(icon, {
                y: "-40vh" * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: "#milestones-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
        });

        // Initialize AOS (Animate on Scroll)
        AOS.init({
            duration: 800,
            once: true,
            offset: 150,
        });


          // Initialize AOS (Animate on Scroll)
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });

        // ================== WORKING CONTACT FORM ==================
        // const contactForm = document.getElementById('horizon-contact-form');
        // const successMessage = document.getElementById('h-success-message');

        // contactForm.addEventListener('submit', function(event) {
        //     event.preventDefault();
        //     let isValid = true;
        //     document.querySelectorAll('#horizon-contact-form .h-error-message').forEach(el => el.style.display = 'none');

         
        //     const fields = [
        //         {id: 'h-first-name', type: 'text'},
        //         {id: 'h-last-name', type: 'text'},
        //         {id: 'h-email', type: 'email'},
        //         {id: 'h-message', type: 'text'},
        //         {id: 'h-terms', type: 'checkbox'}
        //     ];

        //     fields.forEach(fieldInfo => {
        //         const field = document.getElementById(fieldInfo.id);
        //         let fieldValid = true;
                
        //         if (field.type === 'checkbox') {
        //             if (!field.checked) fieldValid = false;
        //         } else if (field.value.trim() === '') {
        //             fieldValid = false;
        //         } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        //             fieldValid = false;
        //         }

        //         if (!fieldValid) {
        //             const errorMsg = field.parentElement.querySelector('.h-error-message');
        //             if(errorMsg) errorMsg.style.display = 'block';
        //             isValid = false;
        //         }
        //     });

        //     if (isValid) {
        //         const formData = new FormData(contactForm);
        //         const data = Object.fromEntries(formData.entries());
        //         console.log("Form Submitted Data:", data);

        //         contactForm.reset();
        //         successMessage.style.display = 'block';
        //         setTimeout(() => successMessage.style.display = 'none', 5000);
        //     }
        // });



        // new working fomr

         const contactForm = document.getElementById('horizon-contact-form');
    const successMessage = document.getElementById('h-success-message');

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Page reload ko rokega
        
        // Validation ka code yahan daal sakte hain (abhi ke liye simple rakha hai)

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        successMessage.textContent = 'Sending...';
        successMessage.style.display = 'block';
        successMessage.style.color = 'gray';

        try {
            // Data ko aapke local backend server par bhejega
            const response = await fetch('https://horizon-hr-backend.onrender.com/submit-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                successMessage.textContent = 'Thank you! Your message has been sent.';
                successMessage.style.color = 'green';
                contactForm.reset();
            } else {
                throw new Error('Server responded with an error.');
            }
        } catch (error) {
            console.error('Error:', error);
            successMessage.textContent = 'Oops! Something went wrong. Please try again.';
            successMessage.style.color = 'red';
        }

        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });
        // new working fomr


         // Initialize AOS (Animate on Scroll)
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });

        // Parallax Effect for Background Image
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".page-header-bg-parallax", {
            y: "30%", // Background image ko neeche move karo jab scroll ho
            ease: "none",
            scrollTrigger: {
                trigger: "#page-header-section",
                start: "top bottom", // Jab section ka top, viewport ke bottom se mile
                end: "bottom top", // Jab section ka bottom, viewport ke top se mile
                scrub: 1.5, // Smooth scrubbing effect
            }
        });





        // Initialize AOS (Animate on Scroll)
        AOS.init({ duration: 800, once: true, offset: 50 });

        // Parallax Effect for Background Image
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".page-header-bg-parallax", {
            y: "30%", ease: "none",
            scrollTrigger: {
                trigger: "#page-header-section", start: "top bottom", end: "bottom top", scrub: 1.5,
            }
        });

        // ABOUT US TABS LOGIC (REDESIGNED)
        const principleCards = document.querySelectorAll(".principle-card");
        const contentPanes = document.querySelectorAll(".principle-content-pane");
        const displayWrapper = document.querySelector(".principle-display-wrapper");

        function showContent(target) {
            const newContent = document.querySelector(`.principle-content-pane[data-content="${target}"]`);
            const newBg = document.querySelector(`.principle-card[data-target="${target}"]`).dataset.bg;
            
            displayWrapper.style.backgroundImage = `url('${newBg}')`;
            gsap.fromTo(newContent, { opacity: 0, y: 20 }, { duration: 0.6, opacity: 1, y: 0, ease: 'power3.out' });
        }

        const initialTarget = document.querySelector('.principle-card.active').dataset.target;
        document.querySelector(`.principle-content-pane[data-content="${initialTarget}"]`).style.opacity = 1;
        showContent(initialTarget);
        
        principleCards.forEach(card => {
            card.addEventListener("click", () => {
                const target = card.dataset.target;
                const activeCard = document.querySelector('.principle-card.active');
                const activeContent = document.querySelector('.principle-content-pane[style*="opacity: 1"]');

                if (activeCard === card) return;

                activeCard.classList.remove('active');
                card.classList.add('active');

                gsap.to(activeContent, {
                    duration: 0.4,
                    opacity: 0,
                    y: -20,
                    ease: "power3.in",
                    onComplete: () => {
                        showContent(target);
                    }
                });
            });
        });

          // GSAP Number Counting Animation
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.stat-number-v2').forEach(numberElement => {
            const target = parseInt(numberElement.dataset.target, 10);
            const counter = { value: 0 };

            gsap.to(counter, {
                value: target,
                duration: 2.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: numberElement,
                    start: "top 85%",
                },
                onUpdate: () => {
                    numberElement.textContent = Math.ceil(counter.value).toLocaleString('en-IN');
                }
            });
        });


          // SERVICE MODAL LOGIC
        const seeMoreLinks = document.querySelectorAll('.see-more-link-v2');
        const modalContainer = document.getElementById('service-modal-container');
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalCloseBtn = document.querySelector('.modal-close-btn');
        const modalDynamicContent = document.getElementById('modal-dynamic-content');

        const serviceDetails = {
            search: {
                title: "Executive Search",
                description: "Finding the right leadership is crucial for navigating India's dynamic market. Our executive search process is discreet, thorough, and focused on identifying high-impact leaders who can steer your organization towards its goals. We handle C-Suite, Board level, and other senior leadership roles with utmost confidentiality and professionalism.",
                benefits: ["Confidential and strategic approach", "In-depth industry and market analysis", "Access to an exclusive network of top-tier executives", "Rigorous assessment and referencing"]
            },
            staffing: {
                title: "Permanent Staffing",
                description: "We understand that a strong team is the backbone of any successful business in India. Our permanent staffing solutions are designed to find you not just employees, but long-term partners who align with your company's vision, culture, and values.",
                benefits: ["Access to a vast, pre-screened talent pool", "Reduced time-to-hire for critical roles", "Focus on cultural and long-term fit", "Comprehensive support from sourcing to onboarding"]
            },
            outsourcing: {
                title: "Recruitment Process Outsourcing",
                description: "Whether it's a short-term project or a long-term business requirement, our RPO solutions provide the cream quality and skilled candidates you need. We act as an extension of your HR team, managing the entire recruitment lifecycle efficiently.",
                benefits: ["Scalable and cost-effective solutions", "Improved quality of hire", "Access to advanced recruitment technology", "Reduced administrative burden"]
            },
            resume: {
                title: "Resume Writing & Career Advisory",
                description: "In a competitive job market, a powerful resume is essential. Our expert services help candidates create professional, impactful resumes that stand out to recruiters. We also provide career advisory to guide jobseekers on their path.",
                benefits: ["ATS-friendly resume formatting", "Highlighting key skills and achievements", "Personalized career path guidance", "Interview preparation support"]
            },
            advisory: {
                title: "HR Advisory",
                description: "Beyond recruitment, we partner with you to develop and streamline your HR processes. From compliance to performance management, our advisory services are tailored for the unique challenges of the Indian business landscape, ensuring your HR functions are efficient and effective.",
                benefits: ["Policy design and implementation", "Performance and talent management strategies", "Compliance with Indian labour laws", "Organizational structuring"]
            },
            startup: {
                title: "Startup Hiring",
                description: "Startups require a unique blend of talent that is adaptable, innovative, and driven. We offer specialized hiring solutions for the dynamic and fast-paced environment of Indian startups, helping you build a foundational team that can scale with your growth.",
                benefits: ["Access to talent with a startup mindset", "Fast-paced hiring for rapid scaling", "Flexible and cost-effective models", "Expertise in technical and non-technical roles"]
            }
        };

        function openModal(serviceKey) {
            const details = serviceDetails[serviceKey];
            if (!details) return;

            let benefitsHtml = '<ul>';
            details.benefits.forEach(benefit => {
                benefitsHtml += `<li><span class="icon"><i class="fas fa-check-circle"></i></span>${benefit}</li>`;
            });
            benefitsHtml += '</ul>';

            modalDynamicContent.innerHTML = `
                <h2>${details.title}</h2>
                <p>${details.description}</p>
                ${benefitsHtml}
            `;

            modalContainer.classList.add('active');
            document.body.classList.add('modal-open');
        }

        function closeModal() {
            modalContainer.classList.remove('active');
            document.body.classList.remove('modal-open');
            // Clear content after animation
            setTimeout(() => {
                modalDynamicContent.innerHTML = '';
            }, 400);
        }

        seeMoreLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceKey = e.target.closest('.see-more-link-v2').dataset.service;
                openModal(serviceKey);
            });
        });

        modalOverlay.addEventListener('click', closeModal);
        modalCloseBtn.addEventListener('click', closeModal);


        // new home
        
        // new home