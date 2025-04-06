const modules = [
    { name: "Algebra III", coef: 3 },
    { name: "Mathematical Analysis III", coef: 5 },
    { name: "Computer Architecture II", coef: 4 },
    { name: "Economics & Business", coef: 2 },
    { name: "File and Data Structure 'SFSD'", coef: 4 },
    { name: "Fondamental Electronics II", coef: 4 },
    { name: "Probability & Statistics I", coef: 4 },
    { name: "English III", coef: 2 }
];

const inputsDiv = document.getElementById("inputs");
modules.forEach(module => {
    const div = document.createElement("div");
    div.classList.add("module");
    div.innerHTML = `
        <div class="module-name">${module.name} (Coef: ${module.coef})</div>
        <div class="module-inputs">
            <input type="number" min="0" max="20" class="mark-input" id="${module.name}-TD" placeholder="TD">
            <input type="number" min="0" max="20" class="mark-input" id="${module.name}-Exam" placeholder="Exam">
        </div>
        <div class="module-average" id="${module.name}-Average">--</div>
    `;
    inputsDiv.appendChild(div);
});
const dedications = [
    {
        text: "To my brain’s RAM: always full, rarely useful.",
        author: "- Mon3ime"
    },
    {
        text: "Don't take it personally !",
        author: "- Yacine Algebra"
    },
    {
        text: "First of all, I wanna say Alhamdulillah. God gave me everything. Alhamdulillah!",
        author: "- Riyadh Nesraouimov"
    },
    {
        text: "To nap or not to nap — productivity can wait.",
        author: "- Taysir"
    },
    {
        text: "I came, I saw... I forgot what I was doing.",
        author: "- Okail"
    },
    {
        text: "I’m not afraid of failure; I just prefer to avoid it by doing nothing. ",
        author: "- Yassine"
    },
    {
        text: "Code, Crash, Cry, Repeat...",
        author: "- Hamouda"
    },
    {
        text: "win tendja7 win , Chaterbache yerfdek hna ",
        author: "- 9ochi7a"
    },
  
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
        alert("i think you made a mistake or you are an idiot, No way the professor gave you 20 !! ");
        input.value = "";
        input.focus();
        return false;
    }
    return true;
}

function calculateModuleAverage(moduleName) {
    const TD = parseFloat(document.getElementById(`${moduleName}-TD`).value) || 0;
    const Exam = parseFloat(document.getElementById(`${moduleName}-Exam`).value) || 0;
    return (Exam * 0.6 + TD * 0.4).toFixed(2);
}

function updateModuleAverage(module) {
    const average = calculateModuleAverage(module.name);
    document.getElementById(`${module.name}-Average`).textContent = average;
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
        input.addEventListener('input', function() {
            if (validateMark(this)) {
                const moduleName = this.id.split('-')[0];
                const module = modules.find(m => m.name === moduleName);
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
        message = "The owner of this website could beat you in the final hhmmmmm 🤔";
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