<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Admin Table</title>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">

    <?php 
  
   include 'db.php';
   if(isset($_POST['submit'])){

        $name = $_POST['name'];
        $add = $_POST['add'];
        $mobile = $_POST['mobile'];
        $item = $_POST['item'];
        $check = 1;

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
   }

 ?>
</head>
<body>
    <h1 class="text-center mt-2" style="border-bottom: 1px solid grey;">ORDERS</h1>

    <div>
      <form action="/Admin.php" method="POST">
      <input type="text" name="name" />
        <input type="text" name="add" />
        <input type="text" name="mobile" />
       <input type="text" name="item" />
       <button type="submit" class="btn btn-primary" name="submit">Place Order</button>
     </form>
    </div>


     <div class="container-fluid">
         <div class="row">
          <table class="table table-striped">
  <thead>
    <tr class="text-center">
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">Address</th>
      <th scope="col">Moblie No.</th>
      <th scope="col">Items</th>
      <th scope="col">Place Order</th>
    </tr>
  </thead>

  <tbody>
      
        
          
         <?php
          include 'db.php';
             $q = "select * from  orders";
              $a = mysqli_query($d,$q);
             while($ans = mysqli_fetch_array($a))
             {
                ?>
                 <tr class="text-center">
                    <td><?php //echo $ans['No']?></td>
                    <td><?php echo $ans['Name']?></td>
                    <td><?php echo $ans['Address']?></td>
                    <td><?php echo $ans['Mobile']?></td>
                    <td><?php echo $ans['Items']?></td>
                    <td><?php if($ans['Place']){
                        ?>
                        <form action="Admin.php" method="POST">
                         <button class="btn btn-primary" type="submit" name="sub">Place Order</button>
                         <input type="" style="display: none;" name="check"  value="<?php //echo $ans['No'] ?>" />
                      </form>
                        <?php
                        }
                        else{
                            ?> <button class="btn btn-success">Successful</button>    
                            <?php
                        } 
                     ?></td> 
                        
                 </tr>
                <?php
             }
         ?>

        </tr>

  </tbody>

</table>
</div>
</div>

   
    <?php
    if(isset($_POST['sub']))
    {
      include 'db.php';

      $val = $_POST['check'];
    
      $w = "UPDATE `orders` SET Place=0  WHERE No=${val} ";

     $r = $d->query($w); 
      

     header('Refresh:0');  
    }
  ?>




</body>
</html>

