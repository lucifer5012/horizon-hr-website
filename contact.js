 // --- Inquiry Form Submission Logic ---
    const inquiryForm = document.getElementById('inquiry-form');
    const inquiryStatusMessage = document.getElementById('inquiry-form-status');

    inquiryForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const formData = new FormData(inquiryForm);
        const data = Object.fromEntries(formData.entries());

        inquiryStatusMessage.textContent = 'Submitting...';
        inquiryStatusMessage.style.color = 'gray';

        try {
            // Yeh URL aapke local backend server ke naye /submit-inquiry route ko point kar raha hai
            const response = await fetch('https://horizon-hr-backend.onrender.com/submit-inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                inquiryStatusMessage.textContent = 'Thank you! Your inquiry has been submitted.';
                inquiryStatusMessage.style.color = 'green';
                inquiryForm.reset();
            } else {
                throw new Error('Server responded with an error.');
            }
        } catch (error) {
            console.error('Error:', error);
            inquiryStatusMessage.textContent = 'Oops! Something went wrong. Please try again.';
            inquiryStatusMessage.style.color = 'red';
        }
    });