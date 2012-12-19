<?php

if ($_SERVER['HTTP_HOST'] == 'localhost') {
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
}

require_once 'Config.php';
require_once 'idiorm.php';

ORM::configure(Config::$db->dns);
ORM::configure('username', Config::$db->username);
ORM::configure('password', Config::$db->password);
ORM::configure('driver_options', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
