const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const writeFileAsync = util.promisify(fs.writefile);

function userPrompt(){
    //in md creation will need to call name property
    return inquirer.prompt([{
        type: "input",
        name: "username",
        //will also need to call github repo, does it also need to go into the .then function below? I think yes
        //api call needed to place image and username at bottom of readme output.
        message: "What is your github username?"
    },
    {
        type: "input",
        name: "project",
        message: "What is your Project Name?"
    },
    {
        type: "input",
        name: "description",
        message: "Please write a brief desription about your Project"
    },
    {
        type: "list",
        name: "license",
        message: "What kind of licensing will your project have?",
        //dont actually know what these are but they were in the example presentated by Kevin
        choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD3', 'None']
    },
    {
        type: "input",
        name: "installDependencies",
        message: "What command needs to be run to install dependencies?"
    },
    {
        type: "input",
        name: "testing",
        message: "What command needs to be run for testing?"
    },
    {
        type: "input",
        name: "needToKnow",
        message: "What does the user need to know about using this repository?"
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to this repository?"
    },
    ])
}
//follow activity 40 for creating the md file after prompt. Can it be put after calling userPrompt or is it async?

function genReadMe(results){
    return
        ''
}

userPrompt()
    .then((results)=> {
        const readME = genReadMe(results)
        //return used here to avoid callback hell if I remember correctly.
        //using name README2 for testing, change to README when done
        return writeFileAsync("README2.md", readME);

    })
    .then(function(){
        //Not required but useful
        console.log("Succesfully written to README2.md")
    })
    .catch((err)=>{
        //IF statement might be redundant
        if (err){
            console.log(err)
        }
    })
