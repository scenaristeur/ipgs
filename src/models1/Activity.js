import { v4 as uuidv4 } from 'uuid';
import auth from 'solid-auth-client';
import FC from 'solid-file-client'
const fc = new FC( auth )
import ldflex from '@solid/query-ldflex/lib/exports/rdflib'
import { namedNode } from "@rdfjs/data-model";
let agora = "https://ipgs.solidcommunity.net/public/activity/"
let log = agora+'log.ttl'


export default class Activity {
  constructor() {
    this.jsonld = {
      "@context": "https://www.w3.org/ns/activitystreams",
      "@type": "Create",
      "@id": agora+'data/'+uuidv4()+".json",
    //  "actor": "https://example.net/~mallory",
      "object": {
        "id": "https://example.com/~mallory/note/72",
        "type": "Note",
        "attributedTo": "https://example.net/~mallory",
        "content": "This is a note",
        "published": "2015-02-10T15:04:55Z",
        "to": ["https://example.org/~john/"],
        "cc": ["https://example.com/~erik/followers",
        "https://www.w3.org/ns/activitystreams#Public"]
      },
      "published": new Date(),
      "to": ["https://example.org/~john/"],
      "cc": ["https://example.com/~erik/followers",
      "https://www.w3.org/ns/activitystreams#Public"]
    }
  }

  async publish(){
    console.log(this.jsonld.['@id'])


    await fc.postFile(this.jsonld['@id'], JSON.stringify(this.jsonld), 'application/json').then(
      async function(f) {
        console.log(f)
        //    console.log(f.headers.get('location'))

        let loc = f.headers.get('location')
        console.log("Activity send", loc)

        await  ldflex[log]['https://www.dublincore.org/specifications/dublin-core/dcmi-terms/hasPart'].add(namedNode(loc))

        //  this.getData({url: res_url, group: ""})
      }
    )

  }

}
