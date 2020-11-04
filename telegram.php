<?php

/* https://api.telegram.org/bot1465646762:AAGYEyPZ0EC39h3Nsp7FY77hXA6DnFA9rJE/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['formname'];
$token = "1465646762:AAGYEyPZ0EC39h3Nsp7FY77hXA6DnFA9rJE";
$chat_id = "-427566761";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Цель: ' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thankyou/index.html');
} else {
  echo "Error";
}
?>