<template>
  <div>
    <!-- <b-button v-b-modal.share_current>Share</b-button> -->
    <b-button size="sm" :variant="'outline-'+variant"  @click.stop="share()">
      <b-icon-share @click.stop="share()" :variant="variant" ></b-icon-share>
    </b-button>

    <b-modal :id="'share-modal'+it.url" title="Share">
      {{it.url}}<br>
      <!-- https://nicolasbeauvais.github.io/vue-social-sharing/?path=/story/vuesocialsharing--dynamic-data -->
      <ShareNetwork
      v-for="network in networks"
      :network="network.network"
      :key="network.network"
      :style="{backgroundColor: network.color}"
      :url="sharing.url"
      :title="sharing.title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitterUser="sharing.twitterUser"
      >
      <b-button :style="{backgroundColor: network.color}" class="p-2">
        <i :class="network.icon"></i>
        <span>{{ network.name }}</span>
      </b-button>
    </ShareNetwork>
  </b-modal>
</div>
</template>

<script>
export default {
  name: "Share",
  props: {
    item: Object,
    default: {url: "https://scenaristeur.github.io/ipgs", name: "InterPlanetaryGraphSystem"},
    variant: {
      type: String,
      default: "warning"
    },
  },
    data(){
      return {
        it: {},
        sharing: {
          url: 'https://scenaristeur.github.io/ipgs',
          title: 'InterPlanetary Graph System.',
          description: 'Check out this IPGS graph.',
          quote: 'Best way to easily share your thought',
          hashtags: 'InterPlanetaryGraphSystem,ipgs,decentralized,Solid,nodejs,vuejs',
          twitterUser: 'dfaveris'
        },
        networks: [
          { network: 'sms', name: 'SMS', icon: 'far fah fa-lg fa-comment-dots', color: '#333333' },
          { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
          { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
          { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
          { network: 'tumblr', name: 'Tumblr', icon: 'fab fah fa-lg fa-tumblr', color: '#35465c' },
          { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
          { network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
          { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
          { network: 'evernote', name: 'Evernote', icon: 'fab fah fa-lg fa-evernote', color: '#2dbe60' },
          { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
          { network: 'flipboard', name: 'Flipboard', icon: 'fab fah fa-lg fa-flipboard', color: '#e12828' },
          { network: 'hackernews', name: 'HackerNews', icon: 'fab fah fa-lg fa-hacker-news', color: '#ff4000' },
          { network: 'instapaper', name: 'Instapaper', icon: 'fas fah fa-lg fa-italic', color: '#428bca' },
          { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
          { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
          { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki', color: '#ed812b' },
          { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
          { network: 'pocket', name: 'Pocket', icon: 'fab fah fa-lg fa-get-pocket', color: '#ef4056' },
          { network: 'quora', name: 'Quora', icon: 'fab fah fa-lg fa-quora', color: '#a82400' },
          { network: 'stumbleupon', name: 'StumbleUpon', icon: 'fab fah fa-lg fa-stumbleupon', color: '#eb4924' },
          { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
          { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
          { network: 'weibo', name: 'Weibo', icon: 'fab fah fa-lg fa-weibo', color: '#e9152d' },
          { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
          { network: 'xing', name: 'Xing', icon: 'fab fah fa-lg fa-xing', color: '#026466' },
          { network: 'yammer', name: 'Yammer', icon: 'fab fah fa-lg fa-yammer', color: '#0072c6' },
          { network: 'baidu', name: 'Baidu', icon: 'fas fah fa-lg fa-paw', color: '#2529d8' },
          { network: 'buffer', name: 'Buffer', icon: 'fab fah fa-lg fa-buffer', color: '#323b43' },
          //  { network: 'ipgs', name: 'IPGS', icon: 'fab fah fa-lg fa-vuejs', color: '#41b883' }
          //  { network: 'fakeblock', name: 'Custom Network', icon: 'fab fah fa-lg fa-vuejs', color: '#41b883' }
        ]
      }
    },
    created(){
      if (this.item == undefined  || (this.item.url == undefined && this.$route.query.url != undefined )){
        this.it.url = this.$route.query.url
        this.it.name = 'ipgs'
        console.log(this.it)
      }else{
        this.it = this.item
      }

    },

    methods: {
      async share(){
        if (this.it.url == undefined && this.$route.query.url != undefined ){
          this.it.url = this.$route.query.url
          this.it.name = 'ipgs'
          console.log(this.it)
        }
        //let short = await
        // fetch("https://link.infini.fr/a", {
        //   method: "POST",
        //   body: new URLSearchParams({
        //     "lsturl": "https://scenaristeur.github.io/ipgs", //?url="+this.item.url,
        //     "lsturl-custom":  "hello",
        //     "format": 'json'
        //   }),
        //   mode: 'no-cors',
        // })
        // .then(response => {
        // //  console.log(response)
        //   response.json()
        // })
        // .then(data => {
        //   console.log(data)
        // })
        // .catch(console.error);
        //  let rep = JSON.parse(`${short}`)
        //  //  let json = rep.json()
        // console.log(rep)
        // .then(response => {
        // return
        //   // response.json()
        // })
        //  .then(json => {
        //     console.log(json)
        // })
        // .then(json => {
        //   console.log(json)
          this.sharing.url = this.it.url != undefined ? 'https://scenaristeur.github.io/ipgs/?url='+this.it.url : "https://scenaristeur.github.io/ipgs"
          this.sharing.description = 'Check out this IPGS graph :'+this.it.name
          //  this.sharing.title = 'IPGS',
          //  text: 'Check out this IPGS graph.',
          //  url: 'https://scenaristeur.github.io/ipgs/?url='+this.url,
          this.$bvModal.show("share-modal"+this.it.url)
        //
        // })
      }
    }
  }
  </script>

  <style>

  </style>
