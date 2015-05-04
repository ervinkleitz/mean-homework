$(document).ready( function(){
	
	$.ajax('http://mean.codingcamp.us:8888/ervinkleitz/longboards',{
	method: 'GET'
	})
	.done( getLongboardsData )
	.fail(function(){
	console.log('GET Failed');
	}); 
	
	//***** Global var declarations *****//
    var brand, name, length, style, price, bottomImgUrl, topImgUrl, masterList, editList;
	var mainItemList = '';
	var formCounter = 0;
	var formList = document.getElementById( 'add-form' ).innerHTML; 
	
	//Hides the ' + ' button, table, and preview button
	document.getElementById( 'addItem-button' ).style.visibility = 'hidden';
	document.getElementById( 'form' ).style.visibility = 'hidden';
	document.getElementById( 'preview-button' ).style.visibility = 'hidden'; 
	
	//***** Event listeners *****//
	document.getElementById( 'edit-button' ).addEventListener( 'click', editItems );
	document.getElementById( 'addItem-button' ).addEventListener( 'click', addForm ); 
	document.getElementById( 'preview-button' ).addEventListener( 'click', function reload() { location.reload;} );
	
	function getLongboardsData( data ){
        masterList = data;
		var itemList = '';
        for ( var index = 0; index < masterList.length; index++ ) {
			brand = masterList[ index ]['brand'];
			name = masterList[ index ]['name'];
			length = masterList[ index ]['length'];
			style = masterList[ index ] ['style'];
			price = parseInt(masterList[ index ]['price']);
			bottomImgUrl = masterList[ index ]['bottom_img_url'];
			topImgUrl = masterList[ index ]['top_img_url'];
			
			itemList = '<!-- start item --><div class="item"><div class="item-image"><img class="bottom" src="';
			itemList += bottomImgUrl + '"><img class="top" src="' + topImgUrl + '"></div><div class="name">';
			itemList += '</div><div class="name">' + brand + ' ' + length + '" ' + name + '<br>' + style + '</div><div class="price">';
			itemList += '$' + price + '</div></div><!-- end item -->';
			
			mainItemList += itemList;
		}
		
		document.getElementById( 'items' ).innerHTML = mainItemList;
    }//End of getLongboardsData 
	
	//***** Displays the edit page *****//
	function editItems(){
		editList = '';
		document.getElementById( 'form' ).style.visibility = 'visible';
		document.getElementById( 'addItem-button' ).style.visibility = 'visible';
		document.getElementById( 'preview-button' ).style.visibility = 'visible';
		document.getElementById( 'edit-button' ).style.visibility = 'hidden';
		document.getElementById( 'items' ).style.display = 'none';
		
		editList += '<table class="col-md-3">';
		editList += '<tr><td>ID:</td><td class="text-right"><input type="text" id="item-id" value=""></td>';
		editList += '<tr><td>Brand:</td><td class="text-right" id="test-id"><input type="text" id="brand-id"';
		editList += 'value=""></td></tr><tr><td>Name:</td><td class="text-right"><input type="text" id="name-id"';
		editList += 'value=""></td></tr><tr><td>Length:</td><td class="text-right"><input type="number" id="length-id"';
		editList += 'value="">"</td></tr><tr><td>Style:</td><td class="text-right"><input type="text" id="style-id"';
		editList += 'value=""></td></tr><tr><td>Price:</td><td class="text-right">$<input type="number" id="price-id"';
		editList += 'value=""</td></tr><tr><td>Bottom Image:</td><td class="text-right"><input type="text" placeholder="(url)" id="bottom-url"';
		editList += 'value=""></td></tr><tr><td>Top Image:</td><td class="text-right"><input type="text" placeholder="(url)" id="top-url"';
		editList += 'value=""></td></tr>';
		editList += '</tr><tr><td><a class="delete" id="delete-item" href="#">delete</a></td><td class="text-right"><button class="save" id="update">update</button></td></tr></table><hr>';
		editList += '<br>Longboards Currently on Sale<hr>';
		//Display list of Longboards that are currently on sale
		for ( var itemsIndex = 0; itemsIndex < masterList.length; itemsIndex++ ) {
			var editBrand = masterList[ itemsIndex ][ 'brand' ];
			var editName = masterList[ itemsIndex ][ 'name' ];
			var editLength = masterList[ itemsIndex ][ 'length' ];
			var editStyle = masterList[ itemsIndex ][ 'style' ];
			var editPrice = masterList[ itemsIndex ][ 'price' ];
			var editBottomUrl = masterList[ itemsIndex ][ 'bottom_img_url' ];
			var editTopUrl = masterList[ itemsIndex ][ 'top_img_url' ];
			var itemId = masterList[ itemsIndex ][ '_id' ];
			
			editList += '<table class="col-md-4">';
			editList += '<tr><td>ID:</td><td>' +itemId+ '</td>';
			editList += '<tr><td>Brand:</td><td>' + editBrand + '</td></tr>';
			editList += '<tr><td>Name:</td><td>' + editName + '</td></tr>';
			editList += '<tr><td>Length:</td><td>' + editLength + '</td></tr>';
			editList += '<tr><td>Style:</td><td>' + editStyle + '</td></tr>';
			editList += '<tr><td>Price:</td><td>' + editPrice + '</td></tr>';
			editList += '<tr><td>Bottom Url:</td><td>' + editBottomUrl + '</td></tr>';
			editList += '<tr><td>Top Url:</td><td>' + editTopUrl + '</td></tr>';
			editList += '<tr><td></td></tr></table><hr>';
		}//End of for loop
		
		document.getElementById( 'form' ).innerHTML = editList;
		//***** Event Listeners when editing *****//
		document.getElementById( 'update' ).addEventListener( 'click', updateItem );
//		document.getElementById( 'delete-item' ).addEventListener( 'click', deleteItem );
		
	}//end of editItems 
	
	//***** Function that updates Longboards. Shows a list of available longboards *****//
	//***** and a form to upate the list *****//
	function updateItem(){
		
		var getBrand = document.getElementById( 'brand-id' ).value;
		var getName = document.getElementById( 'name-id' ).value;
		var getLength = document.getElementById( 'length-id' ).value;
		var getStyle = document.getElementById( 'style-id' ).value;
		var getPrice = document.getElementById( 'length-id' ).value; 
		var getBottomUrl = document.getElementById( 'bottom-url' ).value;
		var getTopUrl = document.getElementById( 'top-url' ).value;
		var getId = document.getElementById( 'item-id' ).value;
		
		var dataToPut = {
			brand: getBrand,
			name: getName,
			length: getLength,
			style: getStyle,
			price: getPrice,
			bottom_img_url: getBottomUrl,
			top_img_url: getTopUrl
		};

		$.ajax({
			method: 'PUT',
			url: 'http://mean.codingcamp.us:8888/ervinkleitz/longboard/' + getId,
			data: JSON.stringify(dataToPut), 
			success: function(data) { alert( 'Item Updated!' ); console.log(JSON.stringify(dataToPut)); },
			contentType: 'application/x-www-form-urlencoded',
			dataType: 'json'
		});
		
	}//End of updateItem
	
	//***** Displays one more form *****// 
	function addForm(){
		document.getElementById('form').style.display = 'none';
		document.getElementById('add-form').style.visibility = 'visible';
		var tmpList = formList;
		for ( var numberOfForms = 1; numberOfForms <= formCounter; numberOfForms++ ) {
			tmpList += formList;
		}
		document.getElementById( 'add-form' ).innerHTML = tmpList;
		formCounter++;
		document.getElementById( 'save-added' ).addEventListener( 'click', save );
	}//end of addForm

	//***** Saves data (sends to server) *****//
	function save(){
		var getBrand = document.getElementById( 'add-brand' ).value;
		var getName = document.getElementById( 'add-name' ).value;
		var getLength = document.getElementById( 'add-length' ).value;
		var getStyle = document.getElementById( 'add-style' ).value;
		var getPrice = document.getElementById( 'add-price' ).value; 
		var getBottomUrl = document.getElementById( 'add-bottom-url' ).value;
		var getTopUrl = document.getElementById( 'add-top-url' ).value;
		
		var dataToPost = {
			brand: getBrand,
			name: getName,
			length: getLength,
			style: getStyle,
			price: getPrice,
			bottom_img_url: getBottomUrl,
			top_img_url: getTopUrl
		};
		
		$.ajax({
			method: 'POST',
			url: 'http://mean.codingcamp.us:8888/ervinkleitz/longboard/',
			data: JSON.stringify(dataToPost), 
			success: function(data) { alert( 'Item Saved!' ); console.log(JSON.stringify(dataToPost)); }
		});

	}//End of save 
	
	
});