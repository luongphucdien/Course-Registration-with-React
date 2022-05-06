import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser, setSession } from "./utils/Common";
import { useNavigate } from "react-router-dom";


function Register() {
    const navigate = useNavigate();
    const studentID = getUser();
    const [courses, setCourses] = useState(null);
    useEffect(() => {
        const token = getToken();
        if (token == null) {
            navigate('/');
        }

        axios.post('/api/getavailable', {Sid: studentID}).then(res => {
            const courses = res.data.courses;
            setCourses(courses);
            console.log(courses);
        });
    }, []);


    
    const addCourse = (event) => {
        const Cid = event.target.name;
        axios.post('/api/register', {Sid: studentID, Cid: Cid}).then(res => {
            setCourses(courses.filter(item => item.CourseID != Cid));
            console.log(res.data);
        });
    };

    const ListItems = (props) => {
        const items = props.items;
        if (items !== null) {
            return (
                <>
                    {items.map((item) => 
                        <div className="row mb-3">
                            <input
                                key={item.CourseID}
                                type='button'
                                className="btn"
                                name={item.CourseID} 
                                value={'Add ' + item.CourseName}
                                onClick={addCourse}
                            /> 
                        </div>
                    )}
                </>
            );
        }
        return null;
    }

    return (
        <div>
            <ListItems items={courses}/>
        </div>
    );
}


export default Register;