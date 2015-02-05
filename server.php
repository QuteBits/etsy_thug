<?php
	if (isset($_POST["action"]) && !empty($_POST["action"])) {
		if($_POST["action"] == 'get_page'){ get_page(); }
	}

	function get_page(){
		$html = file_get_contents($_POST['url']);

		$cat = $_POST['category'];
		echo $cat . '_|||_';

		$dom = new DOMDocument;
		$dom->loadHTML($html);//or loadHTMLFile

		echo $dom->saveHTML();

		$classname="listing";
	    $finder = new DomXPath($dom);
	    $spaner = $finder->query("//*[contains(@class, '$classname')]");
	}
?>