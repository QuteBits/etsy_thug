$(function(){ 
	create_categories();
	$('.reload').hide();
    $('.category').each(function(){
		onclick_accordion( $(this).find(".title"), $(this).find(".content") );
    });
    $( "#boxes" ).sortable( { stop: function(){refresh();} } );
    $( "#boxes" ).disableSelection();

    $('#shrink').click(function(){
    	if(!$('#shrink').hasClass('activated')){
	    	$('.categories').animate({width:"50%"},2000);
	    	$('.constructor').animate({width:"48%"},2000);
	    	$('#links').animate({"font-size":"100%"},2000);
	    	$('.box').animate({"font-size":"100%"},2000);
    	} else {
	    	$('.categories').animate({width:"75%"},2000);
	    	$('.constructor').animate({width:"23%"},2000);
	    	$('#links').animate({"font-size":"50%"},2000);
	    	$('.box').animate({"font-size":"50%"},2000);
    	}
    	$('#shrink').toggleClass('activated');
    });

    $('#hideshow').click(function(){
    	$('#boxes').toggle();
    });
});

function onclick_accordion(title,content){
	$(title).click(function(){$(content).toggle(500);});
	$(title).click();
}

function create_categories() 
{
	var categories_1 = [
		'bead',
		'jewelry',
		'glassware',
		'vase',
		'paperweight',
		'magnet',
		'bowl',
		'mirror',
		'marbles'
	];

	var categories_2 = [
		'suncatcher',
		'jewelry',
		'animal',
		'plant',
		'people'
	];

	var categories = [];
	var id_number = 0;

	for(var i = 0; i < categories_1.length; i++){
		categories.push([categories_1[i],'https://www.etsy.com/search/handmade/glass/'+categories_1[i]+'?q=']);
	}

	for(var i = 0; i < categories_2.length; i++){
		categories.push(['STAINED_GLASS_'+categories_2[i],'https://www.etsy.com/search/handmade/glass/stained_glass/'+categories_2[i]+'?q=&order=most_relevant']);
	}

	for(var i = 0; i < categories.length; i++){
		var url = categories[i][1];
		var cat = categories[i][0];

		template_category(cat);

		var range = 150.0;
		var rounded = Math.round(5.0+ range*parseFloat(i)/parseFloat(categories.length)).toString(16);
		color = "#99"+rounded+"00"; 
		if(color.length == 6){
			color = "#990"+rounded+"00";
		}

		$('.title').eq(i).css('background-color',color);

	    $.post( 'server.php', 
	    		{'action': 'get_page',
	    		 'url': url,
	    		 'category': cat},
				function( response ) {
					//logging(response);
	  				var result = response.split('_|||_');
					var cat = result[0];
	  				
	  				var html = '';
					var result_length = 0;
					$(result[1]).find('.listing').each(function(){
						var author = '';
						var author_url = '';
						$(this).find('.listing-maker a').each(function(){
							author = $(this).text();
							author_url = 'http://www.etsy.com' + $(this).attr('href');
						});
						$(this).find('.image-wrap').each(function(){
			  				var result_url = $(this).attr('href');
		  					var result_img = $(this).find('img').attr('data-src');

		  					result_length += 1;

		  					html+='<div class="listing" id="'+id_number+'_box">'+
		  							'<a rel="noreferrer" target="blank" href="http:'+result_url+'">'+
		  								'<img src="http:'+result_img+'">'+
		  							'</a>'+
	  								'<div class="listing_author">'+
	  									'<a rel="noreferrer" target="blank" href="'+author_url+'">'+author+'</a>'+
	  								'</div>'+
	  								'<div class="listing_add" id="'+id_number+'_b">'+
	  									'ADD'+
	  								'</div>'+
		  						  '</div>';
						});
						id_number++;
					});

					$('.'+cat+' .content').html(html);
					$('.'+cat+' .title').text($('.'+cat+' .title').text() + ' (' + result_length + ')');

					for(var k = 0; k < id_number-1; k++){
						click_function(k);
					}
	  			}).fail(function( response ) {
	  			});
	}
}

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function same_author(){
	$('#boxes .listing_author').each(function(index){
		$(this).parent().css('background-color','#111');
	});
	$('#boxes .listing_author').each(function(index){
		var name = $(this).text();
		var host = $(this);
		$('#boxes .listing_author:gt('+index+')').each(function(index){
			if($(this).text() == name){
				$(this).parent().css('background-color','#700');
				$(host).parent().css('background-color','#700');
			}
		});
	});
}

function refresh(){
	$('#boxes .listing_add').remove();
	$('.listing_remove').unbind();
	$('.listing_remove').click(function(){
		$(this).parent().remove();
		refresh();
	});
	var content = '';
	$('.box>a').each(function(){
		content += $(this).attr('href').split('?')[0] + '<br>';
	});
	$('#links').html(content);
	same_author();
}

function click_function(k){
	$('#'+k+'_b').unbind();
	$('#'+k+'_b').click(function(){
		console.log($(this).attr('id'));
		var found_html = $('#'+k+'_box').html();
		var size = '100%';
		if(!$('#shrink').hasClass('activated')){ size = '50%'; }
		$('#boxes').append('<div class="box" style="font-size:'+size+';">'+found_html+'<div class="listing_remove">REMOVE</div></div>');
		refresh();
	});
}