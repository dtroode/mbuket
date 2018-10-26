<?php header('Content-Type: text/html; charset=utf-8');
$json = file_get_contents('./goods.json');
$json = json_decode($json, true);

$message = '';
$message .= '<!DOCTYPE HTML><html><head><meta charset="UTF-8"><title>Заказ</title><link rel="stylesheet" type="text/css" href="https://masterbuket.com/styles/style.css" /></head><body><div class="col-lg-12 second full">';
$message .= '<h2>Заказ в магазине</h2>';
$message .= '<p>Клиент: '.$_POST['ename'].'</p>';
$message .= '<p>Телефон: '.$_POST['ephone'].'</p>';
$message .= '<p>Почта: '.$_POST['email'].'</p>';
$message .= '<p>';

$cart = $_POST['cart'];
$sum = 0;

foreach ($cart as $id=>$count) {
    $message .= $json[$id]['name'].' : ';
    $message .= $count.' - ';
    $message .= $count*$json[$id]['cost'].' рублей;';
    $message .= '<br />';
    $sum = $sum + $count*$json[$id]['cost'].' рублей;';
}
$message .='Всего: '.$sum;
$message .= '</p>';
$message .= '</div></body></html>';

$to = 'davidkis113@gmail.com'.',';
$to .=$_POST['email'];
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Заказ в магазине', $message, $headers);

if ($m) {echo $m;} else {echo $message;}