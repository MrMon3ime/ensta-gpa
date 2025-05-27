const modules = [
    { name: "Algebra 2", coef: 3 },
    { name: "Mathematical Analysis 2", coef: 5 },
    { name: "Algorithmics and Dynamic Data Structures", coef: 5 },
    { name: "Fondamental Electronics 1", coef: 4 },
    { name: "Introduction to OS 2", coef: 3 },
    { name: "Oral Expression Techniques", coef: 2 },
    { name: "English 1", coef: 2 },
    { name: "Mechanics of The Material Point", coef: 3 }
];

const inputsDiv = document.getElementById("inputs");
modules.forEach(module => {
    const safeId = module.name.replace(/\s+/g, '-');
    const div = document.createElement("div");
    div.classList.add("module");
    div.innerHTML = `
        <div class="module-name">${module.name} (Coef: ${module.coef})</div>
        <div class="module-inputs">
            <input type="number" min="0" max="20" step="0.01" class="mark-input" id="${safeId}-TD" placeholder="TD">
            <input type="number" min="0" max="20" step="0.01" class="mark-input" id="${safeId}-Exam" placeholder="Exam">
        </div>
        <div class="module-average" id="${safeId}-Average">--</div>
    `;
    inputsDiv.appendChild(div);
});
const dedications = [
    {
    text: "I didn’t fail, I just found 100 ways that didn’t work.",
    author: "- Mon3ime"
    },
    {
        text: "Give me all of you your money and live in peace",
        author: "- Charaf"
    },
    {
    text: "‘I'll study later’ — Me, every hour until failure.",
    author: "- Time Management Icon"
    },
    {
        text: "My design clean interfaces but my grades look like a glitch.",
        author: "- Hocine"
    },
    {
        text: "My calculator just said: 'You on your own, buddy.'",
        author: "- Math Dropout"
    },
    {
    text: "I treat exams like Google forms... I guess.",
    author: "- Click Submit and Pray"
    },
    {
    text: "I once had a life, then I chose Computer Science.",
    author: "- Rest in Peace"
    },
    {
        text: "win tendja7 win , Chaterbache yerfdek hna ",
        author: "- 9ochi7a"
    }
];

let currentIndex = 0;
const dedication1 = document.getElementById('dedication-1');
const dedication2 = document.getElementById('dedication-2');

function rotateDedications() {
    dedication1.classList.remove('active');
    dedication2.classList.remove('active');
    
    setTimeout(() => {
        dedication1.innerHTML = `
            <p class="dedication-text">${dedications[currentIndex % dedications.length].text}</p>
            <p class="dedication-author">${dedications[currentIndex % dedications.length].author}</p>
        `;
        
        dedication2.innerHTML = `
            <p class="dedication-text">${dedications[(currentIndex + 1) % dedications.length].text}</p>
            <p class="dedication-author">${dedications[(currentIndex + 1) % dedications.length].author}</p>
        `;
        
        setTimeout(() => {
            dedication1.classList.add('active');
            dedication2.classList.add('active');
        }, 50);
        
        currentIndex = (currentIndex + 2) % dedications.length;
    }, 800); 
}

dedication1.innerHTML = `
    <p class="dedication-text">${dedications[0].text}</p>
    <p class="dedication-author">${dedications[0].author}</p>
`;
dedication2.innerHTML = `
    <p class="dedication-text">${dedications[1].text}</p>
    <p class="dedication-author">${dedications[1].author}</p>
`;
setTimeout(() => {
    dedication1.classList.add('active');
    dedication2.classList.add('active');
}, 100);

setInterval(rotateDedications, 10000);

function validateMark(input) {
    const value = parseFloat(input.value);
    if (value > 20) {
        alert("I think you made a mistake or you are an idiot, No +20 and No letter or Special Characters !!");
        input.value = "";
        input.focus();
        return false;
    }
    return true;
}

function calculateModuleAverage(moduleName) {
    const safeId = moduleName.replace(/\s+/g, '-');
    const TD = parseFloat(document.getElementById(`${safeId}-TD`)?.value) || 0;
    const Exam = parseFloat(document.getElementById(`${safeId}-Exam`)?.value) || 0;
    return (Exam * 0.6 + TD * 0.4).toFixed(2);
}

function updateModuleAverage(module) {
    const safeId = module.name.replace(/\s+/g, '-');
    const average = calculateModuleAverage(module.name);
    const averageElement = document.getElementById(`${safeId}-Average`);
    if (averageElement) {
        averageElement.textContent = average;
    }
    return parseFloat(average);
}
function calculateOverallAverage() {
    let totalScore = 0;
    let totalCoef = 0;
    const moduleResults = [];

    const allInputs = document.querySelectorAll('.mark-input');
    for (const input of allInputs) {
        if (!validateMark(input)) return null;
    }

    modules.forEach(module => {
        const average = updateModuleAverage(module);
        totalScore += average * module.coef;
        totalCoef += module.coef;
        moduleResults.push({
            name: module.name,
            average: average.toFixed(2),
            coef: module.coef
        });
    });

    return totalCoef > 0 ? { 
        average: totalScore / totalCoef,
        moduleResults 
    } : null;
}

function setupAutoCalculate() {
    const allInputs = document.querySelectorAll('.mark-input');
    allInputs.forEach(input => {
        input.addEventListener('input', function () {
            if (validateMark(this)) {
                const inputId = this.id.replace(/-(TD|Exam)$/, '');
                const module = modules.find(m => m.name.replace(/\s+/g, '-') === inputId);
                if (module) updateModuleAverage(module);
            }
        });
    });
}
setupAutoCalculate();

const remarkPopup = document.getElementById("remarkPopup");
const popupMessage = document.getElementById("popupMessage");
const moduleAverages = document.getElementById("moduleAverages");
const closePopupBtn = document.getElementById("closePopupBtn");

document.getElementById("showRemarkBtn").addEventListener("click", function() {
    const result = calculateOverallAverage();
    
    if (result === null) return;
    
    if (!result) {
        alert("Please enter some marks first!");
        return;
    }

    const { average, moduleResults } = result;

    let message = '';
    if (average < 10) {
        message = "You are shitted bro, i'm joking make more efforts !";
    } else if (average >= 10 && average <= 12) {
        message = "They said 'just do your best' and you really took that personally huh";
    } else if (average > 12) {
        message = "Hackeeeeerr ma hommie 🤝";
    }

    popupMessage.innerHTML = `
        <p>Your Semester Average: <strong>${average.toFixed(2)}</strong></p>
        <p>${message}</p>
    `;

    moduleAverages.innerHTML = moduleResults.map(module => `
        <div class="module-average-item">
            <span>${module.name}</span>
            <span>${module.average}</span>
        </div>
    `).join('');

    remarkPopup.classList.add("active");
});

closePopupBtn.addEventListener("click", function() {
    remarkPopup.classList.remove("active");
});

remarkPopup.addEventListener("click", function(e) {
    if (e.target === remarkPopup) {
        remarkPopup.classList.remove("active");
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && remarkPopup.classList.contains("active")) {
        remarkPopup.classList.remove("active");
    }
});