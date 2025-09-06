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
