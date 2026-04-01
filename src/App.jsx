import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [filter, setFilter] = useState("all");
  
  // DataTable-style sorting state
  // sortConfig: { key: 'id' | 'content', direction: 'asc' | 'desc' }
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });

  const API_URL = "http://127.0.0.1:5000/api/tasks";

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setTasks(data);
      }
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

  // Logic for sorting (DataTables Style)
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedTasks = (items) => {
    let sortableItems = [...items];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  };

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

  // Apply Filter then Sort
  const processedTasks = getSortedTasks(
    filter === "all" ? tasks : tasks.filter(t => t.category.toLowerCase() === filter.toLowerCase())
  );

  return (
    <div style={styles.appContainer}>
      <aside style={styles.sidebar}>
        <div style={styles.logo}>TaskAI <span style={styles.proTag}>PRO</span></div>
        <div style={styles.navItemActive}>Dashboard</div>
        <div style={styles.navItem}>Project Reports</div>
        <div style={styles.navItem}>AI Analytics</div>
      </aside>

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
              placeholder="Describe your task..." 
              style={styles.input}
              disabled={isProcessing}
            />
            <button type="submit" style={styles.primaryBtn} disabled={isProcessing}>
              {isProcessing ? 'Analyzing...' : 'Add with AI'}
            </button>
          </form>
        </div>

        {/* Filters */}
        <div style={styles.filterBar}>
          {['all', 'work', 'home', 'urgent', 'coding'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                ...styles.filterTab,
                borderBottom: filter === cat ? '2px solid #2563EB' : '2px solid transparent',
                color: filter === cat ? '#2563EB' : '#6B7280'
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Task List Card with FIXED HEIGHT and INTERNAL SCROLL */}
        <div style={styles.listCard}>
          <div style={styles.tableHeader}>
            <span style={{flex: 2, cursor: 'pointer'}} onClick={() => requestSort('content')}>
              Description {sortConfig.key === 'content' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
            </span>
            <span style={{flex: 1, textAlign: 'center', cursor: 'pointer'}} onClick={() => requestSort('category')}>
              Classification {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
            </span>
            <span style={{flex: 1, textAlign: 'right', cursor: 'pointer'}} onClick={() => requestSort('createdAt')}>
              Date {sortConfig.key === 'createdAt' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
            </span>
          </div>
          
          <div style={styles.scrollArea}>
            {processedTasks.map(t => {
              const badge = getBadgeStyle(t.category);
              return (
                <div key={t.id} style={styles.taskRow}>
                  <div style={{flex: 2}}>
                    <div style={{color: '#1F2937', fontWeight: '500'}}>{t.content}</div>
                    <div style={styles.timestamp}>
                      Ref ID: #{t.id} • {t.createdAt ? new Date(t.createdAt).toLocaleString([], { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      }) : 'No date'}
                    </div>
                  </div>
                  <div style={{flex: 1, textAlign: 'center'}}>
                    <span style={{...styles.badge, backgroundColor: badge.bg, color: badge.text }}>
                      {t.category.toUpperCase()}
                    </span>
                  </div>
                  <div style={{flex: 1, textAlign: 'right'}}>
                    <button onClick={() => deleteTask(t.id)} style={styles.deleteBtn}>Remove</button>
                  </div>
                </div>
              );
            })}
            {processedTasks.length === 0 && <p style={styles.emptyMsg}>No tasks to display.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  appContainer: { display: 'flex', height: '100vh', backgroundColor: '#F9FAF8', overflow: 'hidden' }, // Added overflow hidden to prevent body scroll
  sidebar: { 
    width: '240px', 
    backgroundColor: '#111827', 
    color: '#FFF', 
    padding: '30px 20px',
    height: '100vh',
    flexShrink: 0 
  },
  logo: { fontSize: '22px', fontWeight: '800', marginBottom: '40px' },
  proTag: { fontSize: '10px', backgroundColor: '#3B82F6', padding: '2px 6px', borderRadius: '4px' },
  navItem: { padding: '12px', color: '#9CA3AF', fontSize: '14px' },
  navItemActive: { padding: '12px', color: '#FFF', backgroundColor: '#1F2937', borderRadius: '8px', fontSize: '14px', marginBottom: '8px' },
  
  mainContent: { 
    flex: 1, 
    padding: '40px 60px', 
    display: 'flex', 
    flexDirection: 'column', 
    height: '100vh', // Critical for child scroll to work
    overflow: 'hidden' 
  },
  header: { marginBottom: '20px' },
  title: { fontSize: '28px', fontWeight: '700', color: '#111827', margin: 0 },
  subtitle: { fontSize: '14px', color: '#6B7280' },
  
  card: { backgroundColor: '#FFF', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' },
  
  // TASK LIST CARD FIX
  listCard: { 
    backgroundColor: '#FFF', 
    borderRadius: '12px', 
    padding: '0 24px 24px 24px', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
    display: 'flex', 
    flexDirection: 'column',
    maxHeight: '60vh', // THIS FIXES THE HEIGHT
    overflow: 'hidden' // Prevents the card itself from leaking
  },
  
  scrollArea: { 
    overflowY: 'auto', // ONLY the tasks will scroll
    flex: 1,
    paddingRight: '10px'
  },

  form: { display: 'flex', gap: '15px' },
  input: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' },
  primaryBtn: { backgroundColor: '#2563EB', color: '#FFF', border: 'none', padding: '0 20px', borderRadius: '8px', cursor: 'pointer' },
  
  filterBar: { display: 'flex', gap: '20px', marginBottom: '10px' },
  filterTab: { background: 'none', border: 'none', padding: '10px 0', cursor: 'pointer', fontWeight: '600', fontSize: '12px' },
  
  tableHeader: { 
    display: 'flex', 
    padding: '20px 0 10px 0', 
    borderBottom: '2px solid #F3F4F6', 
    color: '#6B7280', 
    fontSize: '12px', 
    fontWeight: '700', 
    position: 'sticky', 
    top: 0, 
    backgroundColor: '#FFF', 
    zIndex: 1 
  },
  taskRow: { display: 'flex', padding: '16px 0', borderBottom: '1px solid #F3F4F6', alignItems: 'center' },
  timestamp: { fontSize: '11px', color: '#9CA3AF', marginTop: '4px' },
  badge: { padding: '4px 12px', borderRadius: '9999px', fontSize: '10px', fontWeight: '700' },
  deleteBtn: { color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer' },
  emptyMsg: { textAlign: 'center', padding: '40px', color: '#9CA3AF' }
};

export default App;