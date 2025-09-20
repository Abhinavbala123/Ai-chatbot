import { useMutation, useQueryClient } from '@tanstack/react-query'
import './dashBoardPage.css'
import { useNavigate } from 'react-router-dom'
const DashBoardPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (text)=>{
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({text}),
    }).then((res)=>res.json());
    },
    onSuccess: (response) => {
      const id = response._id; // extract _id from returned chat object
      queryClient.invalidateQueries({ queryKey: ['userChats'] })
      navigate(`/dashboard/chats/${id}`);
    },
  })
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const text = e.target.text.value;
    if(!text)return ;
    mutation.mutate(text);
  }
  return (
    <div className='dashBoardPage'>
      <div className="texts">
        <div className="logo">
          <img src='/logo.png' alt=''/>
          <h1>CHATBOT</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src='/chat.png' alt=''/>
            <span>Create a new Chat</span>
          </div>
          <div className="option">
            <img src='/image.png' alt=''/>
            <span>Analyze Image</span>
          </div>
          <div className="option">
            <img src='/code.png' alt=''/>
            <span>Code Editor</span>
          </div>
        </div>
      </div>
      <div className="formcontainer">
        <form onSubmit={handleSubmit}>
          <input type='text' name='text' placeholder='Ask me anything..'/>
          <button>
            <img src='/arrow.png' alt=""/>
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashBoardPage