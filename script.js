let debug = false;
let showAllDoors = false;
const novemberTestEndDate = 28; // Letzter Tag im November für Tests

// Beispielbilder und Texte für jeden Tag
const doorContent = [
  {
    day: 1,
    image: "./pictures/image-001.jpg",
    text: "Frohe Weihnachtszeit!",
  },
  {
    day: 2,
    image: "./pictures/image-002.jpg",
    text: "Genieße die Adventszeit",
  },
  {
    day: 3,
    image: "./pictures/image-003.jpg",
    text: "Winter Wonderland",
  },
  {
    day: 4,
    image: "./pictures/image-004.jpg",
    text: "Gemütliche Stunden",
  },
  {
    day: 5,
    image: "./pictures/image-005.jpg",
    text: "Nikolaus kommt bald",
  },
  {
    day: 6,
    image: "./pictures/image-006.jpg",
    text: "Froher Nikolaustag!",
  },
  {
    day: 7,
    image: "./pictures/image-007.jpg",
    text: "Schneeglöckchen",
  },
  {
    day: 8,
    image: "./pictures/image-008.jpg",
    text: "Plätzchen backen",
  },
  {
    day: 9,
    image: "./pictures/image-009.jpg",
    text: "Kerzen anzünden",
  },
  {
    day: 10,
    image: "./pictures/image-010.jpg",
    text: "Heißer Kakao",
  },
  {
    day: 11,
    image: "./pictures/image-011.jpg",
    text: "Winterzauber",
  },
  {
    day: 12,
    image: "./pictures/image-012.jpg",
    text: "Sternschnuppen",
  },
  {
    day: 13,
    image: "./pictures/image-013.jpg",
    text: "Glühwein trinken",
  },
  {
    day: 14,
    image: "./pictures/image-014.jpg",
    text: "Geschenke einpacken",
  },
  {
    day: 15,
    image: "./pictures/image-015.jpg",
    text: "Halbzeit!",
  },
  {
    day: 16,
    image: "./pictures/image-016.jpg",
    text: "Lebkuchen genießen",
  },
  {
    day: 17,
    image: "./pictures/image-017.jpg",
    text: "Weihnachtslieder",
  },
  {
    day: 18,
    image: "./pictures/image-018.jpg",
    text: "Advent, Advent",
  },
  {
    day: 19,
    image: "./pictures/image-019.jpg",
    text: "Noch 5 Tage",
  },
  {
    day: 20,
    image: "./pictures/image-020.jpg",
    text: "Vorfreude steigt",
  },
  {
    day: 21,
    image: "./pictures/image-021.jpg",
    text: "Winteranfang",
  },
  {
    day: 22,
    image: "./pictures/image-022.jpg",
    text: "Fast geschafft",
  },
  {
    day: 23,
    image: "./pictures/image-023.jpg",
    text: "Heiligabend morgen!",
  },
  {
    day: 24,
    image: "./pictures/image-024.jpg",
    text: "🎅 Frohe Weihnachten! 🎄",
  },
];

// LocalStorage Funktionen mit Error Handling
function getOpenedDoors() {
  try {
    const stored = localStorage.getItem("adventCalendar2024");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("LocalStorage nicht verfügbar:", e);
    return [];
  }
}

function saveDoorState(day) {
  try {
    const opened = getOpenedDoors();
    if (!opened.includes(day)) {
      opened.push(day);
      localStorage.setItem("adventCalendar2024", JSON.stringify(opened));
    }
  } catch (e) {
    console.error("Fehler beim Speichern:", e);
  }
}

function removeDoorState(day) {
  try {
    const opened = getOpenedDoors();
    const index = opened.indexOf(day);
    if (index > -1) {
      opened.splice(index, 1);
      localStorage.setItem("adventCalendar2024", JSON.stringify(opened));
    }
  } catch (e) {
    console.error("Fehler beim Entfernen:", e);
  }
}

function resetCalendar() {
  if (confirm("Möchtest du wirklich alle geöffneten Türchen zurücksetzen?")) {
    try {
      localStorage.removeItem("adventCalendar2024");
      updateInfoText("✅ Kalender wurde zurückgesetzt!");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (e) {
      console.error("Fehler beim Zurücksetzen:", e);
      updateInfoText("❌ Fehler beim Zurücksetzen");
    }
  }
}

// Aktuellen Tag ermitteln
function getCurrentDay() {
  const select = document.getElementById("daySelect");
  if (select.value) {
    return parseInt(select.value);
  }
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  // Nur im Dezember (Monat 11 = Dezember, 0-basiert)
  if (
    month === 11 ||
    (month === 10 && day >= 1 && day <= novemberTestEndDate)
  ) {
    return day;
  }
  // Außerhalb des Adventskalender-Zeitraums: Tag 0 (keine Türchen verfügbar)
  return 0;
}

function updateDebugDateInfo() {
  const debugDateInfo = document.getElementById("debugDateInfo");
  if (!debugDateInfo) return;

  const systemDate = new Date();
  const systemDay = systemDate.getDate();
  const systemMonth = systemDate.getMonth() + 1;
  const systemYear = systemDate.getFullYear();

  const websiteDay = getCurrentDay();

  debugDateInfo.innerHTML = `
    <strong>Systemdatum:</strong> ${systemDay}.${systemMonth}.${systemYear}<br>
    <strong>Website-Tag:</strong> ${websiteDay}. Dezember
  `;
}

function updateInfoText(message) {
  const infoText = document.getElementById("infoText");
  const currentDay = getCurrentDay();
  const openedCount = getOpenedDoors().length;
  const debugMode = document.getElementById("daySelect").value
    ? " (Debug-Modus aktiv)"
    : "";

  if (message) {
    infoText.textContent = message;
  } else {
    infoText.textContent = `📅 Aktueller Tag: ${currentDay}. Dezember${debugMode} | 🎁 Geöffnete Türchen: ${openedCount}/24`;
  }

  // Debug-Datumsinfo aktualisieren
  updateDebugDateInfo();
}

// Türchen öffnen
function openDoor(day) {
  const currentDay = getCurrentDay();

  if (day > currentDay) {
    alert(
      `Noch etwas Geduld! Dieses Türchen kann erst am ${day}. Dezember geöffnet werden.`
    );
    return;
  }

  saveDoorState(day);

  showModal(day);
  updateInfoText();
}

// Modal anzeigen
function showModal(day) {
  const content = doorContent.find((d) => d.day === day);
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `<img src="${content.image}" alt="Türchen ${day}">`;

  // Tag im Modal speichern für später
  modal.dataset.currentDay = day;

  modal.classList.remove("closing");
  modal.style.display = "flex";

  // Force reflow to trigger animation
  modal.offsetHeight;

  requestAnimationFrame(() => {
    modal.classList.add("active");
  });
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("closing");

  setTimeout(() => {
    modal.classList.remove("active", "closing");
    modal.style.display = "none";

    // Türchen öffnen nach dem Schließen des Modals
    const dayAttr = modal.dataset.currentDay;
    if (dayAttr) {
      const door = document.querySelector(`[data-day="${dayAttr}"]`);
      if (door && !door.classList.contains("opened")) {
        door.classList.add("opened");
      }
      delete modal.dataset.currentDay;
    }
  }, 600);
}

// Kalender initialisieren
function initCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // Vorherigen Inhalt löschen

  const openedDoors = getOpenedDoors();
  const currentDay = getCurrentDay();

  // Türchen in zufälliger Reihenfolge anzeigen
  const days = Array.from({ length: 24 }, (_, i) => i + 1);
  days.sort(() => Math.random() - 0.5);

  days.forEach((day) => {
    const door = document.createElement("div");
    door.className = "door";
    door.dataset.day = day;

    const isOpened = openedDoors.includes(day);
    const isLocked = day > currentDay;

    // Wenn showAllDoors aktiv ist, alle Türchen öffnen
    if (showAllDoors || isOpened) {
      door.classList.add("opened");
    }

    if (isLocked && !showAllDoors) {
      door.classList.add("locked");
    }

    const content = doorContent.find((d) => d.day === day);

    door.innerHTML = `
                <div class="door-front" data-day="${day}">
                    <canvas class="scratch-canvas"></canvas>
                </div>
                <div class="door-back" data-day="${day}">
                    <img src="${content.image}" alt="Türchen ${day}">
                </div>
            `;

    const canvas = door.querySelector(".scratch-canvas");
    const ctx = canvas.getContext("2d");
    let isScratching = false;
    let scratchPercentage = 0;
    let clickCount = 0;
    let clickTimer = null;

    // Canvas initialisieren
    const initCanvas = () => {
      // Größe direkt vom Parent-Element nehmen
      const rect = door.getBoundingClientRect();
      const width = rect.width || 150;
      const height = rect.height || 150;

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      // Canvas beginnt transparent - man sieht das Hintergrundbild
      // Beim Rubbeln wird Farbe hinzugefügt
      ctx.globalCompositeOperation = "source-over";
    };

    if (!isOpened && !showAllDoors) {
      // Canvas nach dem Rendern initialisieren
      setTimeout(() => initCanvas(), 0);
    } else {
      canvas.style.display = "none";
    }

    // Rubbel-Funktion
    const scratch = (x, y) => {
      const rect = canvas.getBoundingClientRect();
      const posX = x - rect.left;
      const posY = y - rect.top;

      // Einfarbig dunkelgrün für freigerubbelte Bereiche
      ctx.fillStyle = "rgba(0, 100, 0, 0.95)";

      ctx.beginPath();
      ctx.arc(posX, posY, 20, 0, Math.PI * 2);
      ctx.fill();
    }; // Freigerubbelte Fläche berechnen (jetzt zählen wir nicht-transparente Pixel)
    const getScratchPercentage = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let filled = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] > 0) filled++; // Zähle nicht-transparente Pixel
      }

      return (filled / (pixels.length / 4)) * 100;
    };

    // Mouse Events
    canvas.addEventListener("mousedown", (e) => {
      if (isLocked && !showAllDoors) return;
      // Dynamische Prüfung ob Türchen geöffnet ist
      if (door.classList.contains("opened")) return;
      isScratching = true;
      scratch(e.clientX, e.clientY);
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!isScratching) return;
      scratch(e.clientX, e.clientY);

      scratchPercentage = getScratchPercentage();
      if (scratchPercentage > 95) {
        canvas.style.display = "none";
        openDoor(day);
        isScratching = false;
      }
    });

    canvas.addEventListener("mouseup", () => {
      isScratching = false;
    });

    canvas.addEventListener("mouseleave", () => {
      isScratching = false;
    });

    // Touch Events für Mobile
    canvas.addEventListener("touchstart", (e) => {
      if (isLocked && !showAllDoors) return;
      // Dynamische Prüfung ob Türchen geöffnet ist
      if (door.classList.contains("opened")) return;
      e.preventDefault();
      isScratching = true;
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    });

    canvas.addEventListener("touchmove", (e) => {
      if (!isScratching) return;
      e.preventDefault();
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);

      scratchPercentage = getScratchPercentage();
      if (scratchPercentage > 95) {
        canvas.style.display = "none";
        openDoor(day);
        isScratching = false;
      }
    });

    canvas.addEventListener("touchend", () => {
      isScratching = false;
    });

    // Klick-Events für geöffnete Türchen
    door.addEventListener("click", (e) => {
      // Nur für bereits geöffnete Türchen
      if (!isOpened && !door.classList.contains("opened")) return;

      clickCount++;

      if (clickTimer) {
        clearTimeout(clickTimer);
      }

      clickTimer = setTimeout(() => {
        if (clickCount === 1) {
          // Einzelklick - Modal öffnen
          showModal(day);
        }
        clickCount = 0;
      }, 300);

      if (clickCount === 2) {
        // Doppelklick - Türchen schließen und Canvas neu initialisieren
        clearTimeout(clickTimer);
        removeDoorState(day);
        door.classList.remove("opened");
        canvas.style.display = "block";

        // Canvas komplett zurücksetzen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        initCanvas();

        // Rubbel-Events wieder aktivieren
        isScratching = false;
        scratchPercentage = 0;

        updateInfoText();
        clickCount = 0;
      }
    });

    calendar.appendChild(door);
  });

  updateInfoText();
}

// Debug-Dropdown initialisieren
function initDebugControls() {
  const select = document.getElementById("daySelect");
  select.innerHTML = '<option value="">Aktueller Tag</option>';

  for (let i = 1; i <= 24; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${i}. Dezember`;
    select.appendChild(option);
  }

  select.addEventListener("change", () => {
    initCalendar();
  });

  // Toggle für "Alle Türchen öffnen"
  const showAllToggle = document.getElementById("showAllToggle");
  showAllToggle.addEventListener("change", (e) => {
    showAllDoors = e.target.checked;
    initCalendar();
  });
}

// Disclaimer aktualisieren
function updateDisclaimer() {
  const disclaimer = document.getElementById("disclaimer");
  if (disclaimer) {
    disclaimer.textContent = `Works from Nov. 1st - Nov. ${novemberTestEndDate}th and the entire December`;
  }
}

// Nach dem Laden der Seite Disclaimer setzen
window.addEventListener("DOMContentLoaded", () => {
  updateDisclaimer();
});

// Event Listeners
document.getElementById("resetButton").addEventListener("click", resetCalendar);

document.getElementById("modal").addEventListener("click", closeModal);

// Datum überprüfen Button
document.getElementById("dateCheckButton").addEventListener("click", () => {
  initCalendar();
  updateInfoText();
  alert("Datum wurde aktualisiert!");
});

// H1 Click Counter für Debug-Toggle
let h1ClickCount = 0;
let h1ClickTimer = null;

document.querySelector("h1").addEventListener("click", () => {
  h1ClickCount++;

  if (h1ClickTimer) {
    clearTimeout(h1ClickTimer);
  }

  h1ClickTimer = setTimeout(() => {
    h1ClickCount = 0;
  }, 1000);

  if (h1ClickCount === 5) {
    debug = !debug;
    h1ClickCount = 0;

    if (debug) {
      document.querySelector(".debug-controls").classList.remove("hidden");
      document.querySelector(".info-text").classList.remove("hidden");
    } else {
      document.querySelector(".debug-controls").classList.add("hidden");
      document.querySelector(".info-text").classList.add("hidden");
    }

    console.log("Debug-Modus:", debug ? "aktiviert" : "deaktiviert");
  }
});

// App starten
initDebugControls();
initCalendar();

// Debug-Modus steuern
if (!debug) {
  document.querySelector(".debug-controls").classList.add("hidden");
  document.querySelector(".info-text").classList.add("hidden");
}
