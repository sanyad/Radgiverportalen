<?php
if($_POST)
{
	$to_email   	= "safe@multibus.no"; //Recipient email, Replace with own email here
	
	//check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
		
		$output = json_encode(array( //create JSON data
			'type'=>'error', 
			'text' => 'Sorry Request must be Ajax POST'
		));
		die($output); //exit script outputting json data
    } 
	
	//Sanitize input data using PHP filter_var().
	$user_name		= filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
	$user_surname		= filter_var($_POST["user_surname"], FILTER_SANITIZE_STRING);
	$address		= filter_var($_POST["address"], FILTER_SANITIZE_STRING);
	$zip		= filter_var($_POST["zip"], FILTER_SANITIZE_NUMBER_INT);
    $postAddress		= filter_var($_POST["postAddress"], FILTER_SANITIZE_STRING);
	$user_email		= filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
	$phone_number	= filter_var($_POST["phone"], FILTER_SANITIZE_NUMBER_INT);
	$bday		= filter_var($_POST["bday"], FILTER_SANITIZE_STRING);
	$bmonth		= filter_var($_POST["bmonth"], FILTER_SANITIZE_STRING);
	$byear		= filter_var($_POST["byear"], FILTER_SANITIZE_STRING);
    $subject = 'Filled Contact Form';

	//additional php validation
	if(strlen($user_name)<2){ // If length is less than 4 it will output JSON error.
		$output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
		die($output);
	}
	if(strlen($user_surname)<2){ // If length is less than 4 it will output JSON error.
		$output = json_encode(array('type'=>'error', 'text' => 'Surname is too short or empty!'));
		die($output);
	}
	if(strlen($address)<10){ // If length is less than 4 it will output JSON error.
		$output = json_encode(array('type'=>'error', 'text' => 'Address is too short or empty!'));
		die($output);
	}
    if(!filter_var($zip, FILTER_SANITIZE_NUMBER_FLOAT)){ //check for valid numbers in zip field
        $output = json_encode(array('type'=>'error', 'text' => 'There is only digits in post code'));
        die($output);
    }
    if(strlen($postAddress)<10){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'Post address is too short or empty!'));
        die($output);
    }
	if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
		$output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
		die($output);
	}
	if(!filter_var($phone_number, FILTER_SANITIZE_NUMBER_FLOAT)){ //check for valid numbers in phone number field
		$output = json_encode(array('type'=>'error', 'text' => 'Enter only digits in phone number'));
		die($output);
	}
	if(strlen($bday)<1){ //check emtpy date
		$output = json_encode(array('type'=>'error', 'text' => 'Full date of birth is required'));
		die($output);
	}
	if(strlen($bmonth)<1){ //check emtpy date
		$output = json_encode(array('type'=>'error', 'text' => 'Full date of birth is required'));
		die($output);
	}
	if(strlen($byear)<1){ //check emtpy date
		$output = json_encode(array('type'=>'error', 'text' => 'Full date of birth is required'));
		die($output);
	}
    if($_POST['chkbox'] == 'checked') {
        $output = json_encode(array('type'=>'error', 'text' => 'Did you agree to the terms?'));
        die($output);
    }
	
	//email body
	$message_body = "Name : ".$user_name."\r\nSurname : ".$user_surname."\r\nAddress : ".$address."\r\nZip code : ".$zip."\r\nPost Address : ".$postAddress."\r\nEmail : ".$user_email."\r\nPhone Number : ". $phone_number."\r\nDate of birth : ".$bday."-".$bmonth."-".$byear  ;
	
	//proceed with PHP email.
	$headers = 'From: '.$user_name.'' . "\r\n" .
	'Reply-To: '.$user_email.'' . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
	
	$send_mail = mail($to_email, $subject, $message_body, $headers);
	
	if(!$send_mail)
	{
		//If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
		$output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
		die($output);
	}else{
		$output = json_encode(array('type'=>'message', 'text' => 'Hi '.$user_name .' Thank you for your email'));
		die($output);
	}
}
?>