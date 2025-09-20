import { useRef, useState } from 'react';
import './newprompt.css'
import { useEffect } from 'react';
import Upload from '../upload/upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from "react-markdown"
const Newprompt = () => {

  
  const [img,setImg]=useState({
    isLoading:false,
    error:"",
    dbData:{},
    aiData:{}
  });
  const chat = model.startChat({
    history:[
    {
      role:"user",
      parts:[{text:"Hello there"}]
    },{
      role:"model",
      parts:[{text:"Hola!!! Great to meet you!"}]
    },
  ]
  })
  const [question,setQuestion] = useState("")
  const [answer,setAnswer] = useState("")
  const endRef = useRef(null)
  useEffect(()=>{
    endRef.current.scrollIntoView({behavior:"smooth"});
  },[question,answer,img.dbData])
  const add= async(text)=> {
    setQuestion(text)
    const result = await chat.sendMessageStream(
      Object.entries(img.aiData).length?[img.aiData,text]:[text]
    );
    let finalstring =''
    for await (const chunk of result.stream){
      const chunktext = chunk.text();
      console.log(chunktext);
      finalstring+=chunktext;
      setAnswer(finalstring)
    }
    setImg({
    isLoading:false,
    error:"",
    dbData:{},
    aiData:{}
    });
}
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const text = e.target.text.value;
    if(!text)return;
    add(text);
  };
  return (
    <>
    {img.isLoading&&<div className=''>Loading...</div>}
    {img.dbData?.filePath &&(
      <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
      path={img.dbData?.filePath}
      width={"600"}
        transformation={{width:380}}
      />
    )}
    {question&& <div className='message user'>{question}</div>}
    {question&& <div className='message'><Markdown>{answer}</Markdown></div>}
    <div className="endchat" ref={endRef}></div>
        <form className='newform' onSubmit={handleSubmit}>
        <Upload setImg={setImg}/>
        <input id = "file"type="file" multiple={false} hidden />
        <input type="text" name = "text" placeholder='Ask me Anything...' />
        <button>
            <img src="/arrow.png" alt="" />
        </button>
        </form>
    </>
  )
}

export default Newprompt