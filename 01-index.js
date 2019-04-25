const { graphql, buildSchema } = require('graphql')
const schema = buildSchema(`
type Schema { query: Query }
type Query { foo: String }
`)
const query = `query myFirstQuery{
    foo
}`

const resolvers = {
    foo: () => 'bar',
}

graphql(schema, query, resolvers)
    .then(result => console.log(result.data))
    .catch(error => console.log(error))
