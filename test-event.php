<?php
require_once 'includes/db.php';

$users=[1,2,3]; $products=[1,2,3]; $buttons=['Add to Cart','Wishlist']; $searches=['gold ring','diamond'];
for($i=0;$i<50;$i++){
    $user_id=$users[array_rand($users)];
    $product_id=$products[array_rand($products)];
    $event_types=['view_product','add_to_cart','checkout','button_click','search'];
    $event_type=$event_types[array_rand($event_types)];
    $search_query=null; $button_name=null;
    if($event_type=='search') $search_query=$searches[array_rand($searches)];
    if($event_type=='button_click') $button_name=$buttons[array_rand($buttons)];

    $stmt=$conn->prepare("INSERT INTO user_events (user_id, product_id, event_type, search_query, button_name, timestamp) VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("iisss",$user_id,$product_id,$event_type,$search_query,$button_name);
    $stmt->execute();
}
echo "✅ 50 test events inserted!";
