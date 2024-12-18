let username = "";
let score = 0;
let clickValue = 1;  // Valeur du clic initiale
let upgrades = [
    { name: "+10 par clique (x10)", cost: 100, effect: () => { clickValue = 10; }, level: 2, available: true },
    { name: "+50 par clique (x50)", cost: 500, effect: () => { clickValue = 50; }, level: 3, available: true },
    { name: "+1k par clique (x1000)", cost: 5000, effect: () => { clickValue = 1000; }, level: 4, available: true },
    { name: "+10k par clique (x10000)", cost: 50000, effect: () => { clickValue = 10000; }, level: 4, available: true },
    { name: "+1M par clique (x1M", cost: 100000, effect: () => { clickValue = 1000000;}, level: 5, avaiblable: true}
];
let highScores = [];

function startGame() {
    username = document.getElementById("username").value;
    if (!username) {
        alert("Veuillez entrer un pseudo !");
        return;
    }

    // Cache la page d'accueil et affiche le jeu
    document.getElementById("home").style.display = "none";
    document.getElementById("game").style.display = "flex";

    // Met à jour les améliorations et les meilleurs scores
    updateUpgrades();
    updateHighScores();
}

function clickDonut() {
    score += clickValue;
    displayFloatingPoints();
    updateScore();
}

function displayFloatingPoints() {
    const floatingPoints = document.getElementById("floatingPoints");
    const point = document.createElement("span");
    point.textContent = `+${clickValue}`;

    // Positionner le point de manière aléatoire autour du donut
    const randomX = (Math.random() - 0.5) * 100; // Déplacement horizontal aléatoire
    const randomY = (Math.random() - 0.5) * 50;  // Déplacement vertical aléatoire
    point.style.left = `calc(50% + ${randomX}px)`;  // Horizontalement centré mais avec décalage aléatoire
    point.style.top = `${randomY}%`;  // Déplacement vertical aléatoire

    floatingPoints.appendChild(point);

    // Effacer le point après l'animation
    setTimeout(() => {
        point.remove();
    }, 1000); // Durée de l'animation
}

function updateScore() {
    document.getElementById("score").innerText = formatScore(score);
    checkForUpgrades();
}

function updateUpgrades() {
    let upgradeList = document.getElementById("upgrade-list");
    upgradeList.innerHTML = "";

    upgrades.forEach(upgrade => {
        if (upgrade.available) {
            let li = document.createElement("li");
            li.textContent = `${upgrade.name} - Coût: ${formatScore(upgrade.cost)}`;
            li.onclick = () => buyUpgrade(upgrade);
            upgradeList.appendChild(li);
        }
    });
}

function buyUpgrade(upgrade) {
    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        upgrade.effect();
        updateScore();
        updateUpgrades();
        upgrade.available = false;  // Désactive l'amélioration une fois achetée
        let nextUpgrade = upgrades.find(upg => upg.level === upgrade.level + 1);
        if (nextUpgrade) {
            nextUpgrade.available = true;  // Rendre l'amélioration suivante disponible
        }
    } else {
        alert("Pas assez de points !");
    }
}

function formatScore(score) {
    if (score >= 1000000) {
        return (score / 1000000).toFixed(1) + "M";
    } else if (score >= 1000) {
        return (score / 1000).toFixed(1) + "K";
    } else {
        return score;
    }
}

function updateHighScores() {
    // Simuler les meilleurs scores
    highScores.push({ username, score });
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5); // Top 5

    let highScoresList = document.getElementById("high-scores");
    highScoresList.innerHTML = "";

    highScores.forEach(player => {
        let li = document.createElement("li");
        li.textContent = `${player.username} : ${formatScore(player.score)}`;
        highScoresList.appendChild(li);
    });
}
