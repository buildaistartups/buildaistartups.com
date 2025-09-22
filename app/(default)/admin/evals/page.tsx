'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { showToast } from '@/lib/toast';
import { RefreshCw, Play, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react';

interface EvidenceEntry {
  projectId: string;
  category: string;
  subcategory: string;
  value: number;
  metadata: {
    passed: number;
    failed: number;
    total: number;
    timestamp: string;
  };
  timestamp: string;
}

interface ProjectEvals {
  projectId: string;
  evaluations: EvidenceEntry[];
  buildScore: number;
  overallScore: number;
}

interface EvalDetails {
  projectId: string;
  timestamp: string;
  totalItems: number;
  passedItems: number;
  failedItems: number;
  averageScore: number;
  items: Array<{
    id: string;
    type: string;
    input: string;
    actualOutput?: string;
    score: number;
    passed: boolean;
    error?: string;
  }>;
}

export default function AdminEvalsPage() {
  const [projects, setProjects] = useState<ProjectEvals[]>([]);
  const [runningEvals, setRunningEvals] = useState<Set<string>>(new Set());
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [lastEvalDetails, setLastEvalDetails] = useState<Record<string, EvalDetails>>({});
  const [loading, setLoading] = useState(true);

  // Mock project list (replace with actual project fetching)
  const mockProjects = [
    'ai-leadgen-saas',
    'ai-support-bot',
    'test-project'
  ];

  useEffect(() => {
    loadAllProjects();
  }, []);

  const loadAllProjects = async () => {
    setLoading(true);
    const projectData: ProjectEvals[] = [];
    
    for (const projectId of mockProjects) {
      try {
        const response = await fetch(`/api/evals/report?projectId=${projectId}`);
        if (response.ok) {
          const data = await response.json();
          projectData.push(data);
        }
      } catch (error) {
        console.error(`Failed to load project ${projectId}:`, error);
      }
    }
    
    setProjects(projectData);
    setLoading(false);
  };

  const runEvaluation = async (projectId: string) => {
    setRunningEvals(prev => new Set(prev).add(projectId));
    
    try {
      // Step 1: Run evaluation
      showToast('Running evaluation...', 'info');
      const runResponse = await fetch('/api/evals/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId })
      });
      
      if (!runResponse.ok) throw new Error('Evaluation run failed');
      const evalResult = await runResponse.json();
      
      // Store detailed results
      setLastEvalDetails(prev => ({ ...prev, [projectId]: evalResult }));
      
      // Step 2: Save to report
      showToast('Saving results...', 'info');
      const reportResponse = await fetch('/api/evals/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evalResult)
      });
      
      if (!reportResponse.ok) throw new Error('Report save failed');
      
      // Step 3: Refresh data
      showToast('Evaluation complete!', 'success');
      await loadAllProjects();
      
    } catch (error) {
      showToast('Evaluation failed', 'error');
      console.error('Eval error:', error);
    } finally {
      setRunningEvals(prev => {
        const next = new Set(prev);
        next.delete(projectId);
        return next;
      });
    }
  };

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjects(prev => {
      const next = new Set(prev);
      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }
      return next;
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <RefreshCw className="animate-spin h-8 w-8 text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Evaluation Admin</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and manage AI evaluation results
          </p>
        </div>
        <Button
          onClick={loadAllProjects}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh All
        </Button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No evaluation data found</p>
            <Button
              onClick={() => runEvaluation('test-project')}
              className="mt-4"
            >
              Run Test Evaluation
            </Button>
          </Card>
        ) : (
          projects.map(project => (
            <Card key={project.projectId} className="overflow-hidden">
              {/* Project Header */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleProjectExpansion(project.projectId)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                    >
                      {expandedProjects.has(project.projectId) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    <div>
                      <h3 className="font-semibold text-lg">{project.projectId}</h3>
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>AI Score: {project.buildScore}%</span>
                        <span>Overall: {project.overallScore}%</span>
                        <span>{project.evaluations.length} evaluations</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => runEvaluation(project.projectId)}
                    disabled={runningEvals.has(project.projectId)}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    {runningEvals.has(project.projectId) ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    Re-run Evals
                  </Button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedProjects.has(project.projectId) && (
                <div className="p-4 space-y-4">
                  {/* Recent Evaluations */}
                  <div>
                    <h4 className="font-medium mb-2">Recent Evaluations</h4>
                    <div className="space-y-2">
                      {project.evaluations.slice(-5).reverse().map((eval, idx) => (
                        <div
                          key={`${eval.timestamp}-${idx}`}
                          className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              eval.subcategory === 'lead-gen' 
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                : eval.subcategory === 'support'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {eval.subcategory}
                            </span>
                            <span className="text-sm">
                              Score: <strong>{eval.value}%</strong>
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {eval.metadata.passed}/{eval.metadata.total} passed
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(eval.timestamp)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Last Eval Details */}
                  {lastEvalDetails[project.projectId] && (
                    <div>
                      <h4 className="font-medium mb-2">Last Evaluation Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {lastEvalDetails[project.projectId].items.slice(0, 6).map(item => (
                          <div
                            key={item.id}
                            className={`p-3 rounded border ${
                              item.passed
                                ? 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                                : 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-mono">{item.id}</span>
                              <div className="flex items-center gap-1">
                                {item.passed ? (
                                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                )}
                                <span className="text-sm font-medium">{item.score}%</span>
                              </div>
                            </div>
                            <div className="text-xs space-y-1">
                              <div className="text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Input:</span> {item.input.substring(0, 50)}...
                              </div>
                              {item.actualOutput && (
                                <div className="text-gray-500 dark:text-gray-500">
                                  <span className="font-medium">Output:</span> {item.actualOutput.substring(0, 50)}...
                                </div>
                              )}
                              {item.error && (
                                <div className="text-red-600 dark:text-red-400">
                                  Error: {item.error}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Webhook Info */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold mb-2">Webhook Endpoint</h3>
        <code className="block p-3 bg-white dark:bg-gray-900 rounded text-sm mb-3">
          POST /api/evals/webhook
        </code>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          External services can report evaluation results using the webhook endpoint.
          Required header: <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">X-BAIS-Secret</code>
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          Configure secret via environment variable: <code>BAIS_WEBHOOK_SECRET</code>
        </div>
      </Card>
    </div>
  );
}
