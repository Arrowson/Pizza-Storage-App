# Pizza Topping App

## Overview
This app was designed to teach me how to store values to 
local storage along with calling from and changing values
currently in there. It also helps with the general display
knowledge that we have been working on through the semester.

### Instructions
    1. From the dropdowns click the toppings you want
    2. Click Add
    3. If you desire to edit a previous order, click begin editting
    4. On the new dropdowns that have appeared choose your desired toppings
    5. Click commit on the order you want to change
    6. You can kill orders by clicking the kill order button
    7. Click end editting and continue
    
### Code
I had some problems with calling from and changing values
that are in local storage already
    
    ```
    mc.editTop1 = function($index){
        mc.toppings = mc.latestData();
        var newTopping = {starting: mc.edittedTopping1.unit_name, 
        veggie: mc.edittedTopping2.unit_name, moreMeat: mc.edittedTopping3.unit_name};
        mc.toppings.splice($index, 1, newTopping);
        //console.log(mc.toppings);
        return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
    }
    ```