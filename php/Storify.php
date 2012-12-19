<?php

require_once 'Config.php';

class Storify {

  public static function getEntries() {
    $url = Config::$storifyService;

    $response = file_get_contents($url);
    $data = json_decode($response);
    $elements = $data->content->elements;

    return $elements;
  }

}
