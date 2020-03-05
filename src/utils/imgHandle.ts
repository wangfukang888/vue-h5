//图片转base64
function getBase64Image(img: any) {
  const canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext("2d")
  ctx && ctx.drawImage(img, 0, 0, img.width, img.height)
  let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase()
  let dataURL = canvas.toDataURL("image/" + ext)
  return dataURL
}

//base64转file
function dataURLtoFile(dataurl: string, filename: string) {
  let arr: any = dataurl.split(','),
    bstr = atob(arr[1]), n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename)
}

export function toBase64Image(img: any) {
  let image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.src = img
  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve(getBase64Image(image))
    }
    image.onerror = () => {
      reject()
    }
  })
}

// 压缩图片
export function compress(img: any, Orientation: any, fn: Function) {
  // 修复ios图片旋转的问题
  getRotateImg(img, Orientation).then(newImg => {
    let originWidth = newImg.width, 
      originHeight = newImg.height,
      maxWidth = 400,
      quality = 0.9, // 压缩质量
      canvas = document.createElement('canvas'),
      drawer = canvas.getContext("2d")
    canvas.width = maxWidth
    canvas.height = originHeight / originWidth * maxWidth
    drawer && drawer.drawImage(newImg, 0, 0, canvas.width, canvas.height)
    let base64 = canvas.toDataURL("image/jpeg", quality)  // 压缩后的base64图片
    let file: any = dataURLtoFile(base64, Date.parse(Date()) + '.jpg')
    //压缩后的file
    file = { content: base64, file: file }
    fn && fn(file)
  })
}

// 图片旋转
async function getRotateImg(img: any, or: any) {
  let imgs = img
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  // 图片原始大小
  const width = img.width
  const height = img.height
  canvas.width = width
  canvas.height = height
  ctx && ctx.drawImage(img, 0, 0, width, height)
  switch (or) {
    case 6: // 顺时针旋转90度
      imgs = await rotateImg(img, 'right', canvas)
      break
    case 8: // 逆时针旋转90度
      imgs = await rotateImg(img, 'left', canvas)
      break
    case 3: // 顺时针旋转180度
      imgs = await rotateImg(img, 'right', canvas, 2)
      break
    default:
      break
  }
  return imgs
}

/**
 * @desc 旋转canvas，会对源数据canvas进行修改
 * @param {Object} img 图片文件
 * @param {String} dir 方向 left逆时针|right顺时针
 * @param {Object} canvas 画布
 * @param {Number} s 向指定方向旋转几步，1步为90度
 */

const rotateImg = (img: any, dir = 'right', canvas: any, s = 1) => {
  const MIN_STEP = 0
  const MAX_STEP = 3

  const width = canvas.width || img.width
  const height = canvas.height || img.height
  let step = 0

  if (dir === 'right') {
    step += s
    step > MAX_STEP && (step = MIN_STEP)
  } else {
    step -= s
    step < MIN_STEP && (step = MAX_STEP)
  }

  const degree = step * 90 * Math.PI / 180
  const ctx = canvas.getContext('2d')

  switch (step) {
    case 1:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, 0, -height, width, height)
      break
    case 2:
      canvas.width = width
      canvas.height = height
      ctx.rotate(degree)
      ctx.drawImage(img, -width, -height, width, height)
      break
    case 3:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, -width, 0, width, height)
      break
    default:
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      break
  }
  return new Promise((resolve) => {
    let base64 = canvas.toDataURL("image/jpeg")
    let imgs = new Image()
    imgs.src = base64
    imgs.onload = function () {
      resolve(imgs)
    }
  })
}
