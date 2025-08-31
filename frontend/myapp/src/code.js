import React, { useState } from 'react';
import './code.css';
import axios from 'axios';
import { toast } from 'react-toastify';


function App1() {
  const [code, setCode] = useState('');
  const [coderesponse, setCoderesponse] = useState('Here is the output');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/review/code', { code });
      setCoderesponse(response.data.ans); // assuming backend sends { ans: "...output..." }
      toast.success('Here is the response')
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(error.message)
      setCoderesponse('An error occurred. Please try again.');
    }
  };

  return (
    <div className="main">
      <div className="writingarea">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
        />
        <div className='btn'>
          <button className='submit' onClick={handleSubmit}>Submit Code</button>
        </div>
      </div>

      <div className="showarea">
        <pre>
          <code>
            {coderesponse}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default App1;
