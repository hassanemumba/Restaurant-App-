document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#reservation form');
    const nameInput = form.querySelector('input[type="text"][placeholder="Your Name"]');
    nameInput.id = 'name';
    
    const emailInput = form.querySelector('input[type="email"]');
    emailInput.id = 'email';
    
    const datetimeInput = form.querySelector('input[type="text"][placeholder="Date & Time"]');
    datetimeInput.id = 'datetime';
    
    const peopleSelect = form.querySelector('select');
    peopleSelect.id = 'people';
    
    function addErrorMessage(input, message) {
        const parent = input.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.id = input.id + '-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff3333';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.style.display = 'none';
        parent.appendChild(errorDiv);
        return errorDiv;
    }
    
    const nameError = addErrorMessage(nameInput, 'Please enter your name');
    const emailError = addErrorMessage(emailInput, 'Please enter a valid email');
    const datetimeError = addErrorMessage(datetimeInput, 'Please enter date and time');
    const peopleError = addErrorMessage(peopleSelect, 'Please select number of people');
    
    function validateForm() {
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            nameInput.style.border = '1px solid #ff3333';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameInput.style.border = '1px solid #ccc';
            nameError.style.display = 'none';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.border = '1px solid #ff3333';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailInput.style.border = '1px solid #ccc';
            emailError.style.display = 'none';
        }
        
        if (datetimeInput.value.trim() === '') {
            datetimeInput.style.border = '1px solid #ff3333';
            datetimeError.style.display = 'block';
            isValid = false;
        } else {
            datetimeInput.style.border = '1px solid #ccc';
            datetimeError.style.display = 'none';
        }
        
        if (peopleSelect.value === 'No Of People') {
            peopleSelect.style.border = '1px solid #ff3333';
            peopleError.style.display = 'block';
            isValid = false;
        } else {
            peopleSelect.style.border = '1px solid #ccc';
            peopleError.style.display = 'none';
        }
        
        return isValid;
    }
    
    if (typeof Swal === 'undefined') {
        const sweetAlertScript = document.createElement('script');
        sweetAlertScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.head.appendChild(sweetAlertScript);
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Reservation Confirmed!',
                    text: 'Your table has been booked successfully.',
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            } else {
                alert('Reservation Confirmed! Your table has been booked successfully.');
                setTimeout(function() {
                }, 3000);
            }
            
            form.reset();
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        function createErrorMessage(inputElement, message) {
            let errorElement = inputElement.parentElement.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = '#dc3545';
                errorElement.style.fontSize = '12px';
                errorElement.style.marginTop = '5px';
                
                inputElement.parentElement.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            return errorElement;
        }
        
        function clearErrorMessage(inputElement) {
            const errorElement = inputElement.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
            inputElement.classList.remove('is-invalid');
        }
        
        function validateName(name) {
            if (name.trim() === '') {
                return 'Please enter your name';
            }
            return '';
        }
        
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.trim() === '') {
                return 'Please enter your email';
            } else if (!emailRegex.test(email)) {
                return 'Please enter a valid email address';
            }
            return '';
        }
        
        function validateSubject(subject) {
            if (subject.trim() === '') {
                return 'Please enter a subject';
            }
            return '';
        }
        
        function validateMessage(message) {
            if (message.trim() === '') {
                return 'Please enter your message';
            } else if (message.trim().length < 10) {
                return 'Message must be at least 10 characters long';
            }
            return '';
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            clearErrorMessage(nameInput);
            clearErrorMessage(emailInput);
            clearErrorMessage(subjectInput);
            clearErrorMessage(messageInput);
            
            let isValid = true;
            const nameError = validateName(nameInput.value);
            if (nameError) {
                createErrorMessage(nameInput, nameError);
                nameInput.classList.add('is-invalid');
                isValid = false;
            }
            
            const emailError = validateEmail(emailInput.value);
            if (emailError) {
                createErrorMessage(emailInput, emailError);
                emailInput.classList.add('is-invalid');
                isValid = false;
            }
            
            const subjectError = validateSubject(subjectInput.value);
            if (subjectError) {
                createErrorMessage(subjectInput, subjectError);
                subjectInput.classList.add('is-invalid');
                isValid = false;
            }
            
            const messageError = validateMessage(messageInput.value);
            if (messageError) {
                createErrorMessage(messageInput, messageError);
                messageInput.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your message has been sent successfully!',
                        icon: 'success',
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                } else {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
                    document.head.appendChild(script);
                    
                    script.onload = function() {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Your message has been sent successfully!',
                            icon: 'success',
                            timer: 3000,
                            timerProgressBar: true,
                            showConfirmButton: false
                        });
                    };
                    
                    script.onerror = function() {
                        alert('Message sent successfully!');
                    };
                }
                
                contactForm.reset();
            }
        });
        
        const nameInput = document.getElementById('name');
        nameInput.addEventListener('input', function() {
            const error = validateName(this.value);
            if (!error) {
                clearErrorMessage(this);
            }
        });
        
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('input', function() {
            const error = validateEmail(this.value);
            if (!error) {
                clearErrorMessage(this);
            }
        });
        
        const subjectInput = document.getElementById('subject');
        subjectInput.addEventListener('input', function() {
            const error = validateSubject(this.value);
            if (!error) {
                clearErrorMessage(this);
            }
        });
        
        const messageInput = document.getElementById('message');
        messageInput.addEventListener('input', function() {
            const error = validateMessage(this.value);
            if (!error) {
                clearErrorMessage(this);
            }
        });
    }
});