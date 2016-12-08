/*
* @Author: dmyang
* @Date:   2016-12-08 17:46:39
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-08 17:53:40
*/

'use strict'

const bodyParse = require('koa-body')()

const push = require('../index')

module.exports = router => {
    router.post('/api/byPushId', bodyParse, function*() {
        const body = this.request.body || {}
        const { pushType, pushIds, messageJson } = body

        try {
            const result = yield push.byPushId(pushType, pushIds, messageJson)
            this.body = result
        } catch(e) {
            console.error(e)
            this.status = 500
            this.body = e.message
        }
    })

    router.post('/api/byAlias', bodyParse, function*() {
        const body = this.request.body || {}
        const { pushType, alias, messageJson } = body

        try {
            const result = yield push.byAlias(pushType, alias, messageJson)
            this.body = result
        } catch(e) {
            console.error(e)
            this.status = 500
            this.body = e.message
        }
    })

    router.post('/api/getTaskId', bodyParse, function*() {
        const body = this.request.body || {}
        const { pushType, messageJson } = body

        try {
            const result = yield push.getTaskId(pushType, messageJson)
            this.body = result
        } catch(e) {
            console.error(e)
            this.status = 500
            this.body = e.message
        }
    })

    router.post('/api/taskByPushTd', bodyParse, function*() {
        const body = this.request.body || {}
        const { pushType, pushIds, taskId } = body

        try {
            const result = yield push.taskByPushTd(pushType, pushIds, taskId)
            this.body = result
        } catch(e) {
            console.error(e)
            this.status = 500
            this.body = e.message
        }
    })

    router.post('/api/taskByAlias', bodyParse, function*() {
        const body = this.request.body || {}
        const { pushType, alias, taskId } = body

        try {
            const result = yield push.taskByAlias(pushType, alias, taskId)
            this.body = result
        } catch(e) {
            console.error(e)
            this.status = 500
            this.body = e.message
        }
    })

    router.post('/api/toApp', bodyParse, function*() {
        const body = this.request.body || {}
        const { pushType, messageJson } = body

        try {
            const result = yield push.toApp(pushType, messageJson)
            this.body = result
        } catch(e) {
            console.error(e)
            this.status = 500
            this.body = e.message
        }
    })

    router.post('/api/toTag', bodyParse, function*() {
        const body = this.request.body || {}
        const { pushType, messageJson, tagNames, scope } = body

        try {
            const result = yield push.toTag(pushType, messageJson, tagNames, scope)
            this.body = result
        } catch(e) {
            console.error(e)
            this.status = 500
            this.body = e.message
        }
    })

    router.post('/api/cancel', bodyParse, function*() {
        const body = this.request.body || {}
        const { pushType, taskId } = body

        try {
            const result = yield push.cancel(pushType, taskId)
            this.body = result
        } catch(e) {
            console.error(e)
            this.status = 500
            this.body = e.message
        }
    })

    router.post('/api/getTaskStatistics', bodyParse, function*() {
        const body = this.request.body || {}
        const { taskId } = body

        try {
            const result = yield push.getTaskStatistics(taskId)
            this.body = result
        } catch(e) {
            console.error(e)
            this.status = 500
            this.body = e.message
        }
    })
}
