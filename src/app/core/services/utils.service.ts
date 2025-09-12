export class Utils {
    static shuffleArray<T>(array: T[]): T[] {
        const arr = [...array]; // copie pour éviter de modifier l'original
        
        // Algorithme Fisher-Yates
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // index aléatoire entre 0 et i
          [arr[i], arr[j]] = [arr[j], arr[i]]; // échange
        }
        
        return arr;
      }
}