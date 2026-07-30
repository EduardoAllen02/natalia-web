(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var CALLS = [
    {
      tab: "Restaurante",
      icon: "R",
      title: "Lobos Pizza y Snacks",
      subtitle: "Restaurante · Pedido telefónico",
      accent: "#d37b27",
      soft: "#fff1e2",
      ink: "#965018",
      audio: "audio/demos/restaurante/llamada-real.mp3",
      initialResult: "Armando el pedido",
      result: "Pedido enviado a cocina",
      tags: ["Punto de venta", "Cocina", "Seguimiento"],
      facts: ["Consulta el menú", "Aplica cambios", "Confirma y registra"],
      script: [
        { who: "agente", text: "Buenas tardes, gracias por llamar a Lobos Pizza y Snacks. ¿En qué le puedo ayudar?" },
        { who: "cliente", text: "Hola, sí. Quiero un paquete tres con Pepsi de tres litros." },
        { who: "agente", text: "Claro. ¿Va a pasar por él o se lo enviamos?" },
        { who: "cliente", text: "Para recoger. Oiga, ¿tienen refresco de naranja?" },
        { who: "agente", text: "Sí, tenemos Fanta de seiscientos mililitros. ¿Le agrego una?" },
        { who: "cliente", text: "Sí, por favor. A nombre de Miguel." },
        { who: "agente", text: "Perfecto, Miguel. Es un paquete tres y una Fanta, para recoger. Son doscientos sesenta pesos y queda en veinte minutos. ¿Está bien?" },
        { who: "cliente", text: "Sí, está bien." },
        { who: "agente", text: "Listo, ya quedó su pedido. Lo mandé a cocina." }
      ]
    },
    {
      tab: "Clínica",
      icon: "+",
      title: "Clínica Horizonte",
      subtitle: "Clínica · Agenda de consulta",
      accent: "#3979c9",
      soft: "#eaf2fc",
      ink: "#245996",
      audio: "audio/demos/clinica/llamada-real.mp3",
      initialResult: "Buscando disponibilidad",
      result: "Cita registrada y confirmada",
      tags: ["Agenda", "Expediente", "Recordatorio"],
      facts: ["Identifica la especialidad", "Consulta horarios", "Registra la cita"],
      script: [
        { who: "agente", text: "Clínica Horizonte, buenas tardes. ¿Con quién tengo el gusto?" },
        { who: "cliente", text: "Con Mariana López. Quiero sacar una cita de medicina general para mañana." },
        { who: "agente", text: "Sí, Mariana. Mañana tengo a las cinco y media. ¿Le queda bien?" },
        { who: "cliente", text: "Sí, está perfecto." },
        { who: "agente", text: "¿Es la primera vez que viene con nosotros?" },
        { who: "cliente", text: "Sí, es la primera." },
        { who: "agente", text: "Le mando la ubicación a este mismo número, ¿está bien?" },
        { who: "cliente", text: "Sí, por favor." },
        { who: "agente", text: "Listo, Mariana. Quedó mañana a las cinco y media. Le llega la confirmación por mensaje." }
      ]
    },
    {
      tab: "Call center",
      icon: "CC",
      title: "Nova Atención",
      subtitle: "Call center · Soporte al cliente",
      accent: "#2f9872",
      soft: "#e7f6ef",
      ink: "#216c52",
      audio: "audio/demos/call-center/llamada-real.mp3",
      initialResult: "Identificando la solicitud",
      result: "Caso creado y asignado a soporte",
      tags: ["CRM", "Soporte", "Seguimiento"],
      facts: ["Identifica al cliente", "Consulta el servicio", "Canaliza el caso"],
      script: [
        { who: "agente", text: "Nova Atención, buenas tardes. ¿En qué le ayudo?" },
        { who: "cliente", text: "Hola, desde la mañana no tengo internet en casa." },
        { who: "agente", text: "Con gusto lo reviso. ¿Me ayuda con el número de la línea?" },
        { who: "cliente", text: "Es el siete siete uno, trescientos veinte, cuarenta, dieciocho." },
        { who: "agente", text: "Gracias. Veo una falla general en su zona. El servicio debe quedar restablecido antes de las seis." },
        { who: "cliente", text: "¿Me puede levantar el reporte de todas formas?" },
        { who: "agente", text: "Sí, ya quedó. Su folio es cuarenta y ocho veintiuno; también se lo mando por mensaje." }
      ]
    },
    {
      tab: "Taller",
      icon: "T",
      title: "Taller Motor Norte",
      subtitle: "Taller · Programación de servicio",
      accent: "#079da2",
      soft: "#e2f7f7",
      ink: "#0a5558",
      audio: "audio/demos/taller/llamada-real.mp3",
      initialResult: "Revisando la agenda",
      result: "Diagnóstico programado",
      tags: ["Agenda", "Orden de servicio", "Recepción"],
      facts: ["Captura el vehículo", "Clasifica la falla", "Programa recepción"],
      script: [
        { who: "agente", text: "Taller Motor Norte, buenas tardes. ¿En qué le podemos ayudar?" },
        { who: "cliente", text: "Buenas. Mi camioneta hace un rechinido cuando freno. ¿La pueden revisar?" },
        { who: "agente", text: "Sí, claro. ¿Qué camioneta es?" },
        { who: "cliente", text: "Una Nissan Kicks dos mil veinte." },
        { who: "agente", text: "¿El ruido empezó hoy o ya tiene varios días?" },
        { who: "cliente", text: "Ya tiene como una semana." },
        { who: "agente", text: "Tengo espacio mañana a las nueve para revisarla. El diagnóstico tarda alrededor de una hora." },
        { who: "cliente", text: "Está bien, a nombre de Carlos Méndez." },
        { who: "agente", text: "Listo, Carlos. Quedó mañana a las nueve. El precio exacto se lo damos después de revisar los frenos." }
      ]
    }
  ];
  var VOICE_FILES = [
    [
      "natalia-01-saludo.mp3",
      "natalia-02-modalidad.mp3",
      "natalia-03-existencia.mp3",
      "natalia-04-confirmacion.mp3",
      "natalia-05-cierre.mp3"
    ],
    [
      "natalia-01-saludo.mp3",
      "natalia-02-disponibilidad.mp3",
      "natalia-03-primera-consulta.mp3",
      "natalia-04-envio-confirmacion.mp3",
      "natalia-05-cierre.mp3"
    ],
    [
      "natalia-01-saludo.mp3",
      "natalia-02-numero-servicio.mp3",
      "natalia-03-incidencia.mp3",
      "natalia-04-cierre.mp3"
    ],
    [
      "natalia-01-saludo.mp3",
      "natalia-02-vehiculo.mp3",
      "natalia-03-antiguedad-falla.mp3",
      "natalia-04-disponibilidad.mp3",
      "natalia-05-cierre.mp3"
    ]
  ];
  var VOICE_DIRECTORIES = ["restaurante", "clinica", "call-center", "taller"];
  var KEYBOARD_BEFORE = [[3], [2], [3], [4]];

  CALLS.forEach(function (call, callIndex) {
    var voiceIndex = 0;
    call.script.forEach(function (entry) {
      if (entry.who !== "agente") return;
      voiceIndex += 1;
      entry.audio = "audio/demos/" + VOICE_DIRECTORIES[callIndex] + "/" + VOICE_FILES[callIndex][voiceIndex - 1];
      entry.keyboardBefore = KEYBOARD_BEFORE[callIndex].indexOf(voiceIndex) >= 0;
    });
  });

  var carousel = document.getElementById("call-carousel");
  var callTrack = document.getElementById("call-track");
  var callTabs = document.querySelectorAll("[data-call-index]");
  var callSwitcher = document.getElementById("call-switcher");
  var prevButton = document.getElementById("call-prev");
  var nextButton = document.getElementById("call-next");
  var liveCallSection = document.getElementById("live-call");
  if (!carousel || !callTrack) return;

  var transcriptTimer = null;
  var clockTimer = null;
  var scrollTimer = null;
  var activeSlide = null;
  var activeRealIndex = 0;
  var dragging = false;
  var dragStartX = 0;
  var dragStartScroll = 0;
  var dragCurrentX = 0;
  var themeFrame = null;
  var themeVisible = true;
  var root = document.documentElement;
  var voiceEnabled = false;
  var currentVoiceAudio = null;
  var currentKeyboardAudio = null;
  var currentAudioResolve = null;
  var playbackGeneration = 0;

  function hexToRgb(hex) {
    var value = hex.replace("#", "");
    return [
      parseInt(value.slice(0, 2), 16),
      parseInt(value.slice(2, 4), 16),
      parseInt(value.slice(4, 6), 16)
    ];
  }

  function mixRgb(from, to, progress) {
    return from.map(function (channel, index) {
      return Math.round(channel + (to[index] - channel) * progress);
    });
  }

  function setSectionTheme(accent, soft) {
    if (!liveCallSection) return;
    liveCallSection.style.setProperty("--section-accent-rgb", accent.join(", "));
    liveCallSection.style.setProperty("--section-soft-rgb", soft.join(", "));
  }

  function setGlobalTheme(accent, soft, ink) {
    root.style.setProperty("--theme-accent-rgb", accent.join(", "));
    root.style.setProperty("--theme-soft-rgb", soft.join(", "));
    root.style.setProperty("--theme-ink-rgb", ink.join(", "));
  }

  function updateSectionTheme() {
    var allSlides = slides();
    if (!allSlides.length) return;

    var viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    var leftSlide = allSlides[0];
    var rightSlide = allSlides[0];
    var progress = 0;

    for (var i = 0; i < allSlides.length - 1; i += 1) {
      var currentCenter = allSlides[i].offsetLeft + allSlides[i].offsetWidth / 2;
      var nextCenter = allSlides[i + 1].offsetLeft + allSlides[i + 1].offsetWidth / 2;
      if (viewportCenter >= currentCenter && viewportCenter <= nextCenter) {
        leftSlide = allSlides[i];
        rightSlide = allSlides[i + 1];
        progress = (viewportCenter - currentCenter) / (nextCenter - currentCenter);
        break;
      }
    }

    if (viewportCenter > allSlides[allSlides.length - 1].offsetLeft + allSlides[allSlides.length - 1].offsetWidth / 2) {
      leftSlide = allSlides[allSlides.length - 1];
      rightSlide = leftSlide;
    }

    var leftCall = CALLS[Number(leftSlide.dataset.realIndex)];
    var rightCall = CALLS[Number(rightSlide.dataset.realIndex)];
    var accent = mixRgb(hexToRgb(leftCall.accent), hexToRgb(rightCall.accent), progress);
    var soft = mixRgb(hexToRgb(leftCall.soft), hexToRgb(rightCall.soft), progress);
    var ink = mixRgb(hexToRgb(leftCall.ink), hexToRgb(rightCall.ink), progress);

    setSectionTheme(accent, soft);
    if (themeVisible) setGlobalTheme(accent, soft, ink);
  }

  function requestThemeUpdate() {
    if (themeFrame) return;
    themeFrame = window.requestAnimationFrame(function () {
      updateSectionTheme();
      themeFrame = null;
    });
  }

  function createWaveform(container, seed) {
    for (var i = 0; i < 54; i += 1) {
      var bar = document.createElement("span");
      var strength = 0.22 + Math.abs(Math.sin((i + seed * 3) * 0.61)) * 0.78;
      bar.style.height = Math.round(strength * 100) + "%";
      bar.style.animationDelay = ((i % 11) * -0.07).toFixed(2) + "s";
      bar.style.animationDuration = (0.58 + (i % 8) * 0.07).toFixed(2) + "s";
      container.appendChild(bar);
    }
  }

  function updateAudioControls() {
    document.querySelectorAll(".call-audio-control").forEach(function (control) {
      control.disabled = false;
      control.classList.toggle("playing", voiceEnabled);
      control.setAttribute("aria-pressed", voiceEnabled ? "true" : "false");
      control.querySelector("span").textContent = voiceEnabled ? "◼" : "▶";
      control.querySelector("b").textContent = voiceEnabled ? "Desactivar audio" : "Activar audio";
    });
  }

  function stopCurrentAudio() {
    [currentVoiceAudio, currentKeyboardAudio].forEach(function (audio) {
      if (!audio) return;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    });
    currentVoiceAudio = null;
    currentKeyboardAudio = null;
    if (currentAudioResolve) {
      var resolve = currentAudioResolve;
      currentAudioResolve = null;
      resolve(false);
    }
  }

  function playAudioFile(source, kind) {
    if (!voiceEnabled || !source) return Promise.resolve(false);
    return new Promise(function (resolve) {
      var audio = new Audio(source);
      var settled = false;
      if (kind === "keyboard") currentKeyboardAudio = audio;
      else currentVoiceAudio = audio;
      currentAudioResolve = finish;

      function finish(played) {
        if (settled) return;
        settled = true;
        audio.onended = null;
        audio.onerror = null;
        if (kind === "keyboard") currentKeyboardAudio = null;
        else currentVoiceAudio = null;
        if (currentAudioResolve === finish) currentAudioResolve = null;
        resolve(played);
      }

      audio.preload = "auto";
      audio.onended = function () { finish(true); };
      audio.onerror = function () { finish(false); };
      audio.play().catch(function () {
        voiceEnabled = false;
        updateAudioControls();
        finish(false);
      });
    });
  }

  function prepareAudioControl(slide, call) {
    var control = slide.querySelector(".call-audio-control");
    if (!control) return;
    control.disabled = false;
    control.addEventListener("pointerdown", function (event) {
      event.stopPropagation();
    });
    control.addEventListener("click", function (event) {
      event.stopPropagation();
      voiceEnabled = !voiceEnabled;
      updateAudioControls();
      if (slide === activeSlide) {
        playTranscript(slide, call);
      }
    });
  }

  function createSlide(call, realIndex, cloneName) {
    var slide = document.createElement("article");
    slide.className = "call-slide";
    slide.dataset.realIndex = String(realIndex);
    if (cloneName) slide.dataset.clone = cloneName;
    slide.style.setProperty("--call-accent", call.accent);
    slide.style.setProperty("--call-soft", call.soft);
    slide.style.setProperty("--call-ink", call.ink);
    slide.setAttribute("aria-label", "Llamada de " + call.tab);
    if (cloneName) {
      slide.setAttribute("aria-hidden", "true");
    } else {
      slide.id = "call-panel-" + realIndex;
      slide.setAttribute("role", "tabpanel");
      slide.setAttribute("aria-labelledby", "call-tab-" + realIndex);
    }

    slide.innerHTML =
      '<div class="call-card">' +
        '<div class="call-meta">' +
          '<div class="call-identity">' +
            '<span class="business-icon" aria-hidden="true">' + call.icon + '</span>' +
            '<div><strong>' + call.title + '</strong><small>' + call.subtitle + '</small></div>' +
          '</div>' +
          '<div class="call-meta-actions">' +
            '<button class="call-audio-control" type="button" aria-pressed="false" aria-label="Activar o desactivar la voz de Natalia"><span aria-hidden="true">▶</span><b>Activar audio</b></button>' +
            '<div class="call-time"><span>00:00</span><small>duración</small></div>' +
          '</div>' +
        '</div>' +
        '<div class="audio-strip" aria-hidden="true"><div class="demo-waveform"></div></div>' +
        '<div class="conversation-column">' +
          '<div class="conversation-heading"><span>Conversación</span><span class="listening-label">Vista previa</span></div>' +
          '<div class="demo-transcript" aria-live="off"></div>' +
        '</div>' +
        '<div class="call-outcome">' +
          '<div class="outcome-main"><span class="outcome-check" aria-hidden="true">✓</span><div><span class="meta-label">RESULTADO</span><strong>' + call.initialResult + '</strong></div></div>' +
          '<div class="integration-tags" aria-label="Destinos de la acción">' +
            call.tags.map(function (tag) { return "<span>" + tag + "</span>"; }).join("") +
          '</div>' +
        '</div>' +
        '<div class="call-facts" aria-label="Qué sucede durante la llamada">' +
          call.facts.map(function (fact, index) { return "<span><b>0" + (index + 1) + "</b>" + fact + "</span>"; }).join("") +
        '</div>' +
      '</div>';

    createWaveform(slide.querySelector(".demo-waveform"), realIndex);
    prepareAudioControl(slide, call);
    return slide;
  }

  function slides() {
    return Array.prototype.slice.call(callTrack.querySelectorAll(".call-slide"));
  }

  function centerOffset(slide) {
    return slide.offsetLeft - (carousel.clientWidth - slide.offsetWidth) / 2;
  }

  function setScrollBehavior(value) {
    carousel.style.scrollBehavior = value;
  }

  function jumpTo(index) {
    var allSlides = slides();
    if (!allSlides[index]) return;
    setScrollBehavior("auto");
    carousel.scrollLeft = centerOffset(allSlides[index]);
    carousel.offsetHeight;
    setScrollBehavior(reducedMotion ? "auto" : "smooth");
  }

  function scrollTo(index) {
    var allSlides = slides();
    if (!allSlides[index]) return;
    carousel.scrollTo({ left: centerOffset(allSlides[index]), behavior: reducedMotion ? "auto" : "smooth" });
  }

  function renderLine(entry) {
    var line = document.createElement("p");
    line.className = "demo-line " + entry.who;

    var speaker = document.createElement("span");
    speaker.className = "speaker";
    speaker.textContent = entry.who === "cliente" ? "Cliente" : "Natalia";

    var body = document.createElement("span");
    body.textContent = entry.text;
    line.appendChild(speaker);
    line.appendChild(body);
    return line;
  }

  function clearPlayback() {
    playbackGeneration += 1;
    if (transcriptTimer) window.clearTimeout(transcriptTimer);
    if (clockTimer) window.clearInterval(clockTimer);
    stopCurrentAudio();
    transcriptTimer = null;
    clockTimer = null;
  }

  function updateTabs(call) {
    callTabs.forEach(function (tab, index) {
      var selected = index === activeRealIndex;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.style.setProperty("--tab-color", call.accent);
      tab.tabIndex = selected ? 0 : -1;
      if (selected && callSwitcher) {
        var targetLeft = tab.offsetLeft - (callSwitcher.clientWidth - tab.offsetWidth) / 2;
        callSwitcher.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: reducedMotion ? "auto" : "smooth",
        });
      }
    });
  }

  function visibleTranscriptLines() {
    if (window.innerWidth < 720) return 4;
    if (window.innerWidth < 900) return 5;
    if (window.innerHeight <= 760) return 4;
    if (window.innerHeight < 840) return 5;
    return 6;
  }

  function trimTranscript(transcript) {
    if (!transcript) return;
    while (transcript.children.length > visibleTranscriptLines()) {
      transcript.removeChild(transcript.firstChild);
    }
  }

  function playTranscript(slide, call) {
    clearPlayback();
    var generation = playbackGeneration;
    var transcript = slide.querySelector(".demo-transcript");
    var status = slide.querySelector(".listening-label");
    var clock = slide.querySelector(".call-time span");
    var result = slide.querySelector(".outcome-main strong");
    var index = 0;
    var seconds = 0;

    transcript.innerHTML = "";
    clock.textContent = "00:00";
    result.textContent = call.initialResult;
    status.textContent = "Escuchando";

    function isCurrent() {
      return generation === playbackGeneration && slide === activeSlide;
    }

    function wait(milliseconds) {
      return new Promise(function (resolve) {
        transcriptTimer = window.setTimeout(resolve, milliseconds);
      });
    }

    function readingPause(entry) {
      var minimum = entry.who === "cliente" ? 1650 : 1400;
      var maximum = entry.who === "cliente" ? 3200 : 4200;
      return Math.min(maximum, Math.max(minimum, entry.text.length * 42));
    }

    function reveal(entry) {
      if (!isCurrent()) return Promise.resolve();
      slide.classList.toggle("speaking", entry.who === "agente");
      transcript.appendChild(renderLine(entry));
      trimTranscript(transcript);
      status.textContent = index >= call.script.length - 2 ? "Registrando" : entry.who === "agente" ? "Respondiendo" : "Escuchando";

      if (entry.who === "agente" && voiceEnabled && entry.audio) {
        return playAudioFile(entry.audio, "voice").then(function (played) {
          if (!played && isCurrent()) return wait(readingPause(entry));
        });
      }
      return wait(reducedMotion ? Math.min(900, readingPause(entry)) : readingPause(entry));
    }

    function finish() {
      if (!isCurrent()) return;
      slide.classList.remove("speaking");
      status.textContent = "Completado";
      result.textContent = call.result;
      if (clockTimer) window.clearInterval(clockTimer);
      clockTimer = null;
    }

    function step() {
      if (!isCurrent()) return;
      var entry = call.script[index];
      var before = Promise.resolve();
      if (entry.who === "agente" && entry.keyboardBefore && voiceEnabled) {
        status.textContent = "Consultando";
        audioState.textContent = "Natalia consulta el sistema";
        before = playAudioFile("audio/demos/keyboard.mp3", "keyboard");
      }

      before
        .then(function () {
          if (!isCurrent()) return;
          return reveal(entry);
        })
        .then(function () {
          if (!isCurrent()) return;
          index += 1;
          if (index >= call.script.length) {
            transcriptTimer = window.setTimeout(finish, reducedMotion ? 0 : 500);
            return;
          }
          slide.classList.remove("speaking");
          transcriptTimer = window.setTimeout(step, reducedMotion ? 80 : 280);
        });
    }

    step();
    clockTimer = window.setInterval(function () {
      seconds = (seconds + 1) % 60;
      clock.textContent = "00:" + String(seconds).padStart(2, "0");
    }, 1000);
  }

  function activate(index, restart) {
    var allSlides = slides();
    var slide = allSlides[index];
    if (!slide) return;
    var changed = slide !== activeSlide;
    activeRealIndex = Number(slide.dataset.realIndex);
    allSlides.forEach(function (item) {
      item.classList.toggle("active", item === slide);
      if (!item.dataset.clone) {
        item.setAttribute("aria-hidden", item === slide ? "false" : "true");
        var liveRegion = item.querySelector(".demo-transcript");
        if (liveRegion) liveRegion.setAttribute("aria-live", item === slide ? "polite" : "off");
      }
    });
    activeSlide = slide;
    updateTabs(CALLS[activeRealIndex]);
    // La i y la a del logo reflejan la industria activa (un solo color para
    // ambas, no una animación); cambia sólo cuando el usuario elige una
    // pestaña, nunca solo.
    document.documentElement.style.setProperty("--logo-accent", CALLS[activeRealIndex].accent);
    if (changed || restart) playTranscript(slide, CALLS[activeRealIndex]);
  }

  function normalizeEdge(index) {
    var allSlides = slides();
    if (index === 0) {
      jumpTo(CALLS.length);
      return CALLS.length;
    }
    if (index === allSlides.length - 1) {
      jumpTo(1);
      return 1;
    }
    return index;
  }

  function nearestPhysicalIndex() {
    var allSlides = slides();
    var viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    var nearestIndex = 0;
    var nearestDistance = Infinity;

    allSlides.forEach(function (slide, index) {
      var slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      var distance = Math.abs(viewportCenter - slideCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }

  function selectNearest() {
    var nearestIndex = normalizeEdge(nearestPhysicalIndex());
    activate(nearestIndex, false);
  }

  function snapToNearest() {
    var nearestIndex = nearestPhysicalIndex();
    scrollTo(nearestIndex);
    window.setTimeout(selectNearest, reducedMotion ? 0 : 240);
  }

  function goToReal(realIndex, manual) {
    var physicalIndex = realIndex + 1;
    scrollTo(physicalIndex);
    window.setTimeout(function () {
      activate(physicalIndex, true);
    }, reducedMotion ? 0 : 280);
  }

  function moveBy(direction) {
    var allSlides = slides();
    var physicalIndex = allSlides.indexOf(activeSlide);
    if (physicalIndex < 1 || physicalIndex > CALLS.length) {
      physicalIndex = activeRealIndex + 1;
    }
    var targetIndex = Math.max(0, Math.min(allSlides.length - 1, physicalIndex + direction));
    scrollTo(targetIndex);
    window.setTimeout(selectNearest, reducedMotion ? 0 : 320);
  }

  function build() {
    callTrack.appendChild(createSlide(CALLS[CALLS.length - 1], CALLS.length - 1, "before"));
    CALLS.forEach(function (call, index) {
      callTrack.appendChild(createSlide(call, index, ""));
    });
    callTrack.appendChild(createSlide(CALLS[0], 0, "after"));

    window.requestAnimationFrame(function () {
      jumpTo(1);
      activate(1, true);
      updateSectionTheme();
    });
  }

  build();
  updateAudioControls();

  if ("IntersectionObserver" in window && liveCallSection) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        themeVisible = entry.isIntersecting;
        if (themeVisible) updateSectionTheme();
      });
    }, { rootMargin: "-12% 0px -12% 0px", threshold: 0.01 }).observe(liveCallSection);
  }

  carousel.addEventListener("scroll", function () {
    requestThemeUpdate();
    if (dragging) return;
    if (scrollTimer) window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(selectNearest, 140);
  }, { passive: true });

  carousel.addEventListener("wheel", function (event) {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY) * 0.6) return;
    event.preventDefault();
    carousel.scrollLeft += event.deltaX * 1.65;
    if (scrollTimer) window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(snapToNearest, 110);
  }, { passive: false });

  carousel.addEventListener("mouseleave", function () {
    if (dragging) {
      dragging = false;
      carousel.classList.remove("dragging");
      snapToNearest();
    }
  });

  carousel.addEventListener("pointerdown", function (event) {
    if (event.pointerType === "touch") return;
    dragging = true;
    dragStartX = event.clientX;
    dragCurrentX = event.clientX;
    dragStartScroll = carousel.scrollLeft;
    carousel.classList.add("dragging");
    carousel.setPointerCapture(event.pointerId);
  });

  carousel.addEventListener("pointermove", function (event) {
    if (!dragging) return;
    dragCurrentX = event.clientX;
    carousel.scrollLeft = dragStartScroll - (event.clientX - dragStartX) * 1.35;
  });

  carousel.addEventListener("pointerup", function (event) {
    if (!dragging) return;
    dragging = false;
    carousel.classList.remove("dragging");
    if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
    var dragDistance = dragCurrentX - dragStartX;
    if (Math.abs(dragDistance) > 55) {
      var currentPhysicalIndex = slides().indexOf(activeSlide);
      scrollTo(currentPhysicalIndex + (dragDistance < 0 ? 1 : -1));
      window.setTimeout(selectNearest, reducedMotion ? 0 : 240);
    } else {
      snapToNearest();
    }
  });

  callTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      goToReal(Number(tab.dataset.callIndex), true);
    });

    tab.addEventListener("keydown", function (event) {
      var currentIndex = Number(tab.dataset.callIndex);
      var targetIndex = currentIndex;
      if (event.key === "ArrowRight") targetIndex = (currentIndex + 1) % CALLS.length;
      if (event.key === "ArrowLeft") targetIndex = (currentIndex - 1 + CALLS.length) % CALLS.length;
      if (event.key === "Home") targetIndex = 0;
      if (event.key === "End") targetIndex = CALLS.length - 1;
      if (targetIndex === currentIndex) return;
      event.preventDefault();
      if (event.key === "ArrowRight") {
        moveBy(1);
      } else if (event.key === "ArrowLeft") {
        moveBy(-1);
      } else {
        goToReal(targetIndex, true);
      }
      callTabs[targetIndex].focus();
    });
  });

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      moveBy(-1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      moveBy(1);
    });
  }

  window.addEventListener("resize", function () {
    if (!activeSlide) return;
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(function () {
      document.querySelectorAll(".demo-transcript").forEach(trimTranscript);
      jumpTo(slides().indexOf(activeSlide));
      updateSectionTheme();
    }, 120);
  });

  window.addEventListener("pagehide", clearPlayback);
}());
