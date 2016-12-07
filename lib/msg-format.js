/*
* @Author: dmyang
* @Date:   2016-12-07 11:47:03
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-07 17:12:08
*/

'use strict'

/**
 * 格式化通知栏消息
 */
const formatVarnishedMsg = msg => {
    const noticeBarInfo = { title: msg.title, content: msg.content }
    const noticeExpandInfo = {}
    const clickTypeInfo = {}
    const pushTimeInfo = {}
    const advanceInfo = {}

    if('noticeBarType' in msg) noticeBarInfo.noticeBarType = msg.noticeBarType

    if('noticeExpandType' in msg) {
        noticeExpandInfo.noticeExpandType = msg.noticeExpandType
        if(msg.noticeExpandType == 1) noticeExpandInfo.noticeExpandContent = msg.noticeExpandContent
    }

    if('clickType' in msg) {
        clickTypeInfo.clickType = msg.clickType
        if(msg.clickType === 2) clickTypeInfo.url = msg.url
        if('parameters' in msg) clickTypeInfo.parameters = msg.parameters
        if(msg.clickType === 1) clickTypeInfo.activity = msg.activity
        if(msg.clickType === 1) clickTypeInfo.customAttribute = msg.customAttribute
    }

    if('pushTimeInfo' in msg) {
        pushTimeInfo.offLine = msg.offLine
        if(msg.offLine === 1) pushTimeInfo.validTime = msg.validTime
    }

    if('suspend' in msg) {
        advanceInfo.suspend = msg.suspend
        if('clearNoticeBar' in msg) advanceInfo.clearNoticeBar = msg.clearNoticeBar
        if('isFixDisplay' in msg) advanceInfo.isFixDisplay = msg.isFixDisplay
        if('fixStartDisplayTime' in msg) advanceInfo.fixStartDisplayTime = msg.fixStartDisplayTime
        if('fixEndDisplayTime' in msg) advanceInfo.fixEndDisplayTime = msg.fixEndDisplayTime
        if('notificationType' in msg && typeof msg.notificationType === 'object') advanceInfo.notificationType = msg.notificationType
    }

    return {
        noticeBarInfo,
        noticeExpandInfo,
        clickTypeInfo,
        pushTimeInfo,
        advanceInfo
    }
}

module.exports = (msg, type) => {
    if(type == 0) {
        let _msg = msg.noticeBarInfo || {}

        if(_msg.title && _msg.content) return JSON.stringify(msg)
        else throw Error('param messageJson format error')
    } else {
        if(msg.title && msg.content) return JSON.stringify(msg)
        else throw Error('param messageJson format error')
    }
}
