import React, { useState } from 'react';

const CourseList = () => {
  const [showAll, setShowAll] = useState(false);

  const courses = [
    "Introduction to HSE",
    "Accident Investigation",
    "Confined Space Entry",
    "Work at Height Safety",
    "Fire fighting and Prevention",
    "First Aid & CPR",
    "Safety Statistics",
    "Job Hazard Analysis",
    "Personal Protective Equipment",
    "Environmental Safety",
    "Waste management",
    "Good Housekeeping",
    "Maritime Safety",
    "HSE Management System",
    "Advanced Fire Fighting and Prevention",
    "Advanced Health, Safety, Security and Environment",
    "Auto-mobile Installation Maintenance and Safety",
    "Aviation Safety",
    "Basic Offshore Safety Induction Emergency Training (BOSIET)",
    "Basic Oil and Gas Management",
    "Caregiver",
    "Caregiver level 2 (specialized in adult care)",
    "Caregiver level 2 (specialized in elderly care)",
    "Cathering",
    "Confined Space Entry and Gas Testing",
    "Confined Space Hole Watch",
    "Construction Safety and Risk Assessment",
    "Crane Operator",
    "Crane Safety and Technical Operation",
    "Crisis Management and Conflict Resolution",
    "Crisis, Conflict Resolution and Crowd Management",
    "Crisis, Conflict Resolution and Disaster Management",
    "Cyber Defense Program",
    "Cyber Security and Risk Management",
    "Derrick Man",
    "Diploma Roughneck",
    "Electrical Safety Installation and Maintenance",
    "Entrepreneurship and Digital Marketing",
    "Environmental Waste Management",
    "Firefighting And Prevention",
    "Fire Watch",
    "First Aid and CPR",
    "FloorMan",
    "Food Handling and Hygiene",
    "Food Safety",
    "Forklift Operation and Maintenance",
    "Forklift Operation Safety and Maintenance",
    "Forklift Operation",
    "Gas Detector",
    "General HSSE",
    "Harbour Safety and Management",
    "Healthcare giver 1&2 Basic and Specialized Care",
    "Healthcare Giver 1&2",
    "Health, Safety, Security and Environment (HSSE Level 1,2 &3)",
    "Health Caregiver",
    "Health Caregiver Level 2  Physiotherapy",
    "Health Caregiver Level 2 (specialized in elderly care)",
    "Health Caregiver Level 3  (Professional Physiotherapist)",
    "Health Safety and Environment Management System",
    "Health Safety, Security and Environment (HSSE Level 1)",
    "Health Safety, Security and Environment (HSSE Level 1&2)",
    "Health Safety, Security and Environment (HSSE Level 3)",
    "Health Safety, Security and Environment Policy",
    "Health Caregiver Level 1 (Basic Care)",
    "Health Caregiver Level 2",
    "Health Caregiver Level 2 (Specialized in Pediatrics Care)",
    "High Voltage and Instrumentation",
    "House Keeping",
    "Human Resources Management",
    "Industrial Painting, Coating and Sandblasting",
    "Industrial Rigging and Lifting Level 1&2",
    "Industrial Safety Management",
    "Industrial Security and Surveillance",
    "International Banksman and Industrial Rigging",
    "International Shipping and Port Facility, Safety and Security",
    "Introduction to Oil and Gas",
    "Journey Management and Logistics",
    "Kitchen Safety and Management",
    "Light Duty Truck and Technical Operations",
    "Maritime Safety",
    "Mechanical Installation and Maintenance Safety",
    "Occupational Health and Safety Management (ISO 45001 : 2018 Standard)",
    "Occupational Health and Safety",
    "Permit To Work",
    "Physical Security Intelligence and Surveillance",
    "Procurement",
    "Project Management Professional (PMP)",
    "Quality Assurance",
    "Quality Control",
    "Quality Management and Assurance",
    "Rigger 1&2",
    "Rigger  Level 2",
    "Rigger 1,2&3",
    "Rigger Level 1",
    "Rigger Level 2&3",
    "Rigger Level 3",
    "Rigging and Lifting Level 3",
    "Roughneck Course",
    "Roustabout",
    "Safe Handling of Chemical and Pest Control",
    "Safe Scaffold Erection and Inspection",
    "Scaffolding",
    "Scaffolding Basic (Level 1)",
    "Scaffolding Intermediate (Level 2)",
    "Scaffolding (Level 1&2)",
    "Scaffolding Supervision (Level 3)",
    "Survival At Sea Swimming Certificate with PFD and PPE",
    "Warehouse Management and Storekeeping",
    "Welding and Fabrication",
    "Working at Height"
  ];

  const displayedCourses = showAll ? courses : courses.slice(0, 12);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Courses Offered</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedCourses.map((course, idx) => (
          <div key={idx} className="bg-gray-100 p-3 border-l-4 border-primary-500 rounded shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800">{course}</h3>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </div>
    </div>
  );
};

export default CourseList;
