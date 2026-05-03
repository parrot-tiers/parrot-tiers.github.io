let data = {};

const tierOrder = [
  "S+","S","A+","A","B+","B",
  "C+","C","D+","D","F+","F"
];

async function load() {
  const res = await fetch("tiers.json");
  data = await res.json();
  renderLeaderboard();
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboard");
  container.innerHTML = "";

  let rank = 1;

  tierOrder.forEach(tier => {
    if (!data[tier]) return;

    data[tier].forEach(player => {
      const row = document.createElement("div");
      row.className = "player-row";

      row.innerHTML = `
        <div class="rank">#${rank}</div>
        <img src="https://mc-heads.net/avatar/${player.name}">
        <div>${player.name}</div>
      `;

      row.onclick = () => showPlayer(player, tier);

      container.appendChild(row);
      rank++;
    });
  });
}

function showPlayer(player, tier) {
  const popup = document.getElementById("popup");
  const content = document.getElementById("popupContent");

  content.innerHTML = `
    <h2>${player.name}</h2>
    <p><strong>Overall Tier:</strong> ${tier}</p>
    <p>⚔️ Sword: ${player.modes?.sword || "N/A"}</p>
    <p>🔨 Mace: ${player.modes?.mace || "N/A"}</p>
  `;

  popup.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

load();
