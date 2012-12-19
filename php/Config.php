<?php

class Config {
  public static $db;
  public static $storifyService = 'http://190.3.169.20/pepsicolombia/index.php?historia=pepsi-vivehoy';
}

Config::$db = new stdClass();

if ($_SERVER['HTTP_HOST'] == 'localhost') {
  Config::$db->dns = 'mysql:host=localhost;dbname=sch_vivehoy';
  Config::$db->username = 'root';
  Config::$db->password = 'root';
} else {

}
