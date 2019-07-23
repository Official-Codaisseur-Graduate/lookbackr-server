const { Router } = require('express')
const Sse = require('json-sse')

module.exports = testFactory = (stream) => {
    const router = new Router()
    const testData = [
        {
            id: 1,
            name: 'retro1',
            description: 'Retrospective of group awesome',
            users: [
                {
                    id: 1,
                    name: 'Henk',
                    retroId: 1
                },
                {
                    id: 2,
                    name: 'Arien',
                    retroId: 1
                },
                {
                    id: 3,
                    name: 'David',
                    retroId: 1
                }
            ],
            cards: [
                {
                    id: 1,
                    type: 'sad',
                    text: 'Sad about something.',
                    userId: 1,
                    retroId: 1
                },
                {
                    id: 2,
                    type: 'mad',
                    text: 'Mad about something',
                    userId: 1,
                    retroId: 1
                },
                {
                    id: 3,
                    type: 'glad',
                    text: 'Glad about something',
                    userId: 1,
                    retroId: 1
                },
                {
                    id: 4,
                    type: 'sad',
                    text: 'Sad about something.',
                    userId: 2,
                    retroId: 1
                },
                {
                    id: 5,
                    type: 'mad',
                    text: 'Mad about something',
                    userId: 2,
                    retroId: 1
                },
                {
                    id: 6,
                    type: 'glad',
                    text: 'Glad about something',
                    userId: 2,
                    retroId: 1
                },
                {
                    id: 7,
                    type: 'sad',
                    text: 'Sad about something.',
                    userId: 3,
                    retroId: 1
                },
                {
                    id: 8,
                    type: 'mad',
                    text: 'Mad about something',
                    userId: 3,
                    retroId: 1
                },
                {
                    id: 9,
                    type: 'glad',
                    text: 'Glad about something',
                    userId: 3,
                    retroId: 1
                } 
            ]
        },
        {
            id: 2,
            name: 'retro2',
            description: 'Retrospective of group amazing',
            users: [
                {
                    id: 4,
                    name: 'Mimi',
                    retroId: 2
                },
                {
                    id: 5,
                    name: 'Kelly',
                    retroId: 2
                },
                {
                    id: 6,
                    name: 'David',
                    retroId: 2
                }
            ],
            cards: [
                {
                    id: 11,
                    type: 'sad',
                    text: 'Sad about something.',
                    userId: 4,
                    retroId: 2
                },
                {
                    id: 12,
                    type: 'mad',
                    text: 'Mad about something',
                    userId: 4,
                    retroId: 2
                },
                {
                    id: 13,
                    type: 'glad',
                    text: 'Glad about something',
                    userId: 4,
                    retroId: 2
                },
                {
                    id: 14,
                    type: 'sad',
                    text: 'Sad about something.',
                    userId: 5,
                    retroId: 2
                },
                {
                    id: 15,
                    type: 'mad',
                    text: 'Mad about something',
                    userId: 5,
                    retroId: 2
                },
                {
                    id: 16,
                    type: 'glad',
                    text: 'Glad about something',
                    userId: 5,
                    retroId: 2
                },
                {
                    id: 17,
                    type: 'sad',
                    text: 'Sad about something.',
                    userId: 6,
                    retroId: 2
                },
                {
                    id: 18,
                    type: 'mad',
                    text: 'Mad about something',
                    userId: 6,
                    retroId: 2
                },
                {
                    id: 19,
                    type: 'glad',
                    text: 'Glad about something',
                    userId: 6,
                    retroId: 2
                } 
            ]
        }
    ]
    const json = JSON.stringify(testData)
    stream.updateInit(json)
    
    router.get('/test-stream', (request, response, next)=> {
        
        //res.status(200).json(testData)
        stream.init(request, response)
        stream.send(json)
        console.log('STREAM', stream.initial)
    })

    router.get('/test', (req, res, next)=> {
        console.log('WHAT IS IN REQUEST:', req)
        res.status(200).json(testData)
    })

    router.get('/test/:id', (req, res, next)=> {
        const id = req.params.id
        const index = id -1
        console.log('WHAT IS IN REQUEST:', req)
        res.status(200).json(testData[index])
    })
    return router

}

