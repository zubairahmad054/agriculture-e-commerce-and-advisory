import React from 'react';
import Layout from './basics/Layout';

export default function Projections() {
  return (
    <Layout>
      <center>
        <div>
          <iframe
            className="chart-iframe"
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-project-0-zlllm/embed/charts?id=64652aab-a657-4e23-800a-58b171f945f5&maxDataAge=3600&theme=light&autoRefresh=true"
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
          ></iframe>
        </div>
        <div>
          <iframe
            className="chart-iframe"
            width="640"
            height="480"
            src="https://charts.mongodb.com/charts-project-0-zlllm/embed/charts?id=64653209-82ae-47cb-8994-9f7c0e3b949a&maxDataAge=3600&theme=light&autoRefresh=true"
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
          ></iframe>
        </div>
        <div>
        <iframe
      className="chart-iframe"
      width="640"
      height="480"
      src="https://charts.mongodb.com/charts-project-0-zlllm/embed/charts?id=646534a5-82ae-4526-8ab8-9f7c0e3e462f&maxDataAge=3600&theme=light&autoRefresh=true"
      style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }}
    ></iframe>
        </div>
        <div>
        <iframe
      className="chart-iframe"
      width="640"
      height="480"
      src="https://charts.mongodb.com/charts-project-0-zlllm/embed/charts?id=6465361e-7909-4267-8875-7f6ba87485de&maxDataAge=3600&theme=light&autoRefresh=true"
      style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }}
    ></iframe>
        </div>
        <div>
        <iframe
      className="chart-iframe"
      width="640"
      height="480"
      src="https://charts.mongodb.com/charts-project-0-zlllm/embed/charts?id=646536ea-89ec-4951-8ebf-121da0eee30c&maxDataAge=3600&theme=light&autoRefresh=true"
      style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }}
    ></iframe>
        </div>
      </center>
    </Layout>
    
  );
}
