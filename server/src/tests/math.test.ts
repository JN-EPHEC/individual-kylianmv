const add = (a: number, b: number) => a + b;

describe('Math Utils', () => {
  it('devrait additionner deux nombres correctement', () => {
    expect(add(2, 3)).toBe(5); // On attend que 2+3 donne 5
  });
});