  // Custom File Upload Logic
        // const fileInputV4 = document.getElementById('resumeV4');
        // const fileNameDisplayV4 = document.getElementById('file-name-display-v4');

        // fileInputV4.addEventListener('change', function() {
        //     if (this.files.length > 0) {
        //         fileNameDisplayV4.textContent = `File selected: ${this.files[0].name}`;
        //     } else {
        //         fileNameDisplayV4.textContent = '';
        //     }
        // });

         // --- File Name Display Logic ---
        const fileInput = document.getElementById('resumeV4');
        const fileNameDisplay = document.getElementById('file-name-display-v4');

        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileNameDisplay.textContent = `File selected: ${this.files[0].name}`;
            } else {
                fileNameDisplay.textContent = '';
            }
        });

        // --- Form Submission Logic ---
        const cvForm = document.getElementById('cv-form-final');
        const cvStatusMessage = document.getElementById('cv-form-status');

        cvForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const formData = new FormData(cvForm);

            cvStatusMessage.textContent = 'Submitting...';
            cvStatusMessage.style.color = 'gray';

            try {
                const response = await fetch('https://horizon-hr-backend.onrender.com/submit-resume', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    cvStatusMessage.textContent = 'Thank you! Your application has been submitted.';
                    cvStatusMessage.style.color = 'green';
                    cvForm.reset();
                    fileNameDisplay.textContent = '';
                } else {
                    throw new Error('Server responded with an error.');
                }
            } catch (error) {
                console.error('Error:', error);
                cvStatusMessage.textContent = 'Oops! Something went wrong. Please try again.';
                cvStatusMessage.style.color = 'red';
            }
        });

          // ACCORDION LOGIC
        const faqItems = document.querySelectorAll(".faq-item");

        faqItems.forEach(item => {
            const header = item.querySelector(".faq-header");
            const content = item.querySelector(".faq-content");
            const icon = item.querySelector(".faq-icon i");

            header.addEventListener("click", () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-content').style.maxHeight = 0;
                        otherItem.querySelector('.faq-icon i').classList.replace('fa-times', 'fa-plus');
                    }
                });

                // Toggle current item only if it wasn't the active one
                if (!isActive) {
                    item.classList.add("active");
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.classList.replace('fa-plus', 'fa-times');
                }
            });
        });