const { select,input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao APP"

let metas

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const listarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Não há metas por agora"
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta foi selecionada"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
        return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcadas como concluída(s)"
}

const cadastroMetas = async () => {
    const meta = await input({
        message : "Digite a meta: "
    })

    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia!"
        return
    }

    metas.push(
        { value: meta, checked: false}
    )
}

const metasRealizadas = async () => {
    if(metas.length == 0){
        mensagem = "Não há metas por agora"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked == true
    })

    if (realizadas.length == 0 ){
        mensagem = "Não existe metas realizadas!"
        return
    }

    await select({
        message: "Metas realizadas = " + realizadas.length,
        choices: [...realizadas]
    })

    console.log(realizadas)
}

const metasAbertas = async () => {
    if(metas.length == 0){
        mensagem = "Não há metas por agora"
        return
    }

    const abertas = metas.filter((metas) => {
        return metas.checked == false
    })

    if(abertas.length == 0) {
        mensagem = "Não existem metas abertas!"
        return
    }

    await select({
        message: "Metas abertas = " + abertas.length,
        choices: [...abertas]
    })

    console.log(abertas)
}

const deletarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Não há metas por agora"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked:false}
    })

    const itemDeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itemDeletar.length == 0){
        mensagem = "Nenhum item selecionado!"
        return
    }

    itemDeletar.forEach((item) => {
        metas = metas.filter((meta => {
            return meta.value != item
        }))
    })

    mensagem = "Metas deletadas!"
}

const mostrarMensagem = () => {
    console.clear()

    if (mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()

    while(true){
        mostrarMensagem()
        await salvarMetas()

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
                    name:"Metas abertas",
                    value:"abertas"
                },
                {
                    name:"Deletar metas",
                    value:"deletar"
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
                case "abertas":
                    await metasAbertas()
                    break
                case "deletar":
                    await deletarMetas()
                    break
                case "sair":
                    console.log("Saiu")
                    return
            }
    }
}

start()