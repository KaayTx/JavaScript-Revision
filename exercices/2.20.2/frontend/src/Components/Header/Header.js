import { clearPage } from '../../utils/render';

const Header = () => {
    clearPage();
    renderHeader();
    renderModal();
    setupThemeToggle();
    setupPrivacyModal();
}

function renderHeader() {
    const h1 = document.createElement('h1');
    h1.textContent = 'My application';

    const button = document.createElement('button');
    button.textContent = 'Switch to Dark Mode';
    button.id = "theme-toggle";

    const header = document.querySelector('header');
    header.appendChild(h1);
    header.appendChild(button);
}

function setupThemeToggle() {
    const themeToggleButton = document.getElementById('theme-toggle');
      
    // Vérifiez si un thème est déjà sauvegardé dans le localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.add(savedTheme);
      if (savedTheme === 'dark-theme') {
        themeToggleButton.textContent = 'Switch to Light Mode';
      }
    }
  
    // Ajouter un écouteur d'événement au bouton pour basculer entre les thèmes
    themeToggleButton.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
      const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
  
      // Basculer le thème
      document.body.classList.remove(currentTheme);
      document.body.classList.add(newTheme);
  
      // Sauvegarder le thème dans le localStorage
      localStorage.setItem('theme', newTheme);
  
      // Mettre à jour le texte du bouton
      themeToggleButton.textContent = newTheme === 'dark-theme' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });
}

function renderModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = "privacy-modal";
  
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    const h2 = document.createElement('h2');
    h2.textContent = 'Privacy Policy';
    const p = document.createElement('p');
    p.textContent = 'Nous respectons votre vie privée. En utilisant cette application, vous acceptez que nous traitions vos données conformément à notre politique de confidentialité. Vos préférences seront sauvegardées pour améliorer votre expérience utilisateur.';
    const button = document.createElement('button');
    button.id = 'accept-policy';
    button.textContent = 'I Accept';
  
    modalContent.appendChild(h2);
    modalContent.appendChild(p);
    modalContent.appendChild(button);
    modal.appendChild(modalContent);

    // Ajout de la modal au body
    document.body.appendChild(modal);
}

function setupPrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    const acceptButton = document.getElementById('accept-policy');
  
    // Vérifiez si le consentement a déjà été donné
    const consentGiven = localStorage.getItem('privacyConsent');
  
    if (!consentGiven) {
      // Affiche la modal si aucun consentement n'a été donné
      modal.style.display = 'flex';
    }
  
    // Ajoutez un écouteur d'événement pour le bouton OK
    acceptButton.addEventListener('click', () => {
      // Masque la modal
      modal.style.display = 'none';
  
      // Sauvegarde le consentement dans le localStorage
      localStorage.setItem('privacyConsent', 'true');
    });
}

export default Header;
