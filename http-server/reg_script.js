//Registration
const userform = document.getElementById("user-form")

const retrieveEntries = () => {
    let entries = localStorage.getItem("userEntries")
    if (entries) {
        entries = JSON.parse(entries)
    } else {
        entries = []
    }

    return entries
}

const displayEntries = () => {
    const entries = retrieveEntries()
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class="py-3 px - 4 border - b border - gray - 300 text-center">` + entry.name + "</td>"
        const emailCell = `<td class="py-3 px - 4 border - b border - gray - 300 text-center">` + entry.email + "</td>"
        const passwordCell = `<td class="py-3 px - 4 border - b border - gray - 300 text-center">` + entry.password + "</td>"
        const dateCell = `<td class="py-3 px - 4 border - b border - gray - 300 text-center">` + entry.date + "</td>"
        const acceptTermsCell = `<td class="py-3 px - 4 border - b border -  text-center">` + entry.acceptTerms + "</td>"

        const row = `<tr class="hover: bg-gray - 100">${nameCell}${emailCell}${passwordCell}${dateCell}${acceptTermsCell}</tr>`
        return row
    }).join("\n")

    const table = `<table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md"><tr class="bg-gray-200 text-gray-700">
    <th class="py-3 px-4 text-center text-sm font-semibold border-black bg-indigo-700 text-white">Name</th>
    <th class="py-3 px-4 text-center text-sm font-semibold border-black bg-indigo-700 text-white">Email</th>
    <th class="py-3 px-4 text-center text-sm font-semibold border-black bg-indigo-700 text-white">Password</th>
    <th class="py-3 px-4 text-center text-sm font-semibold border-black bg-indigo-700 text-white">Dob</th>
    <th class="py-3 px-4 text-center text-sm font-semibold border-black bg-indigo-700 text-white">Accepted Terms?</th>
    </tr> ${tableEntries}</table>`

    let tableDetails = document.getElementById("table-userentries")
    tableDetails.innerHTML = table
}


let entries = retrieveEntries()
const saveUserForm = (event) => {
    event.preventDefault()
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const date = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    const entry = { //new method es6
        name,
        email,
        password,
        date,
        acceptTerms
    }

    entries.push(entry)
    localStorage.setItem("userEntries", JSON.stringify(entries))
    displayEntries()


}
userform.addEventListener("submit", saveUserForm)
displayEntries()

const validate = (dob) => {
    const age = dateSub(dob.value)
    if (age > 55) {
        dob.setCustomValidity("You are too old!")
        dob.reportValidity()
    } else if (age < 18) {
        dob.setCustomValidity("You are too young!")
        dob.reportValidity()
    } else {
        dob.setCustomValidity("")
    }
    console.log(age)
}

const dateSub = (date) => {
    const dob = new Date(date)
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear();

    // Adjust for the month and day to ensure accurate age calculation
    if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
        age--;
    }

    return age;
}


const clearEntries = () => {
    localStorage.removeItem("userEntries");
    entries = []
    displayEntries();
};


const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", clearEntries);

const dob = document.getElementById("dob")
dob.addEventListener("input", () => validate(dob))