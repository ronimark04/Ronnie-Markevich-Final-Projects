document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('button');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const exp = document.getElementById('exp');
    const contactForm = document.querySelector('.form');

    const mobileSubmitButton = document.getElementById('mobile-button');
    const mobileName = document.getElementById('mobile-name');
    const mobileEmail = document.getElementById('mobile-email');
    const mobileExp = document.getElementById('mobile-exp');
    const mobileContactForm = document.querySelector('.mobile-form');

    if (contactForm && submitButton) {

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            if (contactForm.checkValidity()) {
                name.value = '';
                email.value = '';
                exp.value = '';
            } else {
                contactForm.reportValidity();
            }
        });
    }
    if (mobileContactForm && mobileSubmitButton) {

        mobileSubmitButton.addEventListener('click', (e) => {
            e.preventDefault();

            if (mobileContactForm.checkValidity()) {
                mobileName.value = '';
                mobileEmail.value = '';
                mobileExp.value = '';
            } else {
                mobileContactForm.reportValidity();
            }
        });
    }
});