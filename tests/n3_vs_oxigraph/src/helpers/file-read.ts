export async function getFileContent(file: File): Promise<string>{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('progress', (event) => {
            if (event.loaded && event.total) {
                const percent = (event.loaded / event.total) * 100;
                console.log(`Progress: ${Math.round(percent)}`);
            }
        });
        reader.addEventListener('load', () => {
            const res: string = reader.result as string;
            resolve(res);
        }, false);
        reader.readAsText(file, "utf-8");
    });
}