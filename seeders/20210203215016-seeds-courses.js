module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('courses', [
      {
        name: 'JavaScript do zero!',
        description: 'Aprenda o básico meu bom!',
        photo: 'https://blog.dankicode.com/wp-content/uploads/2018/03/introdu%C3%A7%C3%A3o-ao-javascript.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Node com TypeScript!',
        description: 'Aprenda a linguagem do momento!',
        photo: 'https://www.positronx.io/wp-content/uploads/2018/11/positronx-banner-1152-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aprenda a blindar sua aplicação Node com Jest!',
        description: 'Testes unitários e de integração, tudo que você precisa saber',
        photo: 'https://miro.medium.com/max/796/1*VxBKV4bcUJ4M7WCuCNmHWw.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Do zero ao Full Stack',
        description: 'React, Node, Jest e Postgre',
        photo: 'https://media.bitdegree.org/storage/media/images/2018/11/What-Is-A-Full-Stack-Developer-and-Everything-You-Need-to-Know-to-Start.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('courses', null, {}),
};
