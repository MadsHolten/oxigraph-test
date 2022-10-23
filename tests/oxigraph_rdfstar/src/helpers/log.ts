export function appendToLog(text: string){
    console.log(text);
    const log = document.getElementById("log");
    if(!log) return;
    const entry = document.createElement('li');
    entry.appendChild(document.createTextNode(text));
    log.appendChild(entry);
}