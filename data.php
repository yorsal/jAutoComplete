<?php 
$query = $_GET['query'];
$data = array();
$data[] = array('value'=>$query.'1111');
$data[] = array('value'=>$query.'2222');
echo json_encode($data);
?>