const debug = true;

// Beispielbilder und Texte für jeden Tag
const doorContent = [
  {
    day: 1,
    image: "./pictures/image-001.jpg",
    text: "Frohe Weihnachtszeit!",
  },
  {
    day: 2,
    image: "https://picsum.photos/400/400?random=2",
    text: "Genieße die Adventszeit",
  },
  {
    day: 3,
    image: "https://picsum.photos/400/400?random=3",
    text: "Winter Wonderland",
  },
  {
    day: 4,
    image: "https://picsum.photos/400/400?random=4",
    text: "Gemütliche Stunden",
  },
  {
    day: 5,
    image: "https://picsum.photos/400/400?random=5",
    text: "Nikolaus kommt bald",
  },
  {
    day: 6,
    image: "https://picsum.photos/400/400?random=6",
    text: "Froher Nikolaustag!",
  },
  {
    day: 7,
    image: "https://picsum.photos/400/400?random=7",
    text: "Schneeglöckchen",
  },
  {
    day: 8,
    image: "https://picsum.photos/400/400?random=8",
    text: "Plätzchen backen",
  },
  {
    day: 9,
    image: "https://picsum.photos/400/400?random=9",
    text: "Kerzen anzünden",
  },
  {
    day: 10,
    image: "https://picsum.photos/400/400?random=10",
    text: "Heißer Kakao",
  },
  {
    day: 11,
    image: "https://picsum.photos/400/400?random=11",
    text: "Winterzauber",
  },
  {
    day: 12,
    image: "https://picsum.photos/400/400?random=12",
    text: "Sternschnuppen",
  },
  {
    day: 13,
    image: "https://picsum.photos/400/400?random=13",
    text: "Glühwein trinken",
  },
  {
    day: 14,
    image: "https://picsum.photos/400/400?random=14",
    text: "Geschenke einpacken",
  },
  {
    day: 15,
    image: "https://picsum.photos/400/400?random=15",
    text: "Halbzeit!",
  },
  {
    day: 16,
    image: "https://picsum.photos/400/400?random=16",
    text: "Lebkuchen genießen",
  },
  {
    day: 17,
    image: "https://picsum.photos/400/400?random=17",
    text: "Weihnachtslieder",
  },
  {
    day: 18,
    image: "https://picsum.photos/400/400?random=18",
    text: "Advent, Advent",
  },
  {
    day: 19,
    image: "https://picsum.photos/400/400?random=19",
    text: "Noch 5 Tage",
  },
  {
    day: 20,
    image: "https://picsum.photos/400/400?random=20",
    text: "Vorfreude steigt",
  },
  {
    day: 21,
    image: "https://picsum.photos/400/400?random=21",
    text: "Winteranfang",
  },
  {
    day: 22,
    image: "https://picsum.photos/400/400?random=22",
    text: "Fast geschafft",
  },
  {
    day: 23,
    image: "https://picsum.photos/400/400?random=23",
    text: "Heiligabend morgen!",
  },
  {
    day: 24,
    image: "https://picsum.photos/400/400?random=24",
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
  if (month === 11 && day >= 1 && day <= 31) {
    return day;
  }
  // Außerhalb des Adventskalender-Zeitraums: Tag 0 (keine Türchen verfügbar)
  return 0;
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
  const door = document.querySelector(`[data-day="${day}"]`);
  if (door) {
    door.classList.add("opened");
  }

  showModal(day);
  updateInfoText();
}

// Modal anzeigen
function showModal(day) {
  const content = doorContent.find((d) => d.day === day);
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = `
            <h3>${day}. Dezember</h3>
			<br />
            <img src="${content.image}" alt="Türchen ${day}">
            <p style="font-size: 1.2rem; text-align: center;">${content.text}</p>
        `;

  modal.classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
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

    if (isOpened) {
      door.classList.add("opened");
    }
    if (isLocked) {
      door.classList.add("locked");
    }

    const content = doorContent.find((d) => d.day === day);

    door.innerHTML = `
                <div class="door-front" data-day="${day}"></div>
                <div class="door-back">
                    <img src="${content.image}" alt="Türchen ${day}">
                </div>
            `;

    door.addEventListener("click", () => {
      if (!isLocked) {
        openDoor(day);
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
    initCalendar(); // Kalender neu laden ohne Page Reload
  });
}

// Event Listeners
document.getElementById("resetButton").addEventListener("click", resetCalendar);
document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    closeModal();
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
