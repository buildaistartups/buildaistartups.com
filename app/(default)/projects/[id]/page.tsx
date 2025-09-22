'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { 
  GitPullRequest, 
  FileText, 
  TrendingUp, 
  Shield, 
  DollarSign,
  Brain,
  Target,
  Users,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  Github,
  Loader2,
  RefreshCw,
  Settings,
  Sparkles,
  Trophy
} from 'lucide-react';
import { BASS, validateBASSData, calculateBuildScore } from '@/lib/bass';

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const projectId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [bassData, setBassData] = useState<BASS | null>(null);
  const [buildScore, setBuildScore] = useState(0);
  const [generatingPR, setGeneratingPR] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [repoInfo, setRepoInfo] = useState<{ owner: string; name: string } | null>(null);

  useEffect(() => {
    loadProjectData();
  }, [projectId]);

  const loadProjectData = async () => {
    try {
      setLoading(true);
      // Load BASS data from API
      const response = await fetch(`/api/projects/${projectId}`);
      if (!response.ok) throw new Error('Failed to load project');
      
      const data = await response.json();
      setBassData(data.bass);
      
      // Calculate build score
      const score = calculateBuildScore(data.bass);
      setBuildScore(score);
      
      // Load repo info if available
      if (data.github) {
        setRepoInfo(data.github);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast({
        title: 'Error',
        description: 'Failed to load project data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePR = async () => {
    if (!bassData || !repoInfo) {
      toast({
        title: 'Configuration Required',
        description: 'Please configure your GitHub repository first',
        variant: 'destructive',
      });
      return;
    }

    setGeneratingPR(true);
    try {
      const response = await fetch('/api/bass/readme-pr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          bassData,
          repoOwner: repoInfo.owner,
          repoName: repoInfo.name,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create PR');
      }

      const result = await response.json();
      
      toast({
        title: '✅ Pull Request Created',
        description: (
          <div className="flex flex-col gap-2">
            <span>README PR created successfully!</span>
            <a 
              href={result.prUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
            >
              View PR #{result.prNumber} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ),
      });
    } catch (error) {
      console.error('Error generating PR:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create pull request',
        variant: 'destructive',
      });
    } finally {
      setGeneratingPR(false);
    }
  };

  const handleRefreshScore = async () => {
    setRefreshing(true);
    try {
      await loadProjectData();
      toast({
        title: 'Score Updated',
        description: `Build Score: ${buildScore}/100`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to refresh score',
        variant: 'destructive',
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleExportBASS = () => {
    if (!bassData) return;
    
    const dataStr = JSON.stringify(bassData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `bass-${projectId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: 'BASS Exported',
      description: 'Your BASS specification has been downloaded',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return '🚀';
    if (score >= 60) return '✅';
    if (score >= 40) return '🔧';
    return '🏗️';
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!bassData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="text-2xl font-semibold">Project Not Found</h2>
        <Button onClick={() => router.push('/projects')}>
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{bassData.metadata.name}</h1>
          <p className="text-muted-foreground">{bassData.metadata.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary">{bassData.metadata.stage}</Badge>
            <Badge variant="outline">{bassData.metadata.vertical}</Badge>
            {bassData.metadata.fundingStage && (
              <Badge variant="outline">{bassData.metadata.fundingStage}</Badge>
            )}
            {bassData.metadata.tags?.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshScore}
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportBASS}
          >
            <Download className="h-4 w-4 mr-2" />
            Export BASS
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleGeneratePR}
            disabled={generatingPR || !repoInfo}
          >
            {generatingPR ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <GitPullRequest className="h-4 w-4 mr-2" />
            )}
            Generate README PR
          </Button>
        </div>
      </div>

      {/* Build Score Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Build Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{getScoreEmoji(buildScore)}</span>
              <div>
                <div className={`text-3xl font-bold ${getScoreColor(buildScore)}`}>
                  {buildScore}/100
                </div>
                {bassData.metrics.buildScore.trend && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    {bassData.metrics.buildScore.trend}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(bassData.metrics.buildScore.components).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-xs text-muted-foreground capitalize mb-1">{key}</div>
                  <div className="font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <Progress value={buildScore} className="h-3" />
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai">AI Stack</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="responsible">Responsible AI</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Problem & Solution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">Problem</h4>
                  <p className="text-sm text-muted-foreground">{bassData.product.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Solution</h4>
                  <p className="text-sm text-muted-foreground">{bassData.product.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Value Proposition</h4>
                  <p className="text-sm text-muted-foreground">{bassData.product.valueProposition}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Target Market
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-xs text-muted-foreground">TAM</div>
                    <div className="font-semibold">${formatNumber(bassData.product.targetMarket.tam)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">SAM</div>
                    <div className="font-semibold">${formatNumber(bassData.product.targetMarket.sam)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">SOM</div>
                    <div className="font-semibold">${formatNumber(bassData.product.targetMarket.som)}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Segments</h4>
                  <div className="flex flex-wrap gap-2">
                    {bassData.product.targetMarket.segments.map((segment, idx) => (
                      <Badge key={idx} variant="secondary">{segment}</Badge>
                    ))}
                  </div>
                </div>
                {bassData.product.businessModel && (
                  <div>
                    <h4 className="font-semibold mb-1">Business Model</h4>
                    <Badge>{bassData.product.businessModel}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bassData.ai.models.map((model, idx) => (
                    <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-secondary/20">
                      <div>
                        <div className="font-semibold">{model.name}</div>
                        <div className="text-sm text-muted-foreground">{model.purpose}</div>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{model.provider}</Badge>
                          <Badge variant="outline">{model.version}</Badge>
                          {model.deployment && <Badge variant="outline">{model.deployment}</Badge>}
                          {model.fineTuned && <Badge variant="secondary">Fine-tuned</Badge>}
                        </div>
                      </div>
                      {model.costPerMillionTokens && (
                        <div className="text-right text-sm">
                          <div>Input: ${model.costPerMillionTokens.input}/M</div>
                          <div>Output: ${model.costPerMillionTokens.output}/M</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Safety Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Content Filtering</span>
                      {bassData.ai.safety.contentFiltering.enabled ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Real-time Monitoring</span>
                      {bassData.ai.safety.monitoring.realtime ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bias Detection</span>
                      {bassData.ai.safety.biasDetection ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fallback Strategy</span>
                      <Badge variant="outline">{bassData.ai.safety.fallback.strategy}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Evaluation Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Frequency</span>
                      <Badge>{bassData.ai.evalPolicy.frequency}</Badge>
                    </div>
                    <div>
                      <span className="text-sm">Metrics</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {bassData.ai.evalPolicy.metrics.map((metric, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Automated Testing</span>
                      {bassData.ai.evalPolicy.automatedTesting ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operational Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Metrics visualization coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Finance tracking coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Roadmap visualization coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responsible" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Responsible AI Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Responsible AI dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
