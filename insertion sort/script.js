class InsertionSortVisualizer {
    constructor() {
        this.array = [];
        this.arrayContainer = document.getElementById('arrayContainer');
        this.generateArrayBtn = document.getElementById('generateArray');
        this.startSortBtn = document.getElementById('startSort');
        this.resetBtn = document.getElementById('reset');
        this.speedSlider = document.getElementById('speed');
        this.arraySizeInput = document.getElementById('arraySize');
        this.comparisonsDisplay = document.getElementById('comparisons');
        this.swapsDisplay = document.getElementById('swaps');
        this.timeDisplay = document.getElementById('time');
        
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.isSorting = false;
        this.delay = 100;

        this.initializeEventListeners();
        this.generateArray();
    }

    initializeEventListeners() {
        this.generateArrayBtn.addEventListener('click', () => this.generateArray());
        this.startSortBtn.addEventListener('click', () => this.startSorting());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.speedSlider.addEventListener('input', () => this.updateSpeed());
        this.arraySizeInput.addEventListener('change', () => this.generateArray());
    }

    generateArray() {
        this.reset();
        const size = parseInt(this.arraySizeInput.value);
        this.array = [];
        
        for (let i = 0; i < size; i++) {
            this.array.push(Math.floor(Math.random() * 300) + 10);
        }
        
        this.displayArray();
    }

    displayArray() {
        this.arrayContainer.innerHTML = '';
        const maxHeight = Math.max(...this.array);
        
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxHeight) * 350}px`;
            
            const label = document.createElement('div');
            label.className = 'bar-label';
            label.textContent = value;
            
            bar.appendChild(label);
            this.arrayContainer.appendChild(bar);
        });
    }

    async startSorting() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        this.startTime = performance.now();
        this.startSortBtn.disabled = true;
        this.generateArrayBtn.disabled = true;
        
        await this.insertionSort();
        
        this.isSorting = false;
        this.startSortBtn.disabled = false;
        this.generateArrayBtn.disabled = false;
        
        const endTime = performance.now();
        this.timeDisplay.textContent = (endTime - this.startTime).toFixed(2);
    }

    async insertionSort() {
        for (let i = 1; i < this.array.length; i++) {
            let key = this.array[i];
            let j = i - 1;
            
            // Highlight the current element being inserted
            this.highlightBar(i, 'comparing');
            
            while (j >= 0 && this.array[j] > key) {
                this.comparisons++;
                this.comparisonsDisplay.textContent = this.comparisons;
                
                // Highlight the comparison
                this.highlightBar(j, 'comparing');
                
                // Move the element
                this.array[j + 1] = this.array[j];
                this.swaps++;
                this.swapsDisplay.textContent = this.swaps;
                
                await this.delayExecution();
                this.displayArray();
                
                j--;
            }
            
            this.array[j + 1] = key;
            this.highlightBar(j + 1, 'sorted');
            
            await this.delayExecution();
            this.displayArray();
        }
        
        // Mark all bars as sorted
        this.array.forEach((_, index) => {
            this.highlightBar(index, 'sorted');
        });
    }

    highlightBar(index, className) {
        const bars = this.arrayContainer.getElementsByClassName('bar');
        if (bars[index]) {
            bars[index].className = `bar ${className}`;
        }
    }

    async delayExecution() {
        await new Promise(resolve => setTimeout(resolve, this.delay));
    }

    updateSpeed() {
        this.delay = 200 - (this.speedSlider.value * 1.9);
    }

    reset() {
        this.comparisons = 0;
        this.swaps = 0;
        this.comparisonsDisplay.textContent = '0';
        this.swapsDisplay.textContent = '0';
        this.timeDisplay.textContent = '0';
        this.isSorting = false;
        this.startSortBtn.disabled = false;
        this.generateArrayBtn.disabled = false;
    }
}

// Initialize the visualizer when the page loads
window.addEventListener('load', () => {
    new InsertionSortVisualizer();
}); 