import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Clock, 
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useFavorites } from '@/hooks/useFavorites';
import { faculties, Course } from '@/data/courses';
import { FloatingOrbs } from '@/components/ui/FloatingOrbs';
import { UserMenu } from '@/components/UserMenu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// Helper to get course by ID
function getCourseById(courseId: string): Course | undefined {
  for (const faculty of faculties) {
    const course = faculty.courses.find(c => c.id === courseId);
    if (course) return course;
  }
  return undefined;
}

// Helper to get faculty by ID
function getFacultyById(facultyId: string) {
  return faculties.find(f => f.id === facultyId);
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { stats, loading: statsLoading } = useDashboardStats();
  const { favorites, loading: favoritesLoading, removeFavorite } = useFavorites();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const isLoading = statsLoading || favoritesLoading;

  // Get recent courses from progress data
  const recentCourses = stats?.courseProgress.slice(0, 5) || [];

  // Calculate max messages for progress bar scaling
  const maxMessages = Math.max(...(stats?.courseProgress.map(c => c.messageCount) || [1]), 1);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingOrbs />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <button onClick={() => navigate('/')} className="focus:outline-none">
              <img src="/logo.png" alt="Platform Logo" className="w-32 h-32" />
            </button>
          </div>
          <UserMenu />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome back, <span className="gradient-text-blue">{user.email?.split('@')[0]}</span>
            </h1>
            <p className="text-muted-foreground">
              Track your learning progress and continue where you left off.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <Card className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {isLoading ? '...' : stats?.totalMessages || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {isLoading ? '...' : stats?.coursesEngaged || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Courses Engaged</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {isLoading ? '...' : favorites.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Favorite Courses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Chats / Learning Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-border/50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse space-y-2">
                          <div className="h-4 bg-muted rounded w-3/4" />
                          <div className="h-2 bg-muted rounded w-full" />
                        </div>
                      ))}
                    </div>
                  ) : recentCourses.length === 0 ? (
                    <div className="text-center py-8">
                      <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        No learning activity yet. Start chatting with a course!
                      </p>
                      <Button onClick={() => navigate('/')} variant="outline">
                        Explore Courses
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {recentCourses.map((progress, index) => {
                        const course = getCourseById(progress.courseId);
                        if (!course) return null;
                        const faculty = getFacultyById(course.faculty);
                        const progressPercent = Math.min((progress.messageCount / maxMessages) * 100, 100);

                        return (
                          <motion.div
                            key={progress.courseId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate">
                                  {course.shortName}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <span>{faculty?.icon}</span>
                                  <span>{faculty?.shortName}</span>
                                  <span className="mx-1">•</span>
                                  <Clock className="w-3 h-3" />
                                  <span>{format(new Date(progress.lastActivity), 'MMM d')}</span>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-primary">
                                  {progress.messageCount} msgs
                                </p>
                              </div>
                            </div>
                            <Progress value={progressPercent} className="h-2" />
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Favorite Courses */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card border-border/50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Star className="w-5 h-5 text-primary" />
                    Favorite Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse h-16 bg-muted rounded-lg" />
                      ))}
                    </div>
                  ) : favorites.length === 0 ? (
                    <div className="text-center py-8">
                      <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        No favorite courses yet. Add courses to your favorites!
                      </p>
                      <Button onClick={() => navigate('/')} variant="outline">
                        Browse Courses
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {favorites.map((fav, index) => {
                        const course = getCourseById(fav.course_id);
                        if (!course) return null;
                        const faculty = getFacultyById(course.faculty);

                        return (
                          <motion.div
                            key={fav.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="group flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className="text-xl">{faculty?.icon}</span>
                              <div className="min-w-0">
                                <p className="font-medium text-foreground truncate">
                                  {course.shortName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {faculty?.shortName} • {course.level}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFavorite(fav.course_id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                              >
                                Remove
                              </Button>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start New Learning Session
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
