/**
 * Implementation of Conway's game of Life
 */

const CHILD = 2;
const ADULT = 1;
const DEAD = 0;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
    //NOTE:  Iterate through Array2D row first then column
    let a = new Array(height);

    for (let i = 0; i < height; i++) {
        a[i] = new Array(width);
    }

    return a;
}

/**
 * Life class
 */
class Life {
    /**
     * Constructor
     */
    constructor(width, height) {
        // !!!! IMPLEMENT ME !!!!
        this.width = width;
        this.height = height;

        this.activeBuffer = 0;

        this.buffers = [Array2D(width, height), Array2D(width, height)];

        this.clear();
    }

    /**
     * Return the current active buffer
     *
     * This should NOT be modified by the caller
     */
    getCells() {
        // !!!! IMPLEMENT ME !!!!
        return this.buffers[this.activeBuffer];
    }

    /**
     * Clear the life grid
     */
    clear() {
        // !!!! IMPLEMENT ME !!!!
    }

    /**
     * Randomize the life grid
     */
    randomize() {
        let bufferPointer = this.buffers[this.activeBuffer];

        for (let row = 0; row < this.height; row++) {
          for (let col = 0; col < this.width; col++) {
            bufferPointer[row][col] = DEAD;
          }
        }

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
            if((Math.sqrt(col)*Math.sqrt(row)) > 200) {
                bufferPointer[row][col] = ADULT;
            }
            }
          }

        // const amountOfLife = 300;
        // for (let i = 200; i < amountOfLife; i++) {

        //   bufferPointer[i][i] = ALIVE;
        // }

        // for (let i = 200; i < amountOfLife; i++) {

        //     bufferPointer[i + 1][i + 2] = ALIVE;
        // }

        //   for (let i = 200; i < amountOfLife; i++) {

        //     bufferPointer[i + 2][i + 3] = ALIVE;
        // }
        // bufferPointer[300][300] = ALIVE;

        // const amountOfLife = 100000;
        // for (let i = 0; i < amountOfLife; i++) {
        //   const row = Math.floor(Math.random() * 50) + Math.floor(this.width / 2);
        //   const col = Math.floor(Math.random() * 50) + Math.floor(this.height / 4);

        //   bufferPointer[row][col] = ADULT;
        // }

        // for (let i = 0; i < amountOfLife; i++) {
        //   const row = Math.floor(Math.random() * 50) + Math.floor(this.width / 2);
        //   const col = Math.floor(Math.random() * 50) + Math.floor(this.height / 4 * 2);

        //   bufferPointer[row][col] = ADULT;
        // }

        // const left = this.width / 4;
        // const right = this.height / 4;

        // bufferPointer[6 + left][2 + right] = ADULT;
        // bufferPointer[6 + left][3 + right] = ADULT;
        // bufferPointer[7 + left][2 + right] = ADULT;
        // bufferPointer[7 + left][3 + right] = ADULT;

        // bufferPointer[4 + left][14 + right] = ADULT;
        // bufferPointer[4 + left][15 + right] = ADULT;
        // bufferPointer[5 + left][13 + right] = ADULT;
        // bufferPointer[5 + left][17 + right] = ADULT;
        // bufferPointer[6 + left][12 + right] = ADULT;
        // bufferPointer[6 + left][18 + right] = ADULT;
        // bufferPointer[7 + left][12 + right] = ADULT;
        // bufferPointer[7 + left][16 + right] = ADULT;
        // bufferPointer[7 + left][18 + right] = ADULT;
        // bufferPointer[7 + left][19 + right] = ADULT;
        // bufferPointer[8 + left][12 + right] = ADULT;
        // bufferPointer[8 + left][18 + right] = ADULT;
        // bufferPointer[9 + left][13 + right] = ADULT;
        // bufferPointer[9 + left][17 + right] = ADULT;
        // bufferPointer[10 + left][14 + right] = ADULT;
        // bufferPointer[10 + left][15 + right] = ADULT;

        // bufferPointer[2 + left][26 + right] = ADULT;
        // bufferPointer[3 + left][24 + right] = ADULT;
        // bufferPointer[3 + left][26 + right] = ADULT;
        // bufferPointer[4 + left][22 + right] = ADULT;
        // bufferPointer[4 + left][23 + right] = ADULT;
        // bufferPointer[5 + left][22 + right] = ADULT;
        // bufferPointer[5 + left][23 + right] = ADULT;
        // bufferPointer[6 + left][22 + right] = ADULT;
        // bufferPointer[6 + left][23 + right] = ADULT;
        // bufferPointer[7 + left][24 + right] = ADULT;
        // bufferPointer[7 + left][26 + right] = ADULT;
        // bufferPointer[8 + left][26 + right] = ADULT;

        // bufferPointer[4 + left][36 + right] = ADULT;
        // bufferPointer[4 + left][37 + right] = ADULT;
        // bufferPointer[5 + left][36 + right] = ADULT;
        // bufferPointer[5 + left][37 + right] = ADULT;



    }

    /**
     * Run the simulation for a single step
     */
    step() {
        let backBufferIndex = 1 - this.activeBuffer;
        let currentBuffer = this.buffers[this.activeBuffer];
        let backBuffer = this.buffers[backBufferIndex];
        let neighbors = 0;

        const lifeOrDeath = (row, col) => {
            // const nextValue = (currentBuffer[row][col] + 1) % MAKE_BINARY;
            neighbors = 0;

            // North
            if (row > 0) {
                if (currentBuffer[row - 1][col]) {
                    neighbors++;
                }
            }

            // East
            if (col < this.width - 1) {
                if (currentBuffer[row][col + 1]) {
                    neighbors++;
                }
            }

            // South
            if (row < this.height - 1) {
                if (currentBuffer[row + 1][col]) {
                    neighbors++;
                }
            }

            // West
            if (col > 0) {
                if (currentBuffer[row][col - 1]) {
                    neighbors++;
                }
            }

            // North-East
            if (row > 0 && col < this.width - 1) {
                if (currentBuffer[row - 1][col + 1]) {
                    neighbors++;
                }
            }

            // North-West
            if (col > 0 && row > 0) {
                if (currentBuffer[row - 1][col - 1]) {
                    neighbors++;
                }
            }

            // South-East
            if (row < this.height - 1 && col < this.width - 1) {
                if (currentBuffer[row + 1][col + 1]) {
                    neighbors++;
                }
            }

            // South-West
            if (col > 0 && row < this.height - 1) {
                if (currentBuffer[row + 1][col - 1]) {
                    neighbors++;
                }
            }
        };

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                lifeOrDeath(row, col);

                if (currentBuffer[row][col]) {
                    if (neighbors === 2 || neighbors === 3) {
                        backBuffer[row][col] = ADULT;
                    } else {
                        backBuffer[row][col] = currentBuffer[row][col];
                        backBuffer[row][col] = DEAD;
                    }
                } else {
                    if (neighbors === 3) {
                        backBuffer[row][col] = CHILD;
                    } else {
                        backBuffer[row][col] = DEAD;
                    }
                }
            }
        }
        this.activeBuffer = 1 - this.activeBuffer;
    }
}

export default Life;
