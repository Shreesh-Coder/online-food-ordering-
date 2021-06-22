<?php 
  
    include 'db.php';
    parse_str(implode('&', array_slice($argv, 1)), $_GET);

    $name = $_GET['name'];
    $add = $_GET['add'];
    $mobile = $_GET['mobile'];
    $item = $_GET['item'];
    $check = 1;

    echo $name;
    echo $add;
    echo $mobile;
    echo $item;


    $q ="INSERT INTO orders(Name , Address, Mobile ,Items , Place)  VALUES ('${name}','${add}','${mobile}','${item}','${check}')";
    
    $r = mysqli_query($d,$q);

    if($r)
    {
    ?>
    <script type="text/javascript">alert("ok")</script>
    <?php
    }
    else
    {
    ?>
    <script type="text/javascript">alert("no")</script>
    <?php
    }
 

?>