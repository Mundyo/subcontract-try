
const mongoose = require('mongoose');
const slugify = require('slugify');
const path = require('path');
const { isNull } = require('util');
const multer = require('multer');



const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  productionOrderId: {
    type: String,
    required: true,
  },
  fileUpload: {
    data: Buffer, 
    contentType: String, 
  },
  textArea: {
  type: String
  },
  customTextAreaProcessing: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: false
  }});

  formSchema.pre('validate', function(next) {
    if (this.name) {
      const timestamp = Date.now();
      this.slug = slugify(`${this.name} - ${timestamp}`, { lower: true, strict: true });
    }
  
    if (this.fileUpload && this.fileUpload.data) {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const contentType = this.fileUpload.contentType;
      if (!allowedMimeTypes.includes(contentType)) {
        const ext = path.extname(this.fileUpload.filename).toLowerCase();
        switch (ext) {
          case '.jpg':
          case '.jpeg':
            this.fileUpload.contentType = 'image/jpeg';
            break;
          case '.png':
            this.fileUpload.contentType = 'image/png';
            break;
          case '.gif':
            this.fileUpload.contentType = 'image/gif';
            break;
          default:
            this.fileUpload.contentType = 'application/octet-stream';
        }
      }
    }
  
    if (this.textArea !== null && this.issue === 'other') {
      this.customTextAreaProcessing = this.textArea;
      this.textArea = this.textArea;
    }
  
    next();
  });



const FormModel = mongoose.model('Form', formSchema);

module.exports = FormModel;



// formSchema.pre('validate', function(next) {
// if (this.name) {
//   const timestamp= Date.now();
//   this.slug = slugify( `${this.name} -${timestamp}`, { lower: true, strict: true })
// };

// if (this.fileUpload && this.fileUpload) {
//         const allowedMimeTypes = [ 'image/jpeg', 'image/png', 'image/gif'];
//         const contentType = this.fileUpload.contentType || '';
//          if (allowedMimeTypes.includes(contentType)) {
//            this.fileUpload.contentType = contentType;
//          } else {
//           const ext = path.extname(this.fileUpload.filename).toLowerCase();
//           switch (ext) {
//             case '.jpg':
//             case '.jpeg':
//               this.fileUpload.contentType = 'image/jpeg';
//               break;
//             case '.png':
//               this.fileUpload.contentType = 'image/png';
//               break;
//             case '.gif':
//               this.fileUpload.contentType = 'image/gif';
//               break;
//             default:
              
//               this.fileUpload.contentType = 'application/octet-stream';
//          }
// }

// if (this.textArea !== null && this.issue === 'other') {
  
//   this.customTextAreaProcessing = this.textArea;

//   this.textArea = this.textArea;
// }



 
// next()
// });