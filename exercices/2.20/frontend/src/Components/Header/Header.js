import { clearPage } from '../../utils/render';

const Header = () => {
    clearPage();
    renderHeader();
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


    document.addEventListener('DOMContentLoaded', () => {
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
      });
      
 
}

export default Header;