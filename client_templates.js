function template_category(title){
	$('.categories').append('<div class="category '+title+'"><div class="title">'+title.toUpperCase()+'</div><div class="reload">&#x21bb;</div><div class="content"></div></div>');
}

function template_ian_post(title, url){
	return  '<div class="ian_post">' +
	    		'<div class="ian_post_title">' + 
	    			'<a target="_blank" href="' + url + '">' + title + '</a>' + 
	    		'</div>'+
	    	'</div>';
}

function template_twodb_post(title, url){
	return  '<div class="twodb_post">' +
	    		'<div class="twodb_post_title">' + 
	    			'<a target="_blank" href="' + url + '">' + title + '</a>' + 
	    		'</div>'+
	    	'</div>';
}

function template_companies_item(id, title, url, status){
	return  '<div class="companies_item status_' + status + ' status_id_' + id + '">' +
	    		'<div class="companies_item_id">' + id + '</div>' + 
	    		'<div class="companies_item_title">' + 
	    			'<a target="_blank" href="' + url + '">' + title + '</a>' +
	    			'<div class="companies_item_change change_' + id + '">-------</div>' +
	    			'<div class="companies_item_remove remove_' + id + '">X</div>' 
	    		'</div>'+
	    	'</div>';
}