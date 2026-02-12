// Updated data models based on 02-data-models.md

// Category - Stores content categories
export interface Category {
  id: string;
  name: string;
}

// Content - Stores media content (images, videos, etc.)
export interface Content {
  id: string;
  fileName: string;
  length?: string;
  description?: string;
  type: "image" | "video";
  src?: string;
}

// Content-Category Link - Links content to categories
export interface ContentCategory {
  id: string;
  contentId: string;
  categoryId: string;
}

// Show - Scheduled content playback
export interface Show {
  id: string;
  contentId: string;
  deviceId: string;
  locationId: string;
  clientId: string;
  start: Date;
  finish: Date;
}

// Device - Display devices (TV, Raspberry Pi, etc.)
export interface Device {
  id: string;
  name: string;
  mac: string;
  deviceType: string;
  status: "online" | "offline";
  lastHeartbeat?: Date;
}

// Device Type - Types of devices
export interface DeviceType {
  id: string;
  name: string;
}

// Location - Where devices are installed
export interface Location {
  id: string;
  name: string;
  wifiName?: string;
  username?: string;
  password?: string;
  otp?: string;
}

// Client - Organizations managing content
export interface Client {
  id: string;
  name: string;
}

// User - System users
export interface User {
  username: string;
  permissionId: string;
  lastName: string;
  firstName: string;
  email: string;
  avatarUrl?: string;
}

// Permission - User roles/permissions
export interface Permission {
  id: string;
  name: string;
}

// Credential - Login credentials
export interface Credential {
  password: string;
  username: string;
}

// Legacy Slide interface (for backwards compatibility)
export interface Slide {
  id: string;
  name: string;
  elements: SlideElement[];
  backgroundColor: string;
  duration: number;
}

export interface SlideElement {
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
    textAlign?: "left" | "center" | "right" | "justify";
    textDecoration?: string;
    borderRadius?: string;
    clipPath?: string;
  };
}

// Organization/Team structure
export interface Organization {
  id: string;
  name: string;
  slug: string;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  organizationId: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: string;
}

// Folder structure for content organization
export interface Folder {
  id: string;
  teamId: string;
  parentId?: string;
  name: string;
}

// Playlist structure
export interface Playlist {
  id: string;
  teamId: string;
  name: string;
  description?: string;
  items: PlaylistItem[];
}

export interface PlaylistItem {
  id: string;
  playlistId: string;
  position: number;
  contentId: string;
  duration: number;
}

// Schedule structure
export interface Schedule {
  id: string;
  teamId: string;
  name: string;
  timezone: string;
  entries: ScheduleEntry[];
}

export interface ScheduleEntry {
  id: string;
  scheduleId: string;
  playlistId: string;
  startTime: string;
  endTime: string;
  daysOfWeek: number[];
}
