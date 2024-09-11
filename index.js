const { select,input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Beber água',
    checked: false
}

let metas = [ meta ]

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta foi selecionada")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
        return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcadas como concluída(s)")
}

const cadastroMetas = async () => {
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

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked == true
    })

    if (realizadas.length == 0 ){
        console.log("Não existe metas realizadas!")
        return
    }

    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })

    console.log(realizadas)
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
                    name:"Metas realizadas",
                    value:"realizadas"
                },
                {
                    name:"Sair menu",
                    value:"sair"
                },
            ]
        })

            switch(opcao){
                case "cadastrar":
                    await cadastroMetas()
                    break
                case "listar":
                    await listarMetas()
                    break
                case "realizadas":
                    await metasRealizadas()
                    break
                case "sair":
                    console.log("Saiu")
                    return
            }
    }
}

start()