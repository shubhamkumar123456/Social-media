
import { Modal } from 'antd';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const Sidebarcomp = () => {

    let userSlice = useSelector((state)=>state.user);
    console.log(userSlice)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uloadedFiles, setuloadedFiles] = useState('');
    const [liveFiles, setliveFiles] = useState('');
    let titleRef = useRef()
    let descriptionRef = useRef();
  

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFileChanger = async(e)=>{
        let files = e.target.files;
        // console.log(files)
        let filesArr =[...files]; //[{}, {}, {}]


      
       let imagesArr = filesArr.map((ele)=>{
        let formData = new FormData();
        formData.append('upload_preset','evening')
          formData.append('file',ele)
            let res = axios.post('https://api.cloudinary.com/v1_1/dsf7eyovf/upload',formData);
            return res
        })

        let ans = await Promise.all(imagesArr);
        console.log(ans)

        let liveArr = [];
        if(ans){
            ans.forEach((ele)=>{
                liveArr.push(ele.data.secure_url)
            })
        }
        setliveFiles(liveArr)
       

       setuloadedFiles(filesArr);
    }


    const handleSubmit = async(e)=>{
        e.preventDefault()
        let obj = {
            title:titleRef.current.value,
            description:descriptionRef.current.value,
            file:liveFiles
        }

        console.log(obj)
      try {
        let res = await axios.post('http://localhost:8080/posts/create',obj,{
            headers:{
                'Authorization':userSlice.token
            }
        })
        let data = res.data;
        console.log(data)
        if(res.status==201){
            toast.success(data.msg,{position:"top-center"})
            titleRef.current.value = ""
            descriptionRef.current.value = ""
            setuloadedFiles('')
            setIsModalOpen(false);
        }else{
            toast.error('something went wrong',{position:'top-center'})
        }
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div>
            <ul className='flex shrink-0 flex-col text-center'>
                <li className='p-3 border-b text-black'><Link to={'/'}>Home</Link></li>
                <li onClick={showModal} className='p-3 border-b text-black'>Create Post</li>
                <li className='p-3 border-b text-black'>Message</li>
                <li className='p-3 border-b text-black'>Followers</li>
                <li className='p-3 border-b text-black'>Followings</li>
            </ul>


            <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <form action="" className='w-full h-full flex flex-col gap-3'>
              <label htmlFor="">Title</label>
                <input ref={titleRef} className='px-4 py-2 rounded-md border' type="text" placeholder='enter title'/>

                <label htmlFor="">Description</label>
                <textarea ref={descriptionRef} className='px-4 py-2 rounded-md border' name="" id=""></textarea>

                <label  className='bg-green-700 rounded-md text-center w-max hover:bg-green-600 px-4 py-2 text-white' htmlFor="file">Upload</label>
                <input  onChange={handleFileChanger} id='file' multiple hidden type="file" />
{uloadedFiles && <div className='grid grid-cols-3 gap-1 '>
    
{
                    uloadedFiles?.map((ele,i)=>{
                       return ele.type.includes('image')? <img className='w-[150px] h-[150px] m-auto' src={URL.createObjectURL(ele)} alt="" /> : <video className='w-[150px] h-[150px] m-auto ' controls src={URL.createObjectURL(ele)}></video>
                    })
                }
</div>}
                {/* <img className='w-[150px] h-[150px] m-auto' src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" alt="" /> */}
               {/* <video src=""></video> */}
                <button onClick={handleSubmit} className='bg-blue-700 rounded-md hover:bg-blue-600 px-4 py-2 text-white'>Post</button>
              </form>
            </Modal>
        </div>
    )
}

export default Sidebarcomp
