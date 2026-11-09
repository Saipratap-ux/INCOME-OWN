import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Tag, 
  Plus, 
  Search, 
  Pin, 
  ShieldCheck, 
  Send,
  Sparkles,
  X
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { posts, addPost, addComment, toggleLikePost, currentUser, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Earning Opportunities' | 'Career & Skills' | 'Govt Schemes' | 'Freelancing India' | 'Platform Updates'>('Career & Skills');
  const [newTags, setNewTags] = useState('Career, India');

  // Comment input per post
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const categories = ['All', 'Earning Opportunities', 'Career & Skills', 'Govt Schemes', 'Freelancing India', 'Platform Updates'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Please provide both title and content for your post', 'warning');
      return;
    }
    const tagsArray = newTags.split(',').map((t) => t.trim()).filter(Boolean);
    addPost({
      title: newTitle,
      content: newContent,
      category: newCategory,
      tags: tagsArray
    });

    setNewTitle('');
    setNewContent('');
    setIsNewPostModalOpen(false);
  };

  const handleSendComment = (postId: string) => {
    if (!commentText.trim()) return;
    addComment(postId, commentText);
    setCommentText('');
    setActiveCommentPostId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Community Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <Users className="w-3.5 h-3.5" /> Peer-to-Peer Indian Network
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
              Saipratap S❤️C Community Forum
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect with fellow Indian learners, discuss verified work-from-home gigs, exam strategies, and digital tools. Earn +25 points for every helpful post you share!
            </p>
          </div>

          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Start a Discussion</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search discussions & tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className={`bg-white rounded-3xl p-6 border transition-all ${
              post.isPinned
                ? 'border-rose-300 ring-2 ring-rose-500/10 shadow-md'
                : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
            }`}
          >
            {post.isPinned && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 mb-3 bg-rose-50 w-fit px-2.5 py-0.5 rounded-full border border-rose-200">
                <Pin className="w-3.5 h-3.5" /> Pinned Community Announcement
              </div>
            )}

            {/* Author Bar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{post.authorName}</span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {post.authorRole}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{post.createdAt}</span>
                </div>
              </div>

              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 hidden sm:inline-block">
                {post.category}
              </span>
            </div>

            {/* Title & Content */}
            <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
              {post.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md flex items-center gap-1"
                >
                  <Tag className="w-3 h-3 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    post.likedByMe
                      ? 'bg-rose-50 text-rose-600'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${post.likedByMe ? 'fill-rose-600' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments.length} Comments</span>
                </button>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Discussion link copied to clipboard!', 'info');
                }}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 p-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>

            {/* Comments Thread */}
            {activeCommentPostId === post.id && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-150">
                {/* Existing comments */}
                {post.comments.length > 0 && (
                  <div className="space-y-3">
                    {post.comments.map((cmt) => (
                      <div key={cmt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                        <img
                          src={cmt.authorAvatar}
                          alt={cmt.authorName}
                          className="w-7 h-7 rounded-full object-cover shrink-0"
                        />
                        <div className="flex-1 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-900">{cmt.authorName}</span>
                            <span className="text-[10px] text-slate-400">{cmt.createdAt}</span>
                          </div>
                          <p className="text-slate-600">{cmt.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* New Comment Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a constructive response or question..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendComment(post.id)}
                  />
                  <button
                    onClick={() => handleSendComment(post.id)}
                    className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                Start a New Community Discussion
              </h3>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                >
                  <option value="Career & Skills">Career & Skills</option>
                  <option value="Earning Opportunities">Earning Opportunities</option>
                  <option value="Govt Schemes">Govt Schemes</option>
                  <option value="Freelancing India">Freelancing India</option>
                  <option value="Platform Updates">Platform Updates</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Discussion Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Tips on applying for remote internships as a fresher"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Content / Details
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share your practical experience, questions, or resources..."
                  className="w-full p-3.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. Remote, Internship, Freshers"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 font-bold">
                  +25 Community Points upon publishing
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
