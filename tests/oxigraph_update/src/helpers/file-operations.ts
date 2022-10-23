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

export async function downloadStringAsFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}