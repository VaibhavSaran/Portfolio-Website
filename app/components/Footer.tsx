"use client";

import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { resumeData } from "../data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight">{resumeData.basics.name}</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {resumeData.basics.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${resumeData.basics.email}`} className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-sm font-semibold hover:border-primary">
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a href={`https://${resumeData.basics.links.github}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-sm font-semibold hover:border-primary">
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a href={`https://${resumeData.basics.links.linkedin}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-sm font-semibold hover:border-primary">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
