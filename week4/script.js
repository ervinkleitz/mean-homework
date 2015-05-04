$(document).ready( function(){
    
	getData();
	
    //***** Global var declarations *****//
    var brand, name, length, style, price, bottomImgUrl, topImgUrl, masterList, editList;
	var mainItemList = '';
	var formCounter = 0;
	var formList = document.getElementById( 'form' ).innerHTML;
	
	//Hides the ' + ' button, table, and preview button
	document.getElementById( 'addItem' ).style.visibility = 'hidden';
	document.getElementById( 'form' ).style.visibility = 'hidden';
	document.getElementById( 'preview' ).style.visibility = 'hidden';
	
	//***** Event listeners *****//
	document.getElementById( 'edit' ).addEventListener( 'click', editItems );
	document.getElementById( 'addItem' ).addEventListener( 'click', addForm );
	document.getElementById( 'save' ).addEventListener( 'click', save );
//	document.getElementById( 'preview' ).addEventListener( 'click', seePreview );
	
	////////////////////////////////////////////////////////////
	///////////////////***** Functions *****////////////////////
	////////////////////////////////////////////////////////////
	
	//***** Function to retrieve data from the server
	function getData(){
	
		$.ajax('http://mean.codingcamp.us:8888/ervinkleitz/longboards',{
		method: 'GET'
		})
		.done( getLongboardsData )
		.fail(function(){
		  console.log('GET Failed');
		});
	}//End of getData
	
    //***** Displays the saved longboards for sale *****//
    function getLongboardsData( data ){
        masterList = data;
		
        for ( var index = 0; index < masterList.length; index++ ) {
			brand = masterList[ index ]['brand'];
			name = masterList[ index ]['name'];
			length = masterList[ index ]['length'];
			style = masterList[ index ] ['style'];
			price = parseInt(masterList[ index ]['price']);
			bottomImgUrl = masterList[ index ]['bottom_img_url'];
			topImgUrl = masterList[ index ]['top_img_url'];
			
			var itemList = '<!-- start item --><div class="item"><div class="item-image"><img class="bottom" src="';
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
		document.getElementById( 'addItem' ).style.visibility = 'visible';
		document.getElementById( 'preview' ).style.visibility = 'visible';
		document.getElementById( 'edit' ).style.visibility = 'hidden';
		document.getElementById( 'items' ).style.display = 'none';
		
		for ( var itemsIndex = 0; itemsIndex < masterList.length; itemsIndex++ ) {
			var editBrand = masterList[ itemsIndex ][ 'brand' ];
			var editName = masterList[ itemsIndex ][ 'name' ];
			var editLength = masterList[ itemsIndex ][ 'length' ];
			var editStyle = masterList[ itemsIndex ][ 'style' ];
			var editPrice = masterList[ itemsIndex ][ 'price' ];
			var editBottomUrl = masterList[ itemsIndex ][ 'bottom_img_url' ];
			var editTopUrl = masterList[ itemsIndex ][ 'top_img_url' ];
			var itemId = masterList[ itemsIndex ][ '_id' ];
			
			editList += '<table class="col-md-3">';
			//Put in ID in such a way that user can't change/modify it
			editList += '<tr><td>ID:</td><td class="text-right" id="item-id">' + itemId + '</td>';
			editList += '<tr><td>Brand:</td><td class="text-right" id="test-id"><input type="text" id="brand-id"';
			editList += 'value="' + editBrand + '"></td></tr><tr><td>Name:</td><td class="text-right"><input type="text" id="name-id"';
			editList += 'value="' + editName + '"></td></tr><tr><td>Length:</td><td class="text-right"><input type="number" id="length-id"';
			editList += 'value="' + editLength +'">"</td></tr><tr><td>Style:</td><td class="text-right"><input type="text" id="style-id"';
			editList += 'value="' + editStyle + '"></td></tr><tr><td>Price:</td><td class="text-right">$<input type="number" id="price-id"';
			editList += 'value="' + editPrice + '"</td></tr><tr><td>Bottom Image:</td><td class="text-right"><input type="text" placeholder="(url)" id="bottom-url"';
			editList += 'value="' + editBottomUrl + '"></td></tr><tr><td>Top Image:</td><td class="text-right"><input type="text" placeholder="(url)" id="top-url"';
			editList += 'value="' + editTopUrl + '"></td></tr><tr><td><a class="delete" id="delete" href="#">delete</a></td><td class="text-right"><button class="save" id="update">update</button></td></tr></table>';
		}
		
		document.getElementById( 'form' ).innerHTML = editList;
		
	}//end of editItems
	
	//***** Displays one more form *****//
	function addForm(){
		document.getElementById('form').style.display = 'none';
		var tmpList = formList;
		for ( var numberOfForms = 1; numberOfForms <= formCounter; numberOfForms++ ) {
			tmpList += formList;
		}
		document.getElementById( 'add-form' ).innerHTML = tmpList;
		formCounter++;
	}//end of addForm

	//***** Saves data (sends to server) *****//
	function save(){
		var getBrand = document.getElementById( 'brand-id' ).value;
		var getName = document.getElementById( 'name-id' ).value;
		var getLength = document.getElementById( 'length-id' ).value;
		var getStyle = document.getElementById( 'style-id' ).value;
		var getPrice = document.getElementById( 'length-id' ).value; 
		var getBottomUrl = document.getElementById( 'bottom-url' ).value;
		var getTopUrl = document.getElementById( 'top-url' ).value;
		
		var dataToPost = {
			brand: getBrand,
			name: getName,
			length: getLength,
			style: getStyle,
			price: getPrice,
			bottom_img_url: getBottomUrl,
			top_img_url: getTopUrl
		};
		
		console.log(dataToPost);//For testing
		
		$.ajax({
			method: 'POST',
			url: 'http://mean.codingcamp.us:8888/ervinkleitz/longboard',
			data: JSON.stringify(dataToPost), 
			success: function(data) { alert('data: ' + dataToPost); },
			contentType: 'application/x-www-form-urlencoded',
			dataType: 'json'
		});

	}//End of save
	

    
});