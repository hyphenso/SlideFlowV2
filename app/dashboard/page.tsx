import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Presentation, Images, ListVideo, Activity, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

// Mock slides data
const mockSlides = [
  { id: "1", name: "Welcome Slide", isActive: true },
  { id: "2", name: "Product Showcase", isActive: true },
  { id: "3", name: "Contact Information", isActive: true },
];

const mockPlaylists = [
  { id: "1", name: "Main Playlist", itemCount: 3 },
];

const mockSchedules = [
  { id: "1", name: "Business Hours" },
];

export default async function DashboardPage() {
  const slides = mockSlides;
  const playlists = mockPlaylists;
  const schedules = mockSchedules;

  const activeSlides = slides.filter(s => s.isActive).length;
  const totalDuration = slides.reduce((acc, s) => acc + 10, 0); // Assuming 10s per slide

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your digital signage presentation
          </p>
        </div>
        <Link href="/display" target="_blank">
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Display
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Slides</CardTitle>
            <Presentation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{slides.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeSlides} active slides
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presentation Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(totalDuration / 60)}m {totalDuration % 60}s
            </div>
            <p className="text-xs text-muted-foreground">
              Total loop time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Playlists</CardTitle>
            <ListVideo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playlists.length}</div>
            <p className="text-xs text-muted-foreground">
              Active content sequences
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schedules</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schedules.length}</div>
            <p className="text-xs text-muted-foreground">
              Time-based rules
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Slides Preview & Cast Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Slides</CardTitle>
            <CardDescription>Your presentation slides</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {slides.map((slide, index) => (
                <div key={slide.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{slide.name}</p>
                      <p className="text-xs text-muted-foreground">10 seconds</p>
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dashboard/screens">
                <Button variant="outline" className="w-full">
                  Manage Slides
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cast to TV</CardTitle>
            <CardDescription>Display your slides on any screen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Display URL</p>
                <code className="text-xs bg-background p-2 rounded block font-mono">
                  https://yourdomain.com/display
                </code>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Setup Instructions:</p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Open the Display URL in any browser</li>
                  <li>For Raspberry Pi: Install Chromium browser</li>
                  <li>Configure auto-start with kiosk mode</li>
                  <li>Slides auto-refresh every 30 seconds</li>
                </ol>
              </div>

              <div className="flex gap-2">
                <Link href="/display" target="_blank" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Presentation className="mr-2 h-4 w-4" />
                    Preview Display
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Raspberry Pi Setup Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Raspberry Pi Setup Guide</CardTitle>
          <CardDescription className="text-blue-700">
            Configure your Raspberry Pi to display slides automatically
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <p className="text-gray-400"># Install Chromium (if not already installed)</p>
            <p>sudo apt-get update</p>
            <p>sudo apt-get install chromium-browser</p>
            <br />
            <p className="text-gray-400"># Edit autostart file</p>
            <p>sudo nano /etc/xdg/lxsession/LXDE-pi/autostart</p>
            <br />
            <p className="text-gray-400"># Add this line to the file:</p>
            <p>@chromium-browser --kiosk https://yourdomain.com/display</p>
            <br />
            <p className="text-gray-400"># Save and reboot</p>
            <p>sudo reboot</p>
          </div>
          <p className="text-sm text-blue-800">
            The display will automatically refresh every 30 seconds to check for updates, 
            and perform a full page reload every 5 minutes to ensure fresh content.
          </p>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest changes and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm">New slide created</p>
                <p className="text-xs text-muted-foreground">Welcome Slide</p>
              </div>
              <span className="text-xs text-muted-foreground">2h ago</span>
            </div>
            <div className="flex items-center gap-3">
              <Presentation className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <p className="text-sm">Presentation started</p>
                <p className="text-xs text-muted-foreground">Display mode activated</p>
              </div>
              <span className="text-xs text-muted-foreground">4h ago</span>
            </div>
            <div className="flex items-center gap-3">
              <Images className="h-4 w-4 text-purple-500" />
              <div className="flex-1">
                <p className="text-sm">Slide updated</p>
                <p className="text-xs text-muted-foreground">Product Showcase</p>
              </div>
              <span className="text-xs text-muted-foreground">1d ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
