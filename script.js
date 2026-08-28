document.addEventListener('DOMContentLoaded', () => {
    const downloadLink = document.querySelector('.download-link');

    if (!downloadLink) return;

    downloadLink.addEventListener('click', (event) => {
        event.preventDefault();

        const password = prompt('Ingrese la contraseña para descargar este archivo:');
        const correctPassword = 'ganamas0123';

        if (password === null) {
            return;
        }

        if (password === correctPassword) {
            window.location.href = downloadLink.dataset.url;
        } else {
            alert('Contraseña incorrecta');
        }
    });
});
