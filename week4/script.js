$(document).ready( function(){
    
    $.ajax('http://mean.codingcamp.us:8888/codingcampus/longboards',{
        method: 'GET'
    } )
    .done( getLongboardsData )
    .fail(function(){
          console.log('GET Failed');
    });
    
    var brand, name, length, style, price, bottomImgUrl, topImgUrl, mainItemList;
	
	document.getElementById( 'edit' ).addEventListener('click', editItems);
	
    // ***** Displays the saved longboards for sale *****//
    function getLongboardsData( data ){
        var masterList = data;
		console.log(masterList);
		mainItemList = '';
		
        for ( var index = 0; index < masterList.length; index++ ) {
			brand = masterList[ index ]['brand'];
			name = masterList[ index ]['name'];
			length = masterList[ index ]['length'];
			style = masterList[ index ] ['style'];
			price = parseInt(masterList[ index ]['price']);
			bottomImgUrl = masterList[ index ]['bottom_img_url'];
			topImgUrl = masterList[ index ]['top_img_url'];
			console.log(bottomImgUrl + ' ' + topImgUrl);
			var itemList = '<!-- start item --><div class="item"><div class="item-image"><img class="bottom" src="';
			itemList += bottomImgUrl + '"><img class="top" src="' + topImgUrl + '"></div><div class="name">';
			itemList += '</div><div class="name">' + brand + ' ' + length + '" ' + name + '<br>' + style + '</div><div class="price">';
			itemList += '$' + price + '</div></div><!-- end item -->';
			
			mainItemList += itemList;
		}
		
		document.getElementById( 'items' ).innerHTML = mainItemList;
    }
	
	//Displays the edit page
	function editItems(){
		
	}
    
});