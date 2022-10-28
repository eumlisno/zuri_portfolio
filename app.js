const path = require('path')
const fs = require('fs')
const http = require('http')
const port = 3000

const server = http.createServer((req, res) =>{
    // if(req.url === '/' ){
    //     let filepath = path.join(__dirname, 'public', index.html)
    //     fs.readFile(filepath, 'utf-8', (err, data) => {
    //        res.writeHead(200, {'Content-Type ': 'text/html'})
    //        res.end(data) 
    //     })
    // }
    let filePath = path.join(__dirname, 'public', 
        req.url === '/' ? 'index.html': req.url)
    let contentType = getContentType(filePath) || 'text/html'
    let emptyPagePath = path.join(__dirname, 'public', '404.html')
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if(err){
            if(err.code === 'ENDENT'){
                fs.readFile(emptyPagePath, 'utf-8', (err, content) => {
                    res.writeHead(404, {'Content-Type': contentType})
                    res.end(content)
                })
            }
            else{
                res.writeHead(500)
                res.end('A server error has occurred')
            }
        }
        else{
            res.writeHead(200, {'Content-Type': contentType})
            res.end(content)
        }
    })
})

const getContentType =(filePath) => {
    let extname = path.extname(filePath)
    if (extname === '.js'){
        return 'text/javascript'
    }
    if (extname === '.css'){
        return 'text/css'
    }
    if (extname === '.jpg'){
        return 'image/jpg'
    }
    if (extname === '.png'){
        return 'image/png'
    }

}

server.listen(port, () => {
    console.log(`Listening on port: ${port}`)
    console.log('ok')
})