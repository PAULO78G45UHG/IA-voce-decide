/* =========================================================
   AI COSMIC MISSION
   Projeto focado em funções JavaScript
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const screens = {
    intro: document.getElementById("intro"),
    briefing: document.getElementById("briefing"),
    game: document.getElementById("game"),
    quiz: document.getElementById("quiz"),
    result: document.getElementById("result")
};

const startButton = document.getElementById("startButton");
const launchButton = document.getElementById("launchButton");
const restartButton = document.getElementById("restartButton");

const terminalText = document.getElementById("terminalText");

const ship = document.getElementById("ship");
const gameArea = document.getElementById("gameArea");

const energyFill = document.getElementById("energyFill");
const energyText = document.getElementById("energyText");

const scoreValue = document.getElementById("scoreValue");
const xpValue = document.getElementById("xpValue");

const gameTimer = document.getElementById("gameTimer");
const gameMessage = document.getElementById("gameMessage");

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const questionIndex = document.getElementById("questionIndex");

const answersContainer = document.getElementById("answers");
const answerFeedback = document.getElementById("answerFeedback");

const nextButton = document.getElementById("nextButton");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const quizScore = document.getElementById("quizScore");

const damageOverlay = document.getElementById("damageOverlay");

const coordinates = document.getElementById("coordinates");

const notification = document.getElementById("notification");
const notificationText = document.getElementById("notificationText");


/* =========================================================
   ESTADO DO JOGO
========================================================= */

let score = 0;
let xp = 0;

let energy = 100;

let currentQuestion = 0;
let correctAnswers = 0;

let selectedAnswer = false;

let shipPosition = 50;

let gameRunning = false;

let gameSeconds = 30;

let asteroidInterval;
let gameTimerInterval;
let coordinateInterval;


/* =========================================================
   PERGUNTAS
========================================================= */

const questions = [

    {
        question: "O que é Inteligência Artificial?",

        answers: [
            "Um tipo de computador",
            "Uma tecnologia capaz de realizar tarefas que normalmente exigem inteligência humana",
            "Uma rede social",
            "Um sistema operacional"
        ],

        correct: 1,

        explanation:
            "A IA permite que sistemas realizem tarefas como reconhecer padrões, aprender e tomar decisões."
    },

    {
        question: "O que é Machine Learning?",

        answers: [
            "Uma técnica de edição de imagens",
            "Um tipo de hardware",
            "Uma área da IA que permite que sistemas aprendam com dados",
            "Um navegador"
        ],

        correct: 2,

        explanation:
            "Machine Learning utiliza dados e algoritmos para permitir que sistemas encontrem padrões e façam previsões."
    },

    {
        question: "Qual destes é um exemplo de Inteligência Artificial?",

        answers: [
            "Uma calculadora simples",
            "Um assistente virtual capaz de interpretar linguagem",
            "Uma lâmpada comum",
            "Um cabo USB"
        ],

        correct: 1,

        explanation:
            "Assistentes virtuais podem utilizar IA para interpretar linguagem e responder aos usuários."
    },

    {
        question: "O que são dados para um sistema de IA?",

        answers: [
            "Informações utilizadas para análise e aprendizado",
            "Apenas imagens",
            "Somente números",
            "Arquivos que não podem ser processados"
        ],

        correct: 0,

        explanation:
            "Dados podem assumir diversas formas e são fundamentais para muitos sistemas de IA."
    },

    {
        question: "O que é uma rede neural artificial?",

        answers: [
            "Uma rede social",
            "Um cabo de internet",
            "Um modelo inspirado no funcionamento simplificado de redes neurais biológicas",
            "Um antivírus"
        ],

        correct: 2,

        explanation:
            "Redes neurais artificiais são modelos computacionais formados por unidades conectadas que processam informações."
    },

    {
        question: "Por que os dados são importantes para Machine Learning?",

        answers: [
            "Porque ajudam o modelo a encontrar padrões",
            "Porque aumentam o tamanho da tela",
            "Porque substituem o computador",
            "Porque desligam o sistema"
        ],

        correct: 0,

        explanation:
            "Os dados fornecem exemplos que podem ser utilizados para identificar padrões e construir modelos."
    },

    {
        question: "Qual é uma preocupação importante relacionada à IA?",

        answers: [
            "Cor da interface",
            "Uso responsável, privacidade e possíveis vieses",
            "Quantidade de teclas do computador",
            "Velocidade do mouse"
        ],

        correct: 1,

        explanation:
            "Privacidade, segurança, transparência e vieses são questões importantes no desenvolvimento de IA."
    },

    {
        question: "Qual pode ser uma aplicação da Inteligência Artificial?",

        answers: [
            "Diagnóstico assistido por computador",
            "Somente escrever textos",
            "Apenas jogar videogames",
            "Somente criar senhas"
        ],

        correct: 0,

        explanation:
            "A IA pode ser utilizada em diversas áreas, incluindo saúde, educação, indústria, ciência e entretenimento."
    }

];


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    criarEstrelas();

    criarParticulas();

    iniciarTextoTerminal();

    atualizarHUD();

});


/* =========================================================
   FUNÇÃO: CRIAR ESTRELAS
========================================================= */

function criarEstrelas() {

    const container = document.getElementById("stars");

    const quantidade = 180;

    for (let i = 0; i < quantidade; i++) {

        const estrela = document.createElement("div");

        estrela.classList.add("star");

        estrela.style.left = `${Math.random() * 100}%`;

        estrela.style.top = `${Math.random() * 100}%`;

        const tamanho = Math.random() * 2 + 1;

        estrela.style.width = `${tamanho}px`;

        estrela.style.height = `${tamanho}px`;

        estrela.style.setProperty(
            "--duration",
            `${Math.random() * 3 + 2}s`
        );

        estrela.style.animationDelay =
            `${Math.random() * 4}s`;

        container.appendChild(estrela);
    }

}


/* =========================================================
   FUNÇÃO: CRIAR PARTÍCULAS
========================================================= */

function criarParticulas() {

    const container =
        document.getElementById("particles");

    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${Math.random() * 12 + 8}s`;

        particle.style.animationDelay =
            `${Math.random() * 10}s`;

        container.appendChild(particle);
    }

}


/* =========================================================
   FUNÇÃO: TEXTO DE TERMINAL
========================================================= */

function iniciarTextoTerminal() {

    const texto =
        "Inicializando protocolo de exploração...";

    let index = 0;

    function escrever() {

        if (index < texto.length) {

            terminalText.textContent +=
                texto[index];

            index++;

            setTimeout(escrever, 35);

        }

    }

    escrever();

}


/* =========================================================
   FUNÇÃO: TROCAR DE TELA
========================================================= */

function mudarTela(nomeDaTela) {

    Object.values(screens).forEach(screen => {

        screen.classList.remove("active");

    });

    if (screens[nomeDaTela]) {

        screens[nomeDaTela].classList.add("active");

    }

}


/* =========================================================
   INTRO → BRIEFING
========================================================= */

startButton.addEventListener("click", () => {

    mudarTela("briefing");

});


/* =========================================================
   BRIEFING → GAME
========================================================= */

launchButton.addEventListener("click", () => {

    mudarTela("game");

    iniciarMiniGame();

});


/* =========================================================
   CONTROLES DA NAVE
========================================================= */

document.addEventListener("keydown", event => {

    if (!gameRunning) {
        return;
    }

    const areaWidth =
        gameArea.clientWidth;

    const shipWidth =
        ship.offsetWidth;

    const step = 4;

    if (
        event.key === "ArrowLeft" ||
        event.key.toLowerCase() === "a"
    ) {

        shipPosition -=
            (step / areaWidth) * 100;

    }

    if (
        event.key === "ArrowRight" ||
        event.key.toLowerCase() === "d"
    ) {

        shipPosition +=
            (step / areaWidth) * 100;

    }

    shipPosition =
        Math.max(5, Math.min(95, shipPosition));

    ship.style.left =
        `${shipPosition}%`;

});


/* =========================================================
   FUNÇÃO: INICIAR MINI GAME
========================================================= */

function iniciarMiniGame() {

    gameRunning = true;

    gameSeconds = 30;

    energy = 100;

    shipPosition = 50;

    ship.style.left = "50%";

    atualizarEnergia();

    atualizarHUD();

    gameMessage.textContent =
        "CAMPO DE ASTEROIDES INICIADO";

    iniciarContadorGame();

    criarAsteroides();

    iniciarCoordenadas();

}


/* =========================================================
   FUNÇÃO: CONTADOR DO GAME
========================================================= */

function iniciarContadorGame() {

    clearInterval(gameTimerInterval);

    gameTimer.textContent =
        gameSeconds;

    gameTimerInterval =
        setInterval(() => {

            gameSeconds--;

            gameTimer.textContent =
                gameSeconds;

            if (gameSeconds <= 0) {

                finalizarMiniGame();

            }

        }, 1000);

}


/* =========================================================
   FUNÇÃO: CRIAR ASTEROIDES
========================================================= */

function criarAsteroides() {

    clearInterval(asteroidInterval);

    asteroidInterval =
        setInterval(() => {

            if (!gameRunning) {
                return;
            }

            criarAsteroide();

        }, 650);

}


/* =========================================================
   FUNÇÃO: CRIAR UM ASTEROIDE
========================================================= */

function criarAsteroide() {

    const asteroid =
        document.createElement("div");

    asteroid.classList.add("asteroid");

    const areaWidth =
        gameArea.clientWidth;

    const maxX =
        areaWidth - 35;

    asteroid.style.left =
        `${Math.random() * maxX}px`;

    asteroid.style.top = "-40px";

    gameArea.appendChild(asteroid);

    let position = -40;

    const speed =
        Math.random() * 2.5 + 2.5;

    const fall =
        setInterval(() => {

            if (!gameRunning) {

                clearInterval(fall);

                asteroid.remove();

                return;
            }

            position += speed;

            asteroid.style.top =
                `${position}px`;

            verificarColisao(
                asteroid,
                fall
            );

            if (
                position >
                gameArea.clientHeight + 50
            ) {

                clearInterval(fall);

                asteroid.remove();

                score += 5;

                atualizarHUD();

            }

        }, 16);

}


/* =========================================================
   FUNÇÃO: DETECTAR COLISÃO
========================================================= */

function verificarColisao(
    asteroid,
    interval
) {

    const shipRect =
        ship.getBoundingClientRect();

    const asteroidRect =
        asteroid.getBoundingClientRect();

    const colisao =
        shipRect.left <
            asteroidRect.right &&
        shipRect.right >
            asteroidRect.left &&
        shipRect.top <
            asteroidRect.bottom &&
        shipRect.bottom >
            asteroidRect.top;

    if (colisao) {

        clearInterval(interval);

        asteroid.remove();

        receberDano();

    }

}


/* =========================================================
   FUNÇÃO: RECEBER DANO
========================================================= */

function receberDano() {

    energy -= 20;

    if (energy < 0) {
        energy = 0;
    }

    score = Math.max(0, score - 25);

    atualizarEnergia();

    atualizarHUD();

    damageOverlay.classList.remove("hit");

    void damageOverlay.offsetWidth;

    damageOverlay.classList.add("hit");

    gameMessage.textContent =
        "⚠ COLISÃO! SISTEMA DANIFICADO";

    if (energy <= 0) {

        gameOver();

    }

}


/* =========================================================
   FUNÇÃO: ATUALIZAR ENERGIA
========================================================= */

function atualizarEnergia() {

    energyFill.style.width =
        `${energy}%`;

    energyText.textContent =
        `${energy}%`;

}


/* =========================================================
   FUNÇÃO: GAME OVER
========================================================= */

function gameOver() {

    gameRunning = false;

    clearInterval(asteroidInterval);

    clearInterval(gameTimerInterval);

    clearInterval(coordinateInterval);

    gameMessage.textContent =
        "⚠ NAVE DESTRUÍDA";

    mostrarNotificacao(
        "ENERGIA ESGOTADA — MISSÃO CANCELADA"
    );

    setTimeout(() => {

        resetarMiniGame();

        mudarTela("briefing");

    }, 2200);

}


/* =========================================================
   FUNÇÃO: FINALIZAR MINI GAME
========================================================= */

function finalizarMiniGame() {

    if (!gameRunning) {
        return;
    }

    gameRunning = false;

    clearInterval(asteroidInterval);

    clearInterval(gameTimerInterval);

    clearInterval(coordinateInterval);

    xp += 100;

    score += energy;

    atualizarHUD();

    gameMessage.textContent =
        "✓ CAMPO DE ASTEROIDES SUPERADO";

    mostrarNotificacao(
        "+100 XP // NAVEGADOR ESPACIAL"
    );

    setTimeout(() => {

        mudarTela("quiz");

        iniciarQuiz();

    }, 1800);

}


/* =========================================================
   FUNÇÃO: COORDENADAS
========================================================= */

function iniciarCoordenadas() {

    clearInterval(coordinateInterval);

    coordinateInterval =
        setInterval(() => {

            const x =
                (Math.random() * 999).toFixed(2);

            const y =
                (Math.random() * 999).toFixed(2);

            coordinates.innerHTML =
                `X: ${x}<br>Y: ${y}`;

        }, 1000);

}


/* =========================================================
   FUNÇÃO: RESET MINI GAME
========================================================= */

function resetarMiniGame() {

    gameRunning = false;

    clearInterval(asteroidInterval);

    clearInterval(gameTimerInterval);

    clearInterval(coordinateInterval);

    document
        .querySelectorAll(".asteroid")
        .forEach(asteroid => asteroid.remove());

    energy = 100;

    shipPosition = 50;

    ship.style.left = "50%";

    atualizarEnergia();

}


/* =========================================================
   FUNÇÃO: INICIAR QUIZ
========================================================= */

function iniciarQuiz() {

    currentQuestion = 0;

    correctAnswers = 0;

    selectedAnswer = false;

    carregarPergunta();

}


/* =========================================================
   FUNÇÃO: CARREGAR PERGUNTA
========================================================= */

function carregarPergunta() {

    const pergunta =
        questions[currentQuestion];

    selectedAnswer = false;

    nextButton.disabled = true;

    answerFeedback.textContent = "";

    answerFeedback.style.color = "";

    questionText.textContent =
        pergunta.question;

    const numero =
        String(currentQuestion + 1)
            .padStart(2, "0");

    questionNumber.textContent =
        numero;

    questionIndex.textContent =
        numero;

    atualizarProgresso();

    answersContainer.innerHTML = "";

    pergunta.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.classList.add("answer");

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                () => selecionarResposta(
                    index,
                    button
                )
            );

            answersContainer.appendChild(button);

        }
    );

}


/* =========================================================
   FUNÇÃO: SELECIONAR RESPOSTA
========================================================= */

function selecionarResposta(
    index,
    button
) {

    if (selectedAnswer) {
        return;
    }

    selectedAnswer = true;

    const pergunta =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer");

    buttons.forEach(
        item => item.disabled = true
    );

    button.classList.add("selected");

    if (index === pergunta.correct) {

        button.classList.remove("selected");

        button.classList.add("correct");

        correctAnswers++;

        score += 100;

        xp += 50;

        answerFeedback.textContent =
            "✓ RESPOSTA CORRETA — " +
            pergunta.explanation;

        answerFeedback.style.color =
            "#4cff9d";

        mostrarNotificacao("+100 SCORE // +50 XP");

    } else {

        button.classList.remove("selected");

        button.classList.add("wrong");

        buttons[
            pergunta.correct
        ].classList.add("correct");

        answerFeedback.textContent =
            "✕ RESPOSTA INCORRETA — " +
            pergunta.explanation;

        answerFeedback.style.color =
            "#ff718e";

        score = Math.max(
            0,
            score - 25
        );

    }

    atualizarHUD();

    nextButton.disabled = false;

}


/* =========================================================
   BOTÃO PRÓXIMA QUESTÃO
========================================================= */

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (
        currentQuestion >=
        questions.length
    ) {

        finalizarQuiz();

        return;
    }

    carregarPergunta();

});


/* =========================================================
   FUNÇÃO: ATUALIZAR PROGRESSO
========================================================= */

function atualizarProgresso() {

    const progresso =
        ((currentQuestion + 1) /
            questions.length) * 100;

    progressFill.style.width =
        `${progresso}%`;

    progressText.textContent =
        `${Math.round(progresso)}%`;

}


/* =========================================================
   FUNÇÃO: FINALIZAR QUIZ
========================================================= */

function finalizarQuiz() {

    mostrarResultado();

}


/* =========================================================
   FUNÇÃO: MOSTRAR RESULTADO
========================================================= */

function mostrarResultado() {

    document.getElementById("finalScore")
        .textContent =
        formatarNumero(score);

    document.getElementById("finalCorrect")
        .textContent =
        `${correctAnswers}/${questions.length}`;

    document.getElementById("finalXP")
        .textContent =
        formatarNumero(xp);

    const percentual =
        (correctAnswers /
            questions.length) * 100;

    let rank;
    let message;
    let description;

    if (percentual >= 90) {

        rank = "COSMIC AI MASTER";

        message =
            "Você dominou os desafios da missão.";

        description =
            "Seu conhecimento sobre Inteligência Artificial está em nível avançado.";

    } else if (percentual >= 70) {

        rank = "AI EXPLORER";

        message =
            "Você explorou com sucesso o universo da IA.";

        description =
            "Você demonstrou um excelente conhecimento dos fundamentos da Inteligência Artificial.";

    } else if (percentual >= 50) {

        rank = "DIGITAL PILOT";

        message =
            "Você conseguiu completar a expedição.";

        description =
            "Seu conhecimento está no caminho certo. Continue explorando.";

    } else {

        rank = "SPACE ROOKIE";

        message =
            "A missão terminou, mas a exploração continua.";

        description =
            "Cada missão é uma oportunidade para aprender algo novo sobre Inteligência Artificial.";

    }

    document.getElementById("finalRank")
        .textContent = rank;

    document.getElementById("resultMessage")
        .textContent = message;

    document.getElementById("rankDescription")
        .textContent = description;

    mudarTela("result");

}


/* =========================================================
   FUNÇÃO: ATUALIZAR HUD
========================================================= */

function atualizarHUD() {

    scoreValue.textContent =
        formatarNumero(score);

    xpValue.textContent =
        formatarNumero(xp);

    quizScore.textContent =
        formatarNumero(score);

}


/* =========================================================
   FUNÇÃO: FORMATAR NÚMEROS
========================================================= */

function formatarNumero(numero) {

    return String(Math.max(0, numero))
        .padStart(4, "0");

}


/* =========================================================
   FUNÇÃO: NOTIFICAÇÃO
========================================================= */

function mostrarNotificacao(mensagem) {

    notificationText.textContent =
        mensagem;

    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");

    }, 1800);

}


/* =========================================================
   REINICIAR MISSÃO
========================================================= */

restartButton.addEventListener("click", () => {

    score = 0;

    xp = 0;

    energy = 100;

    currentQuestion = 0;

    correctAnswers = 0;

    selectedAnswer = false;

    resetarMiniGame();

    atualizarHUD();

    mudarTela("intro");

    terminalText.textContent = "";

    iniciarTextoTerminal();

});