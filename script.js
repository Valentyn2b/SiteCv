
// ОС та браузер
function getOSAndBrowser() {
    const userAgent = navigator.userAgent;
    let os = "Невідома ОС";
    let browser = "Невідомий браузер";

    // ОС
    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
    if (userAgent.indexOf("X11") !== -1 || userAgent.indexOf("Linux") !== -1) os = "Linux";

    // браузер
    if (userAgent.indexOf("Chrome") !== -1 && userAgent.indexOf("Edg") === -1) browser = "Google Chrome";
    else if (userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1) browser = "Safari";
    else if (userAgent.indexOf("Firefox") !== -1) browser = "Mozilla Firefox";
    else if (userAgent.indexOf("Edg") !== -1) browser = "Microsoft Edge";

    return `Ваша ОС: ${os} | Ваш браузер: ${browser}`;
}

const systemInfo = getOSAndBrowser();
localStorage.setItem("userSystemInfo", systemInfo); 

// відгуки

async function fetchComments() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/5/comments');
        
        const comments = await response.json();
        
        const container = document.getElementById('comments-container');
        
        comments.forEach(comment => {
            const commentBox = document.createElement('div');
            commentBox.style.borderLeft = "4px solid #000";
            commentBox.style.paddingLeft = "15px";
            commentBox.style.marginBottom = "20px";
            commentBox.style.backgroundColor = "#f9f9f9";
            commentBox.style.padding = "10px 15px";
            
            commentBox.innerHTML = `
                <strong style="color: #333;">Від: ${comment.email}</strong>
                <p style="margin-top: 5px; font-style: italic;">"${comment.body}"</p>
            `;
            
            container.appendChild(commentBox);
        });
    } catch (error) {
        console.error("Помилка завантаження коментарів:", error);
    }
}


window.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('os-browser-info');
    if (footer) {
        footer.innerText = localStorage.getItem("userSystemInfo");
    }

    fetchComments();
});


const modal = document.getElementById('feedback-modal');
const closeModal = document.getElementById('close-modal');
//  1 хв = 60000 мілісекунд
setTimeout(() => {
    modal.style.display = 'flex';
}, 60000); 
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// ==========================================
// 4. Перехід на нічний/денний режим
// ==========================================
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Функція для автоматичного визначення теми за часом
function autoSetTheme() {
    const currentHour = new Date().getHours();
    
    // Денна тема від 07:00 до 21:00, у весь інший час - нічна
    if (currentHour >= 7 && currentHour < 21) {
        body.classList.remove('dark-mode');
    } else {
        body.classList.add('dark-mode');
    }
}

// Запускаємо перевірку часу при відкритті сторінки
autoSetTheme();

// Перемикач теми вручну (по кліку на кнопку)
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});