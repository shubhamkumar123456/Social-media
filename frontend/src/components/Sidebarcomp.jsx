import { Modal } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebarcomp = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uloadedFiles, setuloadedFiles] = useState([]);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFileChanger = (e)=>{
        let files = e.target.files;
        console.log(files)
        let filesArr =[...files];
       setuloadedFiles(filesArr)
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
                <input className='px-4 py-2 rounded-md border' type="text" placeholder='enter title'/>

                <label htmlFor="">Description</label>
                <textarea className='px-4 py-2 rounded-md border' name="" id=""></textarea>

                <label  className='bg-green-700 rounded-md text-center w-max hover:bg-green-600 px-4 py-2 text-white' htmlFor="file">Upload</label>
                <input onChange={handleFileChanger} id='file' multiple hidden type="file" />
<div className='flex justify-center items-start'>
    
{
                    uloadedFiles?.map((ele,i)=>{
                       return ele.type.includes('image')? <img className='w-[150px] h-[150px] m-auto' src={URL.createObjectURL(ele)} alt="" /> : <video className='w-[150px] h-[150px] m-auto ' controls src={URL.createObjectURL(ele)}></video>
                    })
                }
</div>
                <img className='w-[150px] h-[150px] m-auto' src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" alt="" />
               {/* <video src=""></video> */}
                <button className='bg-blue-700 rounded-md hover:bg-blue-600 px-4 py-2 text-white'>Post</button>
              </form>
            </Modal>
        </div>
    )
}

export default Sidebarcomp
