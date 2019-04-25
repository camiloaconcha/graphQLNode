const { graphql, buildSchema } = require('graphql')
const schema = buildSchema(`
type Schema { query: Query }
type Query { video: Video }
type Video { 
  id: ID,
  title: String,
  duration: Int, 
  released:Boolean }
  
`)
const query = `query myFirstQuery{
  video{
    id,
    title,
    duration,
    released 
  }
}`

const resolvers = {
    video: () => ({
        id: () => '1',
        title: () => 'bar',
        duration: () => 180,
        released: () => true,
    }),
}

graphql(schema, query, resolvers)
    .then(result => console.log(result))
    .catch(error => console.log(error))
