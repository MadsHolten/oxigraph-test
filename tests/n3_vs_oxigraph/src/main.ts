import init, * as oxigraph from 'oxigraph/web.js';
import { comunicaGetQuery } from './helpers/comunica.js';
import { getFileContent } from './helpers/file-read.js';
import { n3LoadTTL } from './helpers/n3';

declare let N3; // Imported in index.html

const baseURI = "https://web-bim/resources/";

let oxiStore: oxigraph.Store;
let n3Store;

// HANDLE FILE UPLOAD
document.getElementById('fileInput')!.addEventListener('change', async (event: any) => {

    const fileList = event.target.files;
    const file = fileList[0];

    // Get triples
    const t1 = new Date();
    const triples = await getFileContent(file);
    const t2 = new Date();
    appendToLog(`Read file content | ${t2.getTime()-t1.getTime()}ms`);

    // Load triples in Oxigraph
    const t3 = new Date();
    await oxiStore.load(triples, "text/turtle", baseURI, undefined);
    const t4 = new Date();
    appendToLog(`Loaded triples in Oxigraph | ${t4.getTime()-t3.getTime()}ms`);

    // Load triples in N3
    const t5 = new Date();
    const prefixes = await n3LoadTTL(triples, n3Store);
    const t6 = new Date();
    appendToLog(`Loaded triples in N3 | ${t6.getTime()-t5.getTime()}ms`);

    appendToLog(`Store size Oxigraph: ${oxiStore.size}`);
    appendToLog(`Store size N3: ${n3Store.size}`);

    const qEl = document.getElementById("queries");
    if(qEl) qEl.style.visibility = "visible";

});

document.getElementById('query_1')!.addEventListener('click', async (event: any) => {
    const query = "SELECT * WHERE { ?s ?p ?o } LIMIT 100";
    await executeQuery(query, ["s", "p", "o"], "Q1");
});

document.getElementById('query_2')!.addEventListener('click', async (event: any) => {
    const query = `PREFIX ifc: <http://ifcowl.openbimstandards.org/IFC2X3_Final#> 
PREFIX bot: <https://w3id.org/bot#> 
PREFIX inst: <https://example.com/>

SELECT ?space (group_concat(?adjElURI; separator=", ") AS ?adjacent)
WHERE {
    ?space a bot:Space ; 
        bot:adjacentElement ?adjEl
    BIND(str(?adjEl) AS ?adjElURI)
} GROUP BY ?space`;
    await executeQuery(query, ["space", "adjacent"], "Q2");
});

document.getElementById('query_3')!.addEventListener('click', async (event: any) => {
    const query = `PREFIX ifc: <http://ifcowl.openbimstandards.org/IFC2X3_Final#>

SELECT ?class (COUNT(?s) AS ?instances)
WHERE { 
    ?s a ?class
} 
GROUP BY ?class 
ORDER BY DESC(?instances)`;
    await executeQuery(query, ["class", "instances"], "Q3");
});

document.getElementById('query_4')!.addEventListener('click', async (event: any) => {
    const query = `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
PREFIX ex: <https://example.com/> 
PREFIX ifc: <http://ifcowl.openbimstandards.org/IFC2X3_Final#>

SELECT ?pset ?psetName (GROUP_CONCAT(?propName) AS ?properties)
WHERE { 
    ?pset a ifc:IfcPropertySet ;
            rdfs:label ?psetName ;
            ex:hasProperty ?property .
    ?property rdfs:label ?propName
} GROUP BY ?pset ?psetName`;
    await executeQuery(query, ["pset", "psetName", "properties"], "Q4");
});

document.getElementById('query_5')!.addEventListener('click', async (event: any) => {
    const query = `PREFIX ifc: <http://ifcowl.openbimstandards.org/IFC2X3_Final#>

SELECT DISTINCT ?class
WHERE { 
    ?s a ?class
}`;
    await executeQuery(query, ["class"], "Q5");
});

async function executeQuery(query: string, variables: string[], id: string){

    const t1 = new Date();
    const oxiBindings = oxiStore.query(query);
    // const oxiBindings = await comunicaGetQuery(query, oxiStore); // NB! Not working
    const t2 = new Date();
    appendToLog(`Ran ${id} on Oxigraph | ${oxiBindings.length} results | ${t2.getTime()-t1.getTime()}ms`);

    const t3 = new Date();
    const n3Bindings = await comunicaGetQuery(query, n3Store);
    const t4 = new Date();
    appendToLog(`Ran ${id} on N3 | ${n3Bindings.length} results | ${t4.getTime()-t3.getTime()}ms`);

    const strBindings = oxiBindings.map(b => {
        let str = "";
        variables.forEach(v => str+=`${b.get(v).value} | `);
        str = str.substring(0, str.length - 3);
        return str;
    })

    const el = document.getElementById("query-result-time");
    if(el) el.innerHTML = `Results: ${oxiBindings.length} | Oxigraph: ${t2.getTime()-t1.getTime()}ms | N3: ${t4.getTime()-t2.getTime()}ms`;

    setQueryAndResult(query, strBindings);

}

async function initStore(){
    await init(); // Required to compile the WebAssembly.
    oxiStore = new oxigraph.Store();
    n3Store = new N3.Store();
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

function appendToLog(text: string){
    console.log(text);
    const log = document.getElementById("log");
    if(!log) return;
    const entry = document.createElement('li');
    entry.appendChild(document.createTextNode(text));
    log.appendChild(entry);
}


initStore();