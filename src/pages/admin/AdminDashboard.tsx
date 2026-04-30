import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Package, 
  Star, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { title: 'Total Products', value: '0', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Reviews', value: '0', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { title: 'Subsidy States', value: '0', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Active Users', value: '1', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const prodSnap = await getDocs(collection(db, 'products'));
        const revSnap = await getDocs(collection(db, 'reviews'));
        const stateSnap = await getDocs(collection(db, 'subsidyStates'));
        
        setStats(prev => prev.map(stat => {
          if (stat.title === 'Total Products') return { ...stat, value: prodSnap.size.toString() };
          if (stat.title === 'Total Reviews') return { ...stat, value: revSnap.size.toString() };
          if (stat.title === 'Subsidy States') return { ...stat, value: stateSnap.size.toString() };
          return stat;
        }));
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back to the Admin Panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">
                <span className="text-green-500 font-medium">+Live</span> from database
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { action: 'New product added', time: 'Just now', icon: Package, color: 'text-blue-500' },
                { action: 'Review approved', time: '5 hours ago', icon: Star, color: 'text-yellow-500' },
                { action: 'Global settings updated', time: 'Yesterday', icon: CheckCircle2, color: 'text-green-500' },
                { action: 'Login attempt from new device', time: '2 days ago', icon: AlertCircle, color: 'text-red-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" /> {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 text-center py-12">
          <div className="bg-primary/5 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-bold mb-2">Connected to Firebase</h3>
          <p className="text-sm text-gray-500 max-w-[250px] mx-auto">
            All your data is now being stored securely in Firestore database.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
