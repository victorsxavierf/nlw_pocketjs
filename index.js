const { select,input } = require('@inquirer/prompts')

let meta = {
    value: 'Beber água',
    checked: false
}

let metas = [ meta ]

const cadastroMeta = async () => {
    const meta = await input({
        message: 'Digite a meta: '
    })

    if(meta.length == 0) {
        console.log("A meta não pode ser vazia!")
        return
    }

    metas.push(
        { value: meta, checked: false}
    )
}

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
                    await cadastroMeta()
                    break
                case "listar":
                    console.log("Vamos listar")
                    console.log(metas)
                    break
                case "sair":
                    console.log("Saiu")
                    return
            }
    }
}

start()