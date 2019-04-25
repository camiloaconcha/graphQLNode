const { graphql, buildSchema } = require('graphql')
const schema = buildSchema(`
  type Schema { query: Query }
  type Query { 
    video: Video,
    videos: [Video]
  }
  type Video { 
    id: ID,
    title: String,
    duration: Int, 
    released: Boolean 
  }
`)
const query = `query myFirstQuery{
  videos {
    id,
    title,
    duration,
    released 
  }
}`

const videoB = {
    id: '2',
    title: 'Second video',
    duration: 120,
    released: true,
}

const videoA = {
    id: '1',
    title: 'First video',
    duration: 120,
    released: true,
}

const videos = [videoA, videoB]

const resolvers = {
    video: () => videoA,
    videos: () => videos,
}

graphql(schema, query, resolvers)
    .then(result => console.log(result))
    .catch(error => console.log(error))
