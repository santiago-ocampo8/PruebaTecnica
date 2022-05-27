<?php
echo "Prueba Tecnica Santiago Ocampo Santana";

//Numero que recibira el tamaño de la x
$n = 0;

$matriz   = [];
$contador = 0;
$par      = 0;
$bandera  = 0;
if (($n % 2) != 0) {
    $mitadN = round($n / 2) - 1;
    $par    = 1;
} else {
    $mitadN = $n / 2;
}

if ($n == 0) {
    echo "<br>";
    echo "Error";
} else {
    for ($i = 0; $i < $n; $i++) {
        $renglon = [];

        if ($i < $mitadN) {

            for ($j = 0; $j < $mitadN; $j++) {
                if ($j == $contador) {
                    $renglon[$j] = "X";
                } else {
                    $renglon[$j] = "_";
                }
            }
            $renglon2 = [];
            for ($k = $n - 1; $mitadN <= $k; $k--) {
                if ($k == ($n - 1) - $contador) {
                    $renglon2[$k] = "X";
                } else {
                    $renglon2[$k] = "_";
                }
            }
            $contador++;
        } else {
            if ($par == 1 && $bandera == 0) {
                $bandera = 1;

                for ($j = 0; $j < $n; $j++) {
                    if ($j == $mitadN) {
                        $renglon[$j] = "X";
                    } else {
                        $renglon[$j] = "_";
                    }
                }

            } else {
                $contador--;
                for ($j = $mitadN - 1; $j >= 0; $j--) {
                    if ($j == $contador) {
                        $renglon[$j] = "X";
                    } else {
                        $renglon[$j] = "_";
                    }
                }
                $renglon2 = [];
                for ($k = $mitadN; $k < $n; $k++) {
                    if ($k == ($n - 1) - $contador) {
                        $renglon2[$k] = "X";
                    } else {
                        $renglon2[$k] = "_";
                    }
                }
            }
        }

        $matriz[$i] = $renglon + $renglon2;

    }
    for ($j = 0; $j < $n; $j++) {
        echo "<br>";
        for ($i = 0; $i < $n; $i++) {
            echo $matriz[$j][$i];
        }
        echo "<br>";
    }
}
