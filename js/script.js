"use strict"

// AGGIUNGO IL LISTENER
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#btnDistribute").addEventListener("click", DaiCarte);
});

// INIZIALIZZO LA VARIABILE DEL GIOCATORE ATTIVO
var actualplayer = 1;

// RICHIAMO QUESTA FUNZIONE QUANDO DISTRIBUISCO LE CARTE
function DaiCarte() {

    // CREO UN PRIMO ARRAY CON I NOMI DELLE CARTE NEL MAZZO COMPLETO
    var cardnames = [
        "A Picche", "2 Picche", "3 Picche", "4 Picche", "5 Picche", "6 Picche", "7 Picche", "8 Picche", "9 Picche", "10 Picche", "J Picche", "Q Picche", "K Picche",
        "A Cuori", "2 Cuori", "3 Cuori", "4 Cuori", "5 Cuori", "6 Cuori", "7 Cuori", "8 Cuori", "9 Cuori", "10 Cuori", "J Cuori", "Q Cuori", "K Cuori",
        "A Quadri", "2 Quadri", "3 Quadri", "4 Quadri", "5 Quadri", "6 Quadri", "7 Quadri", "8 Quadri", "9 Quadri", "10 Quadri", "J Quadri", "Q Quadri", "K Quadri",
        "A Fiori", "2 Fiori", "3 Fiori", "4 Fiori", "5 Fiori", "6 Fiori", "7 Fiori", "8 Fiori", "9 Fiori", "10 Fiori", "J Fiori", "Q Fiori", "K Fiori",
    ];

    // CREO UN SECONDO ARRAY CON I CODICI UNICODE DELLE CARTE NEL MAZZO COMPLETO
    var mazzo = [
        "\u{1F0A1}", "\u{1F0A2}", "\u{1F0A3}", "\u{1F0A4}", "\u{1F0A5}", "\u{1F0A6}", "\u{1F0A7}", "\u{1F0A8}", "\u{1F0A9}", "\u{1F0AA}", "\u{1F0AB}", "\u{1F0AD}", "\u{1F0AE}",
        "\u{1F0B1}", "\u{1F0B2}", "\u{1F0B3}", "\u{1F0B4}", "\u{1F0B5}", "\u{1F0B6}", "\u{1F0B7}", "\u{1F0B8}", "\u{1F0B9}", "\u{1F0BA}", "\u{1F0BB}", "\u{1F0BD}", "\u{1F0BE}",
        "\u{1F0C1}", "\u{1F0C2}", "\u{1F0C3}", "\u{1F0C4}", "\u{1F0C5}", "\u{1F0C6}", "\u{1F0C7}", "\u{1F0C8}", "\u{1F0C9}", "\u{1F0CA}", "\u{1F0CB}", "\u{1F0CD}", "\u{1F0CE}",
        "\u{1F0D1}", "\u{1F0D2}", "\u{1F0D3}", "\u{1F0D4}", "\u{1F0D5}", "\u{1F0D6}", "\u{1F0D7}", "\u{1F0D8}", "\u{1F0D9}", "\u{1F0DA}", "\u{1F0DB}", "\u{1F0DD}", "\u{1F0DE}",
    ];

    // PER OGNI CARTA DEL MAZZO UNICODE
    mazzo.forEach(function (item, index) {

        // CREO UNO SPAN CONTENENTE IL NOME DELLA CARTA COME TITOLO
        var newcard = '<span class="card" title="' + cardnames[index] + '"';

        // SE IL SEME È ROSSO LO COLORO
        if ((index > 12) && (index < 39)) {
            newcard += ' style="color:red"';
        }

        // MOSTRO L'ELEMENTO UNICODE COME CONTENUTO DELLO SPAN
        newcard += '>' + item + '</span>';

        // SOSTITUISCO NEL MAZZO LA CARTA UNICODE CON LO SPAN CONTENENTE L'UNICODE
        mazzo[index] = newcard;
    });

    // CALCOLO LA DIMENSIONE INIZIALE
    var dimensioneMazzo = mazzo.length;

    // PER CIASCUNO DEI QUATTRO GIOCATORI
    for (var p = 1; p < 5; p++) {

        // INIZIALIZZO L'ARRAY DEL GIOCATORE
        var playercards = [];

        // RIPETO FINO AD ARRIVARE A 13 CARTE
        for (var i = 0; i < 13; i++) {

            // PRELEVO CASUALMENTE LA POSIZIONE DI UNA CARTA
            var cardposition = Math.floor(Math.random() * dimensioneMazzo);

            // RECUPERO I DATI DELLA CARTA
            var activecard = mazzo[cardposition];

            // RIMUOVO LA CARTA DAL MAZZO DEL TAVOLO
            mazzo.splice(cardposition, 1);

            // AGGIUNGO LA CARTA AL MAZZO DEL GIOCATORE
            playercards.push(activecard);

            // RICALCOLO LA DIMENSIONE DEL MAZZO DEL TAVOLO
            dimensioneMazzo--;
        }

        // MOSTRO LE CARTE SUL PIATTO DEL GIOCATORE
        document.querySelector("#txtPlayer" + p).innerHTML = playercards.join("");
    }

    // RECUPERO TUTTE LE CARTE PRESENTI
    var cards = document.querySelectorAll(".card");

    // PER CIASCUNA CARTA AGGIUNGO UN EVENTO AL CLICK CHE RICHIAMA LA FUNZIONE cardClicked
    cards.forEach(function (item, index) {
        cards[index].addEventListener("click", cardClicked);
    });
}

// QUESTA FUNZIONE VIENE RICHIAMATA OGNI VOLTA CHE VIENE CLICCATA UNA CARTA DA UN PIATTO
function cardClicked(event) {

    // LEGGO IL PIATTO, E QUINDI IL GIOCATORE, DAL QUALE È STATA CLICCATA LA CARTA USANDO L'ATTRIBUTO HTML5 DATA-* IMPOSTATO SUL PIATTO
    var actualdish = event.target.parentNode.dataset.dish;

    // SE IL GIOCATORE ATTIVO CORRISPONDE AL PIATTO UTILIZZATO
    if (actualplayer == actualdish) {

        // SPOSTO LA CARTA CLICCATA NEL PIATTO DEL TAVOLO
        document.querySelector("#tablecards").appendChild(event.target);

        // RIMUOVO IL LISTENER SULLA CARTA IN MODO CHE NON SIA PIÙ SPOSTABILE
        event.target.removeEventListener("click", cardClicked);

        // E PASSO AL GIOCATORE SUCCESSIVO
        actualplayer++;
    }

    // ALTRIMENTI SEGNALO AL GIOCATORE CHE NON È IL SUO TURNO
    else {
        alert('Non è questo il tuo turno!');
    }

    // SE HO SUPERATO I QUATTRO GIOCATORI RICOMINCIO IL GIRO
    if (actualplayer > 4) {
        actualplayer = 1;
    }
}