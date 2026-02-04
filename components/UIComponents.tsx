import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-md shadow-purple-500/20 border border-transparent',
      secondary: 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm',
      ghost: 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100',
      outline: 'bg-transparent text-slate-600 border border-slate-300 hover:bg-slate-50 hover:text-slate-900',
      white: 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm border border-slate-200',
      danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100',
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      icon: 'p-2 flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// --- Badge ---
interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'purple' | 'sky' | 'blue' | 'indigo' | 'orange';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600 border-slate-200',
    outline: 'bg-transparent text-slate-500 border-slate-300 border',
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    sky: 'bg-sky-100 text-sky-700 border-sky-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border', variants[variant], className)}>
      {children}
    </span>
  );
};

// --- Avatar ---
interface AvatarProps {
  src?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  key?: React.Key;
}

export const Avatar = ({ src, fallback, size = 'md', className }: AvatarProps) => {
  const sizes = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
    xl: 'w-12 h-12 text-base'
  };

  return (
    <div className={cn('relative rounded-full overflow-hidden bg-slate-200 flex items-center justify-center border-2 border-white shadow-sm', sizes[size], className)}>
      {src ? (
        <img src={src} alt={fallback} className="w-full h-full object-cover" />
      ) : (
        <span className="text-slate-500 font-semibold">{fallback}</span>
      )}
    </div>
  );
};

// --- Dialog / Modal ---
interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

export const Dialog = ({ isOpen, onClose, title, children, actions }: DialogProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col relative z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                        <Icons.X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 text-sm text-slate-600 leading-relaxed">
                    {children}
                </div>
                {actions && (
                    <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex justify-end gap-3">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    )
}

// --- Icons (Lucide wrappers) ---
import { 
  LayoutDashboard, Calendar, Radio, FileText, Settings, 
  Search, Bell, ChevronDown, ChevronRight, ChevronLeft, Plus, 
  Upload, Sparkles, Filter, Clock, MapPin, 
  MoreHorizontal, Users, CheckCircle2, Circle,
  LayoutGrid, List, SlidersHorizontal, ArrowUpRight,
  User, Bookmark, Square, Eye, Download, TrendingUp, Check,
  Lightbulb, Zap, AlertTriangle, MessageSquare, PanelRightClose, PanelRightOpen, Brain,
  X, Loader2
} from 'lucide-react';

export const Icons = {
  Dashboard: LayoutDashboard,
  Planner: Calendar,
  Live: Radio,
  Reports: FileText,
  FileText: FileText,
  Settings: Settings,
  Search: Search,
  Bell: Bell,
  ChevronDown: ChevronDown,
  ChevronRight: ChevronRight,
  ChevronLeft: ChevronLeft,
  Plus: Plus,
  Upload: Upload,
  AI: Sparkles,
  Filter: Filter,
  Clock: Clock,
  Location: MapPin,
  More: MoreHorizontal,
  Users: Users,
  Check: Check,
  CheckCircle2: CheckCircle2,
  Circle: Circle,
  Grid: LayoutGrid,
  List: List,
  Sliders: SlidersHorizontal,
  ArrowUpRight: ArrowUpRight,
  User: User,
  Bookmark: Bookmark,
  Square: Square,
  Eye: Eye,
  Download: Download,
  TrendingUp: TrendingUp,
  Lightbulb: Lightbulb,
  Zap: Zap,
  AlertTriangle: AlertTriangle,
  MessageSquare: MessageSquare,
  PanelRightClose: PanelRightClose,
  PanelRightOpen: PanelRightOpen,
  Brain: Brain,
  X: X,
  Loader: Loader2
};