const connectButton = document.getElementById('connect');

let connected = false;
let port;


connectButton.addEventListener('click', async () => {
  if (connected) {
    port.close();
    connectButton.innerText = 'Connect';
    connected = false;
  } else {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    connectButton.innerText = 'Disconnect';
    connected = true;
  }
});

let stringBuffer = '';

eventLoop = async () => {
  if (connected) {
    const reader = port.readable.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        break;
      }
      let str = new TextDecoder().decode(value);
      stringBuffer += str;
      let parts = stringBuffer.split('\n');
      for (let i = 0; i < parts.length - 1; i++) {
        let part = parts[i];

        let [dist, distAvg, angle] = part.split(',');

        setAngle(angle);

        if (dist > 40) {
          continue;
        }

        dist /= 40;
        distAvg /= 40;

        addDetection(angle, dist);
      }
      stringBuffer = parts[parts.length - 1];
    }
  } else {
    setAngle(angle + 0.5);

    let rnd = Math.random();
    if (rnd < 0.005) {
      addDetection(angle, Math.random());
    }
  }
  setTimeout(eventLoop, 1);
};

eventLoop();