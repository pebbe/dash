<?php
$langs = array(
  "en" => 0,
  "nl" => -1,
);
if (array_key_exists("HTTP_ACCEPT_LANGUAGE", $_SERVER)) {
  $accept = $_SERVER["HTTP_ACCEPT_LANGUAGE"];
} else {
  $accept = "";
}
foreach (explode(",", $accept) as $lang) {
  $parts = explode(";", $lang);
  $ll = strtolower(trim(explode("-", $parts[0])[0]));
  switch (count($parts)) {
    case 1:
      $langs[$ll] = 1;
      break;
    case 2:
      $qq = explode("=", $parts[1]);
      if (count($qq) == 2 && strtolower(trim($qq[0])) == "q") {
        $q = floatval(trim($qq[1]));
        if (array_key_exists($ll, $langs)) {
          if ($q > $langs[$ll]) {
            $langs[$ll] = $q;
          }
        } else {
          $langs[$ll] = $q;
        }
      }
      break;
    default:
  }
}
$dst = "nl/";
if ($langs['en'] > $langs['nl']) {
  $dst = 'en/';
}
echo $dst;
header('Location: ' . $dst, true, 303);
exit();
?>
