var todo = (function () {

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
				helpers.saveList();
			});

			$template.find(".btn-mark-incomplete").click(function(){
				actions.markItem.call(this, false);
				helpers.saveList();
			});

			function _addNewItem(){
				var itemText = $newItemInput.val();
				if($.trim(itemText) !== ''){
					actions.addItem({
						text:itemText,
						complete:false
					});
				}
				$newItemInput.val('');

				helpers.saveList();
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

				helpers.saveList();
			});
		},
		populateList : function(){
			$.each(localStorage.getList(), function(){
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
		getListItems:function(){
			return $list.children().not("#item-template");
		},
		getListData:function(){
			var newData=[];

			helpers.getListItems()
				.each(function(){
					newData.push($(this).data(dataName));
				});
			return newData;
		},
		saveList:function(){
			//Save the list back into storage!
			localStorage.saveList(helpers.getListData());
		}
	};
})();