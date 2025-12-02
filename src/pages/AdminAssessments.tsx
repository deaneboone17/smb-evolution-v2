import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Users, CheckCircle, Database, Zap, LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface EventCounts {
  view: number;
  start: number;
  submit: number;
  ghl_synced: number;
  workflow_started: number;
  result_view: number;
}

const AdminAssessments = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [eventCounts, setEventCounts] = useState<EventCounts>({
    view: 0,
    start: 0,
    submit: 0,
    ghl_synced: 0,
    workflow_started: 0,
    result_view: 0
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please login to access admin dashboard');
        navigate('/login');
        return;
      }

      setIsAuthenticated(true);

      // Check admin role
      const { data: adminCheck, error } = await supabase.rpc('is_admin', {
        user_id: session.user.id,
      });

      if (error) throw error;

      if (!adminCheck) {
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
        return;
      }

      setIsAdmin(true);

      // Log admin access
      await supabase.from('funnel_events').insert({
        event: 'admin_access',
        meta: { user_id: session.user.id, page: 'assessments' },
      });

      // Fetch data only after authentication is confirmed
      fetchData();
    } catch (error: any) {
      toast.error('Authentication error');
      navigate('/login');
    }
  };

  const fetchData = async () => {
      try {
        // Fetch submissions
        const { data: subs, error: subsError } = await supabase
          .from('assessment_submissions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (subsError) throw subsError;
        setSubmissions(subs || []);

        // Fetch events
        const { data: events, error: eventsError } = await supabase
          .from('funnel_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1000);

        if (eventsError) throw eventsError;

        // Count events by type
        const counts: EventCounts = {
          view: events?.filter(e => e.event === 'view').length || 0,
          start: events?.filter(e => e.event === 'start').length || 0,
          submit: events?.filter(e => e.event === 'submit').length || 0,
          ghl_synced: events?.filter(e => e.event === 'ghl_synced').length || 0,
          workflow_started: events?.filter(e => e.event === 'workflow_started').length || 0,
          result_view: events?.filter(e => e.event === 'result_view').length || 0
        };

        setEventCounts(counts);
      } catch (error) {
        toast.error('Error loading data');
      } finally {
        setLoading(false);
      }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect in checkAuth
  };

  // Calculate conversion rate
  const conversionRate = eventCounts.start > 0 
    ? ((eventCounts.submit / eventCounts.start) * 100).toFixed(1)
    : '0';

  if (loading) {
    return (
      <>
        <SEO title="Assessment Admin | SMB Evolution.ai" />
        <Header />
        <main className="min-h-screen bg-background py-12 px-4">
          <div className="container mx-auto max-w-7xl space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-32" />)}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO title="Assessment Admin | SMB Evolution.ai" />
      <Header />
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-heading font-bold">Assessment Analytics</h1>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{eventCounts.view}</div>
                <p className="text-xs text-muted-foreground">Views</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{eventCounts.start}</div>
                <p className="text-xs text-muted-foreground">Started</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{eventCounts.submit}</div>
                <p className="text-xs text-muted-foreground">Submitted</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <BarChart className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{conversionRate}%</div>
                <p className="text-xs text-muted-foreground">Conversion</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Database className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{eventCounts.result_view}</div>
                <p className="text-xs text-muted-foreground">Result Views</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{eventCounts.ghl_synced}</div>
                <p className="text-xs text-muted-foreground">GHL Synced</p>
              </CardContent>
            </Card>
          </div>

          {/* Segment Distribution */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Segment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['beginner', 'intermediate', 'expert'].map(segment => {
                  const count = submissions.filter(s => s.segment === segment).length;
                  const percentage = submissions.length > 0 
                    ? ((count / submissions.length) * 100).toFixed(1)
                    : '0';
                  
                  return (
                    <div key={segment} className="p-4 rounded-xl bg-muted">
                      <p className="text-sm text-muted-foreground capitalize mb-1">{segment}</p>
                      <p className="text-3xl font-bold">{count}</p>
                      <p className="text-xs text-muted-foreground mt-1">{percentage}% of total</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions ({submissions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Score</th>
                      <th className="text-left p-3">Segment</th>
                      <th className="text-left p-3">Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map(sub => (
                      <tr key={sub.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          {sub.first_name} {sub.last_name}
                        </td>
                        <td className="p-3">{sub.email}</td>
                        <td className="p-3 font-bold">{sub.score}</td>
                        <td className="p-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize bg-primary/10 text-primary">
                            {sub.segment}
                          </span>
                        </td>
                        <td className="p-3">{sub.company || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminAssessments;
