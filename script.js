import { settings } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const sheepButton = document.getElementById('sheep-button');
    const sheepContainer = document.getElementById('sheep-container');
    const sessionCountEl = document.getElementById('session-count');
    const totalCountEl = document.getElementById('total-count');
    const resetButton = document.getElementById('reset-button');
    const musicButton = document.getElementById('music-button');
    
    // Initialize counters
    let sessionCount = 0;
    let totalCount = parseInt(localStorage.getItem('totalSheepCount') || '0');
    
    // Set initial count display
    totalCountEl.textContent = totalCount;
    
    // Audio element for background music
    const bgMusic = new Audio(settings.musicUrl);
    bgMusic.loop = true;
    let isMusicPlaying = false;
    
    // SVG for sheep
    const sheepSvg = `
    <svg viewBox="0 0 100 100" class="sheep-svg">
        <!-- Body -->
        <ellipse cx="50" cy="60" rx="30" ry="25" fill="${settings.sheepBodyColor}" />
        
        <!-- Fluffy wool -->
        <circle cx="28" cy="50" r="10" fill="${settings.sheepWoolColor}" />
        <circle cx="38" cy="45" r="12" fill="${settings.sheepWoolColor}" />
        <circle cx="50" cy="40" r="14" fill="${settings.sheepWoolColor}" />
        <circle cx="62" cy="45" r="12" fill="${settings.sheepWoolColor}" />
        <circle cx="72" cy="50" r="10" fill="${settings.sheepWoolColor}" />
        <circle cx="30" cy="60" r="12" fill="${settings.sheepWoolColor}" />
        <circle cx="45" cy="62" r="14" fill="${settings.sheepWoolColor}" />
        <circle cx="60" cy="60" r="12" fill="${settings.sheepWoolColor}" />
        <circle cx="30" cy="75" r="10" fill="${settings.sheepWoolColor}" />
        <circle cx="50" cy="80" r="12" fill="${settings.sheepWoolColor}" />
        <circle cx="68" cy="75" r="10" fill="${settings.sheepWoolColor}" />
        
        <!-- Head -->
        <ellipse cx="30" cy="45" rx="12" ry="10" fill="#333" />
        
        <!-- Eyes -->
        <circle cx="27" cy="43" r="2" fill="white" />
        <circle cx="34" cy="43" r="2" fill="white" />
        
        <!-- Legs -->
        <rect x="38" y="80" width="4" height="15" fill="#333" />
        <rect x="58" y="80" width="4" height="15" fill="#333" />
    </svg>`;
    
    // Add sheep when button is clicked
    sheepButton.addEventListener('click', () => {
        // Create a new sheep element
        const sheep = document.createElement('div');
        sheep.classList.add('sheep');
        sheep.innerHTML = sheepSvg;
        
        // Random vertical position
        const topPosition = Math.random() * 50 + 10; // 10% to 60% from top
        sheep.style.top = `${topPosition}%`;
        
        // Add to container
        sheepContainer.appendChild(sheep);
        
        // Update counters
        sessionCount++;
        totalCount++;
        
        // Update display
        sessionCountEl.textContent = sessionCount;
        totalCountEl.textContent = totalCount;
        
        // Save to localStorage
        localStorage.setItem('totalSheepCount', totalCount.toString());
        
        // Remove sheep after animation completes
        setTimeout(() => {
            sheep.remove();
        }, 6000); // Match with animation duration
    });
    
    // Reset session count
    resetButton.addEventListener('click', () => {
        sessionCount = 0;
        sessionCountEl.textContent = sessionCount;
        
        // Add a subtle animation to the counter
        sessionCountEl.classList.add('reset-animation');
        setTimeout(() => {
            sessionCountEl.classList.remove('reset-animation');
        }, 300);
    });
    
    // Toggle background music
    musicButton.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicButton.textContent = '播放音樂';
        } else {
            bgMusic.play().catch(error => {
                console.log('音樂播放失敗:', error);
                alert('請點擊畫面後再嘗試播放音樂');
            });
            musicButton.textContent = '暫停音樂';
        }
        isMusicPlaying = !isMusicPlaying;
    });
});

