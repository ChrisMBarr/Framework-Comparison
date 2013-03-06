var todo = (function () {

	var initialItems=[
		{
			id: 1,
			text: "Buy some pies",
			complete: true
		},
		{
			id: 2,
			text: "Eat the pies",
			complete: false
		},
		{
			id: 3,
			text: "Go buy more pies",
			complete: false
		}
	];

	var dataName = "info";
	var $list;
	var $template;
	var $newItemInput;
	
	//page load
	$(function(){
		$list = $("#todo");
		$template = $("#item-template");
		$newItemInput = $("#txt-item-add");

		setup.interaction();
		setup.populateList();
	});

	var setup={
		interaction:function(){
			$template.find(".btn-mark-complete").click(function(){
				actions.markItem.call(this,true);
			});

			$template.find(".btn-mark-incomplete").click(function(){
				actions.markItem.call(this, false);
			});

			function _addNewItem(){
				var itemText = $newItemInput.val();
				if($.trim(itemText) !== ''){
					actions.addItem({
						text:itemText,
						complete:false, 
						id: helpers.getNextHighestId()
					});
				}
				$newItemInput.val('');
			}

			$("#btn-item-add").click(_addNewItem);
			$newItemInput.keyup(function(e){
				if(e.keyCode === 13){ //return key
					_addNewItem();
				}
			});

			$("#btn-remove-completed").click(function(){
				helpers.getListItems()
					.each(function(){
						var $thisItem = $(this);
						if($thisItem.data(dataName).complete){
							$thisItem.remove();
						}
					});
			});
		},
		populateList : function(){
			$.each(initialItems, function(){
				actions.addItem(this);
			});
		}
	}

	var actions={
		addItem:function(thisData){
			$template
				.clone(true)
				.removeClass("hide")
				.removeAttr("id")
				.appendTo($list)
				.toggleClass("state-complete", thisData.complete)
				.data(dataName, thisData)
				.find(".item-text")
				.text(thisData.text);
		},
		markItem:function(isComplete){
			var $item = $(this).parent();
			$item.toggleClass("state-complete", isComplete)
			
			//Change the data
			$item.data(dataName).complete = isComplete;
			
		}
	};

	var helpers = {
		getNextHighestId:function(){
			var $items = helpers.getListItems();
			if($items.length>0){
				return $items.last().data(dataName).id+1;	
			}
			
			return 0;
		},
		getListItems:function(){
			return $list.children().not("#item-template");
		}
	};

	// return{
	// 	displayData:function(){
	// 		var newData=[];

	// 		helpers.getListItems()
	// 			.each(function(){
	// 				newData.push($(this).data(dataName));
	// 			});

	// 		console.log(newData);
	// 	}
	// }

})();