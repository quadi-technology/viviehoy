<?php

require_once 'Config.php';

class Storify {

  public static function getEntries() {
    $story = Config::$story;
    $url = "https://api.storify.com/v1/stories/vivehoy/{$story}";
    $url .= "/?page=10&per_page=50";

    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_URL, $url);
    curl_setopt($ch2, CURLOPT_HEADER, false);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, 0);
    $response = curl_exec($ch2);
    curl_close ($ch2);

    $data = json_decode($response);
    $elements = $data->content->elements;

    return $elements;
  }

}
