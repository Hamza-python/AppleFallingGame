let score = 0;
const scoreElement = document.getElementById('score');
const treeContainer = document.getElementById('tree-container');

const leafRange = {
  xMin: 120,  // Adjust based on the new tree image
  xMax: 380, // Adjust based on the new tree image
  yMin: 110,  // Adjust based on the new tree image
  yMax: 200  // Adjust based on the new tree image
};

// Generate random apples in leaf range with random delay for falling
function createApple() {
  const apple = document.createElement('div');
  apple.classList.add('apple');

  // Random position for the apple within leaf area
  const xPos = Math.random() * (leafRange.xMax - leafRange.xMin) + leafRange.xMin;
  const yPos = Math.random() * (leafRange.yMax - leafRange.yMin) + leafRange.yMin;
  apple.style.left = `${xPos}px`;
  apple.style.top = `${yPos}px`;

  // Random delay before apple starts falling
  const fallDelay = Math.random() * 2000 + 1000; // Delay between 1s to 3s
  setTimeout(() => {
    apple.classList.add('falling');
    
    // Only add click event after apple starts falling
    apple.addEventListener('click', () => {
      score++;
      scoreElement.innerText = score;
      apple.remove(); // Remove apple after click
    });

    // Remove apple immediately after falling animation ends (matching CSS fall duration)
    apple.addEventListener('animationend', () => {
      if (apple.parentNode) { // Check if apple hasn't been clicked
        apple.remove();
      }
    });

  }, fallDelay);

  treeContainer.appendChild(apple);
}

// Generate multiple apples with random intervals
function generateMultipleApples(num) {
  for (let i = 0; i < num; i++) {
    setTimeout(createApple, Math.random() * 1000); // Randomly delay each apple creation by up to 1s
  }
}

// Call the function to generate apples every 3 seconds
setInterval(() => generateMultipleApples(8), 3000);
