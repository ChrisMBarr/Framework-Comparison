(function(){

	var TODO_LIST_KEY = "TODO_LIST";

	//we return this if there is nothing else...
	var defaultData={
		items:[
			{
				text: "Buy some pies",
				complete: true
			},
			{
				text: "Eat the pies",
				complete: false
			},
			{
				text: "Go buy more pies",
				complete: false
			}
		]
	};

	//Extend the JavaScript API so we can work with JSON objects directly instead of strings
	Storage.prototype.saveList = function(data) {
		var fullData = {items: data};
		console.log("SAVE", typeof data, data, typeof fullData, fullData);
		this.setItem(TODO_LIST_KEY, JSON.stringify(fullData));
	}

	Storage.prototype.getList = function() {
		var value = JSON.parse(this.getItem(TODO_LIST_KEY));
		console.log("GET", value);
		return value.items;
	}

	//Put some default data in storage if none has ever existed!
	if(localStorage.getList() === null){
		localStorage.saveList(defaultData.items);
	}
})();