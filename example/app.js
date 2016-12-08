/*
* @Author: dmyang
* @Date:   2016-12-08 11:26:47
* @Last Modified by:   dmyang
* @Last Modified time: 2016-12-08 18:00:59
*/

'use strict'

const path = require('path')

const app = require('koa')()
const router = require('koa-router')()
const render = require('koa-ejs')

const push = require('../index')
const conf = require('./config')
const routes = require('./routes')

/* config push sdk */
push.config(conf)

/* logger */
app.use(function*(next) {
    console.log(`${this.method} ${this.url}`)
    yield next
})

/* config view engine */
render(app, {
    root: path.join(__dirname, './'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
})

/* setup api router */
routes(router)

/* setup page router */
router.get('/', function*() {
    yield this.render('index')
})

app.use(router.routes())

app.listen(3000, () => {
    console.log('open your browser and input `http://localhost:3000`')
})
