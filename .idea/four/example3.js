
function prikaziPodatke(event) {
    event.preventDefault();//stopira refresh
    console.log("Pozvala se funkcija...zta rsd")
    let ime = document.getElementById("ime").value;
    let email = document.getElementById("email").value;
    let igra = document.getElementById("igra").value;
    let pravila = document.getElementById("pravila").checked ? "Da":"Ne";
    let poruka = document.getElementById("poruka").value;

    let iskustvo = document.querySelector('input[name="iskustvo"]:checked').value;

    let rezultatDiv = document.getElementById("rezultat");
    rezultatDiv.style.display="block";
    rezultatDiv.innerHTML=`
            <h2>Prijava zaprimljena</h2>
            <p><strong>Ime:</strong>${ime}</p>
            <p><strong>Email:</strong>${email}</p>
            <p><strong>Igra:</strong>${igra}</p>
            <p><strong>Iskustvo:</strong>${iskustvo}</p>
            <p><strong>Prihvatio pravila:</strong>${pravila}</p>
            <p><strong>Poruka:</strong>${poruka}</p>
        `;
}