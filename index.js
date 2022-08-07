const { ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float!
        precoComDesconto: Float
    }

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    #Pontos de entrada da minha API
    type Query {
        ola: String
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
    }

    type Query {
        horaAtual: String
    }
`
const resolvers = {
    Usuario: {
        salario(usuario){
            return usuario.salario_real;
        }
    },

    Produto: {
        precoComDesconto(produto){
            if(produto.desconto){
                return produto.preco * (1 - produto.desconto);
            } else {
                return produto.preco
            }
        }
    },
    Query: {
        ola() {
            return 'Basta retornar uma String'
        },
         horaAtual(){
            return `${new Date}`
        },
        usuarioLogado(){
            return {
                id: 1,
                nome: 'Lorrayne', 
                email: 'lorrayneccb@gmail.com',
                idade: 27,
                salario_real: 1234.56,
                vip: true 
            }
        },
        produtoEmDestaque(){
            return {
                nome: 'Samsung Note',
                preco: 4890.89,
                desconto: 0.15,
            }
        },

        numerosMegaSena(){
            const crescente = (a, b) => a - b;
            return Array(6).fill(0)
            .map(n => parseInt(Math.random() * 60 + 1))
            .sort(crescente);
        }


    }
}

const server = new ApolloServer({ 
    typeDefs,
    resolvers 
})

server.listen().then(({ url }) => {
    console.log(`Eexcutando em ${url}`)
});