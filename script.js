document.addEventListener('DOMContentLoaded', () => {
    const link = document.querySelector('.download-link');

    if (!link) return;

    link.addEventListener('click', (event) => {
        event.preventDefault();

        const password = prompt('Ingrese la contraseña para descargar este archivo:');
        const correctPassword = 'ganamas0123';

        if (password === null) {
            return;
        }

        if (password === correctPassword) {
            window.location.href = link.dataset.url;
        } else {
            alert('Contraseña incorrecta');
        }
    });
});
