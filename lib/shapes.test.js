// Jest tests for shapes

const {Triangle} = require("./shapes")

  describe('Triangle', () => {
      test('renders correctly', () => {
        const shape = new Triangle();
shape.setColor("blue");
expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue"/>');
      });
    });