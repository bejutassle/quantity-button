/**
 *  @class
 *  @function Quantity
 *  @param {DOMobject} element to create a quantity wrapper around
 */
export default class QuantityInput {
  constructor(self, decreaseText, increaseText) {
    // Create input
    this.input = document.createElement('input');
    this.input.value = parseInt(self.getAttribute('data-value')) || 1;
    this.input.disabled = self.getAttribute('data-disabled') || false;
    this.input.type = 'number';
    this.input.name = 'quantity';
    this.input.pattern = '[0-9]+';

    // Get text for buttons
    this.decreaseText = decreaseText || 'Decrease quantity';
    this.increaseText = increaseText || 'Increase quantity';

    // Button constructor
    function Button(text, className){
      this.button = document.createElement('button');
      this.button.type = 'button';
      this.button.innerHTML = text;
      this.button.title = text;
      this.button.classList.add(className);

      return this.button;
    }

    // Create buttons
    if(!self.getAttribute('data-disabled')){
      this.subtract = new Button(this.decreaseText, 'sub');
      this.add = new Button(this.increaseText, 'add');
  
      // Add functionality to buttons
      this.subtract.addEventListener('click', () => this.change_quantity(-1));
      this.add.addEventListener('click', () => this.change_quantity(1));
      
      // Add input and buttons to wrapper
      self.appendChild(this.subtract);
      self.appendChild(this.input);
      self.appendChild(this.add);
    }else{
      self.appendChild(this.input);
    }
  }

  change_quantity(change) {
    // Get current value
    let quantity = Number(this.input.value);

    // Ensure quantity is a valid number
    if (isNaN(quantity)) quantity = 1;

    // Change quantity
    quantity += change;

    // Ensure quantity is always a number
    quantity = Math.max(quantity, 1);

    // Output number
    this.input.value = quantity;
  }
}
