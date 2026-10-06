"use client";

// Initial Mock Data
const defaultLeads = [
  {
    id: "lead-1",
    name: "Rajesh Patel",
    email: "rajesh.patel@example.com",
    phone: "+91 98765 43210",
    age: 22,
    education: "Bachelor of Engineering",
    ielts: "7.5",
    experience: "1",
    preferredCountry: "Canada",
    type: "Eligibility Checker",
    score: "Highly Eligible (Study Permit)",
    status: "New",
    date: "2026-06-18T10:30:00Z"
  },
  {
    id: "lead-2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 99887 76655",
    age: 28,
    education: "Master of Business Administration",
    ielts: "6.5",
    experience: "4",
    preferredCountry: "United Kingdom",
    type: "Eligibility Checker",
    score: "Eligible (Skilled Worker)",
    status: "Contacted",
    date: "2026-06-19T14:20:00Z"
  },
  {
    id: "lead-3",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 98234 56789",
    age: 32,
    education: "Diploma in Information Technology",
    ielts: "7.0",
    experience: "8",
    preferredCountry: "Australia",
    type: "Inquiry Form",
    score: "Highly Eligible (Employer Sponsored)",
    status: "Approved",
    date: "2026-06-19T09:15:00Z"
  }
];

const defaultAppointments = [
  {
    id: "appt-1",
    name: "Amit Shah",
    email: "amit.shah@example.com",
    phone: "+91 91234 56789",
    date: "2026-06-24",
    time: "10:00 AM",
    service: "Study Abroad Consultation",
    status: "Approved",
    message: "Interested in Canada Fall 2026 Intakes",
    createdDate: "2026-06-19T11:00:00Z"
  },
  {
    id: "appt-2",
    name: "Neha Patel",
    email: "neha.patel@example.com",
    phone: "+91 92345 67890",
    date: "2026-06-25",
    time: "02:30 PM",
    service: "Visitor Visa Advice",
    status: "Pending",
    message: "Want to apply for tourist visa for parents to visit Germany",
    createdDate: "2026-06-20T08:00:00Z"
  }
];

const defaultVisaTracking = [
  {
    id: "track-1",
    caseId: "IQ-CAN-9821",
    clientName: "Rajesh Patel",
    email: "rajesh.patel@example.com",
    country: "Canada",
    visaType: "Study Permit",
    currentStatus: "Biometrics Completed",
    progress: 70,
    history: [
      { step: "Profile assessment completed", date: "2026-06-01" },
      { step: "Admission letter received from Seneca College", date: "2026-06-08" },
      { step: "GIC Account created and funded", date: "2026-06-12" },
      { step: "Visa application submitted via SDS portal", date: "2026-06-18" },
      { step: "Biometrics completed at VFS Ahmedabad", date: "2026-06-20" }
    ]
  },
  {
    id: "track-2",
    caseId: "IQ-AUS-4412",
    clientName: "Vikram Singh",
    email: "vikram.singh@example.com",
    country: "Australia",
    visaType: "Skilled Nominated (Subclass 190)",
    currentStatus: "Visa Approved 🎉",
    progress: 100,
    history: [
      { step: "Skills assessment cleared (ACS)", date: "2026-05-10" },
      { step: "Expression of Interest (EOI) submitted", date: "2026-05-18" },
      { step: "State Nomination approval received", date: "2026-05-28" },
      { step: "Visa application lodged online", date: "2026-06-02" },
      { step: "Medical check clearance", date: "2026-06-10" },
      { step: "Visa Approved 🎉", date: "2026-06-19" }
    ]
  }
];

const defaultDocuments = [
  {
    id: "doc-1",
    clientName: "Rajesh Patel",
    email: "rajesh.patel@example.com",
    docName: "Passport Scan.pdf",
    docType: "Identity Proof",
    status: "Verified",
    uploadedAt: "2026-06-18T10:45:00Z"
  },
  {
    id: "doc-2",
    clientName: "Rajesh Patel",
    email: "rajesh.patel@example.com",
    docName: "IELTS Score Card.pdf",
    docType: "Language Proficiency",
    status: "Verified",
    uploadedAt: "2026-06-18T10:46:00Z"
  },
  {
    id: "doc-3",
    clientName: "Priya Sharma",
    email: "priya.sharma@example.com",
    docName: "MBA Degree Certificate.pdf",
    docType: "Education Certificates",
    status: "Pending Review",
    uploadedAt: "2026-06-19T14:30:00Z"
  }
];

// Helper to check if we are running in browser
const isClient = typeof window !== "undefined";

function getStorageItem(key, defaultValue) {
  if (!isClient) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading localStorage key: ", key, error);
    return defaultValue;
  }
}

function setStorageItem(key, value) {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing localStorage key: ", key, error);
  }
}

// Database API
export const db = {
  // Initialize Database
  init() {
    if (!isClient) return;
    if (!localStorage.getItem("iq_leads")) {
      setStorageItem("iq_leads", defaultLeads);
    }
    if (!localStorage.getItem("iq_appointments")) {
      setStorageItem("iq_appointments", defaultAppointments);
    }
    if (!localStorage.getItem("iq_tracking")) {
      setStorageItem("iq_tracking", defaultVisaTracking);
    }
    if (!localStorage.getItem("iq_documents")) {
      setStorageItem("iq_documents", defaultDocuments);
    }
  },

  // LEADS
  getLeads: async function() {
    if (!isClient) return [];
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) return data.leads;
      return [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  addLead: async function(lead) {
    if (!isClient) return;
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  },

  updateLeadStatus: async function(id, status) {
    if (!isClient) return;
    try {
      await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
    } catch (e) {
      console.error(e);
    }
  },

  deleteLead: async function(id) {
    if (!isClient) return;
    try {
      await fetch(`/api/leads?id=${id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.error(e);
    }
  },

  // APPOINTMENTS
  getAppointments() {
    this.init();
    return getStorageItem("iq_appointments", defaultAppointments);
  },

  addAppointment(appt) {
    const appts = this.getAppointments();
    const newAppt = {
      id: "appt-" + Date.now(),
      status: "Pending",
      createdDate: new Date().toISOString(),
      ...appt
    };
    appts.unshift(newAppt);
    setStorageItem("iq_appointments", appts);
    return newAppt;
  },

  updateAppointmentStatus(id, status) {
    const appts = this.getAppointments();
    const updated = appts.map(a => a.id === id ? { ...a, status } : a);
    setStorageItem("iq_appointments", updated);
  },

  deleteAppointment(id) {
    const appts = this.getAppointments();
    const filtered = appts.filter(a => a.id !== id);
    setStorageItem("iq_appointments", filtered);
  },

  // VISA TRACKING
  getTracking() {
    this.init();
    return getStorageItem("iq_tracking", defaultVisaTracking);
  },

  getTrackingByCaseId(caseId) {
    const list = this.getTracking();
    return list.find(t => t.caseId.toLowerCase() === caseId.toLowerCase());
  },

  addTracking(track) {
    const list = this.getTracking();
    const newTrack = {
      id: "track-" + Date.now(),
      caseId: "IQ-" + track.country.substring(0, 3).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000),
      progress: 10,
      history: [{ step: "Profile setup completed", date: new Date().toISOString().split('T')[0] }],
      ...track
    };
    list.unshift(newTrack);
    setStorageItem("iq_tracking", list);
    return newTrack;
  },

  updateTrackingStatus(id, currentStatus, progress, nextStep) {
    const list = this.getTracking();
    const updated = list.map(t => {
      if (t.id === id) {
        const history = [...t.history];
        if (nextStep) {
          history.push({ step: nextStep, date: new Date().toISOString().split('T')[0] });
        }
        return {
          ...t,
          currentStatus,
          progress: parseInt(progress),
          history
        };
      }
      return t;
    });
    setStorageItem("iq_tracking", updated);
  },

  // DOCUMENTS
  getDocuments() {
    this.init();
    return getStorageItem("iq_documents", defaultDocuments);
  },

  uploadDocument(doc) {
    const docs = this.getDocuments();
    const newDoc = {
      id: "doc-" + Date.now(),
      status: "Pending Review",
      uploadedAt: new Date().toISOString(),
      ...doc
    };
    docs.unshift(newDoc);
    setStorageItem("iq_documents", docs);
    return newDoc;
  },

  updateDocumentStatus(id, status) {
    const docs = this.getDocuments();
    const updated = docs.map(d => d.id === id ? { ...d, status } : d);
    setStorageItem("iq_documents", updated);
  }
};
