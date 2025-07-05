// Problem Statement:
// Design and implement a data structure for a Least Recently Used (LRU) cache.
// Implement the LRUCache class with the following methods:
// LRUCache(int capacity)
// Initializes the LRU cache with a positive integer capacity.
// int get(int key)
// Returns the value of the key if it exists in the cache.
// Otherwise, returns -1.
// Whenever a key is accessed via get, it becomes the most recently used.
// void put(int key, int value)
// Updates the value of the key if it already exists.
// If the key does not exist, insert the key-value pair into the cache.
// If the number of keys exceeds the cache’s capacity after insertion, evict the least recently used (LRU) key.

// Constraints:
// Both get and put must run in O(1) average time complexity.
// You must use only in-memory data structures.
// Do not use any built-in OrderedDict, LinkedHashMap, or prebuilt LRU classes.
// LRUCache lru = new LRUCache(2); // Initialize cache with capacity 2

lru.put(1, 1);   
// Cache: {1=1}

lru.put(2, 2);   
// Cache: {1=1, 2=2}

lru.get(1);      
// Returns 1
// Marks key 1 as most recently used, so move it to the end
// Cache becomes: {2=2, 1=1}

lru.put(3, 3);   
// Capacity exceeded. Evicts least recently used key (2)
// Cache: {1=1, 3=3}

lru.get(2);      
// Returns -1 (key 2 was evicted)

lru.put(4, 4);   
// Capacity exceeded. Evicts least recently used key (1)
// Cache: {3=3, 4=4}

lru.get(1);      
// Returns -1 (key 1 was evicted)

lru.get(3);      
// Returns 3 (moves key 3 to the end)
// Cache: {4=4, 3=3}

lru.get(4);      
// Returns 4 (moves key 4 to the end)
// Cache: {3=3, 4=4}

// Explanation:
// Approach1:-
// To implement lru cache, i will use of hash map which maintain the insertion order of key-value pairs by adding key 
// value in sequence. This behavior helps us to simulate an LRU (Least Recently Used) cache where:
// The most recently used items are placed at the end of the hash map.
// The least recently used items are at the beginning of the hash map.

// In the get() method:
// If the key exists, we return its value.
// But before returning, we remove it from the hash map and reinsert it at the end of the hash map to mark it as the most 
// recently used key value pair.
// But if the key does not exist, then return -1.

// In the put() method:
// If the key already exists, delete it first and reinsert it with the new value at the end of hash map, so it becomes 
// the most recently used.
// If the key doesn't exist then add it to the end of the hash map.
// After adding, if the map's size exceeds the cache's capacity, remove the first key in the map using .keys().next().value,
// which represents the least recently used item.

// how this.map.keys().next() work?
// here, map.keys() returns a Map Iterator object that iterates over the keys of the map in insertion order.
// For example, if your map is:
// const map = new Map();
// map.set(1, 'a');
// map.set(2, 'b');
// Then:
// map.keys()         // => [Map Iterator] {1, 2}
// map.keys().next()  // => { value: 1, done: false }
// When you call .next() immediately, it always returns the first key of hash map because the iterator starts at the beginning of the sequence each time it's created.
// And "done: false" means that indicates that the iteration is not yet complete because next
// always return the first key from hash map and stop.

// TC:- O(1), All operations (`get`, `put`, `delete`, `set`) on a Map are average-case O(1).
// SC:- O(N), Space grows with the number of keys stored in the hash map (up to capacity).
// Note:- 
// Whenever get() or put() is called on an existing key, we update the position of that key-value pair in the cache to
// reflect it as the most recently used by moving it to the end of the cache.
class lruCache{
    constructor(capacity){
        this.capacity = capacity;
        this.map = new Map();
    }
    
    get(key){
        if(!this.map.has(key)){
            return -1;
        }
        
        let value = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, value);
        return value;
    }
    
    put(key,value){
        if(this.map.has(key)){
            this.map.delete(key);
        }
        
        this.map.set(key, value);
        if(this.map.size > this.capacity){
            let lru = this.map.keys().next().value;
            this.map.delete(lru);
        }
        console.log(this.map)
    }
}

const lru1 = new lruCache(2);
lru1.put(1,1);
console.log(lru1.get(1));
lru1.put(2,2);
console.log(lru1.get(2))
lru1.put(3,3);


// Approach2:
// To implement an LRU cache, I will use a HashMap and a Doubly Linked List.
// The HashMap is used for fast lookup of key-value pairs.
// The Doubly Linked List is used for constant-time insertion and deletion, and to maintain the order of usage —
// with the most recently used (MRU) items near the head and the least recently used (LRU) items near the tail.

// In the get() method:
// If the key exists, we return its value.
// Before returning, we remove the corresponding node from its current position in the doubly linked list
// and reinsert right after the head node to mark it as most recently used.
// If the key does not exist, we return -1.

// In the put() method:
// If the key already exists, we remove its node from the doubly linked list.
// Then, we create a new node with the updated value and reinsert it at the front of the doubly linked list,
// and update the HashMap to point to this new node.
// If the key does not exist, we insert the new key-node pair into both the doubly linked list and the HashMap.
// After insertion, if the size of the cache exceeds the given capacity,
// we remove the least recently used node (i.e., the node just before the tail),
// and also delete its key from the HashMap.

// Time Complexity: O(1)
// All operations (`get`, `put`, `delete`, `set`) on a Map and the doubly linked list run in constant time.

// Space Complexity: O(N)
// Space grows with the number of keys stored in the HashMap and the doubly linked list (up to the given capacity).

// How the HashMap stores key-value pairs:
// The key is the given input key, and the value is a reference to the corresponding node in the doubly linked list.
// For example, put(1,1) results in a map like: {1 => {prev, 1, next}}

// Why head and tail are initialized with dummy nodes (value 0)?
// These dummy nodes simplify insertion and removal operations by avoiding edge case checks
// (like if the list is empty or has only one node) that means we don't need to handle edge cases like an empty list 
// or single node.
 
class doublyLinkedlist{
    constructor(key,value){
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class lruCache{
    constructor(capacity){
        this.capacity = capacity;
        this.map = new Map();
        this.head = new doublyLinkedlist(0,0)
        this.tail = new doublyLinkedlist(0,0)
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    add(node){
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
    
    remove(node){
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    get(key){
        if(!this.map.has(key)){
            return -1;
        }
        
        let node = this.map.get(key);
        this.remove(node);
        this.add(node)
        return node.value;
    }
    
    put(key,value){
        if(this.map.has(key)){
            this.remove(this.map.get(key));
        }
        
        let node = new doublyLinkedlist(key, value)
        this.add(node);
        this.map.set(key, node);
        if(this.map.size > this.capacity){
            let lru = this.tail.prev;
            this.remove(lru);
            this.map.delete(lru.key);
        }
        console.log(this.map)
    }
}

const lru2 = new lruCache(2);
lru2.put(1,1);
console.log(lru2.get(1));
lru2.put(2,2);
console.log(lru2.get(2))
lru2.put(3,3);



