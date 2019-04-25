const getVideos = () => new Promise(resolve => resolve(videos))
exports.getVideos = getVideos

const getVideoById = id =>
    new Promise(resolve => {
        const [video] = videos.filter(video => video.id === id)
        resolve(video)
    })

exports.getVideoById = getVideoById
