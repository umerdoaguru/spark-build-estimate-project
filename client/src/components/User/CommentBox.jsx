import axios from 'axios';
import cogoToast from 'cogo-toast';
import React, { useEffect, useState } from 'react'
import { FaComment, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function CommentBox({refresh}) {
   
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const token = user?.token;
    const [userprofile, setUserProfile] = useState([]);
const [comments, setComments] = useState([]);
  const [question, setQuestion] = useState("");

      



  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://estimate-project.dentalguru.software/api/comment/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitQuestion = async () => {
    if (!question.trim()) return;

    try {
      await axios.post(
        "https://estimate-project.dentalguru.software/api/comment",
        { question,
            user_id:user.id,
            name:user.name
         },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      setQuestion("");
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
 

  return (
    <>

  <>
 <div className="flex ">
    <button
      onClick={toggleCart}
      className="fixed top-15 right-5 bg-yellow-500 font-bold  p-3 rounded-full shadow-lg focus:outline-none"
      aria-label="Toggle Cart"
    >
      <div className="text-center flex">
      <FaComment className="text-2xl" />
       <h2 className='mx-2'>Ask for help</h2> 
        </div>
      {comments.length > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {comments.length}
        </span>
      )}

    </button>
   
  </div>

  {isCartOpen && (
      <div className="2xl:w-[30%]  2xl:ml-40 mx-4  p-4 bg-white border border-gray-300 rounded-md shadow-lg xl:fixed top-20 right-10 z-50">
        {/* Close Button */}
        <button
          onClick={() => setIsCartOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          ✖
        </button>
    
          <div className="p-4 w-full max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Ask a Question</h2>

      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Type your question..."
      />

      <button
        onClick={submitQuestion}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Submit
      </button>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Your Questions</h3>

        {comments.length === 0 ? (
          <p className="text-gray-500">No questions yet.</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className="border p-3 rounded mb-3">
              <p className="font-bold">Q: {c.question}</p>
              <p className="text-green-600 mt-1">
                A: {c.answer ? c.answer : "Pending from admin..."}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
      </div>
       
    )}



  </>

    
    </>
  )
}

export default CommentBox