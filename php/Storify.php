<?php

require_once 'Config.php';

class Storify {

  public static function getEntries() {
    $url = "http://190.3.169.20/pepsicolombia/index.php?historia=pepsi-vivehoy";

    $response = file_get_contents($url);
    $data = json_decode($response);
    $elements = $data->content->elements;

    return $elements;
  }

}
