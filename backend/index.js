import dotenv from "dotenv";
dotenv.config();
import express from "express"
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import Userchat from "./models/userchat.js";
import { requireAuth } from '@clerk/express';

const port  = process.env.PORT || 3000
const app = express();
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin === process.env.CLIENT_URL) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
})
);
app.use(express.json());
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to mongodb succesfully")
    }catch(err){
        console.log("Error");
    }
}
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT, // https://ik.imagekit.io/your_imagekit_id
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
  });
app.get("/api/upload",(req,res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})
// app.get("/api/test",requireAuth(),(req,res)=>{
//     const userId = req.auth.userId;
//     console.log(userId);
//     res.send("Success");
//     console.log("Success");
// })
app.post("/api/chats",requireAuth() ,async(req,res)=>{
    const {userId} = await req.auth();
    const {text} = req.body;
    try{
        const newchat = new Chat({
            userId:userId,
            history:[{role:"user",parts:[{text}]}],
        })
        const savedChat = await newchat.save();
        const userchats = await Userchat.find({userId:userId})
        if(!userchats.length){
            const newuserchats = new Userchat({
                userId:userId,
                chats:[
                    {
                        _id:savedChat._id,
                        title: text.substring(0,40),                       
                    }
                ]
            })
            await newuserchats.save();
        }else{
            await Userchat.updateOne({userId:userId},{
                $push:{
                    chats:{
                        _id:savedChat._id,
                        title:text.substring(0,40),
                    }
                }
            })
            res.status(201).send({ _id: savedChat._id });
        }
    }catch(err){
        console.log(err)
        res.status(500).send("error creating chat!")
    }
})
app.get("/api/userchats",requireAuth(),async(req,res)=>{
    const {userId} = await req.auth();
    try{
        const userchats =await  Userchat.find({userId});
        res.status(200).send(userchats[0].chats)
    }catch(err){
        console.log(err)
        res.status(500).send("Error fetching userchats!")
    }
})
app.get("/api/chats/:id", requireAuth(), async (req, res) => {
    const { userId } = await req.auth();
    const chatId = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).send("Invalid chat ID");
    }
  
    try {
      const chat = await Chat.findOne({ _id: chatId, userId });
      if (!chat) {
        return res.status(404).send("Chat not found");
      }
      res.status(200).send(chat);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching chats!");
    }
  });
  
app.listen(port,()=>{
    connect();
    console.log(`Server is running on http://localhost: ${port}`)
})