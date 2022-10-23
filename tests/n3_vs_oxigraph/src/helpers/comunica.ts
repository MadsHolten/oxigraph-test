declare let Comunica; // Imported in index.html

export async function comunicaGetQuery(query: string, source: any): Promise<any>{

    let bindings: any = [];
    const engine = new Comunica.QueryEngine();
    const bindingsStream = await engine.queryBindings(query, { sources: [source], });

    return new Promise((resolve, reject) => {        
        bindingsStream.on('data', (binding) => {
            bindings.push(binding);
        });
        bindingsStream.on('end', () => {
            resolve(bindings);
        });
        bindingsStream.on('error', (error) => {
            reject(error);
        });
    })
}