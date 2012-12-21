<?php

class Config {
  public static $db;
  public static $story = 'pepsi-vivehoy';
}

Config::$db = new stdClass();

if ($_SERVER['HTTP_HOST'] == 'localhost') {
  Config::$db->dns = 'mysql:host=localhost;dbname=sch_vivehoy';
  Config::$db->username = 'root';
  Config::$db->password = 'root';
} else {
  Config::$db->dns = 'mysql:host=localhost;dbname=vivehoy';
  Config::$db->username = 'root';
  Config::$db->password = 'S4nch0Bbd0';

}
