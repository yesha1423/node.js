const express=require("express")
const fs=require("fs")
const app=express()
var cors = require('cors')
app.use(express.json())
app.use(cors());
// const {v4:uuidv4}=require("uuid")


// get data
app.get("/getdata",(req,res)=>{
  fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.send(data)
        }
  })  
})


// post data
// app.post("/postdata",(req,res)=>{
//     const newproduct=req.body
//     fs.readFile("./db.json", "utf-8",(err,data)=>{
//         if(err)
//         {
//             console.log(err)
//         }
        // else
        // {
            // res.send(data)
        //     const product=JSON.parse(data);
        //     newproduct=req.body;
        //     product.push(newproduct)
        //     newproduct.id=product.length+1;
        //     fs.writeFile("./db.json",JSON.stringify(product),(err)=>{
        //         if(err)
        //         {
        //             console.log(err)
        //             res.send(err)
        //         }
        //         else
        //         {
        //             res.send("product added")
        //             res.send({id:product.id})
        //         }
        //   })  
        
        // }
//         else {
//             let products = JSON.parse(data);
//             const newProduct = req.body;
//             // newProduct.id = uuidv4(); 
//             newProduct.id = products.length + 1;
//             products.push(newProduct);

//             fs.writeFile("./db.json", JSON.stringify(products), (err) => {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send("product added ..!");
//                     res.send({id:newProduct.id });
//                 }
//             })
//         }
//   })  
   
//   })

app.post("/postdata", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let products = JSON.parse(data);
            const newProduct = req.body;
            // newProduct.id = uuidv4(); 
            newProduct.id = products.length + 1;
            products.push(newProduct);

            fs.writeFile("./db.json", JSON.stringify(products), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("product added ..!");
                    res.send({ id: newProduct.id });
                }
            })
        }
    })
});

// delete data 
app.delete("/deletproduct/:productid",(req,res)=>{

    const {productid}=req.params;
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err)
        {
            res.send(err)

        }
        else
        {
            let newdata=JSON.parse(data)
            newdata=newdata.filter((el)=>el.id!=productid)
            // console.log(newdata)
            // res.send("ok")
            fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
                if(err)
                {
                    res.send(err)
                }
                else
                {
                    res.send("product deleted")
                }
            })
        }
    })
    console.log(productid)

})

// update data
// petch
app.patch("/updateproduct/:productid",(req,res)=>{
    let {productid}= req.params
    fs.readFile("./db.json", "utf-8" ,(err,data)=>{
        let newdata=JSON.parse(data);
        const index=newdata.findIndex((el)=>el.id==productid)
        if(index!=-1)
        {
            // console.log(newdata[index])
            // res.send("ok")
        newdata[index]={...newdata[index],...req.body};
        fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
            if(err)
            {
                res.send(err)
            }
            else
            {
                res.send("product updated")
            }
        })
        }
        else
        {
            res.send("product not matched")
        }       
    })
 

})


// add data
// app.post("/addproduct",(req,res)=>{
//     // res.send(req.body)
//     console.log(req.body)
//     // res.send("Product Added")
//     res.send(req.body)

//     fs.readFile("./db.json","utf-8",(err,data)=>{
//         if(err)
//         {
//             res.end(err)
//         }
//         else
//         {
//             // console.log(data)
//             // res.send(res.body)
//             const newdata=JSON.parse(data)
//             newdata.product.push(req.body)
//             res.send(res.body)
//             fs.writeFile("./db.json", JSON.stringify(newdata),(err)=>{
//                 if(err)
//                 {
//                     res.send(err)
//                 }
//                 else
//                 {
//                     res.send("data is added")
//                 }
//             })
//         }
//     })

// })


// Edit 
app.get("/getproduct/:id", (req, res) => {
    const { id } = req.params;
    
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const products = JSON.parse(data);
            const product = products.find(item => item.id == id);
            
            if (product) {
                res.send(product);
            } else {
                res.send("Product not found");
            }
        }
    })
});


app.listen(8080,()=>{
    console.log("server is running on 8080 port")
})