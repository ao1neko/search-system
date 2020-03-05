# search-system
search system with incremental search
![サイト画像](https://raw.github.com/wiki/ao1neko/search-system/video/sample.mp4)  

# Usage
download wikipadea data  
```
curl -L -O https://dumps.wikimedia.org/enwiki/latest/enwiki-latest-pages-articles.xml.bz2   
bunzip2 enwiki-latest-pages-articles.xml.bz2
```

install elasticsearch  
```
brew install elasticsearch
```  

install Node.js, npm  
```
sudo apt install -y nodejs npm  
node search.js create  
npm run dev
```

access `localhost:8080`  
