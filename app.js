//-------------------------------------------
//              MAB MEDIA 
//           Software Systems
//    Mario Game Clone Project - App.js
//     Inspired by:    
//     Ania Kubow kubowania 
//     Game Assets:
// https://itch.io/game-assets/tag-mario
//-------------------------------------------

// Game Constants
const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED = 2.5;
const ENEMY_SPEED = 1;

/*
----------------------------------
Game State Variables
----------------------------------
*/

//Game State Object
let gameState = {
    score: 0,
    level: 1,
    lives: 6,
    gameRunning: true,
    keys: {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false,
        enter: false,
        escape: false,
        tab: false,
        shift: false,
        ctrl: false,
        alt: false,
    }
}

// Player Object
let player = {
    element: document.getElementById('mario'),
    x: 50,
    y: 320,
    width: 20,
    height: 20,
    velocityX : 0,
    velocityY : 0,
    grounded: false,
    big: false,
    bigTimer: 0,
}

// Game objects arrays
let gameObjects = {
    platforms: [],
    enemies: [],
    coins: [],
    surpriseBlock: [],
    pipes: []
    
}

// Levels array
const levels = [
    // Array of Game Objects
    // level 1 object
    { // object of arrays of game objects
        platforms: [
            {x: 0, y: 360, width: 400, height: 40, type: 'ground'},
            {x: 500, y: 360, width: 300, height: 40, type: 'ground'},
            {x: 200, y: 280, width: 60, height: 20, type: 'floating'},
            {x: 300, y: 240, width: 60, height: 20, type: 'floating'},
            {x: 600, y: 280, width: 80, height: 20, type: 'floating'},
        ],
        enemies: [
            {x: 250, y: 344, type: 'brown'},
            {x: 550, y: 344, type: 'brown'}
        ],
        coins: [
            {x: 220, y: 260},
            {x: 320, y: 224},
            {x: 620, y: 260},
        ],
        surpriseBlock: [
            {x: 320, y: 180, type: 'mushroom'},
        ],
        pipes: [
            {x: 750, y: 320}
        ]
    },
    // level 2 object  of arrays of game objects 
    // vid_time:  40:59/2:12:04
    {
        platforms: [
            {x: 0, y: 360, width: 200, height: 40, type: 'blue'},
            {x: 300, y: 360, width: 200, height: 40, type: 'blue'},
            {x: 600, y: 360, width: 200, height: 40, type: 'blue'},
            {x: 150, y: 300, width: 40, height: 20, type: 'blue'},
            {x: 250, y: 280, width: 40, height: 20, type: 'blue'},
            {x: 350, y: 260, width: 40, height: 20, type: 'blue'},
            {x: 450, y: 240, width: 40, height: 20, type: 'blue'},
            {x: 550, y: 280, width: 60, height: 20, type: 'blue'}
        ],
        enemies: [
            {x: 350, y: 344, type: 'purple'},
            {x: 650, y: 344, type: 'purple'},
            {x: 570, y: 264, type: 'purple'}
        ],
        coins: [
            {x: 170, y: 280},
            {x: 270, y: 260},
            {x: 370, y: 240},
            {x: 470, y: 220},
            {x: 570, y: 260}
        ],
        surpriseBlock: [
            {x: 200, y: 260, type: 'coin'},
            {x: 400, y: 220, type: 'mushroom'}
        ],
        pipes: [
            {x: 750, y: 320}
        ]
    },
    // level 3 object - More challenging level with varied platforming
    {
        platforms: [
            {x: 0, y: 360, width: 150, height: 40, type: 'ground'},
            {x: 200, y: 360, width: 100, height: 40, type: 'ground'},
            {x: 400, y: 360, width: 150, height: 40, type: 'ground'},
            {x: 650, y: 360, width: 150, height: 40, type: 'ground'},
            // Floating platforms for vertical challenge
            {x: 150, y: 300, width: 60, height: 20, type: 'floating'},
            {x: 300, y: 280, width: 80, height: 20, type: 'floating'},
            {x: 320, y: 240, width: 60, height: 20, type: 'floating'},
            {x: 450, y: 260, width: 70, height: 20, type: 'floating'},
            {x: 500, y: 220, width: 60, height: 20, type: 'floating'},
            {x: 600, y: 280, width: 80, height: 20, type: 'floating'},
            {x: 650, y: 240, width: 60, height: 20, type: 'floating'},
            // Blue platforms for variety
            {x: 250, y: 200, width: 40, height: 20, type: 'blue'},
            {x: 550, y: 180, width: 50, height: 20, type: 'blue'},
            {x: 700, y: 200, width: 40, height: 20, type: 'blue'}
        ],
        enemies: [
            {x: 250, y: 344, type: 'brown'},
            {x: 450, y: 344, type: 'brown'},
            {x: 300, y: 264, type: 'purple'},
            {x: 500, y: 204, type: 'purple'},
            {x: 680, y: 344, type: 'brown'},
            {x: 650, y: 224, type: 'purple'}
        ],
        coins: [
            {x: 170, y: 280},
            {x: 330, y: 220},
            {x: 340, y: 180},
            {x: 470, y: 240},
            {x: 520, y: 200},
            {x: 620, y: 260},
            {x: 670, y: 220},
            {x: 720, y: 180}
        ],
        surpriseBlock: [
            {x: 320, y: 200, type: 'mushroom'},
            {x: 500, y: 180, type: 'coin'},
            {x: 700, y: 180, type: 'mushroom'}
        ],
        pipes: [
            {x: 750, y: 320}
        ]
    },
    // level 4 - Grass and stone theme with birds
    {
        platforms: [
            {x: 0, y: 360, width: 120, height: 40, type: 'grass'},
            {x: 180, y: 360, width: 100, height: 40, type: 'stone'},
            {x: 350, y: 360, width: 120, height: 40, type: 'grass'},
            {x: 550, y: 360, width: 100, height: 40, type: 'stone'},
            {x: 700, y: 360, width: 100, height: 40, type: 'grass'},
            // Vertical climbing challenge
            {x: 120, y: 320, width: 40, height: 20, type: 'floating'},
            {x: 120, y: 280, width: 40, height: 20, type: 'floating'},
            {x: 120, y: 240, width: 40, height: 20, type: 'floating'},
            {x: 280, y: 300, width: 60, height: 20, type: 'stone'},
            {x: 380, y: 280, width: 50, height: 20, type: 'grass'},
            {x: 470, y: 260, width: 60, height: 20, type: 'stone'},
            {x: 570, y: 240, width: 50, height: 20, type: 'grass'},
            {x: 650, y: 220, width: 60, height: 20, type: 'stone'},
            {x: 720, y: 200, width: 40, height: 20, type: 'grass'}
        ],
        enemies: [
            {x: 200, y: 344, type: 'brown'},
            {x: 380, y: 344, type: 'purple'},
            {x: 580, y: 344, type: 'brown'},
            {x: 300, y: 284, type: 'bird'},
            {x: 500, y: 244, type: 'bird'},
            {x: 680, y: 204, type: 'bird'}
        ],
        coins: [
            {x: 140, y: 300},
            {x: 140, y: 220},
            {x: 300, y: 280},
            {x: 400, y: 260},
            {x: 490, y: 240},
            {x: 590, y: 220},
            {x: 670, y: 200},
            {x: 740, y: 180},
            {x: 250, y: 344}
        ],
        surpriseBlock: [
            {x: 280, y: 260, type: 'mushroom'},
            {x: 470, y: 220, type: 'coin'},
            {x: 650, y: 180, type: 'mushroom'}
        ],
        pipes: [
            {x: 750, y: 320}
        ]
    },
    // level 5 - Brick theme with spiders and more enemies
    {
        platforms: [
            {x: 0, y: 360, width: 100, height: 40, type: 'brick'},
            {x: 150, y: 360, width: 80, height: 40, type: 'brick'},
            {x: 280, y: 360, width: 100, height: 40, type: 'brick'},
            {x: 430, y: 360, width: 90, height: 40, type: 'brick'},
            {x: 580, y: 360, width: 100, height: 40, type: 'brick'},
            {x: 720, y: 360, width: 80, height: 40, type: 'brick'},
            // Complex platforming paths
            {x: 100, y: 300, width: 50, height: 20, type: 'floating'},
            {x: 200, y: 280, width: 60, height: 20, type: 'brick'},
            {x: 300, y: 260, width: 50, height: 20, type: 'floating'},
            {x: 400, y: 240, width: 60, height: 20, type: 'brick'},
            {x: 500, y: 220, width: 50, height: 20, type: 'floating'},
            {x: 600, y: 200, width: 60, height: 20, type: 'brick'},
            {x: 700, y: 180, width: 50, height: 20, type: 'floating'},
            // High platforms
            {x: 150, y: 200, width: 40, height: 20, type: 'blue'},
            {x: 350, y: 180, width: 40, height: 20, type: 'blue'},
            {x: 550, y: 160, width: 40, height: 20, type: 'blue'}
        ],
        enemies: [
            {x: 180, y: 344, type: 'brown'},
            {x: 310, y: 344, type: 'purple'},
            {x: 460, y: 344, type: 'brown'},
            {x: 610, y: 344, type: 'purple'},
            {x: 220, y: 264, type: 'spider'},
            {x: 420, y: 224, type: 'spider'},
            {x: 620, y: 184, type: 'spider'},
            {x: 170, y: 184, type: 'bird'},
            {x: 370, y: 164, type: 'bird'},
            {x: 570, y: 144, type: 'bird'}
        ],
        coins: [
            {x: 120, y: 280},
            {x: 220, y: 260},
            {x: 320, y: 240},
            {x: 420, y: 220},
            {x: 520, y: 200},
            {x: 620, y: 180},
            {x: 720, y: 160},
            {x: 170, y: 180},
            {x: 370, y: 160},
            {x: 570, y: 140},
            {x: 250, y: 344}
        ],
        surpriseBlock: [
            {x: 300, y: 220, type: 'mushroom'},
            {x: 500, y: 180, type: 'coin'},
            {x: 700, y: 140, type: 'mushroom'},
            {x: 150, y: 160, type: 'coin'}
        ],
        pipes: [
            {x: 750, y: 320}
        ]
    },
    // level 6 - Ultimate challenge with mixed themes and spike platforms
    {
        platforms: [
            {x: 0, y: 360, width: 80, height: 40, type: 'grass'},
            {x: 120, y: 360, width: 70, height: 40, type: 'stone'},
            {x: 230, y: 360, width: 80, height: 40, type: 'brick'},
            {x: 350, y: 360, width: 70, height: 40, type: 'grass'},
            {x: 460, y: 360, width: 80, height: 40, type: 'stone'},
            {x: 580, y: 360, width: 70, height: 40, type: 'brick'},
            {x: 690, y: 360, width: 110, height: 40, type: 'grass'},
            // Multi-level platforming
            {x: 80, y: 320, width: 40, height: 20, type: 'floating'},
            {x: 80, y: 280, width: 40, height: 20, type: 'floating'},
            {x: 190, y: 300, width: 50, height: 20, type: 'stone'},
            {x: 280, y: 280, width: 50, height: 20, type: 'brick'},
            {x: 370, y: 260, width: 50, height: 20, type: 'grass'},
            {x: 460, y: 240, width: 50, height: 20, type: 'stone'},
            {x: 550, y: 220, width: 50, height: 20, type: 'brick'},
            {x: 640, y: 200, width: 50, height: 20, type: 'grass'},
            // High platforms
            {x: 150, y: 200, width: 40, height: 20, type: 'blue'},
            {x: 300, y: 180, width: 40, height: 20, type: 'blue'},
            {x: 450, y: 160, width: 40, height: 20, type: 'blue'},
            {x: 600, y: 140, width: 40, height: 20, type: 'blue'},
            // Spike platforms (dangerous!)
            {x: 250, y: 240, width: 40, height: 20, type: 'spike'},
            {x: 500, y: 200, width: 40, height: 20, type: 'spike'}
        ],
        enemies: [
            {x: 150, y: 344, type: 'brown'},
            {x: 280, y: 344, type: 'purple'},
            {x: 390, y: 344, type: 'brown'},
            {x: 500, y: 344, type: 'purple'},
            {x: 620, y: 344, type: 'brown'},
            {x: 730, y: 344, type: 'purple'},
            {x: 200, y: 284, type: 'spider'},
            {x: 400, y: 244, type: 'spider'},
            {x: 600, y: 204, type: 'spider'},
            {x: 170, y: 184, type: 'bird'},
            {x: 320, y: 164, type: 'bird'},
            {x: 470, y: 144, type: 'bird'},
            {x: 620, y: 124, type: 'bird'}
        ],
        coins: [
            {x: 100, y: 300},
            {x: 100, y: 260},
            {x: 210, y: 280},
            {x: 300, y: 260},
            {x: 390, y: 240},
            {x: 480, y: 220},
            {x: 570, y: 200},
            {x: 660, y: 180},
            {x: 170, y: 180},
            {x: 320, y: 160},
            {x: 470, y: 140},
            {x: 620, y: 120},
            {x: 200, y: 344}
        ],
        surpriseBlock: [
            {x: 280, y: 240, type: 'mushroom'},
            {x: 370, y: 220, type: 'coin'},
            {x: 550, y: 180, type: 'mushroom'},
            {x: 150, y: 160, type: 'coin'},
            {x: 300, y: 140, type: 'mushroom'}
        ],
        pipes: [
            {x: 750, y: 320}
        ]
    }
]// End of Levels array


// Initialize Game
function initGame() {
    loadLevel(gameState.level -1); // so that the level is 0 based...avoids out of bounds error
    gameLoop(); // start the game loop

    // Initialize Game State
    gameState.score = 0;
    gameState.level = 1;
    gameState.lives = 6;
    gameState.gameRunning = true;
    
    // Update UI stats on initialization
    updateUIStats();
}// End of Initialize Game

function loadLevel(levelIndex) {
    // Clear previous level before loading new one
    clearLevel();
    
    if (levelIndex >= levels.length) {
        showGameOver(true);
        return;
    }
    const levelData = levels[levelIndex]; // get the level data from the levels array
    const gameArea = document.getElementById('game-area'); // get the game area element

    // Reset player position relative to the game area
    player.x = 50;
    player.y = 320; // reset the player position to the starting position
    player.velocityX = 0;
    player.velocityY = 0; // reset the player velocity to 0
    player.big = false; // reset the player to normal size
    player.bigTimer = 0; // reset the player big timer to 0
    player.element.className = '';
    updateElementPosition(player.element, player.x, player.y); // update the player element position

    // Create platforms
    levelData.platforms.forEach((platformData, index) => {
        const platform = createElement('div', `platform ${platformData.type}`, {
            left: platformData.x + 'px',
            top: platformData.y + 'px',
            width: platformData.width + 'px',
            height: platformData.height + 'px',
        });
        gameArea.appendChild(platform);
        gameObjects.platforms.push({
            element: platform,
            ...platformData,
            id: 'platform-' + index
        });
    });

    // Create enemies
    levelData.enemies.forEach((enemyData, index) => {
        const enemy = createElement('div', `enemy ${enemyData.type}`, { // vid_time:  1:02:41/2:12:04
            left: enemyData.x + 'px',
            top: enemyData.y + 'px'
            //width: enemyData.width + 'px',
            //height: enemyData.height + 'px',
        });

        gameArea.appendChild(enemy);
        gameObjects.enemies.push({
            element: enemy,
            x: enemyData.x,
            y: enemyData.y,
            width: 20,
            height: 20,
            direction: -1,
            speed: ENEMY_SPEED,
            id: 'enemy-' + index,
            alive: true,
        });
    });
    
    // Update UI stats after creating enemies
    updateUIStats();


    // Create coins
    levelData.coins.forEach((coinData, index) => {
        const coin = createElement('div', `coin`, {
            left: coinData.x + 'px',
            top: coinData.y + 'px'
        });
        gameArea.appendChild(coin);
        gameObjects.coins.push({
            element: coin,
            x: coinData.x,
            y: coinData.y,
            width: 20,
            height: 20,
            collected: false,
            id: 'coin-' + index
        });
    });


    // Create surprise blocks vid_time: 1:07:18/2:12:04
    levelData.surpriseBlock.forEach((surpriseBlockData, index) => {
        const surpriseBlock = createElement('div', `surprise-block ${surpriseBlockData.type}`, {
            left: surpriseBlockData.x + 'px',
            top: surpriseBlockData.y + 'px'
        });
        gameArea.appendChild(surpriseBlock);
        gameObjects.surpriseBlock.push({
            element: surpriseBlock,
            x: surpriseBlockData.x,
            y: surpriseBlockData.y,
            width: 20,
            height: 20,
            type: surpriseBlockData.type,
            hit: false,
            id: 'surprise-block-' + index,
        });
    });

    // Create pipes
    levelData.pipes.forEach((pipeData, index) => {
        const pipe = createElement('div', `pipe`, {
            left: pipeData.x + 'px',
            top: pipeData.y + 'px',
            width: '40px',
            height: '40px'
        });

        // Create pipe parts (4 pieces to form a pipe) - vid_time: 1:12:20/2:12:04
        // CSS handles positioning with top/left for top-left, top/right for top-right, etc.
        const pipeTopLeft = createElement('div', `pipe top`);
        const pipeTopRight = createElement('div', `pipe top-right`);
        const pipeBottomLeft = createElement('div', `pipe bottom`);
        const pipeBottomRight = createElement('div', `pipe bottom-right`);
        
        pipe.appendChild(pipeTopLeft);
        pipe.appendChild(pipeTopRight);
        pipe.appendChild(pipeBottomLeft);
        pipe.appendChild(pipeBottomRight);
        gameArea.appendChild(pipe);
        gameObjects.pipes.push({
            element: pipe,
            x: pipeData.x,
            y: pipeData.y,
            width: 40,
            height: 40,
            id: 'pipe-' + index,
        });
    });


}// End of loadLevel

function updateElementPosition(element, x, y) {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    //element.style.left = `${x}px`; // alternative way to set the position
}// End of updateElementPosition

/**
 * Updates the UI stats display with current game state values
 * Updates score, level, lives, and evil mushrooms count
 */
function updateUIStats() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('level').textContent = gameState.level;
    document.getElementById('lives').textContent = gameState.lives;
    // Count alive enemies (evil mushrooms)
    const evilMushroomsCount = gameObjects.enemies.filter(enemy => enemy.alive).length;
    document.getElementById('evil-mushrooms').textContent = evilMushroomsCount;
}// End of updateUIStats    



/**
 * Creates a DOM element with specified class name and styles
 * 
 * This utility function creates a new div element, applies CSS classes and inline styles,
 * and returns the configured element. Used throughout the game to create game objects
 * such as platforms, enemies, coins, surprise blocks, and pipes.
 * 
 * @param {string} type - The HTML element type (currently always 'div', parameter reserved for future use)
 * @param {string} className - CSS class name(s) to apply to the element (e.g., 'platform ground', 'enemy brown')
 * @param {Object} styles - Optional object containing CSS style properties as key-value pairs
 *                          (e.g., {left: '100px', top: '200px', width: '20px', height: '20px'})
 * @returns {HTMLElement} The newly created and styled DOM element ready to be appended to the game area
 */
function createElement(type, className, styles = {}) {
    const element = document.createElement('div');
    element.className = className;
    Object.assign(element.style, styles);
    return element;
}// End of createElement


function showGameOver(isWin) {
     gameState.gameRunning = false;
     document.getElementById('game-over-title').textContent = isWin ? 'You Win!' : 'Game Over';
     document.getElementById('final-score').textContent = gameState.score;   
     document.getElementById('game-over').style.display = 'block';
}   // End of showGameOver



// alt way to clear the level
//function clearLevel() {
 //   const gameArea = document.getElementById('game-area');
  //  gameArea.innerHTML = '';
//    gameObjects.platforms = [];
 //   gameObjects.enemies = [];
  //  gameObjects.coins = [];
 //   gameObjects.surpriseBlock = [];
 //   gameObjects.pipes = [];
//}// End of clearLevel

function clearLevel() {
    // Remove all game object elements from the DOM
    Object.values(gameObjects).flat().forEach(object => {
        if (object.element && object.element.parentNode) {
            // Modern API: element.remove() is cleaner than parentNode.removeChild()
            object.element.remove();
        }
    });
    
    // Clear the game objects arrays
    gameObjects = {
        platforms: [],
        enemies: [],
        coins: [],
        surpriseBlock: [],
        pipes: []
    };

    // Alternative approach (simpler but less flexible):
    // const gameArea = document.getElementById('game-area');
    // gameArea.innerHTML = '';
    // Object.keys(gameObjects).forEach(key => {
    //     gameObjects[key] = [];
    // });
}// End of clearLevel

// Keyboard code to game state key mapping
// Shared between keydown and keyup handlers to avoid duplication
const KEY_MAP = {
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'Space': 'space',
    'KeyA': 'left',      // WASD support
    'KeyD': 'right',     // WASD support
    'KeyW': 'space',     // WASD support (W for jump)
    'Enter': 'enter',
    'Escape': 'escape',
    'Tab': 'tab',
    'ShiftLeft': 'shift',
    'ShiftRight': 'shift',
    'ControlLeft': 'ctrl',
    'ControlRight': 'ctrl',
    'AltLeft': 'alt',
    'AltRight': 'alt'
};

// Handle Input
document.addEventListener('keydown', (event) => {
    const key = KEY_MAP[event.code];
    if (key) {
        gameState.keys[key] = true;
    }

    // Prevent default behavior for space bar (prevents page scrolling)
    if (event.code === 'Space') {
        event.preventDefault();
    }
});

document.addEventListener('keyup', (event) => {
    const key = KEY_MAP[event.code];
    if (key) {
        gameState.keys[key] = false;
    }
});


// alt way to handle input
// Input Handling
//function handleInput(event) {
 //   if (event.key === 'ArrowLeft') {
  //      gameState.keys.left = true;
  //  } else if (event.key === 'ArrowRight') {
  //      gameState.keys.right = true;
  //  } else if (event.key === 'ArrowUp') {
//        gameState.keys.up = true;
//    }
// End of handleInput
//document.addEventListener('keydown', handleInput);

// Game Loop
function gameLoop() {
    if (!gameState.gameRunning) return;
    
    update();
    //renderGame();
    requestAnimationFrame(gameLoop);
}// End of gameLoop



/**
 * Checks if two rectangles are colliding
 * @param {Object} rect1 - First rectangle with x, y, width, height
 * @param {Object} rect2 - Second rectangle with x, y, width, height
 * @returns {boolean} True if rectangles are colliding
 */
function checkCollision(rect1, rect2) { // transparent rectangle collision detection, works for all game objects
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}// End of checkCollision


/**
 * Spawns an item on a block
 * @param {Object} block - The block to spawn the item on
 * @param {string} type - The type of item to spawn (e.g., 'mushroom', 'coin')
 */
function spawnItemOnBox(block, type) {
    const gameArea = document.getElementById('game-area');
    const item = createElement('div', `item ${type}`, { // we want this item to be slightly above the block , this object is not part of the gameObjects array
        left: block.x + 'px',
        top: (block.y -20) + 'px',
        width: '20px',
        height: '20px'
    });
    gameArea.appendChild(item);

    const itemObject = {
        element: item,
        x: block.x,
        y: block.y - 20,
        width: 20,
        height: 20,
        type: type,
        id: 'item-' + type,
        velocityY: 0,
        frames: 0
    };

    if (type === 'mushroom') {
        console.log('mushroom spawned');

        function fall() {
            // Apply gravity to velocity
            itemObject.velocityY += GRAVITY;
            
            // Update position based on velocity
            itemObject.y += itemObject.velocityY;
            
            // Check collision with platforms
            let onPlatform = false;
            for (const platform of gameObjects.platforms) {
                if (checkCollision(itemObject, platform)) {
                    onPlatform = true;
                    // Position mushroom on top of platform
                    itemObject.y = platform.y - itemObject.height;
                    itemObject.velocityY = 0; // stop the mushroom from falling
                    break; // Exit loop once collision found
                }
            }
            
            // Update visual position
            itemObject.element.style.top = itemObject.y + 'px';
            
            // Continue falling if not on platform
            if (!onPlatform) {
                requestAnimationFrame(fall);
            }
        }
        
        // Start the falling animation
        fall();
    } else if (type === 'coin') {
        function float() {
            itemObject.y -= 1; // move the coin up
            item.style.top = itemObject.y + 'px'; // update the position of the coin
            itemObject.frames++; // increment the frames

            if (itemObject.frames < 180) { // after 180 frames, the coin will be removed
                requestAnimationFrame(float);
            } else {
                itemObject.element.remove(); // remove the coin from the DOM
            }
        }
        
     
    

        // Start the floating animation
        float();
    }   

}// End of spawnItemOnBox




/**
 * Handles collision detection and response between player and platforms
 */
function handlePlatformCollisions() {
    player.grounded = false;
    
    // Check collision with each platform
    gameObjects.platforms.forEach(platform => {
        if (checkCollision(player, platform)) {
            console.log('platform collision detected');
            if (player.velocityY > 0) { // if the player is moving down (falling)
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.grounded = true;
            }
            // Calculate overlap amounts
            const overlapX = Math.min(
                player.x + player.width - platform.x,
                platform.x + platform.width - player.x
            );
            const overlapY = Math.min(
                player.y + player.height - platform.y,
                platform.y + platform.height - player.y
            );
            
            // Resolve collision based on smallest overlap (axis of least penetration)
            if (overlapX < overlapY) {
                // Horizontal collision
                if (player.x < platform.x) {
                    // Player hit left side of platform
                    player.x = platform.x - player.width;
                } else {
                    // Player hit right side of platform
                    player.x = platform.x + platform.width;
                }
                player.velocityX = 0;
            } else {
                // Vertical collision
                if (player.y < platform.y) {
                    // Player is on top of platform
                    player.y = platform.y - player.height;
                    player.velocityY = 0;
                    player.grounded = true;
                } else {
                    // Player hit bottom of platform (head bump)
                    player.y = platform.y + platform.height;
                    player.velocityY = 0;
                }
            }
        }
    });
}// End of handlePlatformCollisions
/**
 * Handles collision detection and response between player and pipes
 */
function handlePipeCollisions() {
    gameObjects.pipes.forEach(pipe => {
        if (checkCollision(player, pipe)) {
            console.log('pipe collision detected');
            if (player.velocityY > 0) { // if the player is moving down (falling)
                player.y = pipe.y - player.height; // move the player up to the top of the pipe
                player.velocityY = 0; // stop the player from falling
                player.grounded = true; // set the player to grounded
            }
            // Calculate overlap amounts
            const overlapX = Math.min(
                player.x + player.width - pipe.x,
                pipe.x + pipe.width - player.x
            );
            const overlapY = Math.min(
                player.y + player.height - pipe.y,
                pipe.y + pipe.height - player.y
            );
            
            // Resolve collision based on smallest overlap (axis of least penetration)
            if (overlapX < overlapY) {
                // Horizontal collision
                if (player.x < pipe.x) {
                    // Player hit left side of pipe
                    player.x = pipe.x - player.width;
                } else {
                    // Player hit right side of pipe
                    player.x = pipe.x + pipe.width;
                }
                player.velocityX = 0;
            } else {
                // Vertical collision
                if (player.y < pipe.y) {
                    // Player is on top of pipe
                    player.y = pipe.y - player.height;
                    player.velocityY = 0;
                    player.grounded = true;
                    
                    // Check if player is entering the pipe (on top and pressing down)
                    // Also check if player is centered on the pipe (within reasonable range)
                    const playerCenterX = player.x + player.width / 2;
                    const pipeCenterX = pipe.x + pipe.width / 2;
                    const isCenteredOnPipe = Math.abs(playerCenterX - pipeCenterX) < 15;
                    
                    if (isCenteredOnPipe && gameState.keys.down) {
                        // Player is entering the pipe - advance to next level
                        nextLevel();
                    }
                } else {
                    // Player hit bottom of pipe (head bump)
                    player.y = pipe.y + pipe.height;
                    player.velocityY = 0;
                }
            }
        }
    });
}// End of handlePipeCollisions

/**
 * Handles collision detection and response between player and enemies and enemies movement
 */
function handleEnemyCollisions() {
    gameObjects.enemies.forEach(enemy => {
        if (enemy.alive) {
            enemy.x += enemy.speed * enemy.direction;
            
            // Check if enemy is on a platform and reverse direction at edges
            let onPlatform = false;
            for (const platform of gameObjects.platforms) {
                // Check if enemy is on top of platform
                if (enemy.x + enemy.width > platform.x && 
                    enemy.x < platform.x + platform.width && 
                    enemy.y + enemy.height >= platform.y - 5 && 
                    enemy.y < platform.y + platform.height) {
                    onPlatform = true;
                    // Reverse direction if at platform edge
                    if (enemy.x <= platform.x || enemy.x + enemy.width >= platform.x + platform.width) {
                        enemy.direction *= -1;
                    }
                    break;
                }
            }
            
            // Reverse direction at game area boundaries
            if (enemy.x <= 0 || enemy.x + enemy.width >= 800) {
                enemy.direction *= -1;
            }
            
            // Handle collision with player
            if (checkCollision(player, enemy)) {
                console.log('enemy collision detected');
                // Check if player is stomping on enemy (falling and landing on top)
                // Player's bottom edge should be at or near enemy's top edge
                const isStomping = player.velocityY > 0 && 
                                   player.y + player.height <= enemy.y + 5;
                if (isStomping) {
                    // Player is falling and lands on top of enemy - kill enemy
                    enemy.alive = false;
                    enemy.element.style.display = 'none';
                    player.y = enemy.y - player.height;
                    player.velocityY = 0;
                    player.grounded = true;
                    gameState.score += 100; // Award points for killing enemy
                    updateUIStats();
                } else {
                    // Enemy hits player from side or top - player takes damage
                    gameState.lives--;
                    updateUIStats();
                    if (gameState.lives <= 0) {
                        showGameOver(false);
                    } else {
                        // Reset player position
                        player.x = 50;
                        player.y = 320;
                        player.velocityX = 0;
                        player.velocityY = 0;
                        player.grounded = true;
                        player.big = false;
                        player.bigTimer = 0;
                        player.element.classList.remove('big');
                        player.width = 20;
                        player.height = 20;
                        // vid_time: 1:49:32/2:12:04
                    }
                }
            }
        }
    });
}// End of handleEnemyCollisions

/**
 * Handles collision detection and response between player and surprise blocks
 */
function handleSurpriseBlockCollisions() {
    for (const surpriseBlock of gameObjects.surpriseBlock) {
        // Skip if already hit to prevent any processing
        if (surpriseBlock.hit) continue;
        
        if (checkCollision(player, surpriseBlock)) {
            // Check if player hits block from below (head bump)
            // Player is hitting from below if moving up and his top is below the block's bottom
            const isHittingFromBelow = player.velocityY < 0 && 
                                       player.y < surpriseBlock.y + surpriseBlock.height;
            
            if (isHittingFromBelow) {
                // Mark as hit FIRST, before any other processing, to prevent multiple triggers
                surpriseBlock.hit = true;
            
                // Spawn item on the block
                spawnItemOnBox(surpriseBlock, surpriseBlock.type);

                // Award points for hitting the block
                gameState.score += 200;
                updateUIStats();
                
                // Handle block type (mushroom or coin)
                if (surpriseBlock.type === 'mushroom') {
                    // Make Mario big - ensure we only do this once
                    if (!player.big) {
                        // Ensure there's only one Mario element in the DOM
                        const allMarios = document.querySelectorAll('#mario');
                        if (allMarios.length > 1) {
                            // Remove duplicate Mario elements, keep only the first one
                            for (let i = 1; i < allMarios.length; i++) {
                                allMarios[i].remove();
                            }
                        }
                        
                        // Get the Mario element directly
                        const marioElement = document.getElementById('mario');
                        if (marioElement) {
                            // Update player.element reference to ensure it's correct
                            player.element = marioElement;
                            player.big = true;
                            player.bigTimer = 0;
                            // Only add class if not already present
                            if (!marioElement.classList.contains('big')) {
                                marioElement.classList.add('big');
                            }
                        }
                    }
                } else if (surpriseBlock.type === 'coin') {
                    // Award additional points for coin
                    gameState.score += 100;
                    updateUIStats();
                }
                
                // Update block visual state
                surpriseBlock.element.classList.add('hit');
                
                // Push player down slightly to prevent getting stuck
                player.y = surpriseBlock.y + surpriseBlock.height;
                player.velocityY = 0;
                
                // Exit immediately after processing one collision
                return;
            } else if (player.velocityY > 0 && player.y < surpriseBlock.y) {
                // Player lands on top of the block
                player.y = surpriseBlock.y - player.height;
                player.velocityY = 0;
                player.grounded = true;
            }
        }
    }
}// End of handleSurpriseBlockCollisions

/**
 * Handles collision detection and response between player and coins
 */
function handleCoinCollisions() {
    gameObjects.coins.forEach(coin => {
        // Skip if coin is already collected
        if (coin.collected) return;
        
        if (checkCollision(player, coin)) {
            // Mark coin as collected
            coin.collected = true;
            
            // Hide the coin element
            coin.element.style.display = 'none';
            
            // Award points for collecting coin
            gameState.score += 100;
            updateUIStats();
        }
    });
}// End of handleCoinCollisions


// next level function
function nextLevel() {
    gameState.level++;
    if (gameState.level > levels.length) {
        showGameOver(true);
    } else {
        player.element.classList.remove('big');
        player.width = 20;
        player.height = 20;
        loadLevel(gameState.level - 1);
    }
}// End of nextLevel


// restart game function
function restartGame() {
    // Hide the game-over screen
    document.getElementById('game-over').style.display = 'none';
    
    // Reset game state
    gameState.level = 1;
    gameState.lives = 6;
    gameState.score = 0;
    gameState.gameRunning = true;
    gameState.keys = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false,
        enter: false,
        escape: false,
        tab: false,
        shift: false,
        ctrl: false,
        alt: false,
    };
    
    // Load the first level
    loadLevel(gameState.level - 1);
    
    // Update UI stats
    updateUIStats();
    
    // Restart the game loop
    gameLoop();
}// End of restartGame


document.getElementById('restart-button').addEventListener('click', restartGame);


function update() {
    // Handle horizontal movement
    if (gameState.keys.left) {
        player.velocityX = -MOVE_SPEED;
    } else if (gameState.keys.right) {
        player.velocityX = MOVE_SPEED;
    } else {
        player.velocityX *= 0.8; // Apply friction when no keys pressed
    }

    // Handle jumping movement
    if (gameState.keys.space && player.grounded) {
        player.velocityY = JUMP_FORCE; // Apply jump force...negative value means up
        player.grounded = false; // Set player to not grounded...so that they can jump again.
    }

    // Apply gravity
    // Gravity is a positive value...so it will pull the player down.
    // If the player is not grounded...then the gravity will pull them down.
    if (!player.grounded) {
    player.velocityY += GRAVITY;
    }

    // Update player position
    player.x += player.velocityX;
    player.y += player.velocityY;


    // Handle collisions with platforms
    handlePlatformCollisions();

    // Update position
    updateElementPosition(player.element, player.x, player.y);

    // Handle collisions with pipes
    handlePipeCollisions();

    // Handle collisions with enemies
    handleEnemyCollisions();
    
    // Handle collisions with surprise blocks
    handleSurpriseBlockCollisions();
    
    // Handle collisions with coins
    handleCoinCollisions();
    
    // Update all enemy positions in the DOM
    gameObjects.enemies.forEach(enemy => {
        if (enemy.alive) {
            updateElementPosition(enemy.element, enemy.x, enemy.y);
        }
    });
}

// Alternate way to update the game logic
// Update game logic
//function update() {
    // Handle horizontal movement
//    if (gameState.keys.left) {
//        player.velocityX = -MOVE_SPEED;
 //   } else if (gameState.keys.right) {
//        player.velocityX = MOVE_SPEED;//
//    } else{
        // Apply friction when no keys pressed
//        player.velocityX *= 0.8;
 //   }
    
    // Handle jumping
   // if (gameState.keys.up && player.grounded) {
   //     player.velocityY = JUMP_FORCE;
   //     player.grounded = false;
   // }
    
    // Apply gravity
   // player.velocityY += GRAVITY;
    
    // Update position
   // player.x += player.velocityX;
   // player.y += player.velocityY;
    
    // Handle collisions with platforms
   // handlePlatformCollisions();
    
    // Boundary checks - keep player within game area
   // if (player.x < 0) {
   //     player.x = 0;
   //     player.velocityX = 0;
   // }
   // if (player.x + player.width > 800) {
   //     player.x = 800 - player.width;
   //     player.velocityX = 0;
   // }
   // if (player.y < 0) {
   //     player.y = 0;
   //     player.velocityY = 0;
   // }
   // if (player.y + player.height > 400) {
   //     player.y = 400 - player.height;
   //     player.velocityY = 0;
   //     player.grounded = true;
   // }
    
    // Update player element position
   // updateElementPosition(player.element, player.x, player.y);
    
    // TODO: Add enemy movement and collision
    // TODO: Add coin collection
//}// End of update


//Start of Game Loop
initGame(); // initialize the game
