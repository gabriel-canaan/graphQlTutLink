import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'

const app = express()

app.get('/', (req, res) => {
  res.send('Graphql and Relay modern whoo hoo!')
})

const root = { friend: (args) => {
  return {
    'id': 23485676,
    'firstName': 'dave',
    'lastName': 'smith',
    'gender': 'female',
    'language': 'cuniform',
    'email': 'dave@babyalon.ir',
    'IDTyped': args.id
  }
}}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
app.listen(8080, () => console.log('Running on localhost:8080/graphql'))
