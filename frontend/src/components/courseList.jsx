import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        transition: 'transform 0.2s ease',
        border: '1px solid rgba(214, 31, 214, 0.3)'
    },
    pointTag: {
        backgroundColor: 'rgba(214, 31, 214, 0.2)',
        padding: '4px 8px',
        borderRadius: '4px',
        color: '#ff66ff'
    },
    header: {
        color: '#ff66ff',
        marginBottom: '20px'
    }
};

function CourseList() {
    //we get courses from API backend
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //now we will make a user constant
    const[userProgress, setUserProgress] = useState(
        {
            points : 500,
            level : 3,
            levelName : 'Cyber Sentinel', 

        }
    ) ; //mock data

    useEffect(() => {
        // move fetch function outside so we can call it from UI (retry)
        // define it here and attach to window for quick debugging if needed
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/courses/');
                setCourses(response.data || []);
            } catch (err) {
                // Detailed error handling 
                console.error('Could not fetch courses', err);
                if (err.response) {
                    // Server responded with a status outside 2xx
                    console.error('Server response:', err.response.status, err.response.data);
                    // Try to extract a helpful message from server response
                    const serverMessage = err.response.data && (err.response.data.message || err.response.data.error || JSON.stringify(err.response.data));
                    setError(`Server ${err.response.status}: ${serverMessage || 'Internal Server Error'}`);
                } else if (err.request) {
                    // Request made but no response received
                    console.error('No response received:', err.request);
                    setError('No response received from server (network/CORS or server down)');
                } else {
                    // Something happened setting up the request
                    setError(err.message);
                }
            } finally {
                setLoading(false); //stop loading
            }
        };

        // expose for quick debugging in console: window.fetchCourses && window.fetchCourses()
        window.__fetchCourses = fetchCourses;
        fetchCourses();
    }, []); //the dependency array is empty so it runs only once , once it mounts

    if (loading) {
        return <h2 style={{color: 'white'}}>Loading Courses... ⏳</h2>;
    }

    if (error) {
        return (
            <div style={{ color: 'white', padding: 20 }}>
                <h2 style={{color: 'red'}}>Error: {error}</h2>
                <p style={{color: '#ddd'}}>You can retry the request or check the backend server logs for details.</p>
                <button
                    style={{ padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}
                    onClick={() => {
                        setError(null);
                        setLoading(true);
                        // call the fetch function we exposed for debugging
                        if (window.__fetchCourses) window.__fetchCourses();
                        else window.location.reload();
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    console.log('Current courses:', courses); // Debug log
   
    return(
        <div style = {{padding : '20px' , color : 'white' , fontFamily : 'Arial, Sans-serif'}} > 
        <h1 style={styles.header}>Ducks & Ops Cyber Courses</h1>
        <div style={{ marginBottom: '30px', borderBottom: '1px solid rgba(214, 31, 214, 1)', paddingBottom: '15px' }}>
                <p>Current Rank: <strong>{userProgress.levelName}</strong> (Level {userProgress.level})</p>
                <p>Total Points: <span style={styles.pointTag}>{userProgress.points} XP</span></p>
            </div>

        <h2>Available Courses</h2>
        {courses.map(course => (
            <div key  ={course.id} style = {styles.card} onMouseOver = {e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                <h3>{course.title}</h3>
                <p style={{ color: '#aaa', fontSize: '0.9em' }}>Level: {course.level}</p>
                    <p>Reward: <span style={styles.pointTag}>{course.points} Points</span></p>
                    <button style ={{backgroundColor : '#00cc66', color : 'white', border : 'none', padding : '10px 15px', borderRadius : '8px', marginTop : '10px', cursor : 'pointer'}}>Start Getting Smart</button>
        
            </div>
        ))}
        </div> 
    );
}

export default CourseList;
    