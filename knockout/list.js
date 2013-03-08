(function () {

	//A sub-viewmodel for each item
	var itemViewModel = function(txt, isComplete){
		this.text = ko.observable(txt);
		this.complete = ko.observable(isComplete);
	};

	//The page viewmodel
	var viewModel = function(){
		var self = this;

		//Default data
		self.itemToAdd = ko.observable("");
		self.items = ko.observableArray();

		var data = localStorage.getList();
		for (var i = 0; i <= data.length - 1; i++){
			self.items.push(new itemViewModel(data[i].text, data[i].complete));
		};

		this.markItem = function(isComplete){
			this.complete(isComplete);

			self.saveList();
		};

		//Add a new item
		self.addItem = function(){
			if(self.itemToAdd().trim() !== ""){
				self.items.push(new itemViewModel(self.itemToAdd(),false));
				self.itemToAdd("");
				document.getElementById("txt-item-add").focus();

				self.saveList();
			}
		};

		//Look for the return key
		self.watchKeyEvents= function (data, event) {
			if (event.which == 13) {
				self.addItem();
				return false;
			}
			return true;
		}

		//remove items that are marked as being completed
		self.clearCompleted = function(){
			self.items.remove(function(thisItem){
				return thisItem.complete();
			})

			self.saveList();
		};

		self.saveList = function(){
			//Save the list back into storage!
			localStorage.saveList(JSON.parse(ko.toJSON(self.items())));
		};

	};
	 
	ko.applyBindings(new viewModel());

})();