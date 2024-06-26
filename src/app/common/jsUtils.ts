import { switchMap, of, Observable } from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function getTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

export async function downloadFile(url: string, fileName : string): Promise<void> {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = fileName; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(urlBlob);

  } catch (error : any) {
      console.error(`Error: ${error?.message}`);
  }
}
