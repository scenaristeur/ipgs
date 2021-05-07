import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )
import { loadJsonld } from './ouiz-json.js';

export async function loadFolder(s){
  console.log(s.url)
  let folder = await fc.readFolder(s.url)
  if (folder.size == undefined){
    return await loadJsonld(s)
  }else{
    console.log(folder)
    return await this.folderToGraph(folder)
  }
}

export async function loadTtl(s){
    console.log(s.url)
      return await this.rdfParse(s)
}
