import React from 'react';
import { BarChart as RechartsBarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../styles/Chart.css';
const data = [
  {
    name: 'Page A',
    expenses: 4000,
    income: 2400,
    balance: 2400,
  },
  {
    name: 'Page B',
    expenses: 3000,
    income: 1398,
    balance: 2210,
  },
  {
    name: 'Page C',
    expenses: 2000,
    income: 9800,
    balance: 2290,
  },
  {
    name: 'Page D',
    expenses: 2780,
    income: 3908,
    balance: 2000,
  },
  {
    name: 'Page E',
    expenses: 1890,
    income: 4800,
    balance: 2181,
  },
  {
    name: 'Page F',
    expenses: 2390,
    income: 3800,
    balance: 2500,
  },
  {
    name: 'Page G',
    expenses: 3490,
    income: 4300,
    balance: 2100,
  },
];

export const BarChart = () => {
  return (
    <div className='chart'>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expenses" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="income" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
