import init, * as oxigraph from 'oxigraph/web.js';
import { getFileContent, appendToLog, downloadStringAsFile } from './helpers';

declare let N3; // Imported in index.html

const baseURI = "https://web-bim/resources/";

let store: oxigraph.Store;
let fileName: string = "";

// HANDLE FILE UPLOAD
document.getElementById('fileInput')!.addEventListener('change', async (event: any) => {

    const fileList = event.target.files;
    const file = fileList[0];
    fileName = file.name;
    console.log(file);

    // Get triples
    const t1 = new Date();
    const triples = await getFileContent(file);
    const t2 = new Date();
    appendToLog(`Read file content | ${t2.getTime()-t1.getTime()}ms`);

    // Load triples in Oxigraph
    const t3 = new Date();
    await store.load(triples, "text/turtle", baseURI, undefined);
    const t4 = new Date();
    appendToLog(`Loaded triples in Oxigraph | ${t4.getTime()-t3.getTime()}ms`);

    appendToLog(`Store size: ${store.size}`);

    const qEl = document.getElementById("queries");
    if(qEl) qEl.style.visibility = "visible";

});

document.getElementById('query_1')!.addEventListener('click', async (event: any) => {
    const query = `PREFIX bot: <https://w3id.org/bot#> 
PREFIX ex: <https://ex.com/> 

INSERT{
    <<?s a bot:Space>> ex:created ?now
}
WHERE { 
    ?s a bot:Space
    BIND(NOW() AS ?now)
}`;
    await executeInsertQuery(query, "Q1");
});

document.getElementById('query_2')!.addEventListener('click', async (event: any) => {
    const query = `PREFIX bot: <https://w3id.org/bot#> 
PREFIX ex: <https://ex.com/> 

SELECT ?s ?created
WHERE { 
    <<?s a bot:Space>> ex:created ?created
}`;
    await executeQuery(query, ["s", "created"], "Q2");
});

document.getElementById('download')!.addEventListener('click', async (event: any) => {

    const t1 = new Date();
    const triples = store.dump("text/turtle", undefined);
    const t2 = new Date();
    appendToLog(`Serialized results | ${t2.getTime()-t1.getTime()}ms`);

    downloadStringAsFile(fileName, triples);
});

async function executeQuery(query: string, variables: string[], id: string){

    const t1 = new Date();
    const bindings = store.query(query);
    const t2 = new Date();
    appendToLog(`Ran ${id} on Oxigraph | ${bindings.length} results | ${t2.getTime()-t1.getTime()}ms`);

    const strBindings = bindings.map(b => {
        let str = "";
        variables.forEach(v => str+=`${b.get(v).value} | `);
        str = str.substring(0, str.length - 3);
        return str;
    })

    const el = document.getElementById("query-result-time");
    if(el) el.innerHTML = `Results: ${bindings.length} | ${t2.getTime()-t1.getTime()}ms`;

    setQueryAndResult(query, strBindings);

}

async function executeInsertQuery(query: string, id: string){

    const t1 = new Date();
    store.update(query);
    const t2 = new Date();
    appendToLog(`Ran ${id} | ${t2.getTime()-t1.getTime()}ms`);

    const el = document.getElementById("query-result-time");
    if(el) el.innerHTML = `Update took ${t2.getTime()-t1.getTime()}ms`;

    const queryElement = document.getElementById("query");
    if(queryElement){
        queryElement.style.visibility = "visible";
        queryElement.innerHTML = "<pre>" + escapeHtml(query) + "</pre>";
    }

}

async function initStore(){
    await init(); // Required to compile the WebAssembly.
    store = new oxigraph.Store();
}

function setQueryAndResult(query: string, bindings: string[]){
    const queryElement = document.getElementById("query");
    const qResElement = document.getElementById("query-results");
    if(queryElement){
        queryElement.style.visibility = "visible";
        queryElement.innerHTML = "<pre>" + escapeHtml(query) + "</pre>";
    }
    if(qResElement){
        qResElement.style.visibility = "visible";
        qResElement.innerHTML = "";
        bindings.forEach(binding => {
            const entry = document.createElement('pre');
            entry.innerHTML = escapeHtml(binding);
            qResElement.appendChild(entry);
        })
    }
}

function escapeHtml(unsafe: string)
{
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

initStore();