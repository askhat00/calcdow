const nameInput = document.getElementById("name");
const startingBidInput = document.getElementById("startingBid");
const education = document.getElementById("education");
const netWorth = document.getElementById("netWorth");
const caste = document.getElementById("caste");
const skills = document.querySelectorAll(".skills");
const ageRadios = document.querySelectorAll("input[name='age']");
const reputation = document.querySelectorAll(".reputation");
const loveLetterInput = document.getElementById("loveLetter");
const resultDiv = document.getElementById("result");

document.getElementById("calculateButton").addEventListener("click", () => {
    let name = nameInput.value;
    let price = Number(startingBidInput.value);

    if (!name || !price) {
        alert("Please enter both name and starting bid.");
        return;
    }

    price *= Number(education.value);
    price *= Number(netWorth.value);

    price += Number(caste.value);

    const skillsSum = Array.from(skills)
        .filter(skill => skill.checked)
        .reduce((sum, skill) => sum + Number(skill.value), 0);
    price += skillsSum;

    ageRadios.forEach(radio => {
        if (radio.checked) {
            price *= Number(radio.value);
        }
    });

    reputation.forEach(rep => {
        if (rep.checked) {
            let factor = Number(rep.value);
            price = factor > 0 ? price * factor : price + factor;
        }
    });

    let loveLetter = loveLetterInput.value;

    const person = {
        brideOrGroomName: name,
        finalPrice: price.toFixed(2),
        loveLetter: loveLetter
    };

    resultDiv.innerHTML = `<p>Your price for ${person.brideOrGroomName} is $${person.finalPrice}.<br>Love Letter: ${person.loveLetter}</p>`;
});
