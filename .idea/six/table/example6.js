let igraci = [
    {ime: "Stefan", bodovi: 50},
    {ime: "Gorica", bodovi: 80},
    {ime: "Milica", bodovi: 30},
    {ime: "Elmir", bodovi: 43},
    {ime: "Amar", bodovi: 65},
    {ime: "Lejla", bodovi: 90},
    {ime: "Adnan", bodovi: 55},
    {ime: "Sara", bodovi: 72},
    {ime: "Haris", bodovi: 40},
    {ime: "Amina", bodovi: 88},
    {ime: "Tarik", bodovi: 25},
    {ime: "Emina", bodovi: 60},
    {ime: "Benjamin", bodovi: 77},
    {ime: "Jasmin", bodovi: 35},
    {ime: "Selma", bodovi: 95}
];

let filterIme = "";
let filterBodovi = "";
let sortKolona = null;
let sortSmjer = "asc";
let pageSize = 5;
let currentPage = 1;

function prikaziIgrace() {
    const tableHtmlElement = document.getElementById("tabla");

    let rezultat = [...igraci];

    if(filterIme !== ""){
        rezultat = rezultat.filter(igrac => igrac.ime.toLowerCase().includes(filterIme.toLowerCase()));
    }
    if(filterBodovi !== ""){
        rezultat = rezultat.filter(igrac => igrac.bodovi>=Number(filterBodovi));
    }
    if(sortKolona === "ime"){
        rezultat.sort((a, b) => sortSmjer==="asc" ?
            a.ime.localeCompare(b.ime) : b.ime.localeCompare(a.ime));
    }
    if(sortKolona === "bodovi"){
        rezultat.sort((a, b) => sortSmjer==="asc" ?
            a.bodovi-b.bodovi : b.bodovi-a.bodovi);
    }

    // pageSize = 5
    // totalElements = 13
    // totalPages =
    const totalPages = Math.max(1, Math.ceil(rezultat.length/pageSize)); //2.3 -> 3

    const start = (currentPage-1)*pageSize; //(2-1)*5 = 5
    const end = start+pageSize;// 5 + 5 = 10
    const igraciZaPrikaz = rezultat.slice(start, end);

    if(currentPage>totalPages){
        currentPage = totalPages;
    }

    tableHtmlElement.innerHTML = `
        <thead>
          <tr>
            <th>
              <div class="header-contents">
                <span>Igrač</span>
                <span class="sort-controls">
                    <span class="sort-arrow" onclick="sortiraj('ime', 'asc')">▲</span>
                    <span class="sort-arrow" onclick="sortiraj('ime', 'desc')">▼</span>
                </span>
               </div>
              <input type="text" placeholder="Filtriraj po imenu..." value="${filterIme}" oninput="postaviFilterIme(this.value)">
            </th>
            <th>
              <div class="header-contents">
                <span>Bodovi</span>
                <span class="sort-controls">
                    <span class="sort-arrow" onclick="sortiraj('bodovi', 'asc')">▲</span>
                    <span class="sort-arrow" onclick="sortiraj('bodovi', 'desc')">▼</span>
                </span>
               </div>
               <input type="text" placeholder="Filtriraj po poenima..." value="${filterBodovi}" oninput="postaviFilterBodovi(this.value)">
            </th>
          </tr>
        </thead>    
        <tbody id="tijelo"></tbody>    
    `;
    const tBody = document.getElementById("tijelo");
    let rows = "";
    igraciZaPrikaz.forEach(igrac => {
            rows = rows + `
                  <tr>
                    <td>${igrac.ime}</td>
                    <td>${igrac.bodovi}</td>
                  </tr>
                `;
        }
    );
    if(igraciZaPrikaz.length === 0){
        rows = `<tr><td colspan="2">Nema rezultata</td></tr>`
    }
    tBody.innerHTML = rows;

    const pageInfoSpanElement = document.getElementById("page-info");
    pageInfoSpanElement.textContent = `Stranica ${currentPage}/${totalPages}`;
}

function sortirajPoBodovimaAsc() {
    igraci.sort((igrac1, igrac2) => igrac2.bodovi - igrac1.bodovi);
    prikaziIgrace();
}

function sortirajPoBodovimaDesc() {
    igraci.sort((igrac1, igrac2) => igrac1.bodovi - igrac2.bodovi);
    prikaziIgrace();
}

// function sortirajPoImenuAsc() {
//     igraci.sort((igrac1, igrac2) => igrac2.ime.localeCompare(igrac1.ime));
//     prikaziIgrace();
// }
//
// function sortirajPoImenuDesc() {
//     igraci.sort((igrac1, igrac2) => igrac1.ime.localeCompare(igrac2.ime));
//     prikaziIgrace();
// }

function sortiraj(kolona, smjer){
    sortKolona = kolona;
    sortSmjer = smjer;
    currentPage = 1;
    prikaziIgrace();
}

function postaviFilterIme(vrijednost){
    filterIme = vrijednost;
    currentPage = 1;
    prikaziIgrace();
}

function postaviFilterBodovi(vrijednost){
    filterBodovi = vrijednost;
    currentPage = 1;
    prikaziIgrace();
}

function idiNaPrethodnuStranicu(){
    if(currentPage>1){
        currentPage--;
        prikaziIgrace();
    }
}

function idiNaSljedecuStranicu(){
    let rezultat = [...igraci];
    const totalPages = Math.max(1, Math.ceil(rezultat.length / pageSize));
    if(currentPage <totalPages){
        currentPage++;
        prikaziIgrace();
    }

}

prikaziIgrace();