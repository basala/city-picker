export function handleNavData (event, name, val) {
    if (val) {
        return event.setAttribute(name, val)
    } else {
        return event.getAttribute(name)
    }
}

export function getIndex (arr, flag) {
    let key
    arr.map((val, index) => {
        if (val === flag) {
            key = index
            return false
        }
    })
  return key
}

export function getSearchList (text, list) {
    let reg1 = /^\w+$/g //以字母开头
    let reg2 = new RegExp(`^${text}`, 'g')
    let reg3 = new RegExp('^[\\u4E00-\\u9FFF]{1,}$', 'g') //以中文开头
    let reg4 = new RegExp(`^${text}`, 'g')
    let resList = []
    if (text.match(reg1)) {
        for (let i = 0, len1 = list.length; i < len1; i++) {
            for (let j = 0, len2 = list[i][1].length; j < len2; j++) {
                if (list[i][1][j].pinyin.match(reg2)) {
                    resList.push(list[i][1][j])
                }
            }
        }
    } else if (reg3.test(text)) {
        for (let i = 0, len1 = list.length; i < len1; i++) {
            for (let j = 0, len2 = list[i][1].length; j < len2; j++) {
                if (list[i][1][j].name.match(reg4)) {
                    resList.push(list[i][1][j])
                }
            }
        }
    }
    return resList
}

export function getDistance (arr) {
    let titleHeight = 30
    let itemHeight = 35
    let distanceArr = []
    arr.map(function (item) {
        distanceArr.push(titleHeight + itemHeight * item[1].length)
    })
    return distanceArr
}