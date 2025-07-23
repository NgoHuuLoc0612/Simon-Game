# Simon Game

A modern, enhanced version of the classic Simon memory game with multiple difficulty levels, special challenges, and a beautiful glassmorphism UI design.

## 🎮 Live Demo

Play the game directly in your browser by opening `index.html` in any modern web browser.

## ✨ Features

### Core Gameplay
- **Classic Simon Memory Game** - Remember and repeat color sequences
- **Progressive Difficulty** - Sequences get longer as you advance
- **Lives System** - 3 lives per game with visual feedback
- **Time Pressure** - Input time limits that decrease with difficulty
- **Score System** - Points for correct sequences and level completion

### Enhanced Features
- **8 Colors Available** - Starts with 4, unlocks more as you progress
- **4 Difficulty Modes** - Normal, Hard, Extreme, and Nightmare
- **Special Challenges** - Random challenges that change gameplay:
  - **Reverse Mode** - Input sequence backwards
  - **Invisible Mode** - Buttons disappear during sequence
  - **Double Speed** - Sequence plays at 2x speed
  - **Color Shift** - Button positions shuffle randomly
  - **Memory Test** - Sequence shows only once

### UI/UX
- **Glassmorphism Design** - Modern translucent interface
- **Responsive Layout** - Works on desktop and mobile devices
- **Keyboard Support** - Use keys 1-8 for button input
- **Visual Feedback** - Animations, glows, and status indicators
- **Game Statistics** - Track your performance over time

## 🎯 How to Play

1. **Start the Game** - Click "Start Game" to begin
2. **Watch the Sequence** - Pay attention to the color pattern
3. **Repeat the Pattern** - Click buttons in the exact same order
4. **Beat the Timer** - Complete input before time runs out
5. **Progress Through Levels** - Each level adds more colors to remember
6. **Handle Challenges** - Adapt to special challenge modes
7. **Achieve High Scores** - Try to beat your personal best!

### Controls
- **Mouse/Touch** - Click or tap the colored buttons
- **Keyboard** - Use number keys 1-8 corresponding to button positions
- **Difficulty** - Change mode anytime when not playing

## 🛠️ Installation

1. **Clone or Download** this repository
2. **Open `index.html`** in your web browser
3. **Start Playing!** - No additional setup required

```bash
git clone <repository-url>
cd simon-game
# Open index.html in your browser
```

## 📁 Project Structure

```
Simon-Game/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling with animations
├── game.js             # Game logic and functionality
└── README.md           # This file
```

## 🎨 Customization

### Difficulty Settings
Modify the `difficultySettings` object in `game.js` to adjust:
- Sequence display speed
- Input time limits
- Challenge frequency
- Sequence length multipliers

### Visual Theme
Edit `styles.css` to customize:
- Color schemes and gradients
- Button styles and animations
- Background and glassmorphism effects
- Responsive breakpoints

### Game Mechanics
Extend functionality by modifying:
- Available colors and button count
- Challenge types and behaviors
- Scoring system and rewards
- Statistics tracking

## 🌟 Technical Highlights

- **Pure JavaScript** - No external dependencies
- **CSS3 Animations** - Smooth transitions and effects
- **Responsive Design** - Mobile-first approach
- **Modern Web Standards** - Uses latest HTML5/CSS3/ES6 features
- **Performance Optimized** - Efficient timer management and event handling

## 🎲 Game Modes

| Mode | Speed | Time Limit | Challenges | Difficulty |
|------|-------|------------|------------|------------|
| Normal | Standard | 3.0s | None | ⭐ |
| Hard | Fast | 2.0s | 20% chance | ⭐⭐ |
| Extreme | Very Fast | 1.5s | 40% chance | ⭐⭐⭐ |
| Nightmare | Lightning | 1.0s | 60% chance | ⭐⭐⭐⭐ |

## 🏆 Statistics Tracked

- **Games Played** - Total number of games started
- **Success Rate** - Percentage based on score performance
- **Max Level Reached** - Highest level achieved
- **Total Play Time** - Cumulative time spent playing

## 🔧 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues

- Timer precision may vary slightly on different devices
- Challenge overlays may not display perfectly on very small screens
- Keyboard input focus may need manual click on some browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 Simon Game

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- Inspired by the classic Simon electronic game by Ralph H. Baer and Howard J. Morrison
- Glassmorphism design trend for modern UI inspiration
- Web development community for best practices and techniques

---

**Enjoy playing the Simon Game! 🎮✨**
