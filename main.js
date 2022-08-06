window.addEventListener('load', () => {
    const canvas = document.getElementById('MessageFrame');
    const ctx = canvas.getContext('2d');
    canvas.height = 700;
    canvas.width = 500;
    let canvasStart = 20;
    ctx.font = '20px Helvetica';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';

    const msgInput = document.getElementById('MessageInput');
    const sendMsg = document.getElementById('SendButton');

    const pongSocket = new WebSocket('ws://localhost:9090');
    sendMsg.onclick = () => {
        pongSocket.send(msgInput.value);
        writeMessage(ctx, msgInput.value, canvasStart);
        msgInput.value = '';
    }

    pongSocket.addEventListener('open', (event) => {
        pongSocket.send('Hello Server!');
    });

    const writeMessage = (context, msg, x) => {
        context.fillText(msg, 10, x);
        canvasStart += 25;
    }

    pongSocket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);
        writeMessage(ctx, event.data, canvasStart);
    });
});