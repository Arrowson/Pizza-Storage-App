var pizzaModule = angular.module('pizza_storage_app', []);

pizzaModule.controller("MainController", ['$scope','PizzaStorageService', 
                    function ($scope, PizzaStorageService){
    
    var mc = this;
    
    //these hold the actual topping strings that will be used
    mc.topping1 = "";
    mc.topping2 = "";
    mc.topping3 = "";
    mc.toppings = [];
    
    
    //these hold the editted toppings
    mc.edittedTopping1 = "";
    mc.edittedTopping2 = "";
    mc.edittedTopping3 = "";
    
    //holds the toppings that are chosen
    mc.selected_topping1;
    mc.selected_topping2;
    mc.selected_topping3;
    
    //holds the topping choices
    mc.startingToppings = [
        {
            unit_name: "cheese",
            unit_code: "ch"
        },
        {
            unit_name: "pepperoni",
            unit_code: "pep"
        },
        {
            unit_name: "hamburger",
            unit_code: "ham"
        }
        ];
    mc.veggies = [
        {
            unit_name: "mushrooms",
            unit_code: "mush"
        },
        {
            unit_name: "bell peppers",
            unit_code: "bell"
        },
        {
            unit_name: "pineapple",
            unit_code: "pine"
        }
        ];    
    mc.extraMeat = [
        {
            unit_name: "canadian bacon",
            unit_code: "can"
        },
        {
            unit_name: "real bacon",
            unit_code: "bacon"
        },
        {
            unit_name: "chicken",
            unit_code: "chick"
        }
        ];  
        
    mc.latestData = function(){
        return PizzaStorageService.getData('my-storage');
    }
        
    mc.update = function(top1, top2, top3){
        
        if(mc.toppings == null){
			mc.toppings = [];
		}
		
		var topping = {starting: top1, veggie: top2, moreMeat: top3};
		//console.log(angular.toJson(topping));
		mc.toppings.push(topping);
		return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
		
    }
    
    mc.editForm = false;
    mc.showEdit = function(){
        mc.editForm = true;
    }
    mc.hideEdit = function(){
        mc.editForm = false;
    }
    
    mc.editTop1 = function($index){
        mc.toppings = mc.latestData();
        var newTopping = {starting: mc.edittedTopping1.unit_name, 
        veggie: mc.edittedTopping2.unit_name, moreMeat: mc.edittedTopping3.unit_name};
        mc.toppings.splice($index, 1, newTopping);
        //console.log(mc.toppings);
        return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
    }
    
    mc.killOrder = function($index){
        mc.toppings = mc.latestData();
        mc.toppings.splice($index, 1);
        return PizzaStorageService.setData('my-storage', angular.toJson(mc.toppings));
    }
    
    
    /*
    if(mc.toppings != null){
        mc.toppings = mc.latestData();
    }else{
        console.log("outside functions")
    }
    */
    
    
    
}]);

pizzaModule.factory("PizzaStorageService", function($window, $rootScope){
    
    angular.element($window).on('storage', function(event) {
        if(event.key === 'my-storage') {
            $rootScope.$apply();
        }
    })
    
    return {
        setData: function(key, val) {
            
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key){
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data;
            
        }
        
    }
    
})