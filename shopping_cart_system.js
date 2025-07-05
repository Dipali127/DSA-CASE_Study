// Design a shopping cart system in memory where users can add items to their cart, update quantities,
// remove specific items, and see their total bill. You don’t need to worry about databases — 
// just simulate the backend logic using in-memory structures.

// Build a class with these basic methods:
// addCart(userId, item, price, quantity)
// updateCart(userId, item) (decrease quantity by 1 or remove)
// viewCart(userId)
// getTotal(userId)
// removeItem(userId, item)
// Assume one cart per user.

// Explanation:-
// Since this is an in-memory system, I will design a class called ShoppingCart using a nested Map.
// The outer map stores the key as a userId and the value as an inner map, which represents the cart for that particular
// user.
// The inner map contains the key as the item name, and the value as an object that holds the price and quantity of that 
// item.

// All Methods Used in the Code:-
// (1)addCart():
// Checks if the user exists.
// If yes, it checks if the item the user wants to add already exists in the cart.
// If it does, it increments the quantity of that item.
// If not, it adds the new item to the user’s cart.
// If the user cart doesn't exist, it creates a new inner map and adds the item to it.

// (2)viewCart():
// Checks if the user's cart exists.
// If it doesn’t, it returns a message saying the cart doesn’t exist.
// Otherwise, it prints all items in the cart along with the total price per item.


// (3)updateCart():
// Checks if the user's cart exists.
// If not, returns a message.
// Otherwise, it checks the quantity of the given item:
// If quantity > 1, it decrements the quantity.
// If quantity == 1, it removes the item from the cart.

// (4)getTotal():
// Checks if the user's cart exists.
// If not, returns a message.
// Otherwise, calculates the total cost of all items in the cart.

// (5)removeItem():
// Checks if the user's cart exists.
// If not, returns a message.
// Otherwise, it completely removes a particular item from the user's cart.

// How the nested map looks when items are added for a user:
// this.map = Map {
//   1 => Map {
//     "pen"      => { price: 5,  quantity: 1 },
//     "notebook" => { price: 20, quantity: 2 },
//     "eraser"   => { price: 3,  quantity: 3 }
//   }
// }

// TIME AND SPACE COMPLEXITY:

// (1) addCart(userId, item, price, quantity)
// Time Complexity: O(1)
// Space Complexity: O(1)
// Reason:
// Accessing/setting values in a Map (hash map) is constant time.
// We're not creating any large auxiliary structures — just modifying one entry in the map.

// (2) viewCart(userId)
// Time Complexity: O(N)
// (N = number of items in the user's cart)
// Since we are iterating through the entire user's cart to print the total price per product.
// Space Complexity: O(N)
// Because we are temporarily storing each product with its total price in an object.

// (3) updateCart(userId, item)
// Time Complexity: O(1)
// Space Complexity: O(1)
// Reason:
// We directly access and modify a single entry (item) in the inner map.
// No iteration or extra storage is involved.

// (4) getTotal(userId)
// Time Complexity: O(N)
// (N = number of items in the user's cart)
// Since we are iterating through each item to calculate the total amount.
// Space Complexity: O(1)
// Only a single variable (`totalAmount`) is used for summing the total.

// (5) removeItem(userId, item)
// Time Complexity: O(1)
// Space Complexity: O(1)
// Reason:
// We access and delete a key from the map in constant time.
// No additional memory is used.




// code:-
class shoppingCart {
    constructor() {
        this.outerMap = new Map();  // userId → user's cart (Map)
    }

    // Add or update item in user's cart
    addCart(userId, items, price, itemQuantity = 1) {
        if (this.outerMap.has(userId)) {
            let innerMap = this.outerMap.get(userId);
            if (innerMap.has(items)) {
                let data = innerMap.get(items);
                data.quantity += itemQuantity;
                innerMap.set(items, { price: price, quantity: data.quantity });
            } else {
                innerMap.set(items, { price: price, quantity: itemQuantity });
            }
        } else {
            let innerMap = new Map();
            innerMap.set(items, { price: price, quantity: itemQuantity });
            this.outerMap.set(userId, innerMap);
        }
    }

    // View user's cart
    viewCart(userId) {
        if (!this.outerMap.has(userId)) {
            console.log(`No cart found for user ${userId}`);
            return;
        } let userCart = this.outerMap.get(userId);
        let object = {};
        for(let [product, {price, quantity}] of userCart.entries()){
            let totalPrice = price * quantity;
            object[product] = totalPrice;
        }
        
        console.log(`price per product for user ${userId}:`, object)
    }
    

    // Update quantity by -1 or delete item if quantity is 1
    updateCart(userId, items) {
        if (!this.outerMap.has(userId)) {
            console.log(`User ${userId} does not exist`);
            return;
        }
        let innerMap = this.outerMap.get(userId);
        if (innerMap.has(items)) {
            let data = innerMap.get(items);
            if (data.quantity > 1) {
                data.quantity -= 1;
                innerMap.set(items, { price: data.price, quantity: data.quantity });
            } else {
                innerMap.delete(items);
            }
        }
    }

    // Show total price of items in cart
    getTotal(userId) {
        if (!this.outerMap.has(userId)) {
            console.log(`User ${userId} does not exist`);
            return;
        }
        let totalAmount = 0;
        let innerMap = this.outerMap.get(userId);
        for (let [items, { price, quantity }] of innerMap.entries()) {
            totalAmount += price * quantity;
        }
        console.log(`Total for user ${userId}: ₹${totalAmount}`);
    }

    // Remove an item from cart completely
    removeItem(userId, items) {
        if (!this.outerMap.has(userId)) {
            console.log(`User ${userId} does not exist`);
            return;
        }
        let innerMap = this.outerMap.get(userId);
        if (innerMap.has(items)) {
            innerMap.delete(items);
            console.log(`Item '${items}' removed from user ${userId}'s cart`);
        }
    }
}

// Sample Test and Output:-
const user1 = new shoppingCart();
user1.addCart(1, 'pen', 5);                   // pen x1
user1.addCart(1, 'pen', 5, 2);                // pen x3
user1.addCart(1, 'book', 10);                 // book x1
user1.updateCart(1, 'book');                  // book removed
user1.addCart(1, 'book', 10, 2);              // book x2
user1.viewCart(1);
/*
Cart for user 1:
pen: price = 5, quantity = 3, total = 15
book: price = 10, quantity = 2, total = 20
*/
user1.getTotal(1);                            // Total for user 1: ₹35
user1.removeItem(1, 'book');                  // removes book
user1.viewCart(1);
/*
Cart for user 1:
pen: price = 5, quantity = 3, total = 15
*/
user1.getTotal(1);                            // Total for user 1: ₹15
