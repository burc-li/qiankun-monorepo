/**
 scrollIntoView(someElement, {
  time: 500, // half a second
  ease: function(value){
    return Math.pow(value,2) - value; // Do something weird.
  },
  validTarget: function(target, parentsScrolled){
    // Only scroll the first two elements that don't have the class "dontScroll"
    return parentsScrolled < 2 && target !== window && !target.matches('.dontScroll');
  },
  align:{
    top: 0 to 1, default 0.5 (center)
    left: 0 to 1, default 0.5 (center)
    topOffset: pixels to offset top alignment
    leftOffset: pixels to offset left alignment
  },
  isScrollable: function(target, defaultIsScrollable){
    // By default scroll-into-view will only attempt to scroll elements that have overflow not set to `"hidden"` and who's scroll width/height is larger than their client height.
    // You can override this check by passing an `isScrollable` function to settings:
    return defaultIsScrollable(target) || ~target.className.indexOf('scrollable');
  }
});
 */
import { isClient } from '../../utils/index'

const COMPLETE = 'COMPLETE'
const CANCELED = 'CANCELED'

function requestAnimation (task) {
  if (isClient && 'requestAnimationFrame' in window) {
    return window.requestAnimationFrame(task)
  }

  setTimeout(task, 16)
}

function setElementScroll (element, x, y) {
  if (element === window) {
    element.scrollTo(x, y)
  } else {
    element.scrollLeft = x
    element.scrollTop = y
  }
}

function getTargetScrollLocation (target, parent, align) {
  if (!isClient) return
  const targetPosition = target.getBoundingClientRect()
  let parentPosition = null
  let x = null
  let y = null
  let differenceX = null
  let differenceY = null
  let targetWidth = null
  let targetHeight = null
  const leftAlign = align && align.left != null ? align.left : 0.5
  const topAlign = align && align.top != null ? align.top : 0.5
  const leftOffset = align && align.leftOffset != null ? align.leftOffset : 0
  const topOffset = align && align.topOffset != null ? align.topOffset : 0
  const leftScalar = leftAlign
  const topScalar = topAlign

  if (parent === window) {
    targetWidth = Math.min(targetPosition.width, window.innerWidth)
    targetHeight = Math.min(targetPosition.height, window.innerHeight)
    x = targetPosition.left + window.pageXOffset - window.innerWidth * leftScalar + targetWidth * leftScalar
    y = targetPosition.top + window.pageYOffset - window.innerHeight * topScalar + targetHeight * topScalar
    x -= leftOffset
    y -= topOffset
    differenceX = x - window.pageXOffset
    differenceY = y - window.pageYOffset
  } else {
    targetWidth = targetPosition.width
    targetHeight = targetPosition.height
    parentPosition = parent.getBoundingClientRect()
    const offsetLeft = targetPosition.left - (parentPosition.left - parent.scrollLeft)
    const offsetTop = targetPosition.top - (parentPosition.top - parent.scrollTop)
    x = offsetLeft + (targetWidth * leftScalar) - parent.clientWidth * leftScalar
    y = offsetTop + (targetHeight * topScalar) - parent.clientHeight * topScalar
    x = Math.max(Math.min(x, parent.scrollWidth - parent.clientWidth), 0)
    y = Math.max(Math.min(y, parent.scrollHeight - parent.clientHeight), 0)
    x -= leftOffset
    y -= topOffset
    differenceX = x - parent.scrollLeft
    differenceY = y - parent.scrollTop
  }

  return {
    x,
    y,
    differenceX,
    differenceY
  }
}

function animate (parent) {
  requestAnimation(function () {
    const scrollSettings = parent.scrollOption
    if (!scrollSettings) {
      return
    }

    const location = getTargetScrollLocation(scrollSettings.target, parent, scrollSettings.align)
    const time = Date.now() - scrollSettings.startTime
    const timeValue = Math.min((1 / scrollSettings.time) * time, 1)

    if (
      time > scrollSettings.time + 20
    ) {
      setElementScroll(parent, location.x, location.y)
      parent.scrollOption = null
      return scrollSettings.end(COMPLETE)
    }

    const easeValue = 1 - scrollSettings.ease(timeValue)

    setElementScroll(parent,
      location.x - (location.differenceX * easeValue),
      location.y - (location.differenceY * easeValue)
    )

    animate(parent)
  })
}

function transitionScrollTo (target, parent, settings, callback) {
  const idle = !parent.scrollOption
  const lastSettings = parent.scrollOption
  const now = Date.now()
  let endHandler

  if (lastSettings) {
    lastSettings.end(CANCELED)
  }

  function end (endType) {
    parent.scrollOption = null
    if (parent.parentElement && parent.parentElement.scrollOption) {
      parent.parentElement.scrollOption.end(endType)
    }
    callback(endType)
    parent.removeEventListener('touchstart', endHandler)
  }

  parent.scrollOption = {
    startTime: lastSettings ? lastSettings.startTime : Date.now(),
    target,
    time: settings.time + (lastSettings ? now - lastSettings.startTime : 0),
    ease: settings.ease,
    align: settings.align,
    end
  }

  endHandler = end.bind(null, CANCELED)
  parent.addEventListener('touchstart', endHandler)

  if (idle) {
    animate(parent)
  }
}

function defaultIsScrollable (element) {
  if (!isClient) return
  return (
    element === window ||
        ((
          element.scrollHeight !== element.clientHeight ||
            element.scrollWidth !== element.clientWidth
        ) && getComputedStyle(element).overflow !== 'hidden')
  )
}

function defaultValidTarget () {
  return true
}

export default function (target, settings, callback) {
  if (!target) {
    return
  }

  if (typeof settings === 'function') {
    callback = settings
    settings = null
  }

  if (!settings) {
    settings = {}
  }

  settings.time = isNaN(settings.time) ? 1000 : settings.time
  settings.ease = settings.ease || function (v) { return 1 - Math.pow(1 - v, v / 2) }

  let parent = target.parentElement
  let parents = 0

  function done (endType) {
    parents -= 1
    if (!parents && callback) {
      callback(endType)
    }
  }

  const validTarget = settings.validTarget || defaultValidTarget
  const isScrollable = settings.isScrollable

  while (parent) {
    if (validTarget(parent, parents) && (isScrollable ? isScrollable(parent, defaultIsScrollable) : defaultIsScrollable(parent))) {
      parents += 1
      transitionScrollTo(target, parent, settings, done)
    }

    parent = parent.parentElement

    if (!parent) {
      return
    }

    if (parent.tagName === 'BODY') {
      parent = window
    }
  }
}
