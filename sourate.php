<!doctype html>
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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="asset/css/style.css">

</head>

<body>
<div class="head">
    <div class="entete">
        <div class="home">
            Accueil
        </div>
        <div class="srt">
            <input type="text" id="search-input" placeholder="Rechercher une sourate" />
            <ul class="sourate-list"></ul>
            <div id="sourateList"></div>
        </div>
        <div class="theme">
            <button id="launch-button">Lancer la sourate</button>
        </div>
    </div>
    <div class="barre-bas position-absolute bottom-0 w-100" style="height: 1px; background-color: #FFFFFF;"></div>
</div>
<div class="bm">


<div id="resultat"></div>
<div style="height: 10px;"></div>
<div id="resultat2"></div>
</div>
<script src="asset/js/sourate.js"></script>
</body>
</html>

