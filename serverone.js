const http = require("http");

const port = 3000;

// HTTP Methods
/*
 >>GET: Inorder to get data from server 
 >>POST: Sending data to server
 >>DELETE: Deleting the data from database
 >>PATCH: Updating certain fields
 >>PUT: Full Update
*/

const todolist = ["learn","apply-things","succedd"];

http.createServer((req,res) => {
    //call back function
    const {method,url} = req;
    
    if(url ==="/server"){
        if(method === "GET"){
            res.writeHead(200,{"content-Type":"text/html"});
            res.write(todolist.toString());
        }else if(method === "POST"){
            let body = "";
            req.on("error",(err)=>{
                console.log(err);
            }).on("data",(chunk)=>{
                body+=chunk;
                console.log(chunk);
            }).on("end",()=>{
                body = JSON.parse(body);

                let newToDo = todolist;
                newToDo.push(body.mServer);
                // let newToDo = todolist;
                // newToDo.pop(body.mServer);
                console.log(newToDo);
                // console.log("data:", body);
            });
        }else if(method === "DELETE"){
            let body = "";
            req.on('error',(err)=>{
                console.log(err);
            }).on("data",(chunk)=>{
                body += chunk;
            }).on("end",()=>{
                body = JSON.parse(body);
                let deleteThisItem = body.item;

                for (let index = 0; index < todolist.length; index++) {
                    if(todolist[index] === deleteThisItem){
                        todolist.splice(index,1);
                        break;
                    }else{
                        console.log("Error: match not found");
                        break;
                    }
                    
                }

                // todolist.find((item,index)=>{
                //     if(item === deleteThisItem){
                //         todolist.splice(index,1);
                //         console.log(todolist);
                //     }else{
                //         console.log("Error: match not found");
                //     }
                //});
            });
        }else{
            res.writeHead(501);
        }
    }else{
        res.writeHead(404);
    }
    
    
    res.end();
})
.listen(port,()=>{
    console.log(`NodeJs server started running on port:${port}`)
});
