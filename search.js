var fs = require('fs');
var XmlStream=require('xml-stream');
var elasticsearch = require('elasticsearch');

var mode=process.argv[2];
const instream =fs.createReadStream('enwiki-latest-abstract.xml');
const xml=new XmlStream(instream);

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

async function run (){
    if(mode==='help'){
        console.log('display:\ntest_create:\ndelete:\n')
    }else if(mode==='display'){
        const { body } = await client.search({
            index: 'article',
            body: {
              query: {
                //match: { 
                  //  quote: 'winter' 
                //}
                match_all: {}
              }
            }
          })
          console.log(body.hits.hits)
    }else if(mode==="delete"){
        client.indices.delete({
            index: '_all',
        }, function(err, res) {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Indexes have been deleted!');
            }
        });
    }else if(mode==="create"){

        xml.on('endElement: doc',function(item){
            //console.log(item['title'].slice(11));
            //console.log(item['abstract']);
            client.index({
                index: 'article',
                body: {
                  title:item['title'].slice(11) ,
                  abstract: item['abstract'],
                  properties: {
                    'title': {
                        'type': 'string', // type is a required attribute if index is specified
                        'analyzer': 'english'
                    },
                    'abstract': {
                        'type': 'string', // type is a required attribute if index is specified
                        'analyzer': 'english'
                    }
                  }
                }
            })
        });
    }else if(mode==="search"){
        client.search({
            index: 'article',
            body: {
              query: {
                multi_match: { 
                    query: 'Aldous',
                    fields: ['title', 'abstacrt']
              },
              }
            }
          }).then(function (resp) {

            console.log(resp.hits.hits);//配列です
        });
        
    }
    //xml.pause();
}

run()