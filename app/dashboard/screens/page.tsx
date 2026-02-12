"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Edit, Play, Copy, Trash2, MoreVertical, Presentation, Clock, Video, Moon, Sun } from "lucide-react";

interface SlideElement {
  id: string;
  type: "text" | "image" | "shape" | "video";
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  src?: string;
  style: {
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    textAlign?: "left" | "center" | "right";
    textDecoration?: string;
    borderRadius?: string;
    clipPath?: string;
  };
}

interface Slide {
  id: string;
  name: string;
  thumbnailUrl?: string;
  elements: SlideElement[];
  backgroundColor: string;
  duration: number;
  lastModified: Date;
  slideNumber: number;
}

const defaultSlides: Slide[] = [
  {
    id: "1",
    name: "Welcome Slide",
    elements: [
      {
        id: "1",
        type: "text",
        x: 100,
        y: 150,
        width: 760,
        height: 100,
        content: "Welcome to Our Digital Signage",
        style: {
          fontSize: 48,
          color: "#ffffff",
          fontFamily: "Arial",
          fontWeight: "bold",
          textAlign: "center",
        },
      },
    ],
    backgroundColor: "#4F46E5",
    duration: 10,
    lastModified: new Date(),
    slideNumber: 1,
  },
];

// Dark mode colors - Light Gray Theme
const DARK_BG = "#4a5568"; // Lighter gray background
const DARK_BG_LIGHTER = "#5a6578"; // Even lighter for panels
const DARK_BG_DARKER = "#3a4558"; // Darker for inputs
const DARK_BORDER = "#6a7588"; // Light border for visibility
const DARK_TEXT = "#ffffff"; // Pure white for maximum visibility
const DARK_TEXT_MUTED = "#d1d5db"; // Light gray for secondary text
const ACCENT_COLOR = "#60a5fa"; // Brighter blue accent

export default function ScreensPage() {
  const router = useRouter();
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [newSlideName, setNewSlideName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("slideflow_darkmode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("slideflow_darkmode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Load slides from localStorage on mount
  useEffect(() => {
    const savedSlides = localStorage.getItem("slideflow_slides");
    if (savedSlides) {
      try {
        const parsed = JSON.parse(savedSlides);
        if (parsed.length > 0) {
          setSlides(parsed.map((s: any, i: number) => ({ ...s, slideNumber: i + 1 })));
        }
      } catch (e) {
        console.error("Error loading slides:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save slides to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("slideflow_slides", JSON.stringify(slides));
    }
  }, [slides, isLoaded]);

  const handleAddSlide = () => {
    if (!newSlideName.trim()) return;

    const newSlide: Slide = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSlideName,
      elements: [],
      backgroundColor: darkMode ? "#0a0a0a" : "#ffffff",
      duration: 10,
      lastModified: new Date(),
      slideNumber: slides.length + 1,
    };

    const updatedSlides = [...slides, newSlide];
    setSlides(updatedSlides);
    setNewSlideName("");
    setIsDialogOpen(false);

    // Navigate to editor
    router.push(`/editor/${newSlide.id}`);
  };

  const handleEditSlide = (slideId: string) => {
    router.push(`/editor/${slideId}`);
  };

  const handleDuplicateSlide = (slide: Slide) => {
    const duplicated: Slide = {
      ...slide,
      id: Math.random().toString(36).substr(2, 9),
      name: `${slide.name} (Copy)`,
      elements: JSON.parse(JSON.stringify(slide.elements)),
      slideNumber: slides.length + 1,
      lastModified: new Date(),
    };
    setSlides([...slides, duplicated]);
  };

  const handleDeleteSlide = (slideId: string) => {
    setSlides(slides.filter((s) => s.id !== slideId));
  };

  const handlePresent = () => {
    window.open("/display", "_blank");
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Dark Mode Theme Styles */}
      <style jsx global>{`
        .dark {
          background-color: ${DARK_BG} !important;
          min-height: 100vh;
        }
        .dark .dashboard-bg {
          background-color: ${DARK_BG};
        }
        .dark .dashboard-panel {
          background-color: ${DARK_BG_LIGHTER};
          border-color: ${DARK_BORDER};
        }
        .dark .dashboard-text {
          color: ${DARK_TEXT};
        }
        .dark .dashboard-text-muted {
          color: ${DARK_TEXT_MUTED};
        }
        .dark .dashboard-input {
          background-color: ${DARK_BG_DARKER};
          border-color: ${DARK_BORDER};
          color: ${DARK_TEXT};
        }
        .dark .dashboard-button {
          background-color: ${DARK_BG_LIGHTER};
          border-color: ${DARK_BORDER};
          color: ${DARK_TEXT};
        }
        .dark .dashboard-button:hover {
          background-color: ${DARK_BG};
          border-color: ${ACCENT_COLOR};
        }
      `}</style>

      <div className={`space-y-6 p-6 min-h-screen ${darkMode ? 'dashboard-bg' : ''}`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold tracking-tight ${darkMode ? 'dashboard-text' : ''}`}>Slides</h1>
            <p className={darkMode ? 'dashboard-text-muted' : 'text-muted-foreground'}>
              Create and manage your presentation slides
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePresent} className={darkMode ? 'dashboard-button' : ''}>
              <Presentation className="mr-2 h-4 w-4" />
              Present
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className={darkMode ? 'bg-gray-700 hover:bg-gray-600' : ''}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Slide
                </Button>
              </DialogTrigger>
              <DialogContent className={darkMode ? 'bg-gray-900 border-gray-700' : ''}>
                <DialogHeader>
                  <DialogTitle className={darkMode ? 'text-white' : ''}>Create New Slide</DialogTitle>
                  <DialogDescription className={darkMode ? 'text-gray-400' : ''}>
                    Give your slide a name to get started
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    placeholder="Enter slide name..."
                    value={newSlideName}
                    onChange={(e) => setNewSlideName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddSlide();
                    }}
                    className={darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className={darkMode ? 'border-gray-600 text-white hover:bg-gray-800' : ''}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSlide} disabled={!newSlideName.trim()}>
                    Create & Edit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Slides Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {slides.map((slide, index) => (
            <Card key={slide.id} className={`group overflow-hidden ${darkMode ? 'bg-gray-900/80 border-gray-700' : ''}`}>
              <CardHeader className="p-0">
                <div 
                  className="relative aspect-video cursor-pointer"
                  style={{ backgroundColor: slide.backgroundColor }}
                  onClick={() => handleEditSlide(slide.id)}
                >
                  {/* Render slide elements as preview */}
                  <div className="absolute inset-0 overflow-hidden">
                    {slide.elements.map((element) => (
                      <div
                        key={element.id}
                        className="absolute"
                        style={{
                          left: `${(element.x / 960) * 100}%`,
                          top: `${(element.y / 540) * 100}%`,
                          width: `${(element.width / 960) * 100}%`,
                          height: `${(element.height / 540) * 100}%`,
                          fontSize: element.style.fontSize ? `${(element.style.fontSize / 960) * 30}vw` : undefined,
                          color: element.style.color,
                          fontFamily: element.style.fontFamily,
                          fontWeight: element.style.fontWeight,
                          fontStyle: element.style.fontStyle,
                          textAlign: element.style.textAlign,
                          textDecoration: element.style.textDecoration,
                          backgroundColor: element.type === "shape" ? element.style.backgroundColor : undefined,
                          borderRadius: element.style.borderRadius,
                          clipPath: element.style.clipPath,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: element.style.textAlign === "center" ? "center" : element.style.textAlign === "right" ? "flex-end" : "flex-start",
                          overflow: "hidden",
                        }}
                      >
                        {element.type === "text" && (
                          <span className="truncate w-full px-1" style={{ fontSize: "inherit" }}>
                            {element.content}
                          </span>
                        )}
                        {element.type === "image" && element.src && (
                          <img src={element.src} alt="" className="w-full h-full object-cover" />
                        )}
                        {element.type === "video" && (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <Video className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {element.type === "shape" && (
                          <div className="w-full h-full" style={{ backgroundColor: element.style.backgroundColor }} />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditSlide(slide.id);
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePresent();
                      }}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                  
                  {/* Slide Number Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className={darkMode ? 'bg-gray-800 text-white' : ''}>{index + 1}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium truncate ${darkMode ? 'text-white' : ''}`}>{slide.name}</h3>
                    <div className={`flex items-center gap-2 text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
                      <Clock className="h-3 w-3" />
                      <span>{formatDuration(slide.duration)}</span>
                      <span>•</span>
                      <span>{slide.elements.length} items</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className={`h-8 w-8 ${darkMode ? 'text-white hover:bg-gray-800' : ''}`}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={darkMode ? 'bg-gray-900 border-gray-700' : ''}>
                      <DropdownMenuItem onClick={() => handleEditSlide(slide.id)} className={darkMode ? 'text-white focus:bg-gray-800' : ''}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateSlide(slide)} className={darkMode ? 'text-white focus:bg-gray-800' : ''}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Slide Card */}
          <Card
            className={`border-dashed cursor-pointer hover:bg-accent transition-colors ${
              darkMode ? 'bg-gray-900/50 border-gray-700 hover:bg-gray-800' : ''
            }`}
            onClick={() => setIsDialogOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px]">
              <div className={`rounded-full p-4 mb-4 ${darkMode ? 'bg-gray-800' : 'bg-primary/10'}`}>
                <Plus className={`h-8 w-8 ${darkMode ? 'text-white' : 'text-primary'}`} />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : ''}`}>Add New Slide</h3>
              <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
                Create a new slide for your presentation
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Presentation Info */}
        <Card className={`${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-muted/50'}`}>
          <CardHeader>
            <CardTitle className={`text-lg ${darkMode ? 'text-white' : ''}`}>Presentation Info</CardTitle>
            <CardDescription className={darkMode ? 'text-gray-400' : ''}>
              Details about your current slide deck
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Total Slides</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : ''}`}>{slides.length}</p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Total Duration</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : ''}`}>
                  {formatDuration(slides.reduce((acc, s) => acc + s.duration, 0))}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Display URL</p>
                <p className={`text-sm font-mono p-2 rounded mt-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-background'}`}>
                  /display
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
