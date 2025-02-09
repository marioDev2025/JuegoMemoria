const tablero = document.getElementById('tableroJuego');
const resetearBtn = document.getElementById('resetBtn');
const valorCarta = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cartas = [];
let cartasVolteadas = [];
let cartasParejas = [];
let bloqueaTablero = false;

function generarTablero() {
    let cartasAleatorio = shuffle([...valorCarta, ...valorCarta]);

    // Crear tarjetas en el tablero
    cartasAleatorio.forEach((value, index) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.setAttribute('data-value', value);
        carta.setAttribute('data-index', index);
        carta.addEventListener('click', VoltearCarta);
        tablero.appendChild(carta);
        cartas.push(carta);
    });
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

async function VoltearCarta() {
    if (bloqueaTablero || cartasVolteadas.includes(this) || cartasParejas.includes(this)) return;

    this.classList.add('volteado');
    this.textContent = this.getAttribute('data-value');
    cartasVolteadas.push(this);

    // Actualizar el estado en el servidor
    await actualizarEstadoServidor();

    if (cartasVolteadas.length === 2) {
        checkPareja();
    }
}

function checkPareja() {
    bloqueaTablero = true;

    const [primeraCarta, segundaCarta] = cartasVolteadas;

    if (primeraCarta.getAttribute('data-value') === segundaCarta.getAttribute('data-value')) {
        cartasParejas.push(primeraCarta, segundaCarta);
        resetTablero();
    } else {
        setTimeout(() => {
            primeraCarta.classList.remove('volteado');
            segundaCarta.classList.remove('volteado');
            primeraCarta.textContent = '';
            segundaCarta.textContent = '';
            resetTablero();
        }, 1000);
    }
}

function resetTablero() {
    cartasVolteadas = [];
    bloqueaTablero = false;
    if (cartasParejas.length === cartas.length) {
        setTimeout(() => alert('¡Ganaste mi King!'), 500);
    }
}

// Fn para reiniciar el juego
async function resetJuego() {
    // Resetear el tablero en el cliente
    tablero.innerHTML = '';
    cartas = [];
    cartasParejas = [];
    cartasVolteadas = [];

    // Solicitar al servidor que reinicie el estado del juego
    await reiniciarJuegoServidor();

    // Regenerar el tablero en el cliente
    generarTablero();
}

// Fn para actualizar el estado del juego en el servidor
async function actualizarEstadoServidor() {
    const estadoJuego = {
        cartasVolteadas: cartasVolteadas.map(carta => carta.getAttribute('data-index')),
        cartasParejas: cartasParejas.map(carta => carta.getAttribute('data-index')),
        bloqueaTablero: bloqueaTablero
    };

    // Realizamos una solicitud AJAX 
    await fetch('Default.aspx/ActualizarEstado', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estadoJuego })
    });
}

// fn para reiniciar el estado del juego en el servidor
async function reiniciarJuegoServidor() {
    // Realizamos una solicitud AJAX para reiniciar el estado en el servidor
    await fetch('Default.aspx/ReiniciarJuego', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// Evento de reinicio del juego
resetearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetJuego();
});

// Iniciar juego
generarTablero();
