<?php

require_once 'shared.php';
require_once 'Storify.php';

$entries = Storify::getEntries();

$topRow = ORM::for_table('entries')
    ->select('posted_at')
    ->order_by_desc('posted_at')
    ->find_one();

$from = $topRow ? strtotime($topRow->posted_at) : 0;

foreach ($entries as $entry) {
  $posted_at = strtotime($entry->posted_at);
  if ($posted_at > $from) {
    $data = array(
      'id' => $entry->id,
      'posted_at' => date('Y-m-d H:m:i', strtotime($entry->posted_at)),
      'source' => $entry->source->name,
      'type' => $entry->type,
      'userid' => $entry->source->userid,
      'name' => $entry->attribution->name,
      'username' => $entry->attribution->username,
      'permalink' => $entry->permalink,
      'text' => $entry->data->quote->text,
      'image' => $entry->type == 'image' ? $entry->data->image->src : '',
    );

    $row = ORM::for_table('entries')->create($data);
    $row->save();
  }
}
