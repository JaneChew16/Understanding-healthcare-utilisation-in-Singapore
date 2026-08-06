import React, { useEffect } from 'react';

export const DisqusComments: React.FC = () => {
  useEffect(() => {
    // Check if DISQUS is already loaded
    if ((window as any).DISQUS) {
      try {
        (window as any).DISQUS.reset({
          reload: true,
          config: function (this: any) {
            this.page.identifier = window.location.pathname;
            this.page.url = window.location.href;
          },
        });
      } catch (err) {
        console.error('Disqus reset error:', err);
      }
    } else {
      // Load embed.js script
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://vibe-founder.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (+new Date()).toString());
      (d.head || d.body).appendChild(s);
    }

    // Load dsq-count-scr script
    if (!document.getElementById('dsq-count-scr')) {
      const countScript = document.createElement('script');
      countScript.id = 'dsq-count-scr';
      countScript.src = '//vibe-founder.disqus.com/count.js';
      countScript.async = true;
      (document.head || document.body).appendChild(countScript);
    }
  }, []);

  return (
    <section className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs mt-8">
      <h2 className="text-sm font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
        <span>Community Discussion & Feedback</span>
      </h2>
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" rel="nofollow">
          comments powered by Disqus.
        </a>
      </noscript>
    </section>
  );
};
