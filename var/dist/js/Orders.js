$( document ).ready(function() {
	$( "#ordersForm" ).on( "submit", function( event ) {
	  var outletVar = $(".outlet-select").find(":selected").val();
	  
	  if ( outletVar == "" || typeof outletVar == "undefined" ) {
			alert("Please input outlet");
			$(".outlet-select").focus();
			event.preventDefault();		  
	  }
	});
	
	var d = new Date(new Date().getTime()+(24*60*60*1000));

	var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	var date = d.getDate();
	var month = d.getMonth();
	var year = d.getFullYear();
	var monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var tomorrowsDate = date + " " + monthArray[month] + " " + year;
	
	$("#Tomorrows-Date").text("Order for " + date + " " + monthArray[month] + " " + year);
	
	$(".outlet-select").on("change", function( event ) {
	  if ( $(this).val() == "Amoy" ) {
		  $("#RWS_Accordion").hide();
		  $("#Amoy_Accordion").show();
		  
		  $('#RWS_Accordion').find('input[type=number]').val('');
	  } 
		// Modified by KL for 20231212 - Added Courtyard
		else if ( $(this).val() == "RWS" || $(this).val() == "Courtyard" ) {
		  $("#Amoy_Accordion").hide();
		  $("#RWS_Accordion").show();
			
			// Modified by KL for 20231212 - show Toasted Cereal when non-RWS is selected
			if ( $(this).val() == "RWS" ) {
				var $ToastedCerealLabelVar = $('label:contains("Toasted Cereal")');
				$ToastedCerealLabelVar.show();
				var $ToastedCerealInputVar = $ToastedCerealLabelVar.nextAll("input:first");
				$ToastedCerealInputVar.show();
			} else {
				var $ToastedCerealLabelVar = $('label:contains("Toasted Cereal")');
				$ToastedCerealLabelVar.hide();
				var $ToastedCerealInputVar = $ToastedCerealLabelVar.nextAll("input:first");
				$ToastedCerealInputVar.hide();
				$ToastedCerealInputVar.val('');
			}
		  
		  $('#Amoy_Accordion').find('input[type=number]').val('');
		  // $('#flush-collapseSixAmoy').collapse();
	  }
	});
	
	// Updated by KL on 20231212 - Changed from Small Orders to Start Order 
	$( "#start-order-outlined" ).on( "click", function( event ) {
		$("#Outlet-Section").delay(100).fadeIn();
		$("#Whole-Form").delay(100).fadeIn();
		// Updated by KL on 20231212 - Changed from Small Orders to Start Order 
		$("#Big-Order-Section").delay(100).fadeIn();
		$("#Others-Section").delay(100).fadeIn();
		$("#Submit-Form-Button").delay(100).fadeIn();
		
		// Updated by KL on 20231212 - Changed from Small Orders to Start Order 
		// $("#Big-Order-Section").delay(100).fadeOut();
		// $("#Big-Order-Section").find('input[type=number]').val('');
	});
	
	$( "#big-orders-outlined" ).on( "click", function( event ) {
		$("#Outlet-Section").delay(100).fadeIn();
		$("#Whole-Form").delay(100).fadeIn();
		$("#Big-Order-Section").delay(100).fadeIn();
		$("#Others-Section").delay(100).fadeIn();
		$("#Submit-Form-Button").delay(100).fadeIn();
	});
	
	const generateRandomString = (length) => {
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let result = '';

		// Create an array of 32-bit unsigned integers
		const randomValues = new Uint32Array(length);
		
		// Generate random values
		window.crypto.getRandomValues(randomValues);
		randomValues.forEach((value) => {
			result += characters.charAt(value % charactersLength);
		});
		return result;
	}
	
	$("#Unique-Identifier-Section").find('input').val(getCurrentUnixTimestamp() + generateRandomString(22));
	
});

function getCurrentUnixTimestamp() {
  return Math.floor(Date.now() / 1000);
}