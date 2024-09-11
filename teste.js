const { select } = require('@inquirer/prompts')

const inicio = async () => {
    while(true){
        const opcao = await select ({
            message: 'Menu >',
            choices: [
                {
                    name: 'Iniciar',
                    value: 'iniciar'
                },
                {
                    name: 'Sair',
                    value: 'sair'
                }
            ]
        })

            switch(opcao){
                case 'iniciar':
                    cadastroMeta()
                    break
                case 'sair':
                    console.log('Saiu')
                    return
            }
    }
}

inicio()