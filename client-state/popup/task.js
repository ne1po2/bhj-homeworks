const modal = document.getElementById('subscribe-modal');
const closeButton = document.querySelector('.modal__close');

function closeModal() {
    modal.classList.remove('modal_active');
}

closeButton.addEventListener('click', () => {
    closeModal();
    document.cookie = 'modalClosed=true';
});

function checkModalStatus() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'modalClosed' && value.trim() === 'true') {
            return false;
        }
    }
    return true;
}

if (checkModalStatus()) {
    modal.classList.add('modal_active');
}
