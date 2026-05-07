/**
 * What is closure?
 * A function holds onto variables from its parent even after the parent has finished executing.
 * The child function closes over those variables. JavaScript's garbage collector won't touch them until nothing references them anymore.
 */


/**
 * A rate limiter is a function that limits the number of times a given function can be called within a specified time window.
 * For example, if you have a rate limiter that allows 3 calls per 5 seconds, and you call the function 4 times within 5 seconds, the fourth call should be blocked until the time window has passed.
 * Implement a rate limiter function that takes in a rate limit and a time window, and returns a function that can be called to check if the rate limit has been exceeded.
 */



//CONS TO CONSIDER:
/**The catch in the  example is we didnt destroy the activelist, this eventually lead to memory leak in future. 
 * The entries in the active list will sit stale in array as long as the limiter() kepp hold of the returned function reference */



function createRateLimiter(rateLimiter, windowMs){
    let limit = rateLimiter;
 
    let activeList = [];
    let destroyed = false;
     function limiter(fn){
        const currentTime = Date.now()
        activeList=activeList.filter(time=> currentTime-time<windowMs)
            if(activeList.length >= limit){
                console.log("Rate limit exceeded. Please try again later.")
                return; 
             }
        activeList.push(currentTime);
        fn()

             return activeList
    }

    function destroy(){
        activeList = [];
        destroyed = true;
    }

    return {limiter, destroy}
}

let {limiter, destroy} = createRateLimiter(4, 5000)
console.log(limiter(() => console.log("Calls Made")))
console.log(limiter(() => console.log("Calls Made")))    
console.log(limiter(() => console.log("Calls Made")))    
setTimeout(()=>{console.log(limiter(() => console.log("Calls Made")))}, 1000)    
setTimeout(()=>{console.log(limiter(() => console.log("Calls Made")))}, 2000)    
setTimeout(()=>{console.log(limiter(() => console.log("Calls Made")))}, 3000)    
setTimeout(()=>{console.log(limiter(() => console.log("Calls Made")))}, 6000)    



setTimeout(()=>{console.log("Memory destroyed"), destroy(), limiter=null}, 10000)







