"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/services/db";
import { 
  Users, Calendar, FileText, Compass, LogOut, 
  Trash2, Check, X, ShieldAlert, ArrowRight, PlusCircle, Search
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  
  // Dashboard Tabs: overview, leads, appointments, documents, tracking
  const [activeSubTab, setActiveSubTab] = useState("overview");

  // DB States
  const [leads, setLeads] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [tracking, setTracking] = useState([]);

  // Filters & Actions
  const [searchLead, setSearchLead] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  
  // Visa Tracking Form State
  const [newTrack, setNewTrack] = useState({
    clientName: "",
    email: "",
    country: "Canada",
    visaType: "Study Permit"
  });
  
  const [trackingUpdate, setTrackingUpdate] = useState({
    id: "",
    status: "",
    progress: 10,
    nextStep: ""
  });

  // Load Database
  const loadDb = async () => {
    setLeads(await db.getLeads());
    setAppointments(db.getAppointments());
    setDocuments(db.getDocuments());
    setTracking(db.getTracking());
  };

  useEffect(() => {
    // Check if session exists in localStorage
    const savedSession = localStorage.getItem("iq_admin_session");
    if (savedSession === "active") {
      setIsAuthenticated(true);
      loadDb();
    }

    // Listener for live chat updates
    const handleCrmUpdate = () => loadDb();
    window.addEventListener("crm_update", handleCrmUpdate);
    return () => window.removeEventListener("crm_update", handleCrmUpdate);
  }, []);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("iq_admin_session", "active");
      loadDb();
      setLoginError("");
    } else {
      setLoginError("Invalid username or password. Use admin / admin.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("iq_admin_session");
  };

  // Lead Actions
  const handleLeadDelete = async (id) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      await db.deleteLead(id);
      await loadDb();
      triggerToast("Lead successfully deleted.");
    }
  };

  const handleLeadStatus = async (id, status) => {
    await db.updateLeadStatus(id, status);
    await loadDb();
    triggerToast(`Lead status updated to ${status}.`);
  };

  // Appointment Actions
  const handleApptStatus = (id, status) => {
    db.updateAppointmentStatus(id, status);
    loadDb();
    triggerToast(`Appointment is now ${status}.`);
  };

  const handleApptDelete = (id) => {
    if (confirm("Cancel this appointment booking?")) {
      db.deleteAppointment(id);
      loadDb();
      triggerToast("Appointment removed.");
    }
  };

  // Document Actions
  const handleDocStatus = (id, status) => {
    db.updateDocumentStatus(id, status);
    loadDb();
    triggerToast(`Document verified status: ${status}.`);
  };

  // Tracking Actions
  const handleAddTracking = (e) => {
    e.preventDefault();
    if (!newTrack.clientName || !newTrack.email) {
      alert("Please fill client details.");
      return;
    }
    db.addTracking(newTrack);
    loadDb();
    setNewTrack({ clientName: "", email: "", country: "Canada", visaType: "Study Permit" });
    triggerToast("Created new client Visa File Tracker.");
  };

  const handleUpdateTracking = (e) => {
    e.preventDefault();
    if (!trackingUpdate.id) {
      alert("Select a case first.");
      return;
    }
    db.updateTrackingStatus(
      trackingUpdate.id,
      trackingUpdate.status,
      trackingUpdate.progress,
      trackingUpdate.nextStep
    );
    loadDb();
    setTrackingUpdate({ id: "", status: "", progress: 10, nextStep: "" });
    triggerToast("Updated visa milestones and timelines.");
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchLead.toLowerCase()) ||
    l.preferredCountry.toLowerCase().includes(searchLead.toLowerCase()) ||
    l.type.toLowerCase().includes(searchLead.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-brand-gray relative">
        <div className="glass-card w-full max-w-md p-8 rounded-3xl bg-white border border-brand-blue-light/5 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-2xl bg-brand-blue/5 border border-brand-gold/15 flex items-center justify-center text-brand-gold mx-auto animate-pulse">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold font-heading text-brand-blue-dark">IQ CRM Security Shield</h2>
            <p className="text-xs text-gray-400">Authorized personnel only. Credentials: admin / admin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {loginError}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-blue-dark uppercase">Username</label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-brand-blue-dark"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-blue-dark uppercase">Password</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-brand-blue-dark"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-premium text-white font-bold rounded-xl hover:shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center space-x-1 border border-brand-gold/30"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative">
      
      {/* Toast Alert popup */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-50 px-4 py-3 bg-brand-blue text-brand-gold font-bold text-xs rounded-xl shadow-2xl border border-brand-gold/30 animate-in slide-in-from-right duration-200">
          {toastMsg}
        </div>
      )}

      {/* 1. Header with Logout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-brand-blue-light/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-blue-dark flex items-center space-x-2">
            <span>IQ Global CRM Dashboard</span>
            <span className="text-xs px-2.5 py-1 bg-brand-gold/15 text-brand-gold-dark rounded-full font-black border border-brand-gold/30 uppercase">
              Secure
            </span>
          </h1>
          <p className="text-xs text-gray-500">Live operational audits, lead files management, and visa timelines tracker.</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout CRM</span>
        </button>
      </div>

      {/* 2. Sub-tabs Selector */}
      <div className="flex overflow-x-auto space-x-2 pb-2 border-b border-brand-blue/5">
        {[
          { id: "overview", label: "Overview", icon: Users },
          { id: "leads", label: `Leads Archive (${leads.length})`, icon: Users },
          { id: "appointments", label: `Appointments (${appointments.filter(a => a.status === "Pending").length} Pending)`, icon: Calendar },
          { id: "documents", label: `Documents Portal (${documents.filter(d => d.status === "Pending Review").length} Pending)`, icon: FileText },
          { id: "tracking", label: "Visa Timeline Tracker", icon: Compass }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
              activeSubTab === tab.id
                ? "border-brand-gold bg-brand-blue/5 text-brand-gold font-extrabold"
                : "border-brand-blue-light/10 text-brand-blue-dark bg-white hover:bg-gray-50"
            }`}
          >
            <tab.icon className="h-4 w-4 shrink-0 text-brand-gold" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3. Tab Contents */}
      
      {/* 3A. OVERVIEW TAB */}
      {activeSubTab === "overview" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total CRM Leads", count: leads.length, label: "Submitted forms & checker results" },
              { title: "Active Bookings", count: appointments.length, label: "Registered client counseling slots" },
              { title: "Uploaded Documents", count: documents.length, label: "Passports, transcripts & scorecards" },
              { title: "Tracked Visa Files", count: tracking.length, label: "Active embassies filing queues" }
            ].map((card, i) => (
              <div key={i} className="glass-card p-6 bg-white rounded-2xl border border-brand-blue-light/5 text-left">
                <p className="text-xs font-bold uppercase text-brand-gold tracking-wide">{card.title}</p>
                <h3 className="text-3xl font-extrabold text-brand-blue-dark mt-2">{card.count}</h3>
                <p className="text-[10px] text-gray-400 mt-1">{card.label}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-brand-blue/5 border border-brand-blue-light/10 rounded-2xl flex items-start space-x-4">
            <ShieldAlert className="h-6 w-6 text-brand-gold shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-brand-blue-dark text-sm">Offline Testing &amp; Preview Environment</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                This dashboard uses local React hooks connected to `localStorage` database layers. Any leads generated on the live site (such as filling out the Assessment Checker on the homepage or scoring resumes in the Work Permit subpage) will appear here instantly in real-time. Feel free to mark documents as approved, cancel bookings, or update visa tracker milestones.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3B. LEADS TAB */}
      {activeSubTab === "leads" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Search */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search leads by name, preferred country..."
              value={searchLead}
              onChange={(e) => setSearchLead(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark placeholder-gray-400"
            />
            <Search className="h-4.5 w-4.5 text-gray-400 absolute left-3.5 top-3" />
          </div>

          <div className="glass-card bg-white rounded-2xl border border-brand-blue-light/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-brand-blue-dark text-white font-heading">
                  <tr>
                    <th className="p-3">Client details</th>
                    <th className="p-3">Profile Data</th>
                    <th className="p-3">Assessment Score / Msg</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {filteredLeads.map((l) => (
                    <tr key={l.id} className="hover:bg-brand-blue/5 transition-colors">
                      <td className="p-3">
                        <p className="font-bold text-brand-blue-dark">{l.name}</p>
                        <p className="text-[10px] text-gray-400">{l.email} | {l.phone}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-brand-blue-dark">{l.preferredCountry} | {l.type}</p>
                        <p className="text-[10px] text-gray-500">Edu: {l.education || "N/A"} | Work: {l.experience || "0"}y | IELTS: {l.ielts || "N/A"}</p>
                      </td>
                      <td className="p-3">
                        <p className="text-xs text-gray-500 max-w-xs">{l.score}</p>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          l.status === "New" ? "bg-blue-100 text-blue-700" :
                          l.status === "Contacted" ? "bg-amber-100 text-amber-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2 shrink-0 whitespace-nowrap">
                        <button
                          onClick={() => handleLeadStatus(l.id, "Contacted")}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded font-semibold text-[10px]"
                          title="Mark contacted"
                        >
                          Contact
                        </button>
                        <button
                          onClick={() => handleLeadStatus(l.id, "Approved")}
                          className="px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded font-semibold text-[10px]"
                          title="Mark approved"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleLeadDelete(l.id)}
                          className="p-1 text-red-500 hover:text-red-700 inline-block align-middle"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3C. APPOINTMENTS TAB */}
      {activeSubTab === "appointments" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="glass-card bg-white rounded-2xl border border-brand-blue-light/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-brand-blue-dark text-white font-heading">
                  <tr>
                    <th className="p-3">Client info</th>
                    <th className="p-3">Requested Slot</th>
                    <th className="p-3">Service Inquired</th>
                    <th className="p-3">Message</th>
                    <th className="p-3">Booking Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {appointments.map((a) => (
                    <tr key={a.id} className="hover:bg-brand-blue/5 transition-colors">
                      <td className="p-3">
                        <p className="font-bold text-brand-blue-dark">{a.name}</p>
                        <p className="text-[10px] text-gray-400">{a.email} | {a.phone}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-brand-blue-dark">{a.date}</p>
                        <p className="text-[10px] text-brand-gold-dark font-mono uppercase">{a.time}</p>
                      </td>
                      <td className="p-3 font-semibold text-brand-blue-dark">
                        {a.service}
                      </td>
                      <td className="p-3 text-xs text-gray-400 max-w-xs">{a.message || "No notes"}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          a.status === "Pending" ? "bg-amber-100 text-amber-700 animate-pulse" :
                          a.status === "Approved" ? "bg-green-100 text-green-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2 shrink-0 whitespace-nowrap">
                        <button
                          onClick={() => handleApptStatus(a.id, "Approved")}
                          className="p-1 bg-green-50 hover:bg-green-100 text-green-700 rounded inline-block"
                          title="Confirm Slot"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleApptStatus(a.id, "Cancelled")}
                          className="p-1 bg-red-50 hover:bg-red-100 text-red-700 rounded inline-block"
                          title="Reject / Cancel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleApptDelete(a.id)}
                          className="p-1 text-red-500 hover:text-red-700 inline-block align-middle"
                          title="Delete booking"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3D. DOCUMENTS TAB */}
      {activeSubTab === "documents" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="glass-card bg-white rounded-2xl border border-brand-blue-light/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-brand-blue-dark text-white font-heading">
                  <tr>
                    <th className="p-3">Client info</th>
                    <th className="p-3">Document Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Upload Date</th>
                    <th className="p-3">Verification</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {documents.map((d) => (
                    <tr key={d.id} className="hover:bg-brand-blue/5 transition-colors">
                      <td className="p-3 text-brand-blue-dark font-bold">
                        {d.clientName}
                        <p className="text-[10px] text-gray-400 font-normal">{d.email}</p>
                      </td>
                      <td className="p-3 font-semibold text-brand-blue-dark flex items-center space-x-1.5">
                        <FileText className="h-4 w-4 text-brand-gold" />
                        <span>{d.docName}</span>
                      </td>
                      <td className="p-3 text-xs text-gray-500 font-semibold">{d.docType}</td>
                      <td className="p-3 text-[10px] text-gray-400">{d.uploadedAt.split("T")[0]}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          d.status === "Pending Review" ? "bg-amber-100 text-amber-700 animate-pulse" :
                          d.status === "Verified" ? "bg-green-100 text-green-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2 shrink-0 whitespace-nowrap">
                        <button
                          onClick={() => handleDocStatus(d.id, "Verified")}
                          className="px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded font-semibold text-[10px]"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleDocStatus(d.id, "Rejected")}
                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded font-semibold text-[10px]"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3E. VISA TRACKER TAB */}
      {activeSubTab === "tracking" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          {/* Active files list */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-lg font-bold text-brand-blue-dark font-heading">Active Timeline Tracking Files</h3>
            <div className="space-y-4">
              {tracking.map((track) => (
                <div key={track.id} className="glass-card p-6 bg-white rounded-2xl border border-brand-blue-light/5 space-y-4">
                  <div className="flex justify-between items-start border-b border-brand-blue/5 pb-3">
                    <div>
                      <p className="text-[10px] font-mono font-bold text-brand-gold-dark">{track.caseId} | {track.country}</p>
                      <h4 className="font-bold text-brand-blue-dark">{track.clientName}</h4>
                      <p className="text-[10px] text-gray-400">{track.email} | {track.visaType}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2.5 py-1 bg-brand-blue/5 text-brand-gold-dark border border-brand-gold/20 rounded-full text-[10px] font-black uppercase">
                        {track.currentStatus}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-bold text-brand-blue-dark">
                      <span>Lodge status progress</span>
                      <span>{track.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-brand-blue/5">
                      <div 
                        className="h-full bg-gradient-gold rounded-full transition-all duration-500" 
                        style={{ width: `${track.progress}%` }} 
                      />
                    </div>
                  </div>

                  {/* History timelines */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] uppercase font-bold text-gray-400">Activity History Logs</p>
                    <div className="space-y-2 border-l border-brand-blue-light/10 pl-3.5">
                      {track.history.map((h, i) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[19px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-gold border border-white" />
                          <p className="text-[11px] font-bold text-brand-blue-dark">{h.step}</p>
                          <p className="text-[9px] text-gray-400">{h.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Side Forms (Add track & update track) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Add tracker card */}
            <div className="glass-card p-6 bg-white rounded-2xl border border-brand-blue-light/5 space-y-4">
              <h3 className="text-md font-bold text-brand-blue-dark font-heading flex items-center space-x-1 border-b border-brand-blue/5 pb-2">
                <PlusCircle className="h-4.5 w-4.5 text-brand-gold" />
                <span>Initialize Visa Tracker</span>
              </h3>
              
              <form onSubmit={handleAddTracking} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-brand-blue-dark">Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Rajesh Patel"
                    value={newTrack.clientName}
                    onChange={(e) => setNewTrack({ ...newTrack, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs text-brand-blue-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-brand-blue-dark">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh@gmail.com"
                    value={newTrack.email}
                    onChange={(e) => setNewTrack({ ...newTrack, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs text-brand-blue-dark"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-brand-blue-dark">Country</label>
                    <select
                      value={newTrack.country}
                      onChange={(e) => setNewTrack({ ...newTrack, country: e.target.value })}
                      className="w-full px-2 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl text-xs text-brand-blue-dark font-semibold"
                    >
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="United Kingdom">UK</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-brand-blue-dark">Visa Type</label>
                    <select
                      value={newTrack.visaType}
                      onChange={(e) => setNewTrack({ ...newTrack, visaType: e.target.value })}
                      className="w-full px-2 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl text-xs text-brand-blue-dark font-semibold"
                    >
                      <option value="Study Permit">Study Visa</option>
                      <option value="Skilled Work Permit">Work Permit</option>
                      <option value="Visitor Visa">Visitor Visa</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-premium text-white font-bold rounded-xl text-xs uppercase border border-brand-gold/20"
                >
                  Create Visa File
                </button>
              </form>
            </div>

            {/* Update status card */}
            <div className="glass-card p-6 bg-white rounded-2xl border border-brand-blue-light/5 space-y-4">
              <h3 className="text-md font-bold text-brand-blue-dark font-heading flex items-center space-x-1 border-b border-brand-blue/5 pb-2">
                <Compass className="h-4.5 w-4.5 text-brand-gold" />
                <span>Log Milestones</span>
              </h3>

              <form onSubmit={handleUpdateTracking} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-brand-blue-dark">Select Client File</label>
                  <select
                    value={trackingUpdate.id}
                    onChange={(e) => setTrackingUpdate({ ...trackingUpdate, id: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl text-xs text-brand-blue-dark font-semibold"
                  >
                    <option value="">Select File Case</option>
                    {tracking.map(t => (
                      <option key={t.id} value={t.id}>{t.clientName} ({t.caseId})</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-brand-blue-dark">Status Label</label>
                    <input
                      type="text"
                      placeholder="e.g. Biometrics Done"
                      value={trackingUpdate.status}
                      onChange={(e) => setTrackingUpdate({ ...trackingUpdate, status: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs text-brand-blue-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-brand-blue-dark">Progress (%)</label>
                    <input
                      type="number"
                      placeholder="e.g. 50"
                      value={trackingUpdate.progress}
                      onChange={(e) => setTrackingUpdate({ ...trackingUpdate, progress: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs text-brand-blue-dark"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-brand-blue-dark">Add Milestones Log Message</label>
                  <input
                    type="text"
                    placeholder="e.g. Biometrics processed at VFS center"
                    value={trackingUpdate.nextStep}
                    onChange={(e) => setTrackingUpdate({ ...trackingUpdate, nextStep: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs text-brand-blue-dark"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-gold text-brand-blue-dark font-extrabold rounded-xl text-xs uppercase shadow-sm"
                >
                  Post Milestone Update
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
