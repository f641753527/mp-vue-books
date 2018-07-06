function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function showToast(title = '成功', icon = 'success',  duration = 1500) {
  wx.showToast({
    title: title,
    icon: icon,
    duration: duration,
  })
}

export function showLoading(title = 'loading', mask = false) {
  wx.showLoading({
    title: title,
    mask: mask,
  })
}

export function showModal(title = '提示', content = '提示信息', showCancel = false) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel
  })
}
