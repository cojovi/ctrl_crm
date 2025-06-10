import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, appointments: 2400, leads: 2400 },
  { name: 'Feb', revenue: 3000, appointments: 1398, leads: 2210 },
  { name: 'Mar', revenue: 2000, appointments: 9800, leads: 2290 },
  { name: 'Apr', revenue: 2780, appointments: 3908, leads: 2000 },
  { name: 'May', revenue: 1890, appointments: 4800, leads: 2181 },
  { name: 'Jun', revenue: 2390, appointments: 3800, leads: 2500 },
  { name: 'Jul', revenue: 3490, appointments: 4300, leads: 2100 },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--chart-1))"
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
        <Area
          type="monotone"
          dataKey="appointments"
          stroke="hsl(var(--chart-2))"
          fillOpacity={1}
          fill="url(#colorAppointments)"
        />
        <Area
          type="monotone"
          dataKey="leads"
          stroke="hsl(var(--chart-3))"
          fillOpacity={1}
          fill="url(#colorLeads)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}