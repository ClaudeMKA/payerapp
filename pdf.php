<?php
require 'vendor/autoload.php'; // Chargez les dépendances de Dompdf

use Dompdf\Dompdf;
use Dompdf\Options;

// Récupérez le contenu HTML envoyé depuis le client (JavaScript)
$html = urldecode($_POST['htmlContent']);

// Instanciez Dompdf avec les options souhaitées
$options = new Options();
$options->set('isHtml5ParserEnabled', true);
$options->set('isRemoteEnabled', true);
$dompdf = new Dompdf($options);

// Chargez le contenu HTML dans Dompdf
$dompdf->loadHtml($html);

// Rendre le PDF
$dompdf->render();

// Affichez le PDF dans le navigateur
header('Content-Type: application/pdf');
$dompdf->stream(); // Afficher le PDF dans le navigateur
?>

