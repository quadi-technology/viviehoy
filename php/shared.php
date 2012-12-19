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
