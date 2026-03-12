import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FileText, Wand2, BookOpen, Sparkles, CheckSquare,
  LogOut, Menu, X, ChevronRight, Zap
} from 'lucide-react';

const NAV_ITEMS = [
  {
    path: '/workspace',
    label: 'AI 润色增强',
    icon: Sparkles,
    description: '论文润色与原创性增强',
    color: 'text-blue-500',
    activeColor: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    path: '/article-preprocessor',
    label: '文章预处理',
    icon: Wand2,
    description: '智能段落识别与分类',
    color: 'text-violet-500',
    activeColor: 'bg-violet-50 text-violet-600 border-violet-200',
  },
  {
    path: '/format-checker',
    label: '格式检测',
    icon: CheckSquare,
    description: '格式规范智能检测',
    color: 'text-emerald-500',
    activeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  {
    path: '/spec-generator',
    label: '规范生成',
    icon: BookOpen,
    description: 'AI 自动生成格式规范',
    color: 'text-amber-500',
    activeColor: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  {
    path: '/word-formatter',
    label: 'Word 排版',
    icon: FileText,
    description: '一键生成标准 Word 文档',
    color: 'text-rose-500',
    activeColor: 'bg-rose-50 text-rose-600 border-rose-200',
  },
];

const AppLayout = ({ children, pageTitle, pageIcon: PageIcon, pageDescription, headerActions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('cardKey');
    navigate('/');
  };

  const currentItem = NAV_ITEMS.find(item => item.path === location.pathname);

  return (
    <div className="min-h-screen bg-ios-background flex">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-xl
        border-r border-gray-200/80 z-50 flex flex-col
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-[10px] flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-[15px] font-bold text-gray-900 tracking-tight leading-none">AI 写作助手</h1>
              <p className="text-[11px] text-gray-400 mt-0.5">学术论文工具集</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3">工具列表</p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                  transition-all duration-200 group border
                  ${isActive
                    ? `${item.activeColor} border-opacity-60 shadow-sm`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                  }
                `}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all
                  ${isActive ? 'bg-white/70 shadow-sm' : 'bg-gray-100 group-hover:bg-gray-200'}
                `}>
                  <Icon className={`w-4 h-4 ${isActive ? item.color : 'text-gray-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-semibold leading-none ${isActive ? '' : 'text-gray-700'}`}>
                    {item.label}
                  </p>
                  <p className={`text-[11px] mt-0.5 leading-none truncate ${isActive ? 'opacity-70' : 'text-gray-400'}`}>
                    {item.description}
                  </p>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group border border-transparent hover:border-red-100"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
              <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
            </div>
            <span className="text-[13px] font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/80 sticky top-0 z-30 h-[52px] flex items-center px-4 lg:px-6 gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {PageIcon && (
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                ${currentItem ? currentItem.activeColor.split(' ').find(c => c.startsWith('bg-')) || 'bg-blue-50' : 'bg-blue-50'}
              `}>
                <PageIcon className={`w-4 h-4 ${currentItem ? currentItem.color : 'text-blue-500'}`} />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-[15px] font-semibold text-gray-900 leading-none truncate">
                {pageTitle || currentItem?.label || 'AI 写作助手'}
              </h2>
              {pageDescription && (
                <p className="text-[11px] text-gray-400 mt-0.5 leading-none truncate hidden sm:block">
                  {pageDescription}
                </p>
              )}
            </div>
          </div>

          {/* Custom Header Actions */}
          {headerActions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {headerActions}
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
