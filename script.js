document.addEventListener('DOMContentLoaded', () => {
    const downloadLinks = document.querySelectorAll('.download-link');
    const confirmationLinks = document.querySelectorAll('.download-confirmation');
    const modal = document.getElementById('download-modal');
    const standardDownloadMessage = document.getElementById('standard-download-message');
    const updaterDownloadMessage = document.getElementById('updater-download-message');
    const confirmButton = document.getElementById('confirm-download');
    const gmToggle = document.querySelector('.toggle-gm-table');
    const gmTable = document.querySelector('.gm-download-table');
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('download-password');
    const passwordError = document.getElementById('password-error');
    const acceptPasswordButton = document.getElementById('accept-password');
    const cancelPasswordButton = document.getElementById('cancel-password');
    const correctPassword = 'ganamas0123';
    let pendingDownloadUrl = '';

    const clearPasswordError = () => {
        if (!passwordError) return;
        passwordError.hidden = true;
        passwordError.textContent = 'Contraseña incorrecta';
        passwordInput.setAttribute('aria-invalid', 'false');
    };

    downloadLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            pendingDownloadUrl = link.dataset.url;
            passwordInput.value = '';
            passwordModal.classList.add('show');
            passwordModal.setAttribute('aria-hidden', 'false');
            passwordInput.focus();
        });
    });

    const closePasswordModal = () => {
        passwordModal.classList.remove('show');
        passwordModal.setAttribute('aria-hidden', 'true');
        passwordInput.value = '';
        clearPasswordError();
    };

    if (acceptPasswordButton) {
        acceptPasswordButton.addEventListener('click', () => {
            if (passwordInput.value === correctPassword) {
                closePasswordModal();
                window.location.href = pendingDownloadUrl;
            } else {
                if (passwordError) {
                    passwordError.hidden = false;
                    passwordError.textContent = 'Contraseña incorrecta';
                }
                passwordInput.setAttribute('aria-invalid', 'true');
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }

    if (cancelPasswordButton) {
        cancelPasswordButton.addEventListener('click', closePasswordModal);
    }

    if (passwordModal) {
        passwordModal.addEventListener('click', (event) => {
            if (event.target === passwordModal) {
                closePasswordModal();
            }
        });

        passwordInput.addEventListener('input', () => {
            clearPasswordError();
        });

        passwordInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                acceptPasswordButton.click();
            }
        });
    }

    if (gmToggle && gmTable) {
        gmToggle.addEventListener('click', () => {
            const isOpen = gmTable.classList.toggle('show');
            gmTable.setAttribute('aria-hidden', String(!isOpen));
            gmToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    if (modal && confirmButton) {
        confirmationLinks.forEach((downloadLink) => {
            downloadLink.addEventListener('click', (event) => {
                event.preventDefault();
                pendingDownloadUrl = downloadLink.href;
                const isUpdater = downloadLink.dataset.downloadType === 'updater';
                standardDownloadMessage.hidden = isUpdater;
                updaterDownloadMessage.hidden = !isUpdater;
                modal.classList.add('show');
                modal.setAttribute('aria-hidden', 'false');
            });
        });

        confirmButton.addEventListener('click', () => {
            if (pendingDownloadUrl) {
                window.location.href = pendingDownloadUrl;
            }
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    }
});
