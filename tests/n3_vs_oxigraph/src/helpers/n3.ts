declare let N3; // Imported in index.html

export async function n3LoadTTL(triples: string, store: typeof N3.Store, batchSize: number = 1000): Promise<any>{
    let currentBatch: any[] = [];
    let promises: any = [];
    let counter = 0;
    return new Promise((resolve, reject) => {
        const parser = new N3.Parser();
        parser.parse(triples,
        async (error, quad, prefixes) => {
            if(error){
                reject(error);
            }
            if (quad){
                if(counter % batchSize == 0){

                    // Add the previous batch to store
                    if(currentBatch.length){
                        promises.push(store.addQuads(currentBatch));
                    }

                    // Start a new batch
                    currentBatch = [quad];

                }else{
                    // Push to current batch
                    currentBatch.push(quad);
                }
                counter++;

            }
            else{
                // Add the last batch to store
                if(currentBatch.length){
                    promises.push(store.addQuads(currentBatch));
                }

                // Wait for all loads to finish
                await Promise.all(promises);

                // Resolve prefixes
                resolve(prefixes)
            }
        });
    })
}