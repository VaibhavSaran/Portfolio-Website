"use client";

import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { resumeData } from "../data/resume";

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left - Name and tagline */}
          <div>
            <h3 className="text-2xl font-bold mb-2 text-gradient">
              {resumeData.basics.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI Engineer & ML Researcher
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {resumeData.basics.location}
            </div>
          </div>

          {/* Middle - Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#experience"
                  className="text-muted-foreground hover:text-indigo-500 transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-muted-foreground hover:text-indigo-500 transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-muted-foreground hover:text-indigo-500 transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  className="text-muted-foreground hover:text-indigo-500 transition-colors"
                >
                  Education
                </a>
              </li>
            </ul>
          </div>

          {/* Right - Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${resumeData.basics.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-indigo-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {resumeData.basics.email}
              </a>
              <a
                href={`https://${resumeData.basics.links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-indigo-500 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={`https://${resumeData.basics.links.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-indigo-500 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {resumeData.basics.name}. Built with Next.js, TypeScript, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
