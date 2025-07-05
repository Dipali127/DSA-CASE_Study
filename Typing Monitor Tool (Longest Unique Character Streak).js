// “Design a tool that monitors a user’s typing in real time and tracks the longest streak of characters 
// typed without repeating any character.
// For example, if the input is abcabcbb, the longest unique streak is abc, which has length 3.
// Tip to Clarify with Interviewer:
// “Should I return only the length of the longest substring or the substring itself?”
// Explanation:- 
// Brute-force Idea:
// I'll use each possible substring and for each substring, use of has set to store unique character in that substring.
// Time Complexity:- O(N^2), since for each substring, we iterate through that substring to get unique characters,
// (nested loop used).
// Space Complexity:- O(N), to store unique characters in the hash set.

// Optimal Approach:
// I’ll use the sliding window technique with a hash set to store unique characters in the current window.
// If a character repeats in the current window, I’ll slide the window from the left until all characters are unique.
// Time Complexity:- O(N), since we linearly take each substring.
// Space Complexity:- O(N), since we use hash map to store the unique characters from the given string.

// Code:-
class LongestUniqueStreak{
    getMaxStreak(string){
        let set = new Set()
        let start = 0, end = 0, longStringLength = 0;
        while(end < string.length){
            if(!set.has(string[end])){
                set.add(string[end]);
                longStringLength = Math.max(longStringLength, set.size);
                end++;
            }else{
                set.delete(string[start]);
                start++;
            }
        }
        
        return longStringLength;
    }
}

const monitorTool = new LongestUniqueStreak();
console.log(monitorTool.getMaxStreak("abcabc")); // o/p =3
console.log(monitorTool.getMaxStreak("pwkce")); // o/p = 5