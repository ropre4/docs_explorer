/* globals $ */
/* eslint-env node, dirigible */
 
var streams = require('io/streams');
var documentLib = require("docs_explorer/lib/document_lib");
 
 
exports.uploadImageWithResize = function(folder, image, width, height){
                var fileName = image.name;
                var mimetype = image.contentType;
                var inputStream = image.getInputStream();
               
                var imageType = mimetype.split('/')[1];
               
                var bufferedImage = javax.imageio.ImageIO.read(inputStream.getInternalObject());
                var scaledImage = bufferedImage.getScaledInstance(width, height, java.awt.Image.SCALE_SMOOTH);
               
                var type = bufferedImage.getType();
                var buffer = new java.awt.image.BufferedImage(width, height, type);
                buffer.getGraphics().drawImage(scaledImage, 0, 0, null);
               
                var file = java.io.File.createTempFile(fileName, "");
                javax.imageio.ImageIO.write(buffer, imageType, file);
                               
                var fis = new java.io.FileInputStream(file.getPath());
               
                image.getInputStream = function(){
                                return new streams.InputStream(fis);
                }
 
                documentLib.uploadDocument(folder, image);
};