<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="JuegoMemoria_Test._Default" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="utf-8" />
    <title>Juego de Memoria</title>
    <link rel="stylesheet" type="text/css" href="Style/style.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h1>Juego de Memoria</h1>
            <div id="tableroJuego" class="tablero"></div>
            <br />
            <button id="resetBtn">Reiniciar</button>
        </div>
    </form>
    <script src="js/juegoMemoria.js"></script>
</body>
</html>

