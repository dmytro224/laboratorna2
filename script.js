const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let score = 0;

const ball = {
    x: 400,
    y: 300,
    radius: 20,
    dx: 5,
    dy: 4
};

const paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    speed: 7,
    dx: 0
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function movePaddle() {
    paddle.x += paddle.dx;

    // Ensure paddle stays within canvas bounds
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (left/right)
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }

    // Wall collision (top)
    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Paddle collision
    if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy *= -1;
        score++;
        document.getElementById('score').innerText = Score: ${score};
    }

    // Bottom collision (missed the ball)
    if (ball.y + ball.radius > canvas.height) {
        document.location.reload();
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    movePaddle();
    updateBall();
    requestAnimationFrame(gameLoop);
}

function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (e.key === 'Right'  e.key === 'ArrowRight'  e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

gameLoop();