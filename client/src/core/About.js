import React from 'react';
import Layout from '../core/Layout';

const Home = () => {
    return (
        <Layout title="About" description="Made with ❤ by Anant Mathur">
            <div className="container">
                <a href="https://github.com/Anantm007" target="_blank" rel="noopener noreferrer"><h2>Github</h2></a>
                <a href="https://www.linkedin.com/in/anant-mathur-61911423/" target="_blank" rel="noopener noreferrer"><h2>LinkedIn</h2></a>
                <a href="https://anantmathur.me/" target="_blank" rel="noopener noreferrer"><h2>Website</h2></a>
                <a href="mailto:anant.mathur007@gmail.com"><h2>Email</h2></a>    
            </div>            
        </Layout>
           
    )
};

export default Home
