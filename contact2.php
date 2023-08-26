<?php
$claude = true ;
?><!doctype html>
<html lang=fr>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Rafiq Al-Iman</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <link rel="stylesheet" href="asset/css/style.css">



</head>
<body>

<div class="loader-container">
    <div class="dot d1"></div>
    <div class="dot d2"></div>
    <div class="dot d3"></div>
</div>

<div class="modal" id="myModal">
    <div class="modal-content">
        <span class="close" id="closeModal">&times;</span>
        <h2>Téléchargez le calendrier de prière</h2>
        <form id="prayerForm">
            <div class="chose_adress">
            <label for="adresse">Adresse et Code postale :</label>
            <input type="text" id="adresse" name="adresse" class="form_calendar" required
            >
            </div>
            <div class="chose_angle">
            <label for="angle">Choisissez l'angle :</label>
            <select id="angle" name="angle">
                <option value="12">Angle 12</option>
                <option value="15">Angle 15</option>
                <option value="18">Angle 18</option>
            </select>
            </div>
            <div class="download_pdf">
            <button type="submit" class="button_calendar" id="generatePdfButton">Télécharger le PDF</button>
            </div>
        </form>
    </div>
</div>

<div class="container">
    <div class="wrap_home">
        <div class="navbar">
            <div class="img_logo">
                <img src="asset/image/logo.png" alt="logo" class="img_logo2">
            </div>
            <nav>
                <ul>
                    <li><a href=""> Acceuil </a> </li>
                    <!--            <li><a href="sourate.php">Coran </a> </li>-->
                    <li><a href="contact.php">Contact </a> </li>
                </ul>
            </nav>
        </div>
    </div>


    <div class="row">
        <div class="col2">
            <h1 class="nn"> RAFIQ AL-IMANE</h1>
            <p> Rafiq Al-Imane est une application web qui vous aide à pratiquer votre religion en vous offrant des fonctionnalités telles que la recherche des horaires de prière et la lecture du Quran, ainsi que d'autres fonctionnalités à venir.</p>
            <div class="formulaire">
                <form class="form" method="post">
                    <label for="ville"> <h1> Votre adresse : </h1></label>
                    <div class="dropdown">
                        <input type="text" id="ville" name="ville" autocomplete="off">
                        <div class="dropdown-content">
                            <ul id="ville-list"></ul>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="col">
            <div class="bloc_angle_prayer">
                <button class="angle" id="m1"> <p> Angle 12 </p></button>
                <button class="angle" id="m2"> <p> Angle 15 </p></button>
                <button class="angle" id="m3"> <p> Angle 18 </p></button>
            </div>
            <div class="card fajr">
                <h2> Fajr</h2>
                <p id="fajr-time">Choissez votre angle </p>
            </div>
            <div class="card dhuhur">
                <h2> Dhuhr</h2>
                <p id="dhuhur-time">Choissez votre angle</p>
            </div>
            <div class="card asr">
                <h2> Asr</h2>
                <p id="asr-time">Choissez votre angle</p>
            </div>
            <div class="card maghrib">
                <h2> Maghrib</h2>
                <p id="maghrib-time">Choissez votre angle</p>
            </div>
            <div class="card isha">
                <h2> Isha</h2>
                <p id="isha-time">Choissez votre angle</p>
            </div>
            <div class="card midnight">
                <h2> Midnight</h2>
                <p id="midnight-time">Choissez votre angle</p>
            </div>
            <div class="btn_form"><p> Telecharger votre calendrier </p></div>

        </div>
    </div>
</div>

<div class="calendrier" id="calendrier">
    <p class="mois_arab"></p>
<p class="select_angle"></p>
</div>
<script src="es6-promise.auto.min.js"></script>
<script src="jspdf.min.js"></script>
<script src="html2canvas.min.js"></script>
<script src="html2pdf.min.js"></script>
<script src="asset/js/main.js"></script>

<footer>
    <p> Design and website by Claude Miakouikila </p>
</footer>

</body>
</html>


