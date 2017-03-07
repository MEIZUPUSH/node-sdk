/*
* @Author: dmyang
* @Date:   2016-12-06 16:07:50
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-08 16:52:12
*/

'use strict'

const http = require('http')
const https = require('https')
const crypto = require('crypto')
const qs = require('querystring')

const DOMAIN = 'api-push.meizu.com'
/* default config*/
const CONFIG = {
    useSSL: false,
    appSecret: '',
    appId: ''
}

const md5 = (data) => {
    return crypto.createHash('md5').update(data, 'utf8').digest('hex')
}

/**
* Meizu api signature algorithm
* @see https://github.com/MEIZUPUSH/PushAPI#接口签名规范-
*/
const sign = (params, secret) => {
    const keys = Object.keys(params).sort()
    const list = keys.map(key => `${key}=${params[key]}`)

    return md5(list.join('') + secret)
}

/**
 * HTTP request client
 * @param {String} method     request method
 * @param {String} api        request api
 * @param {Object} data       request data
 * @param {Object} config     request config
 */
const request = (method, api, data, config) => {
    config = config ? Object.assign({}, CONFIG, config) : CONFIG

    if(!config.appSecret) throw Error('`appSecret` required')

    data.sign = sign(data, config.appSecret)

    const qStr = qs.stringify(data)
    let option = {
        method: method.toUpperCase(),
        hostname: DOMAIN,
        path: api
    }

    if('POST' === option.method) {
        option.headers = {
            'Content-Length': Buffer.byteLength(qStr), 
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    } else {
        option.path += `?${qStr}`
    }

    // console.info(`request ${JSON.stringify(option)} ${qStr}`)

    return new Promise((resolve, reject) => {
        const req = (config.useSSL ? https : http).request(option, res => {
            const chunks = []

            res.on('data', chunk => chunks.push(chunk))

            res.on('end', () => {
                const buf = Buffer.concat(chunks)
                const result = buf.toString()

                resolve(result)
            })

            res.on('error', reject)
        })

        req.on('error', reject)

        if('POST' === option.method) req.write(qStr)

        req.end()
    })
}

const get = (api, data, config) => request('GET', api, data, config)

const post = (api, data, config) => request('POST', api, data, config)

exports.request = request
exports.get = get
exports.post = post
