// Fonction pour un son d'alerte
  export default function alerteSonore() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine"; // type du son : sine, square, sawtooth, triangle
    osc.frequency.setValueAtTime(200, ctx.currentTime); // fréquence en Hz
    gainNode.gain.setValueAtTime(1, ctx.currentTime); // volume

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2); // durée 0.2s
  }