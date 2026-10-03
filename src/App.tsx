import { useEffect, useState } from 'react';
import { api, auth } from '@appdeploy/client';
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Heart,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  User,
  Wallet,
  X,
  Zap,
} from 'lucide-react';

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  original_price?: number;
  rating?: number;
  stock?: number;
  featured?: boolean;
  variant_name?: string;
};
type CartItem = Product & { qty: number };
type User = Awaited<ReturnType<typeof auth.getUser>>;

const fallback: Product[] = [
  { id: 'canva', name: 'Canva Premium', category: 'Design', description: 'Legitimate digital access with transparent validity and support.', price: 499, original_price: 699, rating: 5, stock: 12, featured: true, variant_name: '1 Month' },
  { id: 'youtube', name: 'YouTube Premium', category: 'Entertainment', description: 'Digital subscription with clear plan and warranty terms.', price: 349, original_price: 449, rating: 4.9, stock: 8, featured: true, variant_name: '1 Month' },
  { id: 'assets', name: 'Design Asset Pack', category: 'Assets', description: 'Curated digital assets for creators.', price: 799, rating: 4.8, stock: 20, featured: true, variant_name: 'Standard' },
  { id: 'workspace', name: 'Creator Workspace', category: 'Productivity', description: 'Digital productivity resources for creators.', price: 599, original_price: 899, rating: 4.9, stock: 15, variant_name: '1 Month' },
];
const cats = ['All', 'Design', 'Entertainment', 'Productivity', 'Assets', 'AI Tools', 'Software', 'Education'];
const money = (n: number) => new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(n).replace('BDT', '৳');

function ProductCard({ p, add, wish, saved }: { p: Product; add: (source?: HTMLElement) => void; wish: () => void; saved: boolean }) {
  return (
    <article className="product-card group">
      <div className="product-visual">
        <span className="product-category">{p.category}</span>
        <button onClick={wish} className="wishlist-btn" aria-label="Save product">
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
        {p.featured && <span className="featured-badge"><Sparkles size={12} /> Featured</span>}
        <div className="product-mark">
          <span>{p.name.split(' ').map((x) => x[0]).join('').slice(0, 2)}</span>
        </div>
        <div className="product-glow" />
      </div>
      <div className="product-info">
        <div className="flex items-center gap-2">
          <div className="rating"><Star size={13} fill="currentColor" /> {p.rating || 5}</div>
          <span className="verified">Verified</span>
        </div>
        <h3>{p.name}</h3>
        <p>{p.description}</p>
        <div className="product-bottom">
          <div>
            <div className="price-row"><b>{money(p.price)}</b>{p.original_price && <span>{money(p.original_price)}</span>}</div>
            <small>{p.variant_name || 'Standard'} · {p.stock || 0} available</small>
          </div>
          <button disabled={!p.stock} onClick={(e) => add(e.currentTarget)} className="add-btn" aria-label="Add product to cart">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

function Storefront({ products, add, wish, wishlist }: { products: Product[]; add: (p: Product, source?: HTMLElement) => void; wish: (p: Product) => void; wishlist: string[] }) {
  const [q, setQ] = useState('');
  const [c, setC] = useState('All');
  const [slide, setSlide] = useState(0);
  const featured = products.filter((p) => p.featured || p.stock).slice(0, 5);
  useEffect(() => { if (featured.length < 2) return; const id = window.setInterval(() => setSlide((s) => (s + 1) % featured.length), 3500); return () => window.clearInterval(id); }, [featured.length]);
  const list = products.filter((p) => (c === 'All' || p.category === c) && (!q || [p.name, p.category, p.description].join(' ').toLowerCase().includes(q.toLowerCase())));
  return (
    <main>
      <section className="store-hero">
        <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow purple-eyebrow"><Zap size={13} /> ByteShip digital marketplace</div>
              <p>Subscriptions, software, creator assets and digital essentials — organized like a real store and ready for simple BDT checkout.</p>
              <div className="hero-search"><Search size={18} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Canva, YouTube, AI tools..." /><button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>Search</button></div>
              <div className="hero-categories">{cats.slice(0, 6).map((x) => <button key={x} onClick={() => { setC(x); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className={c === x ? 'active' : ''}>{x}</button>)}</div>
              <div className="hero-actions"><a href="#/products" className="primary-cta">Shop all products <ArrowRight size={17} /></a><a href="#how-it-works" className="secondary-cta">How it works</a></div>
            </div>
            <div className="hero-slider">
              <div className="hero-slider-head"><span>Trending products</span><span>{featured.length ? `${slide + 1} / ${featured.length}` : 'Store'}</span></div>
              {featured.length ? <div className="hero-slide-card"><div className="hero-slide-art"><span>{featured[slide]?.name.split(' ').map((x) => x[0]).join('').slice(0, 2)}</span><small>{featured[slide]?.category}</small></div><div className="hero-slide-info"><div className="rating"><Star size={13} fill="currentColor" /> {featured[slide]?.rating || 5} · Verified</div><h3>{featured[slide]?.name}</h3><p>{featured[slide]?.description}</p><div className="hero-slide-buy"><b>{money(featured[slide]?.price || 0)}</b><button onClick={(e) => featured[slide] && add(featured[slide], e.currentTarget)}>Add to cart <ShoppingBag size={15} /></button></div></div></div> : <div className="hero-slide-card"><div className="hero-slide-info"><h3>Digital products are loading.</h3></div></div>}
              <div className="hero-slide-dots">{featured.map((p, i) => <button key={p.id} onClick={() => setSlide(i)} className={i === slide ? 'active' : ''} aria-label={`Show ${p.name}`} />)}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="catalog-section mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="catalog-heading">
          <div>
            <div className="eyebrow">Browse the store</div>
            <h2>Shop digital products.</h2>
          </div>
        </div>
        <div className="category-strip">
          {cats.map((x) => <button key={x} onClick={() => setC(x)} className={c === x ? 'active' : ''}>{x}</button>)}
        </div>
        <div className="product-grid">
          {list.map((p) => <ProductCard key={p.id} p={p} add={() => add(p)} wish={() => wish(p)} saved={wishlist.includes(p.id)} />)}
        </div>
        {!list.length && <div className="empty-products"><Search size={26} /><b>No products found</b><span>Try another search or category.</span></div>}
      </section>

      <section id="deals" className="promo-section mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="promo-card">
          <div><span className="eyebrow light">Why ByteShip?</span><h2>Simple shopping for the digital things you actually use.</h2></div>
          <div className="promo-points"><div><Tag size={19} /><span><b>Transparent</b></span></div><div><Wallet size={19} /><span><b>Flexible payment</b></span></div><div><MessageCircle size={19} /><span><b>Human support</b></span></div></div>
        </div>
      </section>

      <section id="how-it-works" className="how-section">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="eyebrow">How it works</div>
          <h2>Simple digital delivery.</h2>
          <div className="steps-grid">
            <div><span>01</span><b>Choose</b></div>
            <div><span>02</span><b>Pay</b></div>
            <div><span>03</span><b>Verify</b></div>
            <div><span>04</span><b>Use</b></div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="faq-card"><CircleHelp size={24} /><div><div className="eyebrow">Need help?</div><h2>Need help?</h2></div><a href="#/support">Support <ArrowRight size={16} /></a></div>
      </section>
    </main>
  );
}

function Cart({ cart, user, signIn, remove }: { cart: CartItem[]; user: User; signIn: () => void; remove: (id: string) => void }) {
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  return <main className="page-shell"><div className="page-heading"><div className="eyebrow">Your bag</div><h1>Cart & checkout.</h1></div>{!cart.length ? <div className="empty-state"><ShoppingBag size={30} /><b>Your cart is empty.</b><a href="#/products" className="primary-cta">Start shopping <ArrowRight size={16} /></a></div> : <div className="checkout-grid"><div className="cart-list">{cart.map((p) => <div key={p.id} className="cart-item"><div className="mini-mark">{p.name.slice(0, 2).toUpperCase()}</div><div className="flex-1"><b>{p.name}</b><p>{p.variant_name} · Qty {p.qty}</p></div><div><b>{money(p.price * p.qty)}</b><button onClick={() => remove(p.id)}>Remove</button></div></div>)}</div><aside className="summary-card"><span>Order total</span><strong>{money(total)}</strong><p>Wallet + bKash/Nagad/QR/Rupantor Pay mixed payment is supported. Manual payments are verified before fulfillment.</p>{user ? <a href="#/checkout" className="primary-cta">Continue to payment <ArrowRight size={16} /></a> : <button onClick={signIn} className="primary-cta">Sign in to checkout</button>}</aside></div>}</main>;
}

function Checkout({ cart, done }: { cart: CartItem[]; user: User; done: (id: string) => void }) {
  const [method, setMethod] = useState('bKash');
  const [trx, setTrx] = useState('');
  const [wallet, setWallet] = useState(0);
  const [busy, setBusy] = useState(false);
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const ext = Math.max(0, total - wallet);
  async function submit() {
    if (!trx || !cart.length) return;
    setBusy(true);
    try {
      const r = await api.post('/api/orders', { items: cart, total, wallet_amount: wallet, external_amount: ext, payment_method: method, transaction_id: trx });
      done(r.data.order_id || 'pending');
    } catch { alert('Could not submit payment. Please try again.'); } finally { setBusy(false); }
  }
  return <main className="page-shell"><div className="page-heading"><div className="eyebrow">Secure checkout</div><h1>Complete your order.</h1></div><div className="checkout-grid"><section className="form-card"><h2>Payment method</h2><div className="payment-grid">{['bKash', 'Nagad', 'Bangla QR', 'Rupantor Pay'].map((x) => <button key={x} onClick={() => setMethod(x)} className={method === x ? 'selected' : ''}>{x}</button>)}</div><label>Transaction ID<input value={trx} onChange={(e) => setTrx(e.target.value)} placeholder="Enter manual payment TrxID" /></label><label>Wallet amount<input type="number" min="0" max={total} value={wallet} onChange={(e) => setWallet(Math.min(total, Math.max(0, Number(e.target.value) || 0)))} /></label><p className="form-note">External payment remaining: {money(ext)}</p><button disabled={!trx || busy} onClick={() => void submit()} className="primary-cta full">{busy ? 'Submitting…' : 'Submit for verification'}</button></section><aside className="summary-card"><span>Order total</span><strong>{money(total)}</strong><div className="summary-line"><span>Wallet</span><b>{money(wallet)}</b></div><div className="summary-line"><span>External</span><b>{money(ext)}</b></div></aside></div></main>;
}

function Support() {
  const [q, setQ] = useState('');
  const [a, setA] = useState('');
  const [busy, setBusy] = useState(false);
  async function ask() {
    if (!q) return;
    setBusy(true);
    try { const r = await api.post('/api/ai-support', { question: q }); setA(r.data.answer || 'A support agent will take over.'); } catch { setA('A support agent will take over this question.'); } finally { setBusy(false); }
  }
  return <div className="support-box"><div className="support-icon"><Bot size={23} /></div><div className="flex-1"><div className="eyebrow">ByteShip Support</div><h2>Ask before you buy.</h2><p>Product, FAQ, basic order-status, warranty and refund help. Sensitive financial actions stay with staff.</p>{a && <div className="support-answer">{a}</div>}<div className="support-input"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask a store question..." /><button disabled={busy} onClick={() => void ask()}>{busy ? '…' : 'Send'}</button></div></div></div>;
}

function Account({ user, signOut, route, wishlistCount }: { user: User; signOut: () => void; route: string; wishlistCount: number }) {
  const [dashboard, setDashboard] = useState<{ orders: Array<{ id?: string; total?: number; status?: string; created_at?: number }>; wallet: number; notifications: Array<{ title?: string; message?: string; read?: boolean }>; refunds: Array<{ order_id?: string; status?: string; reason?: string }>; supportTickets: Array<{ subject?: string; status?: string }> }>({ orders: [], wallet: 0, notifications: [], refunds: [], supportTickets: [] });
  useEffect(() => { void (async () => { try { const r = await api.get('/api/customer/dashboard'); setDashboard({ orders: r.data.orders || [], wallet: Number(r.data.wallet || 0), notifications: r.data.notifications || [], refunds: r.data.refunds || [], supportTickets: r.data.supportTickets || [] }); } catch {} })(); }, []);
  const modules = [['Orders & delivery', '#/account/orders'], ['Wallet & transactions', '#/account/wallet'], ['Wishlist', '#/account/wishlist'], ['Verified reviews', '#/account/reviews'], ['Notifications', '#/account/notifications'], ['Refund & warranty', '#/account/refunds'], ['Support tickets', '#/account/support'], ['Profile & security', '#/account/security']] as const;
  const section = route.startsWith('#/account/') ? route.slice('#/account/'.length) : 'home';
  function panel() {
    if (section === 'orders') return <div className="account-detail"><h2>Orders & delivery</h2><p>Track recent orders and their current verification or fulfillment status.</p>{dashboard.orders.length ? dashboard.orders.map((o, i) => <div className="account-row" key={o.id || i}><span>Order {o.id || '#' + (i + 1)}</span><b>{o.status || 'pending'}</b><strong>{money(Number(o.total || 0))}</strong></div>) : <div className="empty-inline">No orders yet. <a href="#/products">Start shopping</a></div>}</div>;
    if (section === 'wallet') return <div className="account-detail"><h2>Wallet & transactions</h2><p>Your ByteShip wallet balance is shown below. Wallet funds are not withdrawable.</p><div className="wallet-highlight"><Wallet size={24} /><strong>{money(dashboard.wallet)}</strong></div><div className="empty-inline">Wallet transaction history will appear here when ledger entries exist.</div></div>;
    if (section === 'wishlist') return <div className="account-detail"><h2>Wishlist</h2><p>Saved products: <b>{wishlistCount}</b></p><a href="#/products" className="primary-cta">Browse products <ArrowRight size={16} /></a></div>;
    if (section === 'reviews') return <div className="account-detail"><h2>Verified reviews</h2><p>Reviews are published only for eligible purchases and remain subject to store verification.</p><div className="empty-inline">No verified reviews yet.</div></div>;
    if (section === 'notifications') return <div className="account-detail"><h2>Notifications</h2>{dashboard.notifications.length ? dashboard.notifications.map((n, i) => <div className="account-row" key={i}><span>{n.title || 'ByteShip notification'}</span><b>{n.read ? 'Read' : 'New'}</b></div>) : <div className="empty-inline">You're all caught up.</div>}</div>;
    if (section === 'refunds') return <div className="account-detail"><h2>Refund & warranty</h2><p>Refund requests and warranty cases are handled through staff review.</p>{dashboard.refunds.length ? dashboard.refunds.map((r, i) => <div className="account-row" key={i}><span>{r.order_id || 'Order'}</span><b>{r.status || 'pending'}</b><span>{r.reason || 'Request'}</span></div>) : <div className="empty-inline">No refund or warranty cases.</div>}</div>;
    if (section === 'support') return <div className="account-detail"><h2>Support tickets</h2>{dashboard.supportTickets.length ? dashboard.supportTickets.map((t, i) => <div className="account-row" key={i}><span>{t.subject || 'Support ticket'}</span><b>{t.status || 'open'}</b></div>) : <div className="empty-inline">No support tickets. <a href="#/support">Contact support</a></div>}</div>;
    if (section === 'security') return <div className="account-detail"><h2>Profile & security</h2><p>Signed in as <b>{user?.email || 'authenticated customer'}</b>.</p><button onClick={signOut} className="outline-btn">Sign out</button></div>;
    return <div className="account-detail"><h2>Your account</h2><p>Manage orders, wallet, wishlist, reviews, notifications, refunds, support and security from one place.</p></div>;
  }
  return <main className="page-shell"><div className="account-top"><div><div className="eyebrow">My ByteShip</div><h1>Welcome, {user?.name || 'Customer'}.</h1></div><button onClick={signOut} className="outline-btn">Sign out</button></div><div className="account-stats"><div><Wallet /><span>Wallet</span><b>{money(dashboard.wallet)}</b></div><div><ShoppingBag /><span>Orders</span><b>{dashboard.orders.length}</b></div><div><MessageCircle /><span>Support</span><b>AI + staff</b></div></div><div className="account-modules">{modules.map(([label, href]) => <a href={href} key={label}><span>{label}</span><ChevronRight size={16} /></a>)}</div>{panel()}<Support /></main>;
}
function Admin({ user }: { user: User }) {
  const [data, setData] = useState<any>();
  useEffect(() => { void (async () => { try { const r = await api.get('/api/admin/dashboard'); setData(r.data); } catch { setData({ forbidden: true }); } })(); }, []);
  if (!user || data?.forbidden) return <main className="empty-state page-shell"><h1>Admin access denied</h1><p>Use the configured administrator account.</p></main>;
  const modules = ['Products & variants', 'Orders & fulfillment', 'Manual payments', 'Wallet', 'Coupons & discounts', 'Reviews', 'Refunds & warranty', 'Pre-orders', 'Support & AI', 'Staff & permissions', 'SEO & settings', 'Audit logs'];
  return <main className="page-shell"><div className="eyebrow">Store admin</div><h1>ByteShip control center.</h1><div className="admin-stats">{[['Products', data.counts.products], ['Orders', data.counts.orders], ['Payments', data.counts.payments], ['Customers', data.counts.customers]].map((x) => <div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</div><div className="account-modules">{modules.map((x) => <div key={x}><span>{x}</span><small>Protected module</small><ChevronRight size={16} /></div>)}</div></main>;
}

function App() {
  const [route, setRoute] = useState(location.hash || '#/');
  const [products, setProducts] = useState<Product[]>(fallback);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User>(null);
  const [menu, setMenu] = useState(false);
  const [cartFly, setCartFly] = useState<{ left: number; top: number; dx: number; dy: number } | null>(null);
  const [cartPulse, setCartPulse] = useState(false);
  const adminEmail = 't.riyad.2k9@gmail.com';
  const isAdmin = (user?.email || '').toLowerCase() === adminEmail;
  useEffect(() => {
    const f = () => { setRoute(location.hash || '#/'); setMenu(false); };
    addEventListener('hashchange', f);
    try { setCart(JSON.parse(localStorage.getItem('cart') || '[]')); setWishlist(JSON.parse(localStorage.getItem('wishlist') || '[]')); } catch {}
    void (async () => {
      try { const r = await api.get('/api/products'); if (r.data.products?.length) setProducts(r.data.products); } catch {}
      try { setUser(await auth.getUser()); } catch {}
    })();
    return () => removeEventListener('hashchange', f);
  }, []);
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(() => { if (route === '#/deals' || route === '#how-it-works' || route === '#faq') { const target = route.startsWith('#/') ? route.slice(2) : route.slice(1); window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60); } }, [route]);
  function add(p: Product, source?: HTMLElement) {
    setCart((c) => { const i = c.findIndex((x) => x.id === p.id); return i < 0 ? [...c, { ...p, qty: 1 }] : c.map((x, j) => j === i ? { ...x, qty: x.qty + 1 } : x); });
    const target = document.querySelector('[data-cart-target]') as HTMLElement | null;
    if (source && target) {
      const s = source.getBoundingClientRect(); const t = target.getBoundingClientRect();
      setCartFly({ left: s.left + s.width / 2 - 15, top: s.top + s.height / 2 - 15, dx: t.left + t.width / 2 - (s.left + s.width / 2), dy: t.top + t.height / 2 - (s.top + s.height / 2) });
      setCartPulse(false);
    }
  }
  function remove(id: string) { setCart((c) => c.filter((x) => x.id !== id)); }
  function wish(p: Product) { setWishlist((w) => { const next = w.includes(p.id) ? w.filter((x) => x !== p.id) : [...w, p.id]; localStorage.setItem('wishlist', JSON.stringify(next)); return next; }); }
  async function signIn() { try { await auth.signIn({ scope: 'openid email profile offline_access' }); setUser(await auth.getUser()); } catch {} }
  async function signOut() { await auth.signOut(); setUser(null); }
  function done(id: string) { setCart([]); location.hash = '#/order/' + id; }
  function navigateFromMenu(href: string) { setMenu(false); if (href.startsWith('#/')) { location.hash = href; return; } const target = href.replace('#', ''); if (location.hash !== '#/') location.hash = '#/'; window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }

  let content: React.ReactNode = <Storefront products={products} add={add} wish={wish} wishlist={wishlist} />;
  if (route === '#/products') content = <Storefront products={products} add={add} wish={wish} wishlist={wishlist} />;
  if (route === '#/cart') content = <Cart cart={cart} user={user} signIn={signIn} remove={remove} />;
  if (route === '#/checkout') content = user ? <Checkout cart={cart} user={user} done={done} /> : <main className="empty-state page-shell"><User size={30} /><b>Sign in to continue</b><button onClick={signIn} className="primary-cta">Continue with Google</button></main>;
  if (route === '#/account' || route.startsWith('#/account/')) content = user ? <Account user={user} signOut={signOut} route={route} wishlistCount={wishlist.length} /> : <main className="empty-state page-shell"><User size={30} /><b>Sign in to view your account</b><button onClick={signIn} className="primary-cta">Continue with Google</button></main>;
  if (route === '#/admin') content = <Admin user={user} />;
  if (route === '#/support') content = <main className="page-shell"><div className="page-heading"><div className="eyebrow">Support</div><h1>We are here to help.</h1></div><Support /></main>;
  if (route === '#/order') content = <main className="empty-state page-shell"><Check size={30} /><b>Order received</b><p>Payment is pending verification. Fulfillment starts after approval.</p></main>;
  if (route.startsWith('#/order/')) content = <main className="empty-state page-shell"><Check size={30} /><h1>Order received.</h1><p>Payment is pending verification. Fulfillment starts after approval.</p><a href="#/products" className="primary-cta">Continue shopping <ArrowRight size={16} /></a></main>;

  const menuItems = [
    ['Home', '#/'], ['Shop All Products', '#/products'], ['Deals & Offers', '#/deals'], ['Categories', '#/products'],
    ['How It Works', '#how-it-works'], ['FAQ', '#faq'], ['Support', '#/support'],
    ['My Account', '#/account'], ['Cart & Checkout', '#/cart'], ...(isAdmin ? [['Admin', '#/admin']] : []),
  ];
  return <div className="app">
    <div className="announcement"><Sparkles size={12} /> New digital drops · Local BDT checkout · Support when you need it</div>
    <header className="site-header">
      <div className="navbar-glass mx-auto max-w-7xl px-4 py-2.5 sm:px-5">
        <a href="#/" className="brand"><img className="brand-logo" src="https://i.postimg.cc/zvPSSzt0/1000183054-removebg-preview.png" alt="ByteShip" /></a>
        <nav className="desktop-nav"><a href="#/">Home</a><a href="#/products">Shop</a><a href="#/products">Categories</a><a href="#/deals" onClick={(e) => { e.preventDefault(); navigateFromMenu("#/deals"); }}>Deals</a><a href="#how-it-works" onClick={(e) => { e.preventDefault(); navigateFromMenu("#how-it-works"); }}>How it works</a><a href="#/support">Support</a></nav>
        <div className="header-actions"><a href="#/cart" data-cart-target className={`icon-btn glass-control relative${cartPulse ? " cart-pulse" : ""}`}><ShoppingBag size={18} />{cart.length > 0 && <span className="cart-count">{cart.length}</span>}</a><a href="#/account" className="account-btn glass-control"><User size={17} /><span>{user ? 'Account' : 'Sign in'}</span></a><button onClick={() => setMenu(true)} className="menu-trigger glass-control"><Menu size={21} /></button></div>
      </div>
      {menu && <div className="menu-overlay" onClick={(e) => { if (e.target === e.currentTarget) setMenu(false); }}><div className="menu-panel liquid-menu"><div className="menu-top"><span className="eyebrow purple-eyebrow">ByteShip menu</span><button onClick={() => setMenu(false)} className="icon-btn glass-control"><X size={22} /></button></div><div className="menu-links">{menuItems.map(([label, href]) => <a key={label} href={href} onClick={(e) => { e.preventDefault(); navigateFromMenu(href); }}>{label}<ChevronRight size={18} /></a>)}</div><div className="menu-footer"><span>Digital products, shipped simply.</span><a href="#/cart" onClick={() => setMenu(false)}>View cart · {cart.length}</a></div></div></div>}
    </header>
    {cartFly && <div className="cart-fly" style={{ left: cartFly.left, top: cartFly.top, "--dx": `${cartFly.dx}px`, "--dy": `${cartFly.dy}px` } as React.CSSProperties} onAnimationEnd={() => { setCartFly(null); setCartPulse(true); window.setTimeout(() => setCartPulse(false), 420); }}><ShoppingBag size={18} /></div>}
    {content}
    <footer className="site-footer"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><div className="footer-grid"><div><a href="#/" className="brand"><img className="brand-logo" src="https://i.postimg.cc/zvPSSzt0/1000183054-removebg-preview.png" alt="ByteShip" /><span><b>ByteShip</b></span></a></div><div><b>Shop</b><a href="#/products">All products</a><a href="#/deals" onClick={(e) => { e.preventDefault(); navigateFromMenu("#/deals"); }}>Deals & offers</a><a href="#/cart">Cart</a></div><div><b>Help</b><a href="#how-it-works" onClick={(e) => { e.preventDefault(); navigateFromMenu("#how-it-works"); }}>How it works</a><a href="#faq" onClick={(e) => { e.preventDefault(); navigateFromMenu("#faq"); }}>FAQ</a><a href="#/support">Support</a></div><div><b>Account</b><a href="#/account">My account</a><a href="#/account">Orders</a><a href="#/account">Wallet</a></div></div><div className="footer-bottom"><span>© 2026 ByteShip. All rights reserved.</span><span>BDT · Secure checkout · Human support</span></div></div></footer>
  </div>;
}
export default App;