import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const API_URL = "http://127.0.0.1:5000/api/tasks";

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsProcessing(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text })
      });
      setText("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Professional Badge Styles
  const getBadgeStyle = (cat) => {
    const config = {
      urgent: { bg: '#FEE2E2', text: '#991B1B' },
      work: { bg: '#DBEAFE', text: '#1E40AF' },
      coding: { bg: '#F3E8FF', text: '#6B21A8' },
      home: { bg: '#DCFCE7', text: '#166534' },
      general: { bg: '#F3F4F6', text: '#374151' }
    };
    return config[cat.toLowerCase()] || config.general;
  };

  return (
    <div style={styles.appContainer}>
      {/* Sidebar Section */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>TaskAI <span style={styles.proTag}>PRO</span></div>
        <div style={styles.navItemActive}>Dashboard</div>
        <div style={styles.navItem}>Project Reports</div>
        <div style={styles.navItem}>AI Analytics</div>
      </aside>

      {/* Main Content Section */}
      <main style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.title}>Smart Workflow</h1>
          <p style={styles.subtitle}>Enterprise Task Classification Engine</p>
        </div>

        {/* Input Card */}
        <div style={styles.card}>
          <form onSubmit={addTask} style={styles.form}>
            <input 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="e.g., 'Prepare the annual financial audit'..." 
              style={styles.input}
              disabled={isProcessing}
            />
            <button type="submit" style={styles.primaryBtn} disabled={isProcessing}>
              {isProcessing ? 'Analyzing...' : 'Add with AI'}
            </button>
          </form>
        </div>

        {/* Task Table Card */}
        <div style={styles.card}>
          <div style={styles.tableHeader}>
            <span style={{flex: 2}}>Description</span>
            <span style={{flex: 1, textAlign: 'center'}}>Classification</span>
            <span style={{flex: 1, textAlign: 'right'}}>Action</span>
          </div>
          <div style={styles.taskList}>
            {tasks.map(t => {
              const badge = getBadgeStyle(t.category);
              return (
                <div key={t.id} style={styles.taskRow}>
                  <span style={{flex: 2, color: '#1F2937'}}>{t.content}</span>
                  <div style={{flex: 1, textAlign: 'center'}}>
                    <span style={{
                      ...styles.badge, 
                      backgroundColor: badge.bg, 
                      color: badge.text
                    }}>
                      {t.category.toUpperCase()}
                    </span>
                  </div>
                  <div style={{flex: 1, textAlign: 'right'}}>
                    <button onClick={() => deleteTask(t.id)} style={styles.deleteBtn}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

// Professional CSS-in-JS Styles
const styles = {
  appContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAF8' },
  sidebar: { width: '240px', backgroundColor: '#111827', color: '#FFF', padding: '30px 20px' },
  logo: { fontSize: '22px', fontWeight: '800', marginBottom: '40px', letterSpacing: '-0.5px' },
  proTag: { fontSize: '10px', backgroundColor: '#3B82F6', padding: '2px 6px', borderRadius: '4px', verticalAlign: 'middle' },
  navItem: { padding: '12px', color: '#9CA3AF', cursor: 'pointer', fontSize: '14px' },
  navItemActive: { padding: '12px', color: '#FFF', backgroundColor: '#1F2937', borderRadius: '8px', fontSize: '14px', marginBottom: '8px' },
  mainContent: { flex: 1, padding: '40px 60px' },
  header: { marginBottom: '30px' },
  title: { fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 },
  subtitle: { fontSize: '16px', color: '#6B7280', margin: '5px 0' },
  card: { backgroundColor: '#FFF', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' },
  form: { display: 'flex', gap: '15px' },
  input: { flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '15px', outline: 'none' },
  primaryBtn: { backgroundColor: '#2563EB', color: '#FFF', border: 'none', padding: '0 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  tableHeader: { display: 'flex', padding: '12px 0', borderBottom: '2px solid #F3F4F6', color: '#6B7280', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' },
  taskRow: { display: 'flex', padding: '18px 0', borderBottom: '1px solid #F3F4F6', alignItems: 'center', fontSize: '15px' },
  badge: { padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px' },
  deleteBtn: { color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '500' }
};

export default App;
