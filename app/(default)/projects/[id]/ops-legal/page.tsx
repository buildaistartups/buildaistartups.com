'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Shield, FileText, Activity, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface OpsLegalData {
  privacy: {
    dataFlows: Array<{
      source: string;
      destination: string;
      dataType: string;
      purpose: string;
      retention: string;
      encryption: boolean;
    }>;
    dataCategories: string[];
    thirdParties: string[];
    dataSubjects: string[];
    legalBasis: string;
    gdprCompliant: boolean;
    ccpaCompliant: boolean;
  };
  dpa: {
    companyName: string;
    contactEmail: string;
    dpoEmail: string;
    address: string;
    purposes: string[];
    dataTypes: string[];
    subProcessors: Array<{
      name: string;
      location: string;
      service: string;
    }>;
    technicalMeasures: string[];
    organizationalMeasures: string[];
    retentionPeriod: string;
    deletionProcess: string;
    transferMechanisms: {
      sccs: boolean;
      bcrs: boolean;
      adequacyDecision: boolean;
      other: string;
    };
  };
  slo: {
    uptime: number;
    ttfb: number;
    errorRate: number;
    p95Latency: number;
  };
  cost: {
    monthlyEstimate: number;
    breakdown: {
      infrastructure: number;
      services: number;
      personnel: number;
      licenses: number;
      other: number;
    };
    currency: string;
  };
}

export default function OpsLegalPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OpsLegalData>({
    privacy: {
      dataFlows: [],
      dataCategories: [],
      thirdParties: [],
      dataSubjects: [],
      legalBasis: 'Legitimate Interest',
      gdprCompliant: false,
      ccpaCompliant: false
      },
    dpa: {
      companyName: '',
      contactEmail: '',
      dpoEmail: '',
      address: '',
      purposes: [],
      dataTypes: [],
      subProcessors: [],
      technicalMeasures: [],
      organizationalMeasures: [],
      retentionPeriod: '12 months',
      deletionProcess: 'Automated deletion after retention period',
      transferMechanisms: {
        sccs: false,
        bcrs: false,
        adequacyDecision: false,
        other: ''
      }
    },
    slo: {
      uptime: 99.9,
      ttfb: 200,
      errorRate: 0.1,
      p95Latency: 500
    },
    cost: {
      monthlyEstimate: 0,
      breakdown: {
        infrastructure: 0,
        services: 0,
        personnel: 0,
        licenses: 0,
        other: 0
      },
      currency: 'USD'
    }
  });

  const [sloStatus, setSloStatus] = useState<any>(null);
  const [score, setScore] = useState<number | null>(null);
  const [repoInfo, setRepoInfo] = useState({ owner: '', name: '' });

  useEffect(() => {
    loadProjectData();
  }, [projectId]);

  const loadProjectData = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      if (response.ok) {
        const project = await response.json();
        if (project.opsLegalData) {
          setData(project.opsLegalData);
        }
        if (project.repo) {
          const [owner, name] = project.repo.split('/');
          setRepoInfo({ owner, name });
        }
      }
    } catch (error) {
      console.error('Failed to load project data:', error);
    }

    // Load SLO status
    try {
      const sloResponse = await fetch(`/api/ops/slo?projectId=${projectId}`);
      if (sloResponse.ok) {
        const sloData = await sloResponse.json();
        setSloStatus(sloData);
      }
    } catch (error) {
      console.error('Failed to load SLO status:', error);
    }
  };

  const handlePrivacyPR = async () => {
    if (!repoInfo.owner || !repoInfo.name) {
      toast({
        title: 'Error',
        description: 'Repository information not configured',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/legal/privacy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          projectId,
          repoOwner: repoInfo.owner,
          repoName: repoInfo.name,
          bassData: data.privacy
        })
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'Privacy PR Created',
          description: `Pull request #${result.prNumber} created successfully`,
        });
        window.open(result.prUrl, '_blank');
      } else {
        throw new Error('Failed to create PR');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create privacy policy PR',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDPAPR = async () => {
    if (!repoInfo.owner || !repoInfo.name) {
      toast({
        title: 'Error',
        description: 'Repository information not configured',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/legal/dpa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          projectId,
          repoOwner: repoInfo.owner,
          repoName: repoInfo.name,
          processorInfo: {
            companyName: data.dpa.companyName,
            contactEmail: data.dpa.contactEmail,
            dpoEmail: data.dpa.dpoEmail,
            address: data.dpa.address
          },
          processingDetails: {
            purposes: data.dpa.purposes,
            dataTypes: data.dpa.dataTypes,
            subProcessors: data.dpa.subProcessors,
            technicalMeasures: data.dpa.technicalMeasures,
            organizationalMeasures: data.dpa.organizationalMeasures,
            retentionPeriod: data.dpa.retentionPeriod,
            deletionProcess: data.dpa.deletionProcess
          },
          transferMechanisms: data.dpa.transferMechanisms
        })
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: 'DPA PR Created',
          description: `Pull request #${result.prNumber} created successfully`,
        });
        window.open(result.prUrl, '_blank');
      } else {
        throw new Error('Failed to create PR');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create DPA pull request',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSLOUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ops/slo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          targets: data.slo,
          currentMetrics: {
            uptime: 99.5,
            ttfb: 180,
            errorRate: 0.15,
            p95Latency: 450
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSloStatus(result);
        toast({
          title: 'SLO Configured',
          description: 'Service level objectives updated successfully',
        });
      } else {
        throw new Error('Failed to update SLO');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to configure SLO',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/score/opslegal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          privacy: data.privacy,
          dpa: data.dpa,
          slo: sloStatus,
          cost: data.cost
        })
      });

      if (response.ok) {
        const result = await response.json();
        setScore(result.score);
        toast({
          title: 'Score Calculated',
          description: `Ops/Legal score: ${result.score}/100`,
        });
      } else {
        throw new Error('Failed to calculate score');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to calculate ops/legal score',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCost = () => {
    const { breakdown } = data.cost;
    return Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);
  };

  const addDataFlow = () => {
    setData({
      ...data,
      privacy: {
        ...data.privacy,
        dataFlows: [
          ...data.privacy.dataFlows,
          {
            source: '',
            destination: '',
            dataType: '',
            purpose: '',
            retention: '30 days',
            encryption: true
          }
        ]
      }
    });
  };

  const addSubProcessor = () => {
    setData({
      ...data,
      dpa: {
        ...data.dpa,
        subProcessors: [
          ...data.dpa.subProcessors,
          { name: '', location: '', service: '' }
        ]
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-500" />
            Ops/Legal Wizard
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure privacy, DPA, SLO, and cost estimates
          </p>
        </div>
        {score !== null && (
          <Card className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Ops/Legal Score</p>
              <p className="text-2xl font-bold">{score}/100</p>
            </div>
          </Card>
        )}
      </div>

      <Tabs defaultValue="privacy" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="dpa">DPA</TabsTrigger>
          <TabsTrigger value="slo">SLO</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Privacy Policy Configuration
            </h2>

            <div className="space-y-6">
              <div>
                <Label>Legal Basis for Processing</Label>
                <select
                  className="w-full mt-2 p-2 border rounded"
                  value={data.privacy.legalBasis}
                  onChange={(e) => setData({
                    ...data,
                    privacy: { ...data.privacy, legalBasis: e.target.value }
                  })}
                >
                  <option>Consent</option>
                  <option>Contract</option>
                  <option>Legal Obligation</option>
                  <option>Vital Interests</option>
                  <option>Public Task</option>
                  <option>Legitimate Interest</option>
                </select>
              </div>

              <div>
                <Label>Data Categories (comma-separated)</Label>
                <Input
                  className="mt-2"
                  placeholder="Personal identifiers, Contact information, Usage data"
                  value={data.privacy.dataCategories.join(', ')}
                  onChange={(e) => setData({
                    ...data,
                    privacy: {
                      ...data.privacy,
                      dataCategories: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }
                  })}
                />
              </div>

              <div>
                <Label>Data Subjects (comma-separated)</Label>
                <Input
                  className="mt-2"
                  placeholder="Customers, Employees, Visitors"
                  value={data.privacy.dataSubjects.join(', ')}
                  onChange={(e) => setData({
                    ...data,
                    privacy: {
                      ...data.privacy,
                      dataSubjects: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }
                  })}
                />
              </div>

              <div>
                <Label>Third Parties (comma-separated)</Label>
                <Input
                  className="mt-2"
                  placeholder="Analytics providers, Cloud services, Payment processors"
                  value={data.privacy.thirdParties.join(', ')}
                  onChange={(e) => setData({
                    ...data,
                    privacy: {
                      ...data.privacy,
                      thirdParties: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }
                  })}
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <Switch
                    checked={data.privacy.gdprCompliant}
                    onCheckedChange={(checked) => setData({
                      ...data,
                      privacy: { ...data.privacy, gdprCompliant: checked }
                    })}
                  />
                  GDPR Compliant
                </label>
                <label className="flex items-center gap-2">
                  <Switch
                    checked={data.privacy.ccpaCompliant}
                    onCheckedChange={(checked) => setData({
                      ...data,
                      privacy: { ...data.privacy, ccpaCompliant: checked }
                    })}
                  />
                  CCPA Compliant
                </label>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Data Flows</Label>
                  <Button onClick={addDataFlow} size="sm" variant="outline">
                    Add Flow
                  </Button>
                </div>
                {data.privacy.dataFlows.map((flow, idx) => (
                  <Card key={idx} className="p-4 mt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Source"
                        value={flow.source}
                        onChange={(e) => {
                          const flows = [...data.privacy.dataFlows];
                          flows[idx].source = e.target.value;
                          setData({ ...data, privacy: { ...data.privacy, dataFlows: flows } });
                        }}
                      />
                      <Input
                        placeholder="Destination"
                        value={flow.destination}
                        onChange={(e) => {
                          const flows = [...data.privacy.dataFlows];
                          flows[idx].destination = e.target.value;
                          setData({ ...data, privacy: { ...data.privacy, dataFlows: flows } });
                        }}
                      />
                      <Input
                        placeholder="Data Type"
                        value={flow.dataType}
                        onChange={(e) => {
                          const flows = [...data.privacy.dataFlows];
                          flows[idx].dataType = e.target.value;
                          setData({ ...data, privacy: { ...data.privacy, dataFlows: flows } });
                        }}
                      />
                      <Input
                        placeholder="Purpose"
                        value={flow.purpose}
                        onChange={(e) => {
                          const flows = [...data.privacy.dataFlows];
                          flows[idx].purpose = e.target.value;
                          setData({ ...data, privacy: { ...data.privacy, dataFlows: flows } });
                        }}
                      />
                      <Input
                        placeholder="Retention"
                        value={flow.retention}
                        onChange={(e) => {
                          const flows = [...data.privacy.dataFlows];
                          flows[idx].retention = e.target.value;
                          setData({ ...data, privacy: { ...data.privacy, dataFlows: flows } });
                        }}
                      />
                      <label className="flex items-center gap-2">
                        <Switch
                          checked={flow.encryption}
                          onCheckedChange={(checked) => {
                            const flows = [...data.privacy.dataFlows];
                            flows[idx].encryption = checked;
                            setData({ ...data, privacy: { ...data.privacy, dataFlows: flows } });
                          }}
                        />
                        Encrypted
                      </label>
                    </div>
                  </Card>
                ))}
              </div>

              <Button onClick={handlePrivacyPR} disabled={loading} className="w-full">
                Generate Privacy Policy PR
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="dpa" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Data Processing Agreement
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    className="mt-2"
                    value={data.dpa.companyName}
                    onChange={(e) => setData({
                      ...data,
                      dpa: { ...data.dpa, companyName: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Contact Email</Label>
                  <Input
                    className="mt-2"
                    type="email"
                    value={data.dpa.contactEmail}
                    onChange={(e) => setData({
                      ...data,
                      dpa: { ...data.dpa, contactEmail: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>DPO Email</Label>
                  <Input
                    className="mt-2"
                    type="email"
                    value={data.dpa.dpoEmail}
                    onChange={(e) => setData({
                      ...data,
                      dpa: { ...data.dpa, dpoEmail: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input
                    className="mt-2"
                    value={data.dpa.address}
                    onChange={(e) => setData({
                      ...data,
                      dpa: { ...data.dpa, address: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div>
                <Label>Processing Purposes (comma-separated)</Label>
                <Textarea
                  className="mt-2"
                  value={data.dpa.purposes.join(', ')}
                  onChange={(e) => setData({
                    ...data,
                    dpa: {
                      ...data.dpa,
                      purposes: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }
                  })}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Sub-processors</Label>
                  <Button onClick={addSubProcessor} size="sm" variant="outline">
                    Add Sub-processor
                  </Button>
                </div>
                {data.dpa.subProcessors.map((sp, idx) => (
                  <Card key={idx} className="p-4 mt-2">
                    <div className="grid grid-cols-3 gap-4">
                      <Input
                        placeholder="Name"
                        value={sp.name}
                        onChange={(e) => {
                          const sps = [...data.dpa.subProcessors];
                          sps[idx].name = e.target.value;
                          setData({ ...data, dpa: { ...data.dpa, subProcessors: sps } });
                        }}
                      />
                      <Input
                        placeholder="Location"
                        value={sp.location}
                        onChange={(e) => {
                          const sps = [...data.dpa.subProcessors];
                          sps[idx].location = e.target.value;
                          setData({ ...data, dpa: { ...data.dpa, subProcessors: sps } });
                        }}
                      />
                      <Input
                        placeholder="Service"
                        value={sp.service}
                        onChange={(e) => {
                          const sps = [...data.dpa.subProcessors];
                          sps[idx].service = e.target.value;
                          setData({ ...data, dpa: { ...data.dpa, subProcessors: sps } });
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>

              <div>
                <Label>Transfer Mechanisms</Label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2">
                    <Switch
                      checked={data.dpa.transferMechanisms.sccs}
                      onCheckedChange={(checked) => setData({
                        ...data,
                        dpa: {
                          ...data.dpa,
                          transferMechanisms: { ...data.dpa.transferMechanisms, sccs: checked }
                        }
                      })}
                    />
                    Standard Contractual Clauses (SCCs)
                  </label>
                  <label className="flex items-center gap-2">
                    <Switch
                      checked={data.dpa.transferMechanisms.bcrs}
                      onCheckedChange={(checked) => setData({
                        ...data,
                        dpa: {
                          ...data.dpa,
                          transferMechanisms: { ...data.dpa.transferMechanisms, bcrs: checked }
                        }
                      })}
                    />
                    Binding Corporate Rules (BCRs)
                  </label>
                  <label className="flex items-center gap-2">
                    <Switch
                      checked={data.dpa.transferMechanisms.adequacyDecision}
                      onCheckedChange={(checked) => setData({
                        ...data,
                        dpa: {
                          ...data.dpa,
                          transferMechanisms: { ...data.dpa.transferMechanisms, adequacyDecision: checked }
                        }
                      })}
                    />
                    Adequacy Decision
                  </label>
                </div>
              </div>

              <Button onClick={handleDPAPR} disabled={loading} className="w-full">
                Generate DPA Pull Request
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="slo" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Service Level Objectives
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Uptime Target (%)</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    step="0.1"
                    value={data.slo.uptime}
                    onChange={(e) => setData({
                      ...data,
                      slo: { ...data.slo, uptime: parseFloat(e.target.value) }
                    })}
                  />
                </div>
                <div>
                  <Label>TTFB Target (ms)</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    value={data.slo.ttfb}
                    onChange={(e) => setData({
                      ...data,
                      slo: { ...data.slo, ttfb: parseInt(e.target.value) }
                    })}
                  />
                </div>
                <div>
                  <Label>Error Rate Target (%)</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    step="0.01"
                    value={data.slo.errorRate}
                    onChange={(e) => setData({
                      ...data,
                      slo: { ...data.slo, errorRate: parseFloat(e.target.value) }
                    })}
                  />
                </div>
                <div>
                  <Label>P95 Latency Target (ms)</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    value={data.slo.p95Latency}
                    onChange={(e) => setData({
                      ...data,
                      slo: { ...data.slo, p95Latency: parseInt(e.target.value) }
                    })}
                  />
                </div>
              </div>

              <Button onClick={handleSLOUpdate} disabled={loading} className="w-full">
                Configure SLO & Generate Badge
              </Button>

              {sloStatus && (
                <Card className="p-4 bg-muted">
                  <h3 className="font-semibold mb-4">Current SLO Status</h3>
                  <div className="space-y-2">
                    {sloStatus.statuses?.map((status: any) => (
                      <div key={status.metric} className="flex items-center justify-between">
                        <span className="capitalize">{status.metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{status.message}</span>
                          {status.status === 'passing' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {status.status === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                          {status.status === 'failing' && <XCircle className="h-4 w-4 text-red-500" />}
                          {status.status === 'unknown' && <Clock className="h-4 w-4 text-gray-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  {sloStatus.badgeUrl && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Badge URL:</p>
                      <code className="text-xs bg-black/5 dark:bg-white/5 p-2 rounded block">
                        {sloStatus.badgeUrl}
                      </code>
                    </div>
                  )}
                </Card>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="cost" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Monthly Cost Estimate
            </h2>

            <div className="space-y-4">
              <div>
                <Label>Currency</Label>
                <select
                  className="w-full mt-2 p-2 border rounded"
                  value={data.cost.currency}
                  onChange={(e) => setData({
                    ...data,
                    cost: { ...data.cost, currency: e.target.value }
                  })}
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>JPY</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Infrastructure</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    value={data.cost.breakdown.infrastructure}
                    onChange={(e) => setData({
                      ...data,
                      cost: {
                        ...data.cost,
                        breakdown: { ...data.cost.breakdown, infrastructure: parseFloat(e.target.value) }
                      }
                    })}
                  />
                </div>
                <div>
                  <Label>Services</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    value={data.cost.breakdown.services}
                    onChange={(e) => setData({
                      ...data,
                      cost: {
                        ...data.cost,
                        breakdown: { ...data.cost.breakdown, services: parseFloat(e.target.value) }
                      }
                    })}
                  />
                </div>
                <div>
                  <Label>Personnel</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    value={data.cost.breakdown.personnel}
                    onChange={(e) => setData({
                      ...data,
                      cost: {
                        ...data.cost,
                        breakdown: { ...data.cost.breakdown, personnel: parseFloat(e.target.value) }
                      }
                    })}
                  />
                </div>
                <div>
                  <Label>Licenses</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    value={data.cost.breakdown.licenses}
                    onChange={(e) => setData({
                      ...data,
                      cost: {
                        ...data.cost,
                        breakdown: { ...data.cost.breakdown, licenses: parseFloat(e.target.value) }
                      }
                    })}
                  />
                </div>
                <div>
                  <Label>Other</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    value={data.cost.breakdown.other}
                    onChange={(e) => setData({
                      ...data,
                      cost: {
                        ...data.cost,
                        breakdown: { ...data.cost.breakdown, other: parseFloat(e.target.value) }
                      }
                    })}
                  />
                </div>
              </div>

              <Card className="p-4 bg-muted">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total Monthly Estimate</span>
                  <span className="text-2xl font-bold">
                    {data.cost.currency} {calculateTotalCost().toLocaleString()}
                  </span>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex gap-4">
        <Button onClick={calculateScore} disabled={loading} className="flex-1">
          Calculate Ops/Legal Score
        </Button>
        <Button onClick={() => router.push(`/projects/${projectId}`)} variant="outline">
          Back to Project
        </Button>
      </div>
    </div>
  );
}
