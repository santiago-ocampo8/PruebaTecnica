<?php
$myArray = array(2, 1, 0, 0, 3, 4);

$blocks = array();
$block  = array();
foreach ($myArray as $number) {
    if ($number == 0) {
        $block = orderBlock($block);

        array_push($blocks, $block);
        $block = array();
    } else {
        array_push($block, $number);
    }
}
$block = orderBlock($block);
array_push($blocks, $block);

foreach ($blocks as $aBlock) {
    echo " ";

    if (count($aBlock) == 0) {
        echo "X";
    }
    foreach ($aBlock as $anNumber) {
        echo $anNumber;
    }
}

function orderBlock($block)
{

    $length = count($block);
    for ($j = 0; $j < $length; $j++) {
        for ($i = 0; $i < $length - 1; $i++) {
            if ($block[$i] > $block[$i + 1]) {
                $temp          = $block[$i];
                $block[$i]     = $block[$i + 1];
                $block[$i + 1] = $temp;
            }

        }
    }
    return $block;

}
