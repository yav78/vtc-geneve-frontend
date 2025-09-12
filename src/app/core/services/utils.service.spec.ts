import { Utils } from './utils.service';

describe('Utils', () => {
  describe('shuffleArray', () => {
    it('should return a new array with the same length', () => {
      const originalArray = [1, 2, 3, 4, 5];
      const shuffledArray = Utils.shuffleArray(originalArray);
      
      expect(shuffledArray).toBeDefined();
      expect(shuffledArray.length).toBe(originalArray.length);
      expect(shuffledArray).not.toBe(originalArray); // Vérifie que c'est une nouvelle référence
    });

    it('should not modify the original array', () => {
      const originalArray = ['a', 'b', 'c', 'd'];
      const originalCopy = [...originalArray];
      
      Utils.shuffleArray(originalArray);
      
      expect(originalArray).toEqual(originalCopy);
    });

    it('should contain all the same elements as the original array', () => {
      const originalArray = [10, 20, 30, 40, 50];
      const shuffledArray = Utils.shuffleArray(originalArray);
      
      // Vérifier que tous les éléments de l'original sont dans le mélangé
      originalArray.forEach(element => {
        expect(shuffledArray).toContain(element);
      });
      
      // Vérifier que tous les éléments du mélangé sont dans l'original
      shuffledArray.forEach(element => {
        expect(originalArray).toContain(element);
      });
    });

    it('should handle empty arrays', () => {
      const emptyArray: number[] = [];
      const shuffledEmpty = Utils.shuffleArray(emptyArray);
      
      expect(shuffledEmpty).toEqual([]);
      expect(shuffledEmpty).not.toBe(emptyArray);
    });

    it('should handle arrays with single element', () => {
      const singleElementArray = [42];
      const shuffledSingle = Utils.shuffleArray(singleElementArray);
      
      expect(shuffledSingle).toEqual([42]);
      expect(shuffledSingle).not.toBe(singleElementArray);
    });

    it('should handle arrays with duplicate elements', () => {
      const arrayWithDuplicates = [1, 2, 2, 3, 3, 3];
      const shuffledDuplicates = Utils.shuffleArray(arrayWithDuplicates);
      
      expect(shuffledDuplicates.length).toBe(arrayWithDuplicates.length);
      
      // Vérifier que les fréquences des éléments sont identiques
      const countOccurrences = (arr: number[], value: number) => 
        arr.filter(item => item === value).length;
      
      [1, 2, 3].forEach(element => {
        expect(countOccurrences(shuffledDuplicates, element))
          .toBe(countOccurrences(arrayWithDuplicates, element));
      });
    });

    it('should handle arrays of objects', () => {
      const objectArray = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ];
      const shuffledObjects = Utils.shuffleArray(objectArray);
      
      expect(shuffledObjects.length).toBe(objectArray.length);
      expect(shuffledObjects).not.toBe(objectArray);
      
      // Vérifier que tous les objets sont présents
      objectArray.forEach(obj => {
        expect(shuffledObjects).toContain(obj);
      });
    });

    it('should handle arrays with mixed types', () => {
      const mixedArray = [1, 'hello', true, { key: 'value' }, null];
      const shuffledMixed = Utils.shuffleArray(mixedArray);
      
      expect(shuffledMixed.length).toBe(mixedArray.length);
      expect(shuffledMixed).not.toBe(mixedArray);
      
      mixedArray.forEach(element => {
        expect(shuffledMixed).toContain(element);
      });
    });

    it('should produce different orders on multiple calls (statistical test)', () => {
      const originalArray = [1, 2, 3, 4, 5];
      const results: string[] = [];
      
      // Effectuer plusieurs mélanges et comparer les résultats
      for (let i = 0; i < 10; i++) {
        const shuffled = Utils.shuffleArray(originalArray);
        results.push(shuffled.join(','));
      }
      
      // Vérifier qu'au moins deux résultats sont différents
      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBeGreaterThan(1);
    });

    it('should maintain array integrity with complex objects', () => {
      const complexArray = [
        { id: 1, data: { nested: 'value1' } },
        { id: 2, data: { nested: 'value2' } },
        { id: 3, data: { nested: 'value3' } }
      ];
      const shuffledComplex = Utils.shuffleArray(complexArray);
      
      expect(shuffledComplex.length).toBe(complexArray.length);
      
      // Vérifier que les objets complexes sont identiques
      complexArray.forEach(complexObj => {
        const found = shuffledComplex.find(item => 
          item.id === complexObj.id && 
          item.data.nested === complexObj.data.nested
        );
        expect(found).toBeDefined();
      });
    });

    it('should handle very large arrays', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const shuffledLarge = Utils.shuffleArray(largeArray);
      
      expect(shuffledLarge.length).toBe(1000);
      expect(shuffledLarge).not.toBe(largeArray);
      
      // Vérifier que tous les nombres de 0 à 999 sont présents
      for (let i = 0; i < 1000; i++) {
        expect(shuffledLarge).toContain(i);
      }
    });
  });
});
