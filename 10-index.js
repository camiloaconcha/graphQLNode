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
    GraphQLList,
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

const getVideos = () => new Promise(resolve => videos)

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
        videos: {
            type: new GraphQLList(videoType),
            resolve: getVideos,
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

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root Mutation type',
    fields: {
        createVideo: {},
    },
})

const createVideo = ({title,duration,released})=> {
    const video ={
        id:(new Buffer(title,'')),
        title,
        duration,
        released
    }
}

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root Mutation type',
    fields: {
        createVideo: {
            type: videoType,
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Tht title of the video',
                },
                duration: {
                    type: new GraphQLNonNull(GraphQLInt),
                    description: 'The duration of the video in (in seconds)',
                },
                released: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                    description: 'Wheter or not the video has been released',
                },
            },
            resolve: (_, args) => {
                return createVideo(args)
            },
        },
    },
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
