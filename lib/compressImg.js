const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

imagemin(['public/image/perpetualTasteImg/*.{jpg,png}'], {
  destination: 'public/compressedimages',
  plugins: [
    mozjpeg({quality: 70}),
    pngquant({quality: [0.6, 0.8]})
  ]
});
