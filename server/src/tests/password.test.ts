import { validatePassword } from "../utils/password"; // [cite: 230]

describe("Password Validator White Box Testing", () => { // [cite: 231]

  // --- TESTS DE BASE (VALEURS LIMITES) ---
  
  it("devrait rejeter un mot de passe vide", () => {
    const result = validatePassword("", 25); // Branch 1 [cite: 234, 235, 252]
    expect(result).toBe(false); // [cite: 236]
  });

  it("devrait rejeter un mot de passe trop court (< 8)", () => {
    expect(validatePassword("Ab1!", 25)).toBe(false); // Branch 2 [cite: 253, 257]
  });

  it("devrait rejeter un mot de passe trop long (> 20)", () => {
    expect(validatePassword("A1!a".repeat(6), 25)).toBe(false); // Branch 3 [cite: 254, 257]
  });

  // --- TESTS ENFANT (< 12 ans) --- [cite: 264]

  it("enfant : invalide si pas de minuscule", () => {
    expect(validatePassword("ABCDEF123!", 10)).toBe(false); // Branch 4 [cite: 268]
  });

  it("enfant : valide avec uniquement des minuscules", () => {
    expect(validatePassword("abcdefgh", 10)).toBe(true); // Succès enfant [cite: 269]
  });

  // --- TESTS ADULTE (12 <= age < 65) --- [cite: 271]

  it("adulte : invalide s'il manque une majuscule", () => {
    expect(validatePassword("abcdef1!", 25)).toBe(false); // Branch 5 [cite: 276]
  });

  it("adulte : invalide s'il manque une minuscule", () => {
    expect(validatePassword("ABCDEF1!", 25)).toBe(false); // Branch 5 [cite: 276]
  });

  it("adulte : invalide s'il manque un chiffre", () => {
    expect(validatePassword("Abcdefgh!", 25)).toBe(false); // Branch 5 [cite: 276]
  });

  it("adulte : invalide s'il manque un caractère spécial", () => {
    expect(validatePassword("Abcdefg1", 25)).toBe(false); // Branch 6 [cite: 277]
  });

  it("adulte : valide si toutes les conditions sont remplies", () => {
    expect(validatePassword("Abcdefg1!", 25)).toBe(true); // Succès adulte [cite: 284]
  });

  // --- TESTS SENIOR (>= 65 ans) --- [cite: 271, 274]

  it("senior : invalide si pas de chiffre ET pas de majuscule", () => {
    expect(validatePassword("abcdefgh!", 70)).toBe(false); // Branch 7 [cite: 279]
  });

  it("senior : valide avec une majuscule", () => {
    expect(validatePassword("Abcdefgh!", 70)).toBe(true); // Passe Branch 7 [cite: 284]
  });

  it("senior : valide avec un chiffre", () => {
    expect(validatePassword("abcdefg1!", 70)).toBe(true); // Passe Branch 7 [cite: 284]
  });

});