class SimonGame {
    constructor() {
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        this.bestScore = 0;
        this.gameState = 'waiting';
        this.showingIndex = 0;
        this.difficulty = 'normal';
        this.gameStats = {
            gamesPlayed: 0,
            totalScore: 0,
            maxLevel: 0,
            totalTime: 0
        };
        
        this.startTime = 0;
        this.currentTime = 0;
        this.inputTimeLimit = 0;
        this.inputTimer = null;
        this.gameTimer = null;
        
        this.colors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink', 'cyan'];
        this.activeColors = 4;
        
        this.difficultySettings = {
            normal: { 
                showDelay: 600, 
                buttonDelay: 400,
                timeLimit: 3000,
                sequenceMultiplier: 1.0,
                challengeFreq: 0
            },
            hard: { 
                showDelay: 400, 
                buttonDelay: 250,
                timeLimit: 2000,
                sequenceMultiplier: 1.2,
                challengeFreq: 0.2
            },
            extreme: { 
                showDelay: 250, 
                buttonDelay: 150,
                timeLimit: 1500,
                sequenceMultiplier: 1.5,
                challengeFreq: 0.4
            },
            nightmare: { 
                showDelay: 150, 
                buttonDelay: 100,
                timeLimit: 1000,
                sequenceMultiplier: 2.0,
                challengeFreq: 0.6
            }
        };
        
        this.challenges = [
            'reverse', 'invisible', 'double_speed', 'color_shift', 'memory_test'
        ];
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateDisplay();
        this.updateStats();
    }
    
    initializeElements() {
        this.currentScoreEl = document.getElementById('current-score');
        this.bestScoreEl = document.getElementById('best-score');
        this.currentLevelEl = document.getElementById('current-level');
        this.livesEl = document.getElementById('lives');
        this.gameStatusEl = document.getElementById('game-status');
        this.timerEl = document.getElementById('timer');
        
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.difficultySelect = document.getElementById('difficulty');
        
        this.simonButtons = document.querySelectorAll('.simon-button');
        
        this.gameOverModal = document.getElementById('game-over-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.finalScoreEl = document.getElementById('final-score');
        this.gameResultEl = document.getElementById('game-result');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        
        this.challengeOverlay = document.getElementById('challenge-overlay');
        this.challengeText = document.getElementById('challenge-text');
        
        this.gamesPlayedEl = document.getElementById('games-played');
        this.successRateEl = document.getElementById('success-rate');
        this.maxLevelEl = document.getElementById('max-level');
        this.totalTimeEl = document.getElementById('total-time');
    }
    
    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.difficultySelect.addEventListener('change', (e) => this.changeDifficulty(e.target.value));
        this.playAgainBtn.addEventListener('click', () => this.playAgain());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        
        this.simonButtons.forEach((button, index) => {
            button.addEventListener('click', () => this.handleButtonClick(index));
        });
        
        document.addEventListener('keydown', (e) => {
            if (this.gameState === 'playing') {
                const keyMap = { 
                    '1': 0, '2': 1, '3': 2, '4': 3,
                    '5': 4, '6': 5, '7': 6, '8': 7
                };
                if (keyMap[e.key] !== undefined) {
                    this.handleButtonClick(keyMap[e.key]);
                }
            }
        });
    }
    
    // Clear all timers to prevent conflicts
    clearAllTimers() {
        if (this.inputTimer) {
            clearInterval(this.inputTimer);
            this.inputTimer = null;
        }
        if (this.gameTimer) {
            clearTimeout(this.gameTimer);
            this.gameTimer = null;
        }
    }
    
    startGame() {
        // Clear any existing timers first
        this.clearAllTimers();
        
        this.gameState = 'playing';
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        this.showingIndex = 0;
        this.startTime = Date.now();
        this.activeColors = 4;
        
        // Reset all challenge states
        this.resetChallenges();
        
        this.startBtn.disabled = true;
        this.difficultySelect.disabled = true;
        this.updateDisplay();
        this.updateGameStatus('Watch the sequence...');
        this.updateTimer();
        
        this.addToSequence();
        this.showSequence();
    }
    
    resetGame() {
        // Clear all timers first
        this.clearAllTimers();
        
        this.gameState = 'waiting';
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        this.showingIndex = 0;
        this.activeColors = 4;
        
        // Reset all challenge states
        this.resetChallenges();
        
        this.startBtn.disabled = false;
        this.difficultySelect.disabled = false;
        this.updateDisplay();
        this.updateGameStatus('Ready to Play');
        this.resetButtonStates();
        this.timerEl.textContent = '0.0s';
    }
    
    changeDifficulty(newDifficulty) {
        this.difficulty = newDifficulty;
        if (this.gameState !== 'waiting') {
            this.resetGame();
        }
    }
    
    addToSequence() {
        const settings = this.difficultySettings[this.difficulty];
        const sequenceLength = Math.floor(this.level * settings.sequenceMultiplier);
        
        for (let i = 0; i < sequenceLength; i++) {
            const randomColor = Math.floor(Math.random() * this.activeColors);
            this.sequence.push(randomColor);
        }
        
        // Unlock more colors as levels progress
        if (this.level >= 3 && this.activeColors < 6) this.activeColors = 6;
        if (this.level >= 6 && this.activeColors < 8) this.activeColors = 8;
        
        // Apply challenges
        if (Math.random() < settings.challengeFreq) {
            this.applyChallenge();
        }
    }
    
    applyChallenge() {
        const challenge = this.challenges[Math.floor(Math.random() * this.challenges.length)];
        
        this.challengeText.textContent = this.getChallengeText(challenge);
        this.challengeOverlay.classList.add('show');
        
        this.gameTimer = setTimeout(() => {
            this.challengeOverlay.classList.remove('show');
            this.executeChallenge(challenge);
        }, 2000);
    }
    
    getChallengeText(challenge) {
        const texts = {
            'reverse': 'REVERSE MODE: Input sequence backwards!',
            'invisible': 'INVISIBLE MODE: Buttons will disappear!',
            'double_speed': 'DOUBLE SPEED: Sequence plays twice as fast!',
            'color_shift': 'COLOR SHIFT: Colors will change positions!',
            'memory_test': 'MEMORY TEST: Sequence shows only once!'
        };
        return texts[challenge] || 'SPECIAL CHALLENGE ACTIVATED!';
    }
    
    executeChallenge(challenge) {
        switch(challenge) {
            case 'reverse':
                this.reverseChallenge = true;
                break;
            case 'invisible':
                this.invisibleChallenge = true;
                break;
            case 'double_speed':
                this.doubleSpeedChallenge = true;
                break;
            case 'color_shift':
                this.colorShiftChallenge = true;
                this.shuffleColors();
                break;
            case 'memory_test':
                this.memoryTestChallenge = true;
                break;
        }
    }
    
    shuffleColors() {
        const buttons = Array.from(this.simonButtons);
        for (let i = buttons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tempClass = buttons[i].className;
            buttons[i].className = buttons[j].className;
            buttons[j].className = tempClass;
        }
    }
    
    showSequence() {
        this.gameState = 'showing';
        this.showingIndex = 0;
        this.playerSequence = [];
        this.resetButtonStates();
        
        const settings = this.difficultySettings[this.difficulty];
        let delay = this.doubleSpeedChallenge ? settings.showDelay / 2 : settings.showDelay;
        
        this.showNextButton(delay);
    }
    
    showNextButton(delay) {
        if (this.showingIndex >= this.sequence.length) {
            this.gameState = 'playing';
            this.updateGameStatus('Your turn!');
            this.startInputTimer();
            return;
        }
        
        const buttonIndex = this.sequence[this.showingIndex];
        const button = this.simonButtons[buttonIndex];
        
        if (this.invisibleChallenge) {
            button.style.opacity = '0';
            this.gameTimer = setTimeout(() => {
                button.style.opacity = '';
            }, delay);
        } else {
            button.classList.add('active');
            this.gameTimer = setTimeout(() => {
                button.classList.remove('active');
            }, delay / 2);
        }
        
        this.showingIndex++;
        
        if (!this.memoryTestChallenge || this.showingIndex === 1) {
            this.gameTimer = setTimeout(() => this.showNextButton(delay), delay);
        } else {
            this.gameTimer = setTimeout(() => {
                this.gameState = 'playing';
                this.updateGameStatus('Your turn!');
                this.startInputTimer();
            }, delay);
        }
    }
    
    startInputTimer() {
        // Clear any existing input timer
        if (this.inputTimer) {
            clearInterval(this.inputTimer);
            this.inputTimer = null;
        }
        
        const settings = this.difficultySettings[this.difficulty];
        this.inputTimeLimit = settings.timeLimit;
        
        this.inputTimer = setInterval(() => {
            this.inputTimeLimit -= 100;
            this.timerEl.textContent = (this.inputTimeLimit / 1000).toFixed(1) + 's';
            
            if (this.inputTimeLimit <= 0) {
                this.handleTimeout();
            }
        }, 100);
    }
    
    handleTimeout() {
        // Clear the input timer immediately
        if (this.inputTimer) {
            clearInterval(this.inputTimer);
            this.inputTimer = null;
        }
        
        // Only process timeout if game is still in playing state
        if (this.gameState !== 'playing') {
            return;
        }
        
        this.lives--;
        this.updateDisplay();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.updateGameStatus('Time up! Try again...');
            this.flashButtons();
            this.gameTimer = setTimeout(() => this.showSequence(), 1000);
        }
    }
    
    flashButtons() {
        this.simonButtons.forEach(button => {
            button.classList.add('flash-red');
            this.gameTimer = setTimeout(() => {
                button.classList.remove('flash-red');
            }, 300);
        });
    }
    
    handleButtonClick(index) {
        if (this.gameState !== 'playing' || index >= this.activeColors) return;
        
        const button = this.simonButtons[index];
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 200);
        
        let expectedIndex = this.reverseChallenge ? 
            this.sequence[this.sequence.length - 1 - this.playerSequence.length] : 
            this.sequence[this.playerSequence.length];
        
        if (index === expectedIndex) {
            this.playerSequence.push(index);
            this.score += 10;
            this.updateDisplay();
            
            if (this.playerSequence.length === this.sequence.length) {
                this.levelComplete();
            }
        } else {
            this.handleWrongInput();
        }
    }
    
    handleWrongInput() {
        // Clear input timer to prevent multiple life deductions
        if (this.inputTimer) {
            clearInterval(this.inputTimer);
            this.inputTimer = null;
        }
        
        this.lives--;
        this.updateDisplay();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.updateGameStatus('Wrong! Try again...');
            this.flashButtons();
            this.gameTimer = setTimeout(() => this.showSequence(), 1000);
        }
    }
    
    levelComplete() {
        // Clear input timer
        if (this.inputTimer) {
            clearInterval(this.inputTimer);
            this.inputTimer = null;
        }
        
        this.level++;
        this.score += this.level * 50;
        this.updateDisplay();
        
        this.resetChallenges();
        
        this.updateGameStatus(`Level ${this.level - 1} Complete!`);
        this.gameTimer = setTimeout(() => {
            this.addToSequence();
            this.showSequence();
        }, 1500);
    }
    
    resetChallenges() {
        this.reverseChallenge = false;
        this.invisibleChallenge = false;
        this.doubleSpeedChallenge = false;
        this.colorShiftChallenge = false;
        this.memoryTestChallenge = false;
        
        this.simonButtons.forEach(button => {
            button.classList.remove('hidden');
            button.style.opacity = '';
        });
    }
    
    gameOver() {
        // Clear all timers
        this.clearAllTimers();
        
        this.gameState = 'waiting';
        
        // Reset all challenge states
        this.resetChallenges();
        this.resetButtonStates();
        
        // Update statistics
        this.gameStats.gamesPlayed++;
        this.gameStats.totalScore += this.score;
        this.gameStats.maxLevel = Math.max(this.gameStats.maxLevel, this.level - 1);
        this.gameStats.totalTime += Math.floor((Date.now() - this.startTime) / 1000);
        
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.modalTitle.textContent = 'New High Score!';
            this.gameResultEl.textContent = 'Congratulations! You set a new record!';
        } else {
            this.modalTitle.textContent = 'Game Over!';
            this.gameResultEl.textContent = `You reached level ${this.level - 1}. Keep trying!`;
        }
        
        this.finalScoreEl.textContent = this.score;
        this.updateDisplay();
        this.updateStats();
        this.updateGameStatus('Game Over');
        
        // Re-enable controls
        this.startBtn.disabled = false;
        this.difficultySelect.disabled = false;
        
        this.gameOverModal.classList.add('show');
    }
    
    resetButtonStates() {
        this.simonButtons.forEach(button => {
            button.classList.remove('active', 'disabled', 'flash-red', 'hidden');
            button.style.opacity = '';
        });
    }
    
    updateDisplay() {
        this.currentScoreEl.textContent = this.score;
        this.bestScoreEl.textContent = this.bestScore;
        this.currentLevelEl.textContent = this.level;
        this.livesEl.textContent = this.lives;
    }
    
    updateGameStatus(message) {
        this.gameStatusEl.textContent = message;
    }
    
    updateTimer() {
        if (this.gameState === 'playing') {
            const elapsed = (Date.now() - this.startTime) / 1000;
            this.timerEl.textContent = elapsed.toFixed(1) + 's';
            this.gameTimer = setTimeout(() => this.updateTimer(), 100);
        }
    }
    
    updateStats() {
        this.gamesPlayedEl.textContent = this.gameStats.gamesPlayed;
        
        const successRate = this.gameStats.gamesPlayed > 0 ? 
            Math.round((this.gameStats.totalScore / (this.gameStats.gamesPlayed * 100)) * 100) : 0;
        this.successRateEl.textContent = successRate + '%';
        
        this.maxLevelEl.textContent = this.gameStats.maxLevel;
        this.totalTimeEl.textContent = this.gameStats.totalTime + 's';
    }
    
    playAgain() {
        this.closeModal();
        // Small delay to ensure modal is closed and state is clean
        setTimeout(() => {
            this.startGame();
        }, 100);
    }
    
    closeModal() {
        this.gameOverModal.classList.remove('show');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SimonGame();
});