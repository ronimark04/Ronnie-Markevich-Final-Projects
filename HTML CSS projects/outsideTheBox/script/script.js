document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('button');
    const name = document.getElementById('name');
    const name2 = document.getElementById('name2');
    const email = document.getElementById('email');
    const contactForm = document.querySelector('.form');

    if (contactForm && submitButton) {

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            if (contactForm.checkValidity()) {
                name.value = '';
                name2.value = '';
                email.value = '';
            } else {
                contactForm.reportValidity();
            }
        });
    }
});