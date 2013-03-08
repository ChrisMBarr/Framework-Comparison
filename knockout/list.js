(function () {

	//A sub-viewmodel for each item
	var itemViewModel = function(txt, isComplete){
		this.text = ko.observable(txt);
		this.complete = ko.observable(isComplete);

		this.mark = function(isComplete){
			this.complete(isComplete);
		};
	};

	//The page viewmodel
	var viewModel = function(){
		var self = this;

		//Default data
		self.itemToAdd = ko.observable("");
		self.items = ko.observableArray([
			new itemViewModel("Buy some pies", true),
			new itemViewModel("Eat the pies", false),
			new itemViewModel("Go buy more pies", false)
		]);

		//Add a new item
		self.addItem = function(){
			if(self.itemToAdd().trim() !== ""){
				self.items.push(new itemViewModel(self.itemToAdd(),false));
				self.itemToAdd("");
				document.getElementById("txt-item-add").focus();
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
		};

	};
	 
	ko.applyBindings(new viewModel());

})();