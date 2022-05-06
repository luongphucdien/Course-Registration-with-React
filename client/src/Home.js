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
            <input type='button' onClick={showCourses} value='Show Courses'/>
            <input type='button' onClick={handleLogout} value='Logout'/>

            <div>
                <ListItems items={courses}/>
            </div>
        </div>
    );
}
 
export default Home;