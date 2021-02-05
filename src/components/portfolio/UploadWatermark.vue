<template>
  <div class="container">
    <b-form-file multiple
    accept="image/*"
    v-model="files"
    :state="Boolean(files)"
    placeholder="Choose a file or drop it here..."
    drop-placeholder="Drop file here..."
    @input="onInput"
    ></b-form-file>

    <div ref="preview"></div>
    <b-button @click="send">Envoyer</b-button>
  </div>
</template>

<script>
let ldflex = window.solid
import FC from 'solid-file-client'
const fc = new FC( window.solid.auth )
import watermark from 'watermarkjs'

export default {
  name: 'Upload',
  data() {
    return {
      files: null
    }
  },
  methods: {
    async onInput(files){
      console.log(files)
      let preview = this.$refs.preview
      let storage = await ldflex.data.user.storage
      let path = `${storage}`+'public/portfolio/'
      await files.forEach(async function(f)  {
        console.log(f)
        watermark([f])
        .image(watermark.text.center(path, '30px Josefin Slab', '#fff', 0.8))
        .then(img => {
          img.name = f.name
          img.type = f.type
          preview.appendChild(img)});
        })
      },
      async send(){
        let preview = this.$refs.preview
        let dataURLtoFile = this.dataURLtoFile
        var images = [].slice.call(preview.children);
        console.log(images)
        let storage = await ldflex.data.user.storage
        let path = `${storage}`+'public/portfolio/'
        console.log(path)
        await images.forEach(async function(i)  {
          console.log(i)
          //  let uri = f.webkitRelativePath.length > 0 ? path+f.webkitRelativePath : path+f.name
          let uri = path+i.name
          console.log(encodeURI(uri))
          //Usage example:
          var file = dataURLtoFile(i.src,i.name);
          console.log(file);
          await fc.createFile(encodeURI(uri), file, i.type)
        })
      },
      dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
      },
      async onInput1(files) {
        console.log(files)
        let storage = await ldflex.data.user.storage
        let path = `${storage}`+'public/portfolio/'
        console.log(path)
        await files.forEach(async function(f)  {
          console.log(f)
          let uri = f.webkitRelativePath.length > 0 ? path+f.webkitRelativePath : path+f.name
          console.log(encodeURI(uri))
          await fc.createFile(encodeURI(uri), f, f.type)
        })
      }
    }
  }
  </script>
