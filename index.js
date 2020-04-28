const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

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
    return (
        `
        # ${results.project}
        
        
        ## Description
        
        ${results.description}
        
        ## Table
        
        * [License](#license)

        * [Installation](#installation)
        
        * [Testing](#testing)

        * [Need To Know](#needtoknow)

        * [Contributions](#contributions)
        
        * [Questions](#questions)
        
        ## License
        
        ${results.choices}

        ## Installation
        
        To install necessary dependencies run the following command:
        
        ${results.installDependencies}
        
        ## Testing
         
        To run tests, run the following command:

        ${results.testing}

        ## Need to Know

        ${results.needToKnow}

        ## Contributions
        
        ${results.contributing}
        
        ## Questions

        If you have any questions about this repository, contact [${results.username}](https://github.com/${results.username}) at darnellnathaniel95@gmail.com
        `
    )
}

userPrompt()
    // .then(function({ username }) {
    //     const url = `https://api.github.com/users/${username}/repos?per_page=100`;

    //     axios.get(url).then(function(res) {
    //       const repoNames = res.data.map(function(repo) {
    //         return repo.name;
    //       });

    //       const repoNamesStr = repoNames.join("\n");

    //       fs.writeFile("repos.txt", repoNamesStr, function(err) {
    //         if (err) {
    //           throw err;
    //         }

            
    //       });
    //     });
    //   })
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
