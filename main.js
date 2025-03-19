import { config } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const addSheepBtn = document.getElementById('addSheepBtn');
    const sheepContainer = document.getElementById('sheepContainer');
    const sessionCountEl = document.getElementById('sessionCount');
    const totalCountEl = document.getElementById('totalCount');
    
    let sessionCount = 0;
    let totalCount = localStorage.getItem('totalSheepCount') ? parseInt(localStorage.getItem('totalSheepCount')) : 0;
    
    // Update the total count display
    totalCountEl.textContent = totalCount;
    
    addSheepBtn.addEventListener('click', () => {
        addSheep();
        updateCounts();
    });
    
    function addSheep() {
        const sheep = document.createElement('div');
        sheep.classList.add('sheep');
        
        // Set custom animation duration from config
        sheep.style.setProperty('--animation-duration', `${config.sheepAnimationDuration}s`);
        
        // Create SVG sheep
        const sheepSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        sheepSvg.setAttribute('width', config.sheepSize);
        sheepSvg.setAttribute('height', config.sheepSize);
        sheepSvg.setAttribute('viewBox', '0 0 100 100');
        
        // Body with more wool-like appearance
        const body = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        body.setAttribute('cx', '60');
        body.setAttribute('cy', '65');
        body.setAttribute('rx', '30');
        body.setAttribute('ry', '20');
        body.setAttribute('fill', config.sheepColor);
        body.setAttribute('stroke', config.sheepOutlineColor);
        body.setAttribute('stroke-width', '2');
        
        // Add fluffy texture to body
        const fluff1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        fluff1.setAttribute('cx', '40');
        fluff1.setAttribute('cy', '60');
        fluff1.setAttribute('r', '10');
        fluff1.setAttribute('fill', config.sheepColor);
        
        const fluff2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        fluff2.setAttribute('cx', '75');
        fluff2.setAttribute('cy', '60');
        fluff2.setAttribute('r', '10');
        fluff2.setAttribute('fill', config.sheepColor);
        
        const fluff3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        fluff3.setAttribute('cx', '60');
        fluff3.setAttribute('cy', '50');
        fluff3.setAttribute('r', '12');
        fluff3.setAttribute('fill', config.sheepColor);
        
        // Head
        const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        head.setAttribute('cx', '30');
        head.setAttribute('cy', '50');
        head.setAttribute('r', '15');
        head.setAttribute('fill', config.sheepColor);
        head.setAttribute('stroke', config.sheepOutlineColor);
        head.setAttribute('stroke-width', '2');
        
        // Eyes
        const eye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        eye.setAttribute('cx', '25');
        eye.setAttribute('cy', '45');
        eye.setAttribute('r', '3');
        eye.setAttribute('fill', config.sheepOutlineColor);
        
        // Add second eye
        const eye2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        eye2.setAttribute('cx', '35');
        eye2.setAttribute('cy', '45');
        eye2.setAttribute('r', '3');
        eye2.setAttribute('fill', config.sheepOutlineColor);
        
        // Legs
        const legPositions = [
            { x: 45, y: 80 },
            { x: 60, y: 80 },
            { x: 75, y: 80 },
            { x: 90, y: 80 } 
        ];
        
        const legs = legPositions.map(pos => {
            const leg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            leg.setAttribute('x1', pos.x);
            leg.setAttribute('y1', pos.y);
            leg.setAttribute('x2', pos.x);
            leg.setAttribute('y2', pos.y + 15);
            leg.setAttribute('stroke', config.sheepOutlineColor);
            leg.setAttribute('stroke-width', '3');
            leg.setAttribute('stroke-linecap', 'round');
            return leg;
        });
        
        // Append all parts to SVG
        sheepSvg.appendChild(fluff1);
        sheepSvg.appendChild(fluff2);
        sheepSvg.appendChild(fluff3);
        sheepSvg.appendChild(body);
        sheepSvg.appendChild(head);
        sheepSvg.appendChild(eye);
        sheepSvg.appendChild(eye2);
        legs.forEach(leg => sheepSvg.appendChild(leg));
        
        sheep.appendChild(sheepSvg);
        
        // Position sheep at a random position on the left side
        const startY = Math.random() * 150 + 20;
        sheep.style.left = '0';
        sheep.style.bottom = `${startY}px`;
        
        // Add the sheep to the container
        sheepContainer.appendChild(sheep);
        
        // Remove the sheep after animation completes
        setTimeout(() => {
            sheep.remove();
        }, config.sheepAnimationDuration * 1000);
    }
    
    function updateCounts() {
        sessionCount++;
        totalCount++;
        
        sessionCountEl.textContent = sessionCount;
        totalCountEl.textContent = totalCount;
        
        // Save to local storage
        localStorage.setItem('totalSheepCount', totalCount);
    }
});
