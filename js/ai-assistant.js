/**
 * WM Attire AI Assistant - Animated Glow UI
 * Siri-inspired with fashion-tech branding
 * States: Idle, Listening, Processing, Speaking, Muted
 */

class WMAssistant {
    constructor() {
        this.state = 'idle'; // idle, listening, processing, speaking, muted
        this.canvas = null;
        this.ctx = null;
        this.animationFrame = null;
        this.audioLevel = 0;
        this.time = 0;
        this.isInitialized = false;
        
        // Brand colors - deep purple, soft blue, subtle pink
        this.colors = {
            purple: { r: 138, g: 43, b: 226 },  // Deep purple
            blue: { r: 100, g: 149, b: 237 },    // Soft blue  
            pink: { r: 255, g: 182, b: 193 }     // Subtle pink
        };
        
        this.init();
    }
    
    init() {
        // Create container
        const container = document.createElement('div');
        container.id = 'wm-assistant';
        container.className = 'wm-assistant-container';
        
        // Create canvas for glow effect
        this.canvas = document.createElement('canvas');
        this.canvas.width = 120;
        this.canvas.height = 120;
        this.ctx = this.canvas.getContext('2d');
        
        // Create button wrapper
        const button = document.createElement('button');
        button.className = 'wm-assistant-button';
        button.setAttribute('aria-label', 'WM Attire AI Assistant');
        
        // Add mic icon
        const icon = document.createElement('div');
        icon.className = 'wm-assistant-icon';
        icon.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 12C19 15.866 15.866 19 12 19C8.134 19 5 15.866 5 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 19V23" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        
        button.appendChild(this.canvas);
        button.appendChild(icon);
        container.appendChild(button);
        
        // Add tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'wm-assistant-tooltip';
        tooltip.textContent = 'Talk to WM Attire AI';
        container.appendChild(tooltip);
        
        // Add to page
        document.body.appendChild(container);
        
        // Event listeners
        button.addEventListener('click', () => this.handleClick());
        button.addEventListener('mousedown', () => this.handleLongPressStart());
        button.addEventListener('mouseup', () => this.handleLongPressEnd());
        button.addEventListener('touchstart', () => this.handleLongPressStart());
        button.addEventListener('touchend', () => this.handleLongPressEnd());
        
        this.isInitialized = true;
        this.startAnimation();
                container.classList.add('visible');
    }
    
    startAnimation() {
        const animate = () => {
            this.time += 0.016; // ~60fps
            this.draw();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }
    
    draw() {
        const { canvas, ctx } = this;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw based on state
        switch(this.state) {
            case 'idle':
                this.drawIdleState(centerX, centerY);
                break;
            case 'listening':
                this.drawListeningState(centerX, centerY);
                break;
            case 'processing':
                this.drawProcessingState(centerX, centerY);
                break;
            case 'speaking':
                this.drawSpeakingState(centerX, centerY);
                break;
            case 'muted':
                this.drawMutedState(centerX, centerY);
                break;
        }
    }
    
    drawIdleState(x, y) {
        // Soft slow pulse
        const pulseSize = 30 + Math.sin(this.time * 1.5) * 5;
        const opacity = 0.3 + Math.sin(this.time * 1.5) * 0.15;
        
        this.drawGlow(x, y, pulseSize, opacity, this.colors.purple);
    }
    
    drawListeningState(x, y) {
        // Active pulse synced to mic (simulated with audio level)
        const pulseSize = 35 + this.audioLevel * 15 + Math.sin(this.time * 3) * 8;
        const opacity = 0.5 + this.audioLevel * 0.3;
        
        // Multi-layer glow with purple and blue
        this.drawGlow(x, y, pulseSize * 1.2, opacity * 0.6, this.colors.blue);
        this.drawGlow(x, y, pulseSize, opacity, this.colors.purple);
        
        // Add ring effect
        this.drawRing(x, y, pulseSize + 10, opacity * 0.4, this.colors.pink);
    }
    
    drawProcessingState(x, y) {
        // Smooth rotating gradient
        const size = 35;
        const rotation = this.time * 2;
        
        // Draw rotating gradient circles
        for (let i = 0; i < 3; i++) {
            const angle = rotation + (i * Math.PI * 2 / 3);
            const offsetX = Math.cos(angle) * 15;
            const offsetY = Math.sin(angle) * 15;
            const color = i === 0 ? this.colors.purple : i === 1 ? this.colors.blue : this.colors.pink;
            
            this.drawGlow(x + offsetX, y + offsetY, size * 0.6, 0.4, color);
        }
    }
    
    drawSpeakingState(x, y) {
        // Glow synced to voice (simulated with wave pattern)
        const waveAmplitude = Math.abs(Math.sin(this.time * 4)) * 15;
        const size = 35 + waveAmplitude;
        const opacity = 0.4 + Math.abs(Math.sin(this.time * 4)) * 0.3;
        
        // Create wave effect with multiple layers
        this.drawGlow(x, y, size * 1.3, opacity * 0.4, this.colors.blue);
        this.drawGlow(x, y, size, opacity, this.colors.purple);
        this.drawGlow(x, y, size * 0.7, opacity * 0.8, this.colors.pink);
    }
    
    drawMutedState(x, y) {
        // Dim glow
        const pulseSize = 25;
        const opacity = 0.15;
        
        this.drawGlow(x, y, pulseSize, opacity, { r: 150, g: 150, b: 150 });
    }
    
    drawGlow(x, y, size, opacity, color) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
        
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawRing(x, y, size, opacity, color) {
        this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    handleClick() {
        // Toggle mute
        if (this.state === 'muted') {
            this.setState('idle');
        } else {
            this.setState('muted');
        }
    }
    
    handleLongPressStart() {
        this.longPressTimer = setTimeout(() => {
            if (this.state !== 'muted') {
                this.setState('listening');
                this.startListening();
            }
        }, 500);
    }
    
    handleLongPressEnd() {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
        }
        
        if (this.state === 'listening') {
            this.setState('processing');
            this.processInput();
        }
    }
    
    setState(newState) {
        this.state = newState;
        const container = document.getElementById('wm-assistant');
        
        if (container) {
            container.setAttribute('data-state', newState);
        }
    }
    
    startListening() {
        // Simulate audio level changes
        this.audioLevelInterval = setInterval(() => {
            this.audioLevel = Math.random() * 0.8 + 0.2;
        }, 100);
    }
    
    processInput() {
        if (this.audioLevelInterval) {
            clearInterval(this.audioLevelInterval);
        }
        
        // Simulate processing time
        setTimeout(() => {
            this.setState('speaking');
            
            // Simulate response duration
            setTimeout(() => {
                this.setState('idle');
            }, 3000);
        }, 2000);
    }
    
    // Public API
    show() {
        const container = document.getElementById('wm-assistant');
        if (container) container.classList.add('visible');
    }
    
    hide() {
        const container = document.getElementById('wm-assistant');
        if (container) container.classList.remove('visible');
    }
    
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.audioLevelInterval) {
            clearInterval(this.audioLevelInterval);
        }
        const container = document.getElementById('wm-assistant');
        if (container) {
            container.remove();
        }
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.wmAssistant = new WMAssistant();
    });
} else {
    window.wmAssistant = new WMAssistant();
}
