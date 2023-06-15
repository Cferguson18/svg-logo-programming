// Runs the application using imports from lib/

const filesystem = require('./node_modules/graceful-fs/graceful-fs')

//Imports graceful-fs modules needed
const inquirer = require("inquirer");

const {Triangle, Circle, Square} = require("./lib/shapes");

class Svg{

    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
    
}

// Questions array
const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter up to only 3 Characters for logo:",
    },
    {
        type: "input",
        name: "text-color",
        message: "Enter your text color (OR a hexadecimal number):",
    },
    {
        type: "input",
        name: "shape",
        message: "Enter your shape color (OR a hexadecimal number):",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Pick a shape for logo:",
        choices: ["Triangle", "Circle", "Square"],
    },
];


async function init() {
	var svgString = "";
	var svgFile = "logo.svg";

    // Prompt the user for answers
    const answers = await inquirer.prompt(questions);

	//user text
	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		user_text = answers.text;
	} else {
		console.log("Please only use 1-3 Characters");
        return;
	}
	console.log();

	//user font color
	user_font_color = answers["text-color"];

	//user shape color
	user_shape_color = answers["shape"];

	//user shape type
	user_shape_type = answers["pixel-image"];
	
	//user shape
	let user_shape;
	if ( user_shape_type === "Square" || user_shape_type === "square") {
		user_shape = new Square();
	}
	else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		user_shape = new Circle();
	}
	else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		user_shape = new Triangle();
	}
	else {
		console.log("Not valid shape!");
	}
	user_shape.setColor(user_shape_color);

	// Adds shape and text 
    var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgString = svg.render();

	function writeToFile(fileName, data) {
        console.log()
        filesystem.writeFile(fileName, data, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Generated logo.svg!");
        });
    }
	writeToFile(svgFile, svgString); 
};
init()