module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('exercises', [
      {
        topicId: 1,
        name: 'Exercício 1',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 1,
        name: 'Exercício 2',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 2,
        name: 'Exercício 3',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 2,
        name: 'Exercício 4',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 3,
        name: 'Exercício 5',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 3,
        name: 'Exercício 6',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 4,
        name: 'Exercício 7',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 4,
        name: 'Exercício 8',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 5,
        name: 'Exercício 9',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 5,
        name: 'Exercício 10',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 6,
        name: 'Exercício 11',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 6,
        name: 'Exercício 12',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 7,
        name: 'Exercício 13',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 7,
        name: 'Exercício 14',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 8,
        name: 'Exercício 15',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 8,
        name: 'Exercício 16',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 9,
        name: 'Exercício 17',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 9,
        name: 'Exercício 18',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 10,
        name: 'Exercício 19',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 10,
        name: 'Exercício 20',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 11,
        name: 'Exercício 21',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 11,
        name: 'Exercício 22',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 12,
        name: 'Exercício 23',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 12,
        name: 'Exercício 24',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 13,
        name: 'Exercício 25',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 13,
        name: 'Exercício 26',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 14,
        name: 'Exercício 27',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 14,
        name: 'Exercício 28',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 15,
        name: 'Exercício 29',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 15,
        name: 'Exercício 30',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 16,
        name: 'Exercício 31',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 16,
        name: 'Exercício 32',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 17,
        name: 'Exercício 33',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 17,
        name: 'Exercício 34',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 18,
        name: 'Exercício 35',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 18,
        name: 'Exercício 36',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 19,
        name: 'Exercício 37',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 19,
        name: 'Exercício 38',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 15',
        defaultCode: `function somar(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("somar", () => {
          it("Retorna 9 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 9;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 1 e 2", () => {
            const param1 = 1;
            const param2 = 2;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 20,
        name: 'Exercício 39',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 e 5 retorna 5',
        defaultCode: `function subtrair(param1, param2) {
  // Insira seu codigo aqui
}`,
        test: `describe("subtrair", () => {
          it("Retorna 1 quando passado 5 e 4", () => {
            const param1 = 5;
            const param2 = 4;
            const expected = 1;

            const result = subtrair(param1, param2);

            expect(result).equal(expected);
          });
          it("Retorna 3 quando passado 6 e 3", () => {
            const param1 = 6;
            const param2 = 3;
            const expected = 3;

            const result = somar(param1, param2);

            expect(result).equal(expected);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        topicId: 20,
        name: 'Exercício 40',
        wording: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat vitae in aenean quis quam praesent arcu, orci. Ipsum habitasse proin consectetur vel venenatis. Turpis libero aliquet cras vitae nunc commodo gravida. Sapien eget urna, ante mattis bibendum massa, feugiat.`,
        example: 'Quando enviado 10 retorna 10',
        defaultCode: `function retornarValor(param) {
  // Insira seu codigo aqui
}`,
        test: `describe("retornarValor", () => {
          it("Retorna 5 quando passado 5", () => {
            const param = 5;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
          it("Retorna 3 quando passado 3", () => {
            const param = 3;

            const result = retornarValor(param);

            expect(result).equal(param);
          });
        })`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('exercises', null, {}),
};
