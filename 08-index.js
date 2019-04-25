const express = require('express')
const server = express()
const graphqlHTTP = require('express-graphql')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
} = require('graphql')

const PORT = process.env.port || 3000

const videoType = new GraphQLObjectType({
    name: 'Videotype',
    description: 'A video on my domain',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'the id for the video',
        },
        title: {
            type: GraphQLString,
            description: 'the title for the video',
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video (in seconds)',
        },
        released: {
            type: GraphQLBoolean,
            description: 'Wheter or not the viewer has released the video',
        },
    },
})

const getVideoById = id =>
    new Promise(resolve => {
        const [video] = videos.filter(video => video.id === id)
        resolve(video)
    })

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
            type: videoType,
            args: {
                id: {
                    type: GraphQLID,
                    description: 'The id of the video',
                },
            },
            resolve: (_, args) => getVideoById(args.id),
        },
    },
})

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
const schema = new GraphQLSchema({
    query: queryType,
})

server.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
        rootValue: resolvers,
    })
)

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})
