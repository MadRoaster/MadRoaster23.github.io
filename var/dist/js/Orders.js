$( document ).ready(function() {
	$( "#ordersForm" ).on( "submit", function( event ) {
	  var outletVar = $(".outlet-select").find(":selected").val();
	  
	  if ( outletVar == "" || typeof outletVar == "undefined" ) {
			alert("Please input outlet");
			$(".outlet-select").focus();
			event.preventDefault();		  
	  }
	});
	
	// Modified by KL 20251227 - Update to 2 days later for inventory
	var current_date = new Date(new Date().getTime());
	var current_time = current_date.getHours();
	var add_date = 2;
	if ( current_time >= 16 ) {
		add_date = 3;
	}
	var d = new Date(new Date().getTime()+(24*60*60*1000*add_date));

	var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	var date = d.getDate();
	var month = d.getMonth();
	var year = d.getFullYear();
	var monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var tomorrowsDate = date + " " + monthArray[month] + " " + year;

	// Modified by KL 20251227 - Update to 2 days later for inventory
	var dayArray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	$("#Tomorrows-Date").text("Order for " + date + " " + monthArray[month] + " " + year + " (" + dayArray[d.getDay()] +")");
	
	$(".outlet-select").on("change", function( event ) {
	  // Modified by KL for 20231212 - Added Courtyard
	  // Commented by KL 20251227
	  /*
	  if ( $(this).val() == "Amoy" ) {
		  $("#RWS_Accordion").hide();
		  $("#Amoy_Accordion").show();
		  
		  $('#RWS_Accordion').find('input[type=number]').val('');
	  } 
		
		
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
		*/
	  // Added by KL 20251227
		var outlet_selection = $(this).val();
	  $("." + outlet_selection + "-ONLY-DIV").delay(100).fadeIn();
		$("." + outlet_selection + "-ONLY").delay(100).fadeIn();
	  $('.outlet-select option').each(function (index) {
			var outlet = $(this).val();
			if ( outlet != outlet_selection && outlet != "" ) {
				$("." + outlet + "-ONLY-DIV:not(." + outlet_selection + "-ONLY-DIV)").each(function(index) {
					$(this).find('input').val('');
					$(this).delay(100).fadeOut();
				});

				$("." + outlet + "-ONLY:not(." + outlet_selection + "-ONLY)").each(function(index) {
					$(this).find('input').val('');
					$(this).find(".accordion-collapse").collapse('hide');
					$(this).delay(100).fadeOut();
				});

				// if ( !$("." + outlet + "-ONLY:visible").hasClass(outlet_selection + "-ONLY") ){
				// 	$("." + outlet + "-ONLY:visible").find('input').val('');
				// 	$("." + outlet + "-ONLY:visible").find(".accordion-collapse").collapse('hide');
				// 	$("." + outlet + "-ONLY:visible").delay(100).fadeOut();
				// }
			}
		});
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

	// Added by KL 20251227 - Update Date for Copyright ID
	$( "#copyright_date_id" ).text(year);

	// Added by KL 20251227
	$('#ordersForm').on('submit', function (e) {
		e.preventDefault(); // stop page reload

		$.ajax({
			url: this.action,
			method: this.method || 'POST',
			data: $(this).serialize()
		}).always(function(){
			window.location.href = 'complete.html';
		});
	});

	var dd = String(d.getDate()).padStart(2, '0');
	var mm = String(d.getMonth() + 1).padStart(2, '0'); // January is 0
	var yyyy = d.getFullYear();
	$("#Order-Date-Section").find('input').val(dd + "-" + mm + "-" + yyyy);
	
});

function getCurrentUnixTimestamp() {
  return Math.floor(Date.now() / 1000);
}
