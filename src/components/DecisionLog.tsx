import React, { useEffect, useState } from 'react';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { Network } from 'lucide-react';
import { MODULES } from '../constants';

export function DecisionLog() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const path = `users/${auth.currentUser.uid}/reports`;
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  if (!auth.currentUser) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center p-8 bg-black/20 rounded-xl border border-white/5">
          <Network className="mx-auto text-cyan-400 mb-4" size={48} />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-400">Please sign in from the sidebar to view the Decision Log.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-semibold text-white mb-2">Decision Log</h2>
        <p className="text-sm text-slate-400">
          History of all analyses and queries performed across AI modules.
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {loading ? (
          <div className="text-center text-cyan-400 animate-pulse font-mono tracking-widest text-sm py-10">
            LOADING LOGS...
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center p-8 bg-black/20 rounded-xl border border-white/5 text-slate-400">
            No decison logs found. Run analyses in the AI modules to populate this view.
          </div>
        ) : (
          reports.map(report => {
            const moduleInfo = MODULES.find(m => m.id === report.moduleId);
            return (
              <div key={report.id} className="glass-card rounded-xl p-6 border border-white/5 whitespace-pre-wrap">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-3 text-cyan-400">
                    {moduleInfo && <moduleInfo.icon size={20} />}
                    <h3 className="font-semibold text-white tracking-wide">{moduleInfo?.name || 'Analysis Report'}</h3>
                  </div>
                  <div className="font-mono text-xs text-slate-500">
                    {new Date(report.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">Prompt / Query</h4>
                  <p className="text-slate-300 italic">"{report.prompt}"</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">System Output</h4>
                  <div className="prose prose-invert prose-sm max-w-none 
                    prose-headings:font-semibold prose-headings:text-slate-200
                    prose-a:text-cyan-400 prose-p:text-slate-300
                    prose-th:text-slate-400 prose-th:font-mono prose-th:uppercase prose-th:text-xs
                    prose-td:font-mono prose-td:text-sm prose-td:text-slate-300
                    prose-table:border prose-table:border-white/10">
                    <ReactMarkdown>{report.result}</ReactMarkdown>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
