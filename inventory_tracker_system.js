// Problem Statement: Inventory Tracker System
// Design an in-memory system to track inventory for products in a warehouse.
// You need to support the following operations:
// addStock(productId, quantity)
// → Adds the given quantity to the existing stock of a product.
// removeStock(productId, quantity)
// → Reduces the quantity of the product.
// → If quantity is insufficient, return a proper message (e.g., "Insufficient stock").
// getStock(productId)
// → Returns the available stock for the given product.
// isInStock(productId)
// → Returns true if stock is greater than 0, otherwise false.

// Constraints:
// productId is a unique string or number.
// Inventory is managed in-memory using data structures (no databases or APIs).
// Keep it simple: No expiry dates, no pricing, no multiple warehouses.
// You only need to manage product quantity in stock.:

// Notes & Clarifications:
// Inventory refers to the collection/stock of products in the system's backend.
// Each product has a productId and quantity.
// Admins or Vendors manage the inventory:
// Add new products.
// Update stock (i.e., change quantity).
// Delete/remove stock.

// Warehouse is a physical location or system backend where products are stored before shipping.
// If the warehouse is a physical location, then it refers to places like Mumbai, Delhi, or Bengaluru where
// Flipkart stores products before shipping them.
// If the warehouse is part of the backend system, it is represented using a database.
// If the warehouse is in-memory, such as in a DSA case study, it is represented using a data structure.

// Admin is the owner of the entire platform (e.g., Flipkart, Amazon) who can manage all users & vendors, Products, 
// Orders & returns,Payments, logs, permissions, etc.
// Has full access to all inventory.

// Vendor is a registered seller on the platform (e.g., Samsung, Boat, Allen Solly).
// he Can only manage their own products: Add or remove product's stock.
// Handle shipping & delivery.
// Cannot see or modify products of other vendors.

// Explanation:-
// Since this is an in-memory system, I will design a class called InventoryTracker using a nested Map.
// The outer map stores the key as a vendorId and the value as an inner map, which represents the 
// vendor’s inventory for particular vendor.
// The inner map contains the key as the productId, and the value as an quantity of that product.

// All Methods Used in the Code:-
//(1) addStock():
// If the vendor exists, if yes then check if the product exist, if yes then increment quantity of that product.
// But if product doesn't exist, then add that product along with given quantity in the vendor's inventory.
// But if the vendor's inventory doesn't exist then create vendor's inventory using innerMap.

//(2) removeStock():
// If the vendor or product doesn’t exist, return an appropriate message.
// but if exist then check is the product quanity is less than removedQuantity, return "Insufficient amount"
// if not then reduce the removedQuantity from product's quantity.

//(3) getStock():
// If vendor or product doesn’t exist, return a message.
// Otherwise, return the current stock (quantity).

//(4) isInStock():
// if vendor or product doesn’t exist, return a message.
// If quantity is greater than 0, return “in stock”; otherwise, “out of stock”.

// TIME COMPLEXITY:
// All operations (addStock, removeStock, getStock, isInStock) involve accessing or modifying data in a hash map.
// Accessing a key in a Map is O(1) on average.
// SO, Time Complexity for each method: O(1)

// SPACE COMPLEXITY:
// We are not using any additional (auxiliary) data structures apart from the system's nested Map,
// which is essential for storing the vendor's inventory.
// So, Space Complexity: O(1) extra space (excluding the input inventory data being stored)


// code:-
class InventoryTracker {
    constructor() {
        this.map = new Map(); // vendorId → vendor’s inventory (inner map)
    }

    addStock(vendor, productId, productQuantity) {
        if (this.map.has(vendor)) {
            let innerMap = this.map.get(vendor);
            if (innerMap.has(productId)) {
                innerMap.set(productId, innerMap.get(productId) + productQuantity); 
            } else {
                innerMap.set(productId, productQuantity); 
            }
        } else {
            let innerMap = new Map();
            innerMap.set(productId, productQuantity);  
            this.map.set(vendor, innerMap);
        }
    }

    removeStock(vendor, productId, removedQuantity) {
        if (!this.map.has(vendor)) {
            console.log("Vendor doesn't exist");
            return;
        }

        let innerMap = this.map.get(vendor);

        if (!innerMap.has(productId)) {
            console.log(`Product with ID ${productId} doesn't exist`);
            return;
        }

        if (innerMap.get(productId) < removedQuantity) {
            console.log("Insufficient Stock");
        } else {
            innerMap.set(productId, innerMap.get(productId) - removedQuantity);
            console.log(`New quantity of product ${productId}: ${innerMap.get(productId)}`);
        }
    }

    getStock(vendor, productId) {
        if (!this.map.has(vendor)) {
            console.log("Vendor doesn't exist");
            return;
        }

        let innerMap = this.map.get(vendor);
        if (!innerMap.has(productId)) {
            console.log(`Product with ID ${productId} doesn't exist`);
            return;
        }

        console.log(`Stock of product ${productId}: ${innerMap.get(productId)}`);
    }

    isInStock(vendor, productId) {
        if (!this.map.has(vendor)) {
            console.log("Vendor doesn't exist");
            return;
        }

        let innerMap = this.map.get(vendor);
        if (!innerMap.has(productId)) {
            console.log(`Product with ID ${productId} doesn't exist`);
            return;
        }

        if (innerMap.get(productId) <= 0) {
            console.log(`Product ${productId} is out of stock`);
        } else {
            console.log(`Product ${productId} is in stock`);
        }
    }
}

const vendor1 = new InventoryTracker();

vendor1.addStock('1A', 1, 12);      // Add product 1 with quantity 12
vendor1.addStock('1A', 1, 22);      // Now quantity should be 34
vendor1.removeStock('1A', 1, 12);   // Reduce by 12, should be 22
vendor1.getStock('1A', 1);          // Shows: Stock of product 1: 22
vendor1.isInStock('1A', 1);         // Shows: Product 1 is in stock

