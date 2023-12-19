
Creazione gioco multiplayer con più oggetti condivisi - Color Wars

- Abstract

Il progetto rappresenta un'applicazione web multiplayer chiamata "Color Wars". Implementata utilizzando WebSocket sia lato server che lato client. L'obiettivo del gioco è consentire la connessione di giocatori in una partita in tempo reale. La gestione delle connessioni WebSocket include l'assegnazione di ID univoci ai giocatori e la comunicazione di tali ID al momento della connessione. Il sistema tiene traccia del numero massimo di giocatori consentiti e gestisce gli eventi di connessione e disconnessione, mantenendo aggiornato lo stato della partita.

La logica di gioco coinvolge un timer che viene avviato in risposta a un messaggio specifico, e il conteggio dei punteggi dei giocatori in base alle loro azioni durante il periodo del timer. Allo scadere del timer, viene determinato un vincitore in base ai punteggi ottenuti. Gli eventi di gioco vengono comunicati a tutti i giocatori tramite WebSocket, aggiornando l'interfaccia utente per riflettere lo stato corrente del gioco. L'interazione del giocatore è gestita attraverso messaggi inviati tramite WebSocket, inclusi quelli relativi all'inizio del timer e alle azioni durante il gioco. L'aspetto visivo del gioco include l'assegnazione di colori ai giocatori e l'aggiornamento dinamico dell'interfaccia in base agli eventi di gioco.

- Criticità e Possibili Ottimizzazioni

Criticità
La criticità fondamentale è la mancanza di una funzione che controlli che ci siano almeno 2 client connessi prima di avviare la partita. Dato che ciò non viene fatto è possibile avviare la partita solo con un client e di conseguenza potrà giocare solo una persona, rendendo il gioco nullo.

Possibili Ottimizzazioni
Implementazione di una funzione che controlli se sono presenti almeno due client sulla pagina prima di avviare la partita;
Implementazione di un refresh del server, quando finisce la partita sarà possibile avviare un server senza doverlo fare manualmente da terminale;
Sostituire il server http con il framework Express di NodeJS;
Rendere la pagina completamente responsive.

- Riferimenti Teorici

Linguaggi e strumenti utilizzati
Javascript
Html
Node.js
WebSocket - libreria ws
libreria http, path

