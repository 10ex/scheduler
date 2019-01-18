/**
 * Create function that given an employee availibility list, calculate the the employees complexity score
 * 
 * [{day: Sunday, hours: [0,1,1, 1, 1, 1, 1, 0, 1] }, .... ,{day: Saturday}]
 * 
 *  algoithm is sum of the hours availible in an availibility list
 */

 const complexity = (availiability) => {
    let sum = 0
    for (let i = 0; i < availiability.length; i++) {

        
        let hours = availiability[i].hours  

        for (let j = 0; j < hours.length; i++) {

           sum = hours[j] + sum

        }

    }
    return sum 
 }