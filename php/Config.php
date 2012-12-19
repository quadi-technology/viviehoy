<?php

class Config {
  public static $db;
  public static $storifyService = 'http://190.3.169.20/pepsicolombia/index.php?historia=pepsi-vivehoy';
}

if ($_SERVER['HTTP_HOST'] == 'localhost') {
  Config::$db = new stdClass();
  Config::$db->host = 'localhost';
  Config::$db->username = 'root';
  Config::$db->password = 'root';
  Config::$db->database = 'sch_vivehoy';
}
