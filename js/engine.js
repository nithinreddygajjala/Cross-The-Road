/* ENGINE.JS
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */
var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        // reset();
        lastTime = Date.now();
        main();
    }

   // The collison between the player and the enemy is detected using this function.
    function checkCollisions() {
    for (i = 0; i < allEnemies.length; i++) {
            
        if(player.x+60>=(allEnemies[i].x) && player.x<=(allEnemies[i].x+60) && player.y+50 >=allEnemies[i].y && player.y<=allEnemies[i].y+50){
             player.x = 202;
                player.y = 415;
                console.log(allEnemies[i].x,player.x+60);
                console.log(allEnemies[i].x+60,player.x);
                console.log(allEnemies[i].y,player.y+50);
                console.log(allEnemies[i].y+50,player.y);
        }

        }
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way.
     */

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     * http://hasgraphics.com/danc-planet-cute-tileset/
     */
    function render() {
        // Array to hold the relative URL of images for each row in game.
        var rowImages = [
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 3 of stone
                'images/stone-block.png', // Row 2 of 3 of stone
                'images/stone-block.png', // Row 3 of 3 of stone
                'images/grass-block.png', // Row 1 of 2 of grass
                'images/grass-block.png' // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the grid. Note: There is a loop within a loop.
         * The first loop is the row, and then there is a second loop to draw
         * each column within that row. The top left corner is (0,0), the top
         * right corner is (505,0); the bottom left corner is (0,498) and the
         * bottom right corner is (505,498).
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas's context element
                 * requires 3 parameters: 1 - The image to draw; 2 - The x
                 * coordinate of where to start drawing; and 3 - The y
                 * coordinate of where to start drawing. We're using the helpers
                 * from resources.js to refer to our images, so that the images
                 * are cached, making it easy to use them over and over.
                 */
                ctx.drawImage(resources.get(rowImages[row]), col * 101, row * 83);
            }
        }


        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* This loads all of the images we're going to need for drawing our game.
     * "Init" has been set as the callback method, so that when all of these
     * images are properly loaded, the game will start.
     */
    resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-princess-girl.png'
    ]);
    resources.onReady(init);

    /* This assigns the canvas's context object to the global variable, which
     * is the window object when the game is run in a browser. Doing this
     * makes it easy to access from the app.js files.
     */
    global.ctx = ctx;
})(this);
