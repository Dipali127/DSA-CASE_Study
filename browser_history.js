// Design a browser history system using in-memory data structures. It should support the following operations:
// Required methods:
// visit(url: string)
// → Visits a new URL. Clears all forward history if any forward history exist.
// back()
// → Goes back to the previous URL (if possible). If there's no previous URL, stay on the current page.
// forward()
// → Goes forward to the next URL (if possible). If there's no forward history, stay on the current page.
// getCurrentPage()
// → Returns the URL of the current page.

// When we visit a new URL, the current page is pushed to the back stack, and the forward stack is cleared — just like
// how a real browser forgets forward history when you navigate to a new page.

// Backward History (Back Stack): This stores the URLs you visited before the current page.
// You can go back to these pages using the browser's back button.
// Forward History (Forward Stack): This stores the URLs you left after going back to a previous page.
// A URL is only added to the forward history when you move from the current page back to a previous one.
// This forward history is cleared if you visit a new URL after going back.                                  
// You can return to these pages using the browser's forward button.
// For example:
// If you visit Instagram from Google, then Google is pushed onto the back stack. 
// If there was any forward history before Google, it gets cleared (in this case, there's none, so forward history is empty).
// Now, if you press Back from Instagram, you go back to Google, then Instagram is pushed onto the forward stack.
// Then, if you visit a new URL like Facebook from Google, the browser clears the forward history 
// (which contained Instagram) before visiting Facebook.
// This is exactly how most web browsers behave when managing back and forward history.

// Explanation:-
// Since this is an in-memory system, we design a class called `BrowserHistory`.
// We'll maintain two stacks: `forwardHistory` and `backwardHistory` to store forward and backward URLs respectively.
// Additionally, we use a variable `currentUrl` to keep track of the current page URL.

// All Methods Used in the Code:-
// (1) visit(url):
// This method is called when the user visits a new URL.
// If `currentUrl` is not empty, it pushes the current URL into the `backwardHistory` stack before visiting the new one.
// Then, it updates `currentUrl` to the new URL and clears the `forwardHistory` stack.
// but if currentUrl is empty then add current visited url in this currentUrl variable.
// Example:
// If you first visit Google, `visit()` sets `currentUrl` to Google.
// Later, if you visit Instagram, it pushes Google to `backwardHistory`, updates `currentUrl` to Instagram, and 
// clears any forward history.

// (2) back():
// This method is called when the user wants to navigate back to the previous page.
// It checks whether a previous page exists in the `backwardHistory` stack.
// If it does, it pushes the current URL to `forwardHistory`, pops the top URL from `backwardHistory` and sets 
// it as `currentUrl`.
// Example: Going back from Instagram to Google pushes Instagram to `forwardHistory` and makes Google the current page.

// (3) forward():
// This method is called when the user wants to move forward after going back.
// It checks whether a forward URL exists in `forwardHistory`.
// If yes, it pushes the current URL to `backwardHistory`, pops the top URL from `forwardHistory`, and sets 
// it as `currentUrl`.
// Example: Moving forward to Instagram from Google adds Google to `backwardHistory` and sets Instagram as the current 
// page.

// (4) getCurrentPage():
// Simply returns the current URL which the user is currently visiting.

// TIME COMPLEXITY: O(1)
// All operations (`visit`, `back`, `forward`, and `getCurrentPage`) use stack operations (push/pop/peek), which 
// take constant time, So each method runs in O(1) time.

// SPACE COMPLEXITY: O(N)
// The space used depends on how many URLs are stored in the `backwardHistory` and `forwardHistory` stacks.
// Therefore, the space complexity is O(N) where N is the number of visited pages.

// code:
class browserHistory{
    constructor(){
        this.forwardHistory = [];
        this.backwardHistory = [];
        this.currentUrl = "";
    }
    
    visit(url){ 
        if(this.currentUrl){
             this.backwardHistory.push(this.currentUrl);
        }
             this.currentUrl = url  
             this.forwardHistory = []; 
            console.log("Visited:", this.currentUrl);
    }
    
    back(){
        if(this.backwardHistory.length > 0){
            this.forwardHistory.push(this.currentUrl);
            this.currentUrl =  this.backwardHistory.pop();
            console.log("Went back to:", this.currentUrl);
        }else{
          console.log("You can't go to the previous page");  
        }
    }
    
    forward(){
        if(this.forwardHistory.length > 0){
            this.backwardHistory.push(this.currentUrl)
            this.currentUrl = this.forwardHistory.pop(); 
            console.log("Went forward to:", this.currentUrl);
        }else{
           console.log("You can't go to the page you visited in the past");  
        }
    }
    
    getCurrentPage(){
        console.log("Current page:", this.currentUrl);
    }
}


const url = new browserHistory();
url.visit('http://www.google.com');  // Visited: http://www.google.com
url.visit('http://www.fb.com');     // Visited: http://www.fb.com
url.getCurrentPage()                // Current page: http://www.fb.com
url.forward();                     // You can't go to the page you visited in the past 
url.back();                       // Went back to: http://www.google.com




