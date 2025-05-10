let editor;

document.addEventListener("DOMContentLoaded", function () {
  ClassicEditor
    .create(document.querySelector('#content'), {
      ckfinder: {
        uploadUrl: '/api/images/upload' 
      }
    })
    .then(newEditor => {
      editor = newEditor; 
      console.log('CKEditor initialized');
    })
    .catch(error => {
      console.error(error);
    });
});
