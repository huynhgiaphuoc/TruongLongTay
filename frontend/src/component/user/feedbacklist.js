import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Stu, Acc } from '../layout/layoutstudents';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:8888/student/getfeedback")
      .then(res => {
        console.log(res.data);
        const dt = res.data;
        const list = dt.map(item => ({
          id: item.FeedbackID,
          content: item.Content,
          day: item.Daymake,
          email: item.Email,
          name: item.Nameuser
        }))
        setFeedbacks(list);
      }).catch(err => {
        console.log('Error fetch data: ' + err);
      })
  }, []);

  let navigate = useNavigate();

  let handleAddFB = () => {
    navigate({ pathname: '/addfb' })
  }

  const handleUpdate = (fb) => {
    navigate(`/updatefb/${fb}`, { state: { feedback: fb } });
  }

  const deleteFeedback = (feedbackID) => {
    fetch(`http://localhost:8888/student/delete/${feedbackID}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Phản hồi đã được gửi thành công:', response.data);
          alert('Phản hồi đã được xóa thành công');
          setFeedbacks(feedbacks);
          // Fetch lại danh sách feedback nếu cần

        } else {
          console.error('Không xóa được phản hồi', response.status);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // hiện hình
  return (
    <div className='flex justify-between bg-[#f1ebe6]'>
      <Stu />
      <div className="container">
        <h2>Feedback List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Content</th>
              <th>Date</th>
              <th>Time</th>
              <th>User Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={feedback.id}>
                <td>{index + 1}</td>
                <td>{feedback.content}</td>
                <td>{feedback.day}</td>
                <td>{feedback.email}</td>
                <td>{feedback.name}</td>
                <td>
                  {/* <button onClick={() => deleteFeedback(feedback.feedbackID)}>Xóa</button> */}
                  <button className="btn btn-danger" onClick={() => {
                    console.log("Feedback ID:", feedback.id);
                    deleteFeedback(feedback.id);
                  }}>Delete</button>
                  <button className="btn btn-primary" onClick={() => handleUpdate(feedback.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success form-control" onClick={handleAddFB}>ADD Feedback</button>
      </div>
      <Acc />
    </div>
  );
};

//create nè
const CreateFeedback = () => {
  const [feedback, setFeedback] = useState({
    content: '',
    daymake: new Date().toISOString().slice(0, 10),
    email: '',
    nameuser: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8888/student/create', feedback)
      .then((response) => {
        if (!feedback.content || !feedback.email || !feedback.nameuser) {
          alert('Vui lòng điền đầy đủ thông tin trước khi gửi!');
          return; // Ngăn không cho submit nếu có ô trống
        }
        console.log('Feedback created successfully:', response.data);
        alert('Phản hồi đã được gửi thành công!');
        // Xóa form sau khi gửi
        setFeedback({
          content: '',
          daymake: new Date().toISOString().slice(0, 10),
          email: '',
          nameuser: ''
        });
      })
      .catch((error) => {
        console.error('There was an error creating the feedback!', error);
      });
  };

  return (
    <div className='flex justify-between bg-[#f1ebe6]'>
      < Stu />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-[#FFF5EE] rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 text-lg font-medium mb-2">Content:</label>
              <input
                type="text"
                name="content"
                value={feedback.content}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your feedback"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-lg font-medium mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 text-lg font-medium mb-2">Nameuser:</label>
              <input
                type="text"
                name="nameuser"
                value={feedback.nameuser}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-[#DEB887] text-white font-semibold rounded-lg hover:bg-[#DEB777] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >Create Feedback</button>
          </form>
        </div>
      </div>
      <Acc />
    </div>

  );
};

//update
const UpdateFeedback = () => {
  const location = useLocation();
  const [feedback, setFeedback] = useState(null);  // Initial state as null to check for loading
  const [id, setId] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');


  const feedbackid = location.state?.feedback || {};  // Use empty object if no feedback is provided

  // Fetch the feedback data once when the component mounts
  useEffect(() => {
    axios.post('http://localhost:8888/student/find', { feedbackId: feedbackid })
      .then((response) => {
        console.log(response.data);
        setFeedback(response.data);  // Set the fetched feedback data
        setContent(response.data.content);
        setId(response.data.feedbackID);
        setName(response.data.nameuser);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.error('There was an error fetching the feedback!', error);
      });
  }, [feedbackid]);

  // Initialize updatedFeedback state only after feedback is fetched
  const [updatedFeedback, setUpdatedFeedback] = useState({
    id: '',
    content: '',
    daymake: new Date().toISOString().slice(0, 10),
    email: '',
    nameuser: ''
  });

  useEffect(() => {
    if (feedbackid) {
      axios.post('http://localhost:8888/student/find', { feedbackId: feedbackid })
        .then((response) => {
          const feedback = response.data;
          // Cập nhật updatedFeedback khi có dữ liệu phản hồi

          setUpdatedFeedback({
            id: feedback.feedbackID || '',
            content: feedback.content || '',
            daymake: feedback.daymake || new Date().toISOString().slice(0, 10),
            email: feedback.email || '',
            nameuser: feedback.nameuser || ''
          });
        })
        .catch((error) => {
          console.error('Có lỗi khi lấy phản hồi!', error);
        });
    }
  }, [feedbackid]);

  
  const handleChange = (e) => {
    setUpdatedFeedback({ ...updatedFeedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    axios.post(`http://localhost:8888/student/update`, {
      content: content,
      daymake: formattedDate,
      email: email,
      nameuser: name,
      id: id
    })
      .then(response => {
        console.log('Feedback updated successfully:', response.data);
        alert('Cập nhật phản hồi thành công!');
      })
      .catch(error => console.error('Error updating feedback:', error));
  };

  if (!feedback) {
    return <p>Loading feedback data...</p>;  // Render a loading state
  }

  return (
    <div className='flex justify-between bg-[#f1ebe6]'>
      < Stu />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-[#FFF5EE] rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 text-lg font-medium mb-2">Content</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your feedback"
                required
              />
            </div>
            {/* <div className="mb-4">
              <label>Day Make</label>
              <input
                type="date"
                name="daymake"
                value={updatedFeedback.daymake}
                onChange={handleChange}
              />
            </div> */}
            <div className="mb-4">
              <label className="block text-gray-800 text-lg font-medium mb-2">Email</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your feedback"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-lg font-medium mb-2">Name User</label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                name="nameuser"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your feedback"
                required
              />
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-[#DEB887] text-white font-semibold rounded-lg hover:bg-[#DEB777] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" >Update Feedback</button>
          </form>
        </div>
      </div>
      <Acc />
    </div>
  );
};



export { FeedbackList, CreateFeedback, UpdateFeedback };
