/**
 * 时间戳转年/月/日 时：分：秒
 * @param time
 * @param toSecond 是否要秒
 */
export function formatTime(time, toSecond) {
  if (time) {
    const timeString = time.toString()
    const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
    if (toSecond) {
      return timeString.replace(pattern, '$1/$2/$3 $4:$5:$6')
    } else {
      return timeString.replace(pattern, '$1/$2/$3 $4:$5')
    }
  } else {
    return ''
  }
}
