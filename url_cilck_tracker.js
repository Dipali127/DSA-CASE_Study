// Design an in-memory system that tracks how many times a short URL has been visited.
// Each time a short URL is accessed, the click count should increment. Implement methods to track and get click counts.

// Explanation:-
// Since this is an in-memory system, I will design a class called URLClickTracker that uses a Hash Map to store and 
// track the click counts of short URLs.
// The short URL will be the key, and the value will be the number of clicks.

//  Methods:
// trackClick(shortURL) – Increments the click count of shortURL if it already exists; otherwise, initializes it with 
// a count of 1.
// getClickCount(shortURL) – Returns the total number of clicks for the given shortURL.


// TIME COMPLEXITY: O(1)
// All operations (trackClick, getClickCount) involve accessing or modifying a key in a hash map.
// Accessing or updating a key in a Map is O(1) on average.
// Therefore, the time complexity for each method is O(1).

// SPACE COMPLEXITY: O(N)
// Where N is the number of unique short URLs stored in the Map.

// Code:
class URLClickTracker {
    constructor() {
        this.urlMap = new Map(); // key: shortURL, value: count
    }

    trackClick(shortURL) {
        if (this.urlMap.has(shortURL)) {
            this.urlMap.set(shortURL, this.urlMap.get(shortURL) + 1);
        } else {
            this.urlMap.set(shortURL, 1);
        }
    }

    getClickCount(shortURL) {
        return this.urlMap.get(shortURL) || 0;
    }
}

// Example usage:
const tracker = new URLClickTracker();
tracker.trackClick("short.ly/abc");
tracker.trackClick("short.ly/abc");
tracker.trackClick("short.ly/xyz");

console.log(tracker.getClickCount("short.ly/abc")); // Output: 2
console.log(tracker.getClickCount("short.ly/xyz")); // Output: 1
console.log(tracker.getClickCount("short.ly/zzz")); // Output: 0


