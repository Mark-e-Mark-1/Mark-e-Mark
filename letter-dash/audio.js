const Music = (() => {
  let ctx = null;
  let muted = false;
  let playing = false;
  let sfxVolume =
    typeof getSfxVolume === "function" ? getSfxVolume() : 0.7;

  const bgMusic = new Audio("audio/pixel-dash-parade.mp3");
  bgMusic.loop = true;
  bgMusic.preload = "auto";
  bgMusic.volume = typeof getMusicVolume === "function" ? getMusicVolume() : 0.5;

  function ensureCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function syncBgMusic() {
    if (muted || !playing) {
      bgMusic.pause();
      return;
    }
    const playPromise = bgMusic.play();
    if (playPromise) playPromise.catch(() => {});
  }

  function tone(freq, start, dur, type, vol) {
    if (muted) return;
    const ac = ensureCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const scaledVol = vol * sfxVolume;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(scaledVol, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(start);
    osc.stop(start + dur + 0.05);
  }

  return {
    start() {
      ensureCtx();
      playing = true;
      syncBgMusic();
    },

    stop() {
      playing = false;
      bgMusic.pause();
    },

    toggleMute() {
      muted = !muted;
      syncBgMusic();
      return muted;
    },

    isMuted() {
      return muted;
    },

    setVolume(volume) {
      bgMusic.volume = Math.min(1, Math.max(0, volume));
      if (typeof setMusicVolume === "function") setMusicVolume(bgMusic.volume);
    },

    getVolume() {
      return bgMusic.volume;
    },

    setSfxVolume(volume) {
      sfxVolume = Math.min(1, Math.max(0, volume));
      if (typeof setSfxVolume === "function") setSfxVolume(sfxVolume);
    },

    getSfxVolume() {
      return sfxVolume;
    },

    sfxPortal() {
      const ac = ensureCtx();
      const t = ac.currentTime;
      tone(660, t, 0.12, "sine", 0.1);
      tone(880, t + 0.08, 0.18, "triangle", 0.08);
      tone(1320, t + 0.14, 0.2, "sine", 0.06);
    },

    sfxJump() {
      const ac = ensureCtx();
      tone(440, ac.currentTime, 0.08, "sine", 0.12);
    },

    sfxDie() {
      const ac = ensureCtx();
      const t = ac.currentTime;
      tone(200, t, 0.15, "sawtooth", 0.15);
      tone(100, t + 0.1, 0.25, "sawtooth", 0.12);
    },

    sfxWin() {
      const ac = ensureCtx();
      const t = ac.currentTime;
      [523.25, 659.25, 783.99].forEach((f, i) => tone(f, t + i * 0.12, 0.2, "sine", 0.1));
    },

    sfxPoints(points) {
      const ac = ensureCtx();
      const t = ac.currentTime;
      const base = 440 + Math.min(points, 26) * 18;
      tone(base, t, 0.1, "sine", 0.14);
      tone(base * 1.25, t + 0.06, 0.12, "sine", 0.1);
      tone(base * 1.5, t + 0.12, 0.14, "triangle", 0.08);
    },

    sfxBonus() {
      const ac = ensureCtx();
      const t = ac.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        tone(f, t + i * 0.055, 0.18, "sine", 0.13);
      });
      tone(1568, t + 0.05, 0.12, "triangle", 0.09);
      tone(2093, t + 0.12, 0.15, "sine", 0.07);
    },

    sfxBomb() {
      const ac = ensureCtx();
      const t = ac.currentTime;
      tone(90, t, 0.2, "sawtooth", 0.22);
      tone(55, t + 0.08, 0.35, "sawtooth", 0.18);
      tone(120, t + 0.05, 0.15, "square", 0.1);
      tone(40, t + 0.15, 0.4, "triangle", 0.12);
    },

    sfxSuperBonus() {
      const ac = ensureCtx();
      const t = ac.currentTime;
      [523.25, 659.25, 783.99, 1046.5, 1318.5, 1568].forEach((f, i) => {
        tone(f, t + i * 0.07, 0.22, "sine", 0.12);
      });
      tone(2093, t + 0.2, 0.35, "triangle", 0.1);
      tone(2637, t + 0.35, 0.4, "sine", 0.08);
    },

    sfxSpeedPad(boost) {
      const ac = ensureCtx();
      const t = ac.currentTime;
      if (boost) {
        tone(440, t, 0.08, "sine", 0.12);
        tone(660, t + 0.06, 0.12, "sine", 0.1);
        tone(880, t + 0.12, 0.16, "triangle", 0.09);
      } else {
        tone(330, t, 0.12, "triangle", 0.1);
        tone(220, t + 0.08, 0.18, "sine", 0.08);
      }
    },

    sfxJacobScream() {
      if (muted) return;
      const ac = ensureCtx();
      const t = ac.currentTime;
      const dur = 0.52;
      const vol = 0.2 * sfxVolume;

      function risingVoice(type, f0, f1, f2, gainMul, start = 0) {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(f0, t + start);
        osc.frequency.exponentialRampToValueAtTime(f1, t + start + 0.28);
        osc.frequency.exponentialRampToValueAtTime(f2, t + start + dur);
        gain.gain.setValueAtTime(0.001, t + start);
        gain.gain.linearRampToValueAtTime(vol * gainMul, t + start + 0.025);
        gain.gain.setValueAtTime(vol * gainMul * 0.85, t + start + 0.22);
        gain.gain.exponentialRampToValueAtTime(0.001, t + start + dur);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(t + start);
        osc.stop(t + start + dur + 0.05);
      }

      risingVoice("sawtooth", 260, 980, 820, 0.55);
      risingVoice("square", 520, 1680, 1400, 0.22, 0.04);
      risingVoice("sine", 700, 2100, 1750, 0.18, 0.08);

      const noiseDur = 0.12;
      const bufferSize = Math.floor(ac.sampleRate * noiseDur);
      const noiseBuffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ac.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseFilter = ac.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(900, t);
      noiseFilter.frequency.exponentialRampToValueAtTime(2400, t + noiseDur);
      noiseFilter.Q.value = 0.8;
      const noiseGain = ac.createGain();
      noiseGain.gain.setValueAtTime(0.001, t);
      noiseGain.gain.linearRampToValueAtTime(vol * 0.35, t + 0.015);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + noiseDur);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ac.destination);
      noise.start(t);
      noise.stop(t + noiseDur + 0.02);

      tone(320, t, 0.08, "sawtooth", 0.1);
      tone(520, t + 0.06, 0.14, "triangle", 0.08);
    },

    sfxRowanHop() {
      const ac = ensureCtx();
      const t = ac.currentTime;
      tone(523.25, t, 0.06, "sine", 0.11);
      tone(659.25, t + 0.05, 0.1, "sine", 0.1);
      tone(783.99, t + 0.1, 0.14, "triangle", 0.08);
    },
  };
})();
