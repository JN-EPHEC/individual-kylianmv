import { calculateShipping } from "../utils/shipping";

describe('Shipping Calculator - Tests Fonctionnels (CBT)', () => {
  
  const testCases = [
    // [Distance, Poids, Type, Attendu, Description]
    [0, 5, 'standard', 10, "Limite basse tranche 1 (0km)"],
    [50, 5, 'standard', 10, "Limite haute tranche 1 (50km)"],
    [51, 5, 'standard', 25, "Limite basse tranche 2 (51km)"],
    [500, 5, 'standard', 25, "Limite haute tranche 2 (500km)"],
    [501, 5, 'standard', 50, "Limite basse tranche 3 (501km)"],
    [10, 10, 'standard', 15, "Majoration poids (10kg = +50%)"],
    [10, 5, 'express', 20, "Option Express (x2)"],
  ];

  test.each(testCases)(
    '%s km, %s kg, %s -> %s€ (%s)',
    (dist, weight, type, expected) => {
      expect(calculateShipping(dist as number, weight as number, type as any)).toBe(expected);
    }
  );

  it('devrait lever une erreur pour une distance négative', () => {
    expect(() => calculateShipping(-1, 5, 'standard')).toThrow("Invalid distance");
  });

  it('devrait lever une erreur pour un poids invalide', () => {
    expect(() => calculateShipping(10, 0, 'standard')).toThrow("Invalid weight");
    expect(() => calculateShipping(10, 51, 'standard')).toThrow("Invalid weight");
  });
});