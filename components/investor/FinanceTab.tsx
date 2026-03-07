'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  Calendar, 
  Shield, 
  FileText,
  Download,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Building,
  Briefcase
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FinanceTabProps {
  projectId: string;
  bassData?: any;
}

interface FundingMatch {
  id: string;
  name: string;
  type: 'grant' | 'investor' | 'accelerator';
  amount: string;
  timeline: string;
  fitScore: number;
  requirements: string[];
  tags: string[];
}

interface RunwayData {
  monthsRemaining: number;
  burnRate: number;
  cashBalance: number;
  projectedRunout: string;
  healthStatus: 'healthy' | 'warning' | 'critical';
}

interface FinanceReadiness {
  score: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

export default function FinanceTab({ projectId, bassData }: FinanceTabProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  
  // Funding Radar state
  const [fundingMatches, setFundingMatches] = useState<FundingMatch[]>([]);
  const [matchFilters, setMatchFilters] = useState({
    minAmount: '',
    maxAmount: '',
    type: 'all',
    stage: bassData?.stage || 'pre-seed'
  });
  
  // Runway state
  const [runwayData, setRunwayData] = useState<RunwayData | null>(null);
  const [runwayInputs, setRunwayInputs] = useState({
    cashBalance: bassData?.finance?.cash || '',
    monthlyBurn: bassData?.finance?.burn || '',
    revenue: bassData?.finance?.revenue || ''
  });
  
  // Finance Readiness state
  const [financeReadiness, setFinanceReadiness] = useState<FinanceReadiness | null>(null);
  
  // Fetch funding matches
  const fetchFundingMatches = async () => {
    setLoading('matches');
    try {
      const response = await fetch('/api/finance/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          bassData: bassData || {},
          filters: matchFilters
        })
      });
      
      if (!response.ok) throw new Error('Failed to fetch funding matches');
      const data = await response.json();
      setFundingMatches(data.matches);
      
      toast({
        title: 'Funding Radar Updated',
        description: `Found ${data.matches.length} potential funding sources`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch funding matches',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };
  
  // Calculate runway
  const calculateRunway = async () => {
    setLoading('runway');
    try {
      const response = await fetch('/api/finance/runway', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          cashBalance: parseFloat(runwayInputs.cashBalance) || 0,
          monthlyBurn: parseFloat(runwayInputs.monthlyBurn) || 0,
          monthlyRevenue: parseFloat(runwayInputs.revenue) || 0
        })
      });
      
      if (!response.ok) throw new Error('Failed to calculate runway');
      const data = await response.json();
      setRunwayData(data);
      
      toast({
        title: 'Runway Calculated',
        description: `${data.monthsRemaining} months of runway remaining`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to calculate runway',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };
  
  // Calculate finance readiness
  const calculateFinanceReadiness = async () => {
    setLoading('readiness');
    try {
      const response = await fetch('/api/finance/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          bassData: bassData || {},
          financials: {
            cash: parseFloat(runwayInputs.cashBalance) || 0,
            burn: parseFloat(runwayInputs.monthlyBurn) || 0,
            revenue: parseFloat(runwayInputs.revenue) || 0
          }
        })
      });
      
      if (!response.ok) throw new Error('Failed to calculate readiness');
      const data = await response.json();
      setFinanceReadiness(data);
      
      toast({
        title: 'Finance Readiness Updated',
        description: `Score: ${data.score}/100`
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to calculate finance readiness',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };
  
  // Generate Grant Pack PDF
  const generateGrantPack = async () => {
    setLoading('grant-pack');
    try {
      const response = await fetch('/api/finance/grant-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          bassData: bassData || {},
          fundingMatches: fundingMatches.slice(0, 5),
          runwayData,
          financeReadiness
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate grant pack');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `grant-pack-${projectId}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: 'Grant Pack Generated',
        description: 'PDF downloaded successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate grant pack',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };
  
  // Generate SAFE summary
  const generateSAFE = async () => {
    setLoading('safe');
    try {
      const response = await fetch('/api/finance/safe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          bassData: bassData || {},
          financials: {
            valuation: bassData?.finance?.valuation || 5000000,
            discount: 20,
            cap: bassData?.finance?.cap || 10000000
          }
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate SAFE');
      
      const data = await response.json();
      const blob = new Blob([data.markdown], { type: 'text/markdown' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SAFE-summary-${projectId}.md`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: 'SAFE Summary Generated',
        description: 'Markdown file downloaded'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate SAFE summary',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };
  
  const getRunwayStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 dark:text-green-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'critical': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };
  
  const getFitScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (score >= 60) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="radar" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="radar">Funding Radar</TabsTrigger>
          <TabsTrigger value="runway">Runway</TabsTrigger>
          <TabsTrigger value="readiness">Readiness</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="radar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Funding Radar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Min Amount</Label>
                  <Input
                    type="number"
                    placeholder="$10,000"
                    value={matchFilters.minAmount}
                    onChange={(e) => setMatchFilters({...matchFilters, minAmount: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Max Amount</Label>
                  <Input
                    type="number"
                    placeholder="$1,000,000"
                    value={matchFilters.maxAmount}
                    onChange={(e) => setMatchFilters({...matchFilters, maxAmount: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={matchFilters.type}
                    onChange={(e) => setMatchFilters({...matchFilters, type: e.target.value})}
                  >
                    <option value="all">All Types</option>
                    <option value="grant">Grants</option>
                    <option value="investor">Investors</option>
                    <option value="accelerator">Accelerators</option>
                  </select>
                </div>
                <div>
                  <Label>&nbsp;</Label>
                  <Button 
                    onClick={fetchFundingMatches} 
                    className="w-full"
                    disabled={loading === 'matches'}
                  >
                    {loading === 'matches' ? 'Scanning...' : 'Scan Funding'}
                  </Button>
                </div>
              </div>
              
              {fundingMatches.length > 0 && (
                <div className="space-y-3">
                  {fundingMatches.map((match) => (
                    <div key={match.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            {match.type === 'grant' && <FileText className="h-4 w-4" />}
                            {match.type === 'investor' && <Users className="h-4 w-4" />}
                            {match.type === 'accelerator' && <Building className="h-4 w-4" />}
                            {match.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">{match.amount}</p>
                        </div>
                        <Badge className={getFitScoreColor(match.fitScore)}>
                          {match.fitScore}% Fit
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {match.timeline}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {match.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="runway" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Runway Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Cash Balance</Label>
                  <Input
                    type="number"
                    placeholder="$50,000"
                    value={runwayInputs.cashBalance}
                    onChange={(e) => setRunwayInputs({...runwayInputs, cashBalance: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Monthly Burn Rate</Label>
                  <Input
                    type="number"
                    placeholder="$10,000"
                    value={runwayInputs.monthlyBurn}
                    onChange={(e) => setRunwayInputs({...runwayInputs, monthlyBurn: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Monthly Revenue</Label>
                  <Input
                    type="number"
                    placeholder="$5,000"
                    value={runwayInputs.revenue}
                    onChange={(e) => setRunwayInputs({...runwayInputs, revenue: e.target.value})}
                  />
                </div>
              </div>
              
              <Button 
                onClick={calculateRunway}
                disabled={loading === 'runway'}
                className="w-full"
              >
                {loading === 'runway' ? 'Calculating...' : 'Calculate Runway'}
              </Button>
              
              {runwayData && (
                <div className="space-y-4">
                  <Alert className={runwayData.healthStatus === 'critical' ? 'border-red-500' : ''}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className={`font-semibold ${getRunwayStatusColor(runwayData.healthStatus)}`}>
                          {runwayData.monthsRemaining} months of runway
                        </p>
                        <p className="text-sm">
                          Projected runout: {runwayData.projectedRunout}
                        </p>
                        <p className="text-sm">
                          Net burn rate: ${runwayData.burnRate.toLocaleString()}/month
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Cash Balance</span>
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-2xl font-bold">
                          ${runwayData.cashBalance.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Monthly Burn</span>
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-2xl font-bold">
                          ${runwayData.burnRate.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          {runwayData.healthStatus === 'healthy' && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {runwayData.healthStatus === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                          {runwayData.healthStatus === 'critical' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                        </div>
                        <p className={`text-2xl font-bold capitalize ${getRunwayStatusColor(runwayData.healthStatus)}`}>
                          {runwayData.healthStatus}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="readiness" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Finance Readiness Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={calculateFinanceReadiness}
                disabled={loading === 'readiness'}
                className="w-full"
              >
                {loading === 'readiness' ? 'Analyzing...' : 'Analyze Finance Readiness'}
              </Button>
              
              {financeReadiness && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Readiness Score</span>
                      <span className="text-sm font-bold">{financeReadiness.score}/100</span>
                    </div>
                    <Progress value={financeReadiness.score} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {financeReadiness.strengths.map((strength, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-green-600 mt-1">•</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          Gaps to Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {financeReadiness.gaps.map((gap, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-yellow-600 mt-1">•</span>
                              {gap}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {financeReadiness.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <Badge variant="outline" className="mt-0.5">{i + 1}</Badge>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Financial Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold">Grant Pack</h4>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive funding application package
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={generateGrantPack}
                        disabled={loading === 'grant-pack' || !fundingMatches.length || !runwayData || !financeReadiness}
                        className="w-full"
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {loading === 'grant-pack' ? 'Generating...' : 'Generate PDF'}
                      </Button>
                      {(!fundingMatches.length || !runwayData || !financeReadiness) && (
                        <p className="text-xs text-muted-foreground text-center">
                          Complete all assessments first
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-green-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold">SAFE Summary</h4>
                          <p className="text-sm text-muted-foreground">
                            Simple Agreement for Future Equity terms
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={generateSAFE}
                        disabled={loading === 'safe'}
                        className="w-full"
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {loading === 'safe' ? 'Generating...' : 'Generate Markdown'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Alert>
                <AlertDescription>
                  <strong>Data Room Documents:</strong> These generated documents can be included in your investor data room. 
                  Ensure all financial information is accurate and up-to-date before sharing with potential investors.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
