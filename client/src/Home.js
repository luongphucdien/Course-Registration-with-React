import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeSession, getUser, getToken } from './utils/Common';
 
function Home() {
    const navigate = useNavigate();
 
    const handleLogout = () => {
        removeSession();    
        navigate('/');
    }

    useEffect(() => {
        const token = getToken();
        if (token == null)
            navigate('/');
            document.title = 'Home';
    }, []);

    const ID = getUser();
    const [name, setName] = useState(null);
    const [id, setID] = useState(null);
    useEffect(() => {
        axios.post('/api/student', {id: ID}).then(res => {
            console.log(res.data.student[0]);
            setName(res.data.student[0].StudentName);
            setID(res.data.student[0].StudentID);
        });
    });


    const [courses, setCourses] = useState(null);
    const showCourses = () => {
        axios.get('/api/allcourses').then(res => {
            const courses = res.data.courses;
            setCourses(courses);
            console.log(courses);
        });
    };

    const studentID = getUser();
    const showRegistered = () => {
        axios.post('/api/getregistered', {Sid: studentID}).then(res => {
            const registered = res.data.courses;
            setCourses(registered);
        });
    }

    const ListItems = (props) => {
        const items = props.items;
        if (items !== null) {
            return (
                <>
                    {items.map((item) => 
                    <div key={item.CourseID}>
                        {item.CourseName}
                    </div>
                    )}
                </>
            );
        }
        return null;
    }
 
    return (
        <div>
            <p>Name: {name}</p>
            <p>ID: {id}</p>
            <div className='row mb-3'> <input className='btn' type='button' onClick={showCourses} value='Show all courses'/> </div>
            <div className='row mb-3'> <input className='btn' type='button' onClick={showRegistered} value='Show registered courses'/> </div>
            <div className='row'> <input className='btn' type='button' onClick={handleLogout} value='Logout'/> </div>
            <div className='container-fluid'>
                <ListItems items={courses}/>
            </div>
        </div>
    );
}
 
export default Home;