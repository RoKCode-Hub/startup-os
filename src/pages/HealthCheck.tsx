
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

const HealthCheck = () => {
  const [systems] = useState([
    {
      id: 1,
      name: "User Authentication",
      status: "operational",
      lastChecked: "2 minutes ago",
      uptime: "99.99%"
    },
    {
      id: 2,
      name: "Database Services",
      status: "operational",
      lastChecked: "5 minutes ago",
      uptime: "99.98%"
    },
    {
      id: 3,
      name: "API Gateway",
      status: "operational",
      lastChecked: "3 minutes ago",
      uptime: "99.95%"
    },
    {
      id: 4,
      name: "Storage System",
      status: "operational",
      lastChecked: "7 minutes ago",
      uptime: "99.99%"
    },
    {
      id: 5,
      name: "Payment Processing",
      status: "degraded",
      lastChecked: "10 minutes ago",
      uptime: "99.50%",
      message: "We're experiencing delays in payment processing. Our team is working on it."
    },
    {
      id: 6,
      name: "Email Service",
      status: "operational",
      lastChecked: "4 minutes ago",
      uptime: "99.97%"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="text-green-500" size={20} />;
      case "degraded":
        return <AlertCircle className="text-yellow-500" size={20} />;
      case "outage":
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <HelpCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800";
      case "degraded":
        return "bg-yellow-100 text-yellow-800";
      case "outage":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <Section
          id="health-header"
          title="System Health Status"
          description="Real-time monitoring of all Startup OS services and components"
          className="pt-16"
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Current Status</h3>
                <span className="text-sm text-gray-500">Last updated: May 2, 2025 at 10:35 AM</span>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  All Systems Operational
                </div>
                <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm">
                  Uptime: 99.98%
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            {systems.map((system) => (
              <Card key={system.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(system.status)}
                      <h3 className="ml-2 font-medium">{system.name}</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-3">
                        Checked {system.lastChecked}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(system.status)}`}>
                        {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  {system.message && (
                    <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {system.message}
                    </div>
                  )}
                  <div className="mt-2 text-sm text-gray-500">
                    Uptime: {system.uptime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthCheck;
