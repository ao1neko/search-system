<template>
  <div class="row">
    <div class="col-md-10">
      <input type="text" v-model="message" placeholder="edit me">
      <b-button
        size="lg"
        variant="outline-primary"
        v-on:click="history">
        Bootstrap Button
      </b-button>
      <div>
          <li v-for="item in pageOfItems">
              <p>{{item._source.title}}</p>
              <p>{{item._source.abstract}}</p>
          </li>
          <jw-pagination :items="reversedMessage" @changePage="onChangePage"></jw-pagination>
      </div>
    </div>
    <div class="col-md-2">
      <h2>history</h2>
      <li v-for="item in history_list">
              <p>{{item.name}}</p>
      </li>
		</div>
  </div>
</template>





<script>
import axios from 'axios'

export default {
  name: 'Hello',
  data(){
    return{
      message:"Hello",
      pageOfItems: [],
      history_list:null,
      }
  },
   created (){
        this.testFunction();
  },
  methods: {
      onChangePage(pageOfItems) {
          this.pageOfItems = pageOfItems;
      },
      history(){
        var postdata = new URLSearchParams();
        postdata.append('search_key', this.message);

        axios
        .post('/api/history',postdata)
        .then(response => (this.history_list= response.data.data));
      },
      testFunction() {
        var v=this;
        setInterval(function(){
         axios
        .get('/api/sync')
        .then(response => (v.history_list=response.data.data));
        },2000);
      },
  },
  asyncComputed: {
    reversedMessage() {
        var postdata = new URLSearchParams();
        postdata.append('search_key', this.message);

        return axios
        .post('/api/post',postdata)
        .then(response => response.data.hits)
    } 
  },
  watch:{
    history_list:function(newvalue,oldvalue){
    }
  }
}
</script>