# meizu-push

魅族Flyme消息推送服务Node.js版本SDK。


## 使用

``` js
$ npm install meizu-push
```

> 首先开发者必须在Flyme开放平台申请应用的appSecret和appId，申请网址：[Flyme开放平台](http://open.flyme.cn/)



## API规范

### 接口响应规范

接口返回数据格式：


``` js
{
    "code": "",     // 必选，返回码
    "message": "",  // 可选，返回消息，网页端接口出现错误时使用此消息展示给用户，手机端可忽略此消息，甚至服务端不传输此消息
    "value": "",    // 必选，返回结果
    "redirect": ""  // 可选, returnCode=300 重定向时，使用此URL重新请求
}
```

### 返回码含义

code|value
---|---
200|正常
201|没有权限，服务器主动拒绝
500|其他异常
501|推送消息失败（db_error）
513|推送消息失败
518|推送超过配置的速率
519|推送消息失败服务过载
520|消息折叠（1分钟内同一设备同一应用消息收到多次，默认5次）
1001|系统错误
1003|服务器忙
1005|参数错误，请参考API文档
1006|签名认证失败
110000|appId不合法
110001|appKey不合法
110002|pushId未订阅(包括推送开关关闭的设备)
110003|pushId非法
110004|参数不能为空
110005|别名未订阅(包括推送开关关闭的设备)
110009|应用被加入黑名单

**注：平台使用pushId来标识每个独立的用户，每一台终端上每一个app拥有一个独立的pushId**

### 消息体格式定义

> 推送消息分为两种，一种是通知栏消息，一种是透传消息，因为消息最终在终端显示不一样，所以消息格式也不一样。api的第一个参数`pushType`表示通知类型，pushType不同，对应的`messageJson`参数的格式也不同。

- 通知栏消息格式

```
{
    "noticeBarInfo": {
        "noticeBarType": 通知栏样式(0, "标准"),(2, "安卓原生")【int 非必填，值为0】
        "title": 推送标题, 【string 必填，字数限制1~32字符】
        "content": 推送内容, 【string 必填，字数限制1~100字符】
    },
    "noticeExpandInfo": {
        "noticeExpandType": 展开方式 (0, "标准"),(1, "文本")【int 非必填，值为0、1】
        "noticeExpandContent": 展开内容, 【string noticeExpandType为文本时，必填】
    },
    "clickTypeInfo": {
        "clickType": 点击动作 (0,"打开应用"),(1,"打开应用页面"),(2,"打开URI页面"),(3, "应用客户端自定义")【int 非必填,默认为0】
        "url": URI页面地址, 【string clickType为打开URI页面时，必填, 长度限制1000字节】
        "parameters":参数 【JSON格式】【非必填】 
        "activity":应用页面地址 【string clickType为打开应用页面时，必填, 长度限制1000字节】
        "customAttribute":应用客户端自定义【string clickType为应用客户端自定义时，必填， 输入长度为1000字节以内】
    },
    "pushTimeInfo": {
        "offLine": 是否进离线消息(0 否 1 是[validTime]) 【int 非必填，默认值为1】
        "validTime": 有效时长 (1到72 小时内的正整数) 【int offLine值为1时，必填，默认24】
    },
    "advanceInfo": {
        "suspend":是否通知栏悬浮窗显示 (1 显示  0 不显示) 【int 非必填，默认1】
        "clearNoticeBar":是否可清除通知栏 (1 可以  0 不可以) 【int 非必填，默认1】
        "isFixDisplay":是否定时展示 (1 是  0 否) 【int 非必填，默认0】
        "fixStartDisplayTime": 定时展示开始时间(yyyy-MM-dd HH:mm:ss) 【str 非必填】
        "fixEndDisplayTime ": 定时展示结束时间(yyyy-MM-dd HH:mm:ss) 【str 非必填】
        "notificationType": {
            "vibrate":  震动 (0关闭  1 开启) ,  【int 非必填，默认1】
            "lights":   闪光 (0关闭  1 开启), 【int 非必填，默认1】
            "sound":   声音 (0关闭  1 开启), 【int 非必填，默认1】
        }
    }
}
```

- 透传消息格式

```
{
    "title": 推送标题, 【string 非必填，字数显示1~32个】
    "content": 推送内容,  【string 必填，字数限制2000以内】
    "pushTimeInfo": {
        "offLine": 是否进离线消息 0 否 1 是[validTime] 【int 非必填，默认值为1】
        "validTime": 有效时长 (1- 72 小时内的正整数) 【int offLine值为1时，必填，默认24】
    }
}
```


## API说明

### config

功能：全局配置
调用：config(Object conf)
示例:
``` js
const push = require('meizu-push')

push.config({
    useSSL: true, // 是否调用HTTPS接口，默认是false
    appSecret: [your appSecret], // 必填
    appId: [your appId] // 必填
})
```

### byPushId

功能：全局配置

调用：byPushId(Number pushType, String pushIds, String messageJson[, Function callback])

参数|类型|是否可空|默认值|描述
---|---|---|---|---
pushType|0或1|否|无|推送类型，0表示通知栏消息，1表示透传消息
pushIds|String|否|无|推送设备，多个英文逗号分割必填
messageJson|String|否|无|参考[消息体格式定义](#消息体格式定义)部分，因pushType不同而不同
callback|Function|是|无|如果不传入callback则接口返回promise实例

示例:
``` js
push.byPushId(1, )
```
