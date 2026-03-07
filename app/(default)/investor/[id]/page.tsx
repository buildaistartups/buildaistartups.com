'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, TrendingUp, Shield, AlertCircle, CheckCircle2, Clock, Activity } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EvalResult {
  evalId: string;
  projectId: string;
  score: number;
  status: 'passed' | 'failed' | 'pending';
  timestamp: string;
  details?: {
    category: string;
    score: number;
    feedback: string;
  }[];
}

export default function InvestorDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [lastEval, setLastEval] = useState<EvalResult | null>(null);

  useEffect(() => {
    // Load last eval result
    const loadLastEval = async () => {
      try {
        // In production, fetch from your API
        // For now, using mock data
        const mockEval: EvalResult = {
          evalId: 'eval_' + Date.now(),
          projectId,
          score: 82,
          status: 'passed',
          timestamp: new Date().toISOString(),
          details: [
            { category: 'Technical', score: 85, feedback: 'Strong technical foundation' },
            { category: 'Market', score: 78, feedback: 'Good market validation' },
            { category: 'Team', score: 88, feedback: 'Experienced team' },
            { category: 'Finance', score: 75, feedback: 'Solid financial planning' }
          ]
        };
        setLastEval(mockEval);
      } catch (error) {
        console.error('Error loading eval:', error);
      }
    };

    loadLastEval();
  }, [projectId]);

  const handleDownloadOnePager = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/investor/onepager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `investor-onepager-${projectId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: 'Success',
        description: 'Investor one-pager downloaded successfully',
      });
    } catch (error) {
      console.error('Error downloading one-pager:', error);
      toast({
        title: 'Error',
        description: 'Failed to download investor one-pager',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Project {projectId}</h1>
            <p className="text-muted-foreground">Investor Dashboard</p>
          </div>
          <Button 
            onClick={handleDownloadOnePager}
            disabled={loading}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            {loading ? 'Generating...' : 'Download Investor One-Pager'}
          </Button>
        </div>
      </div>

      {/* Last Eval Card */}
      {lastEval && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              AI Evaluation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{lastEval.score}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge 
                  variant={
                    lastEval.status === 'passed' ? 'default' :
                    lastEval.status === 'failed' ? 'destructive' :
                    'secondary'
                  }
                  className="gap-1"
                >
                  {lastEval.status === 'passed' && <CheckCircle2 className="w-3 h-3" />}
                  {lastEval.status === 'failed' && <AlertCircle className="w-3 h-3" />}
                  {lastEval.status === 'pending' && <Clock className="w-3 h-3" />}
                  {lastEval.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Eval ID</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {lastEval.evalId}
                </code>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Last Run</p>
                <p className="text-sm">
                  {new Date(lastEval.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            {lastEval.details && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-3">Category Breakdown</p>
                <div className="space-y-2">
                  {lastEval.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{detail.category}</span>
                          <span className="text-sm font-bold">{detail.score}/100</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${detail.score}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {detail.feedback}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="evidence">Evidence Ledger</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Build Score Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold text-primary">78</div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold">72</div>
                  <p className="text-sm text-muted-foreground">Finance</p>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold">85</div>
                  <p className="text-sm text-muted-foreground">Product</p>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold">80</div>
                  <p className="text-sm text-muted-foreground">Market</p>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold">75</div>
                  <p className="text-sm text-muted-foreground">Growth</p>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-2xl font-bold">70</div>
                  <p className="text-sm text-muted-foreground">Ops/Legal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Finance Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Runway</p>
                  <p className="text-lg font-semibold">18 months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Burn Rate</p>
                  <p className="text-lg font-semibold">$50K/month</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-lg font-semibold">$10K MRR</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Funding Stage</p>
                  <p className="text-lg font-semibold">Pre-Seed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Ledger Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: '2024-02-01',
                    category: 'Product',
                    title: 'MVP Launch',
                    description: 'Successfully launched MVP with 100 beta users',
                    impact: 'high',
                    verified: true
                  },
                  {
                    date: '2024-01-20',
                    category: 'Market',
                    title: 'Customer Validation',
                    description: '85% positive feedback from early adopters',
                    impact: 'high',
                    verified: true
                  },
                  {
                    date: '2024-01-15',
                    category: 'Finance',
                    title: 'First Revenue',
                    description: 'Achieved $10K MRR milestone',
                    impact: 'medium',
                    verified: true
                  }
                ].map((entry, idx) => (
                  <div key={idx} className="border-l-2 border-primary pl-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{entry.category}</Badge>
                          <Badge 
                            variant={entry.impact === 'high' ? 'default' : 'secondary'}
                          >
                            {entry.impact}
                          </Badge>
                          {entry.verified && (
                            <Shield className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <h4 className="font-semibold">{entry.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {entry.description}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">User Growth</span>
                  </div>
                  <p className="text-2xl font-bold">+45%</p>
                  <p className="text-sm text-muted-foreground">Month over month</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Engagement Rate</span>
                  </div>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-sm text-muted-foreground">Daily active users</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Retention</span>
                  </div>
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-sm text-muted-foreground">30-day retention</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleDownloadOnePager}
                  disabled={loading}
                >
                  <FileText className="w-4 h-4" />
                  Investor One-Pager (PDF)
                  <Badge variant="secondary" className="ml-auto">New</Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" disabled>
                  <FileText className="w-4 h-4" />
                  Pitch Deck
                  <span className="ml-auto text-sm text-muted-foreground">Coming Soon</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" disabled>
                  <FileText className="w-4 h-4" />
                  Financial Model
                  <span className="ml-auto text-sm text-muted-foreground">Coming Soon</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
