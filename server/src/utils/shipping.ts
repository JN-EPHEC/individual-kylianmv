export function calculateShipping(
  distance: number,
  weight: number,
  type: 'standard' | 'express'
): number {
  if (distance < 0) throw new Error("Invalid distance");
  if (weight <= 0 || weight > 50) throw new Error("Invalid weight");

  let cost = 0;

  // 1. Coût de base selon la distance 
  if (distance <= 50) cost = 10;
  else if (distance <= 500) cost = 25;
  else cost = 50;

  // 2. Majoration selon le poids
  if (weight >= 10) {
    cost *= 1.5; // +50%
  }

  // 3. Option Express
  if (type === 'express') {
    cost *= 2;
  }

  return cost;
}