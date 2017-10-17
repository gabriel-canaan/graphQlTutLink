import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Graphql and Relay modern whoo hoo!')
})
app.listen(8080, () => console.log('Running on localhost:8080/graphql'))
