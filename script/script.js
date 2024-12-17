document.addEventListener('DOMContentLoaded', () => {
    const JsProject1 = document.getElementById('countries');
    const JsProject2 = document.getElementById('shopping');
    const JsProject3 = document.getElementById('ttt');
    const JsProject4 = document.getElementById('math');
    const JsProject5 = document.getElementById('war');
    const JsProject6 = document.getElementById('weather');

    JsProject1.addEventListener('click', () => {
        window.location.href = 'JavaScript Projects/countries/projectPageCountries.html';
    });

    JsProject2.addEventListener('click', () => {
        window.location.href = 'JavaScript Projects/shoppingList/projectPageShoppingList.html';
    });
    JsProject3.addEventListener('click', () => {
        window.location.href = 'JavaScript Projects/ticTacToe/projectPageTicTacToe.html';
    });
    JsProject4.addEventListener('click', () => {
        window.location.href = 'JavaScript Projects/math/projectPageMath.html';
    });
    JsProject5.addEventListener('click', () => {
        window.location.href = 'JavaScript Projects/war/projectPageWar.html';
    });
    JsProject6.addEventListener('click', () => {
        window.location.href = 'JavaScript Projects/weather/projectPageWeather.html';
    });



    const contactButton = document.getElementById('contact-submit-button');
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    const contactPhone = document.getElementById('contact-phone');
    const contactContent = document.getElementById('contact-content');
    const contactForm = document.querySelector('.form');


    if (contactButton && contactForm) {
        contactButton.addEventListener('click', (e) => {
            e.preventDefault();

            if (contactForm.checkValidity()) {
                // If all fields are filled and valid, clear the values
                contactName.value = '';
                contactEmail.value = '';
                contactPhone.value = '';
                contactContent.value = '';
            } else {
                contactForm.reportValidity();
            }
        });
    }
});