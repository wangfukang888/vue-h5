function getBase64Image(img : any) {  
  var canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext("2d") 
  ctx && ctx.drawImage(img, 0, 0, img.width, img.height) 
  var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase()
  var dataURL = canvas.toDataURL("image/"+ ext)
  return dataURL;  
}  

export function toBase64Image(img : any) {
  let image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.src = img 
  return new Promise( (resolve, reject) => {
    image.onload = () => {
      resolve( getBase64Image(image) )
    }
    image.onerror = () => {
      reject()
    }
  })
}