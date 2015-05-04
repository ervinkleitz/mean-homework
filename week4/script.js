$(document).ready( function(){
    
	getData();
	
    //***** Global var declarations *****//
    var brand, name, length, style, price, bottomImgUrl, topImgUrl, mainItemList;
	var formCounter = 0;
	var formList = document.getElementById('form').innerHTML;
	
	//Hides the ' + ' button and the Table
	document.getElementById( 'addItem' ).style.visibility = 'hidden';
	document.getElementById( 'form' ).style.visibility = 'hidden';
	
	//***** Event listeners *****//
	document.getElementById( 'edit' ).addEventListener( 'click', editItems );
	document.getElementById( 'addItem' ).addEventListener( 'click', addForm );
	document.getElementById( 'save' ).addEventListener( 'click', save );
	
	/////////////////////////
	//***** Functions *****//
	/////////////////////////
	
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
        var masterList = data;
		mainItemList = '';
		
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
		return mainItemList;
    }//End of getLongboardsData
	
	//***** Displays the edit page *****//
	function editItems(){
		document.getElementById( 'addItem' ).style.visibility = 'visible';
		document.getElementById( 'items' ).style.display = 'none';
		
	}//end of editItems
	
	//***** Displays one more form *****//
	function addForm(){
		document.getElementById( 'form' ).style.visibility = 'visible';
		var tmpList = formList;
		for ( var numberOfForms = 1; numberOfForms <= formCounter; numberOfForms++ ) {
			document.getElementById( 'form' ).innerHTML = tmpList;
			tmpList += formList;
		}
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