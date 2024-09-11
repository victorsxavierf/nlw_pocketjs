const { select } = require('@inquirer/prompts')

const start = async () => {
    while(true){
        const opcao = await select ({
            message: "Menu >",
            choices: [
                {
                    name:"Cadastrar menu",
                    value:"cadastrar"
                },
                {
                    name:"Listar menu",
                    value:"listar"
                },
                {
                    name:"Sair menu",
                    value:"sair"
                },
            ]
        })

            switch(opcao){
                case "cadastrar":
                    console.log("Vamos cadastrar")
                    break;
                case "listar":
                    console.log("Vamos listar")
                    break;
                case "sair":
                    console.log("Saiu")
                    return;
            }
    }
}

start()