'use client'
import { use, useState, useEffect, useRef } from 'react'
import { notFound } from 'next/navigation'

const LETTERS: Record<string, string[]> = {
  'favian-tong': [
    'cat letter.txt',
    '─────────────────────────────────────────',
    'Favian,',
    '',
    'This is a placeholder letter for Favian.',
    'Write something personal here about your',
    'friendship, memories, and what it means',
    'to have him stand by your side.',
    '',
    'He\'ll love it.',
    '',
    '— Kenny',
    '─────────────────────────────────────────',
  ],
  'kenneth-le': [
    'cat letter.txt',
    '─────────────────────────────────────────',
    'Kenneth,',
    '',
    'This is a placeholder letter for Kenneth.',
    'Write something personal here about your',
    'friendship, memories, and what it means',
    'to have him stand by your side.',
    '',
    'He\'ll love it.',
    '',
    '— Kenny',
    '─────────────────────────────────────────',
  ],
  'kevin-mai': [
    'cat letter.txt',
    '─────────────────────────────────────────',
    'Kevin,',
    '',
    'This is a placeholder letter for Kevin Mai.',
    'Write something personal here about your',
    'friendship, memories, and what it means',
    'to have him stand by your side.',
    '',
    'He\'ll love it.',
    '',
    '— Kenny',
    '─────────────────────────────────────────',
  ],
  'kevin-nguyen': [
    'cat letter.txt',
    '─────────────────────────────────────────',
    'Kevin,',
    '',
    'This is a placeholder letter for Kevin Nguyen.',
    'Write something personal here about your',
    'friendship, memories, and what it means',
    'to have him stand by your side.',
    '',
    'He\'ll love it.',
    '',
    '— Kenny',
    '─────────────────────────────────────────',
  ],
  'khoi-le': [
    'cat letter.txt',
    '─────────────────────────────────────────',
    'Khoi,',
    '',
    'This is a placeholder letter for Khoi.',
    'Write something personal here about your',
    'friendship, memories, and what it means',
    'to have him stand by your side.',
    '',
    'He\'ll love it.',
    '',
    '— Kenny',
    '─────────────────────────────────────────',
  ],
}

const GROOMSMEN: Record<string, { name: string; firstName: string; lines: string[] }> = {
  'favian-tong': {
    name: 'Favian Tong',
    firstName: 'Favian',
    lines: [
      '> Initializing wedding.exe...',
      '> Loading best_humans.json...',
      '> Scanning crew manifest...',
      '> Found: favian_tong — loyalty: MAX, fun_level: OVER_9000',
      '> ERROR: groomsman[1] slot unfilled',
      '> Attempting fix...',
      '> sudo assign --role="groomsman" --person="Favian Tong"',
      '> Running compatibility check... ✓ PASSED',
      '> Awaiting confirmation from Favian...',
    ],
  },
  'kenneth-le': {
    name: 'Kenneth Le',
    firstName: 'Kenneth',
    lines: [
      '> Initializing wedding.exe...',
      '> Loading best_humans.json...',
      '> Scanning crew manifest...',
      '> Found: kenneth_le — brother_status: TRUE, ride_or_die: TRUE',
      '> ERROR: groomsman[2] slot unfilled',
      '> Attempting fix...',
      '> sudo assign --role="groomsman" --person="Kenneth Le"',
      '> Running compatibility check... ✓ PASSED',
      '> Awaiting confirmation from Kenneth...',
    ],
  },
  'kevin-mai': {
    name: 'Kevin Mai',
    firstName: 'Kevin',
    lines: [
      '> Initializing wedding.exe...',
      '> Loading best_humans.json...',
      '> Scanning crew manifest...',
      '> Found: kevin_mai — vibe: IMMACULATE, dependability: 100%',
      '> ERROR: groomsman[3] slot unfilled',
      '> Attempting fix...',
      '> sudo assign --role="groomsman" --person="Kevin Mai"',
      '> Running compatibility check... ✓ PASSED',
      '> Awaiting confirmation from Kevin...',
    ],
  },
  'kevin-nguyen': {
    name: 'Kevin Nguyen',
    firstName: 'Kevin',
    lines: [
      '> Initializing wedding.exe...',
      '> Loading best_humans.json...',
      '> Scanning crew manifest...',
      '> Found: kevin_nguyen — hype_man: ELITE, good_times: GUARANTEED',
      '> ERROR: groomsman[4] slot unfilled',
      '> Attempting fix...',
      '> sudo assign --role="groomsman" --person="Kevin Nguyen"',
      '> Running compatibility check... ✓ PASSED',
      '> Awaiting confirmation from Kevin...',
    ],
  },
  'khoi-le': {
    name: 'Khoi Le',
    firstName: 'Khoi',
    lines: [
      '> Initializing wedding.exe...',
      '> Loading best_humans.json...',
      '> Scanning crew manifest...',
      '> Found: khoi_le — real_one: VERIFIED, memories: PRICELESS',
      '> ERROR: groomsman[5] slot unfilled',
      '> Attempting fix...',
      '> sudo assign --role="groomsman" --person="Khoi Le"',
      '> Running compatibility check... ✓ PASSED',
      '> Awaiting confirmation from Khoi...',
    ],
  },
}

const SLUGS = Object.keys(GROOMSMEN)

export default function GroomsmanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const person = GROOMSMEN[slug]

  if (!person) notFound()

  const [unlocked, setUnlocked] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wedding = new Date('2027-07-16T17:00:00')
    const tick = () => {
      const diff = wedding.getTime() - Date.now()
      if (diff <= 0) return
      setCountdown({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [showPrompt, setShowPrompt] = useState(false)
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)
  const [letterLines, setLetterLines] = useState<string[]>([])
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const noBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (answer !== 'yes') return
    const canvas = matrixCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    const cols = Math.floor(canvas.width / 16)
    const drops = Array(cols).fill(1)
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF'
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = '14px monospace'
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 16, y * 16)
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }
    const id = setInterval(draw, 40)
    const onResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => { clearInterval(id); window.removeEventListener('resize', onResize) }
  }, [answer])

  const handlePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput.toLowerCase() === 'reinakumo') {
      setUnlocked(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
      setPasswordInput('')
    }
  }

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches
    const flee = (clientX: number, clientY: number) => {
      const btn = noBtnRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = clientX - cx
      const dy = clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const triggerDist = isTouchDevice() ? 180 : 120
      const fleeDist   = isTouchDevice() ? 260 : 160
      const pad        = isTouchDevice() ?  48 :  60
      if (dist < triggerDist) {
        const angle = Math.atan2(dy, dx)
        let nx = rect.left - Math.cos(angle) * fleeDist
        let ny = rect.top  - Math.sin(angle) * fleeDist
        nx = Math.max(pad, Math.min(window.innerWidth  - rect.width  - pad, nx))
        ny = Math.max(pad, Math.min(window.innerHeight - rect.height - pad, ny))
        setNoPos({ x: nx, y: ny })
      }
    }
    const onMouseMove = (e: MouseEvent) => flee(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) flee(t.clientX, t.clientY)
    }
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) flee(t.clientX, t.clientY)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchstart', onTouchStart)
    }
  }, [])

  useEffect(() => {
    if (!unlocked) return
    let i = 0
    const interval = setInterval(() => {
      if (i < person.lines.length) {
        const line = person.lines[i]
        i++
        setVisibleLines(prev => [...prev, line])
      } else {
        clearInterval(interval)
        setTimeout(() => setShowPrompt(true), 400)
      }
    }, 420)
    return () => clearInterval(interval)
  }, [unlocked, person.lines])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [visibleLines, showPrompt, answer])

  const handleAnswer = (choice: 'yes' | 'no') => {
    setAnswer(choice)
    if (choice === 'yes') {
      const letter = LETTERS[slug] ?? []
      let i = 0
      const interval = setInterval(() => {
        if (i < letter.length) {
          const line = letter[i]
          i++
          setLetterLines(prev => [...prev, line])
        } else {
          clearInterval(interval)
        }
      }, 120)
    }
  }

  const lineClass = (line: string) => {
    if (line.startsWith('> sudo')) return 'cmd'
    if (line.startsWith('> ERROR')) return 'err'
    if (line.includes('✓ PASSED')) return 'ok'
    if (line.startsWith('> Awaiting')) return 'dim'
    return ''
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Pinyon+Script&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          --bg: #0d0d0d;
          --surface: #141414;
          --border: rgba(184,151,106,0.2);
          --gold: #b8976a;
          --gold-bright: #d4a96e;
          --green: #4ade80;
          --text: #e8ddd0;
          --muted: #7a6e62;
          --dim: #3d3530;
        }

        body {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at 50% 0%, rgba(184,151,106,0.06) 0%, transparent 70%);
        }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          z-index: 1;
        }

        .terminal-wrapper { width: 100%; max-width: 700px; }

        .terminal-bar {
          background: #1c1c1c;
          border: 0.5px solid var(--border);
          border-bottom: none;
          border-radius: 10px 10px 0 0;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
        .dot-red    { background: #ff5f57; }
        .dot-yellow { background: #febc2e; }
        .dot-green  { background: #28c840; }
        .bar-title {
          flex: 1;
          text-align: center;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .terminal {
          background: var(--surface);
          border: 0.5px solid var(--border);
          border-radius: 0 0 10px 10px;
          padding: 1.5rem;
          min-height: 440px;
          max-height: 560px;
          overflow-y: auto;
          scroll-behavior: smooth;
        }
        .terminal::-webkit-scrollbar { width: 4px; }
        .terminal::-webkit-scrollbar-track { background: transparent; }
        .terminal::-webkit-scrollbar-thumb { background: var(--dim); border-radius: 2px; }

        .line {
          font-size: 0.82rem;
          line-height: 1.75;
          color: #b8c8a8;
          animation: fadeIn 0.2s ease;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .line.cmd  { color: var(--gold); }
        .line.err  { color: #f87171; }
        .line.ok   { color: var(--green); }
        .line.dim  { color: var(--muted); }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cursor {
          display: inline-block;
          width: 8px;
          height: 14px;
          background: var(--gold);
          animation: blink 1s step-end infinite;
          vertical-align: middle;
          margin-left: 2px;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .prompt-block {
          margin-top: 1.5rem;
          border-top: 0.5px solid var(--border);
          padding-top: 1.5rem;
          animation: fadeIn 0.4s ease;
        }
        .prompt-question {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.3rem, 4vw, 1.9rem);
          font-weight: 300;
          color: var(--text);
          line-height: 1.4;
          margin-bottom: 0.4rem;
        }
        .prompt-sub {
          font-size: 0.68rem;
          color: var(--muted);
          letter-spacing: 0.08em;
          margin-bottom: 1.5rem;
        }
        .prompt-btns { display: flex; gap: 1rem; flex-wrap: wrap; }

        .btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          padding: 0.75rem 2rem;
          border-radius: 6px;
          cursor: pointer;
          border: 0.5px solid;
          transition: all 0.22s;
          letter-spacing: 0.04em;
          background: transparent;
        }
        .btn-yes { border-color: var(--green); color: var(--green); }
        .btn-yes:hover { background: var(--green); color: #0d0d0d; }
        .btn-no  { border-color: var(--muted); color: var(--muted); }
        .btn-no:hover  { background: var(--muted); color: #0d0d0d; }

        .result-block {
          margin-top: 1.5rem;
          border-top: 0.5px solid var(--border);
          padding-top: 1.5rem;
          animation: fadeIn 0.5s ease;
        }
        .big {
          font-family: 'Pinyon Script', cursive;
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          color: var(--gold-bright);
          line-height: 1.1;
          margin: 0.75rem 0 0.25rem;
        }
        .msg {
          font-size: 0.82rem;
          color: #b8c8a8;
          line-height: 2;
          margin-top: 0.5rem;
        }
        .date-line {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem;
          color: var(--gold);
          margin-top: 1rem;
        }

        @media (max-width: 480px) {
          .terminal { padding: 1rem; min-height: 380px; }
          .prompt-btns { flex-direction: column; }
          .btn { text-align: center; }
        }

        .lock-screen {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 100vh; padding: 2rem; gap: 0;
        }

        .lock-top {
          display: flex; flex-direction: column; align-items: center;
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .lock-icon { font-size: 1.8rem; margin-bottom: 1rem; opacity: 0.5; }
        .lock-eyebrow {
          font-size: 0.55rem; letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 0.5rem;
        }
        .lock-date {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: clamp(1.4rem, 4vw, 2rem); color: var(--gold); margin-bottom: 0.3rem;
        }
        .lock-venue {
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 2.5rem;
        }

        .lock-countdown {
          display: flex; gap: 2rem; margin-bottom: 2.5rem; flex-wrap: wrap; justify-content: center;
          animation: fadeUp 0.7s 0.25s ease both;
        }
        .lock-cd-item { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
        .lock-cd-num {
          font-family: 'JetBrains Mono', monospace; font-size: clamp(1.6rem, 5vw, 2.2rem);
          color: var(--text); line-height: 1;
          animation: flicker 8s infinite;
        }
        .lock-cd-label {
          font-size: 0.5rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted);
        }
        .lock-cd-sep {
          font-family: 'JetBrains Mono', monospace; font-size: 1.8rem;
          color: var(--dim); align-self: center; padding-bottom: 0.8rem;
        }
        @keyframes flicker {
          0%,95%,100% { opacity: 1; }
          96% { opacity: 0.4; }
          97% { opacity: 1; }
          98% { opacity: 0.6; }
          99% { opacity: 1; }
        }

        .lock-divider {
          width: 100%; max-width: 320px; height: 0.5px; background: var(--border);
          margin-bottom: 2rem; animation: fadeUp 0.7s 0.35s ease both;
        }
        .lock-access {
          font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 1.2rem;
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .lock-typing {
          font-size: 0.75rem; color: var(--green); letter-spacing: 0.05em;
          margin-bottom: 1.5rem; min-height: 1.2rem;
          animation: fadeUp 0.7s 0.45s ease both;
        }
        .lock-typing::after { content: '█'; animation: blink 1s step-end infinite; }

        .lock-form {
          display: flex; flex-direction: column; gap: 0.75rem; width: 100%; max-width: 320px;
          animation: fadeUp 0.7s 0.5s ease both;
        }
        .lock-input {
          background: var(--surface); border: 0.5px solid var(--border); padding: 0.9rem 1.2rem;
          color: var(--text); font-family: 'JetBrains Mono', monospace; font-size: 0.9rem;
          outline: none; border-radius: 6px; letter-spacing: 0.15em; text-align: center;
          transition: border-color 0.2s;
        }
        .lock-input:focus { border-color: var(--gold); }
        .lock-input::placeholder { color: var(--muted); letter-spacing: 0.1em; }
        .lock-btn {
          background: transparent; border: 0.5px solid var(--gold); color: var(--gold);
          font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 0.85rem; border-radius: 6px; cursor: pointer;
          transition: all 0.2s;
        }
        .lock-btn:hover { background: var(--gold); color: #0d0d0d; }
        .lock-error {
          font-size: 0.72rem; color: #f87171; text-align: center; letter-spacing: 0.05em;
          animation: fadeIn 0.2s ease;
        }
      `}</style>

      {!unlocked ? (
        <div className="lock-screen">
          <div className="lock-top">
            <div className="lock-icon">🔒</div>
            <div className="lock-eyebrow">You have been selected</div>
            <div className="lock-date">Kenny & Jeanne</div>
            <div className="lock-venue">July 16, 2027 · ThreePetals · Huntington Beach, CA</div>
          </div>

          <div className="lock-countdown">
            <div className="lock-cd-item">
              <span className="lock-cd-num">{countdown.days}</span>
              <span className="lock-cd-label">Days</span>
            </div>
            <div className="lock-cd-sep">:</div>
            <div className="lock-cd-item">
              <span className="lock-cd-num">{String(countdown.hours).padStart(2, '0')}</span>
              <span className="lock-cd-label">Hours</span>
            </div>
            <div className="lock-cd-sep">:</div>
            <div className="lock-cd-item">
              <span className="lock-cd-num">{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="lock-cd-label">Minutes</span>
            </div>
            <div className="lock-cd-sep">:</div>
            <div className="lock-cd-item">
              <span className="lock-cd-num">{String(countdown.seconds).padStart(2, '0')}</span>
              <span className="lock-cd-label">Seconds</span>
            </div>
          </div>

          <div className="lock-divider" />
          <div className="lock-access">// Access Required</div>
          <div className="lock-typing">&gt; Awaiting authentication...</div>

          <form className="lock-form" onSubmit={handlePassword}>
            <input
              className="lock-input"
              type="password"
              placeholder="••••••••••"
              value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(false) }}
              autoFocus
            />
            <button className="lock-btn" type="submit">[Enter] Unlock</button>
            {passwordError && <div className="lock-error">&gt; Incorrect password. Try again.</div>}
          </form>
        </div>
      ) : (

      <div className="page">
        <div className="terminal-wrapper">
          <div className="terminal-bar">
            <div className="dot dot-red" />
            <div className="dot dot-yellow" />
            <div className="dot dot-green" />
            <span className="bar-title">wedding.sh — {person.name}</span>
          </div>

          <div className="terminal" ref={terminalRef}>
            {visibleLines.map((line, i) => (
              <div key={i} className={`line ${lineClass(line)}`}>{line}</div>
            ))}

            {!showPrompt && !answer && (
              <div className="line"><span className="cursor" /></div>
            )}

            {showPrompt && !answer && (
              <div className="prompt-block">
                <div className="prompt-question">
                  {person.firstName}, will you be my groomsman?
                </div>
                <div className="prompt-sub">
                  // Kenny &amp; Jeanne · July 16, 2027 · Huntington Beach, CA
                </div>
                <div className="prompt-btns">
                  <button className="btn btn-yes" onClick={() => handleAnswer('yes')}>
                    [Y] &nbsp;Yes, I&apos;m in
                  </button>
                  <button
                    ref={noBtnRef}
                    className="btn btn-no"
                    onClick={e => e.preventDefault()}
                    style={noPos ? {
                      position: 'fixed',
                      left: noPos.x,
                      top: noPos.y,
                      cursor: 'none',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      transition: 'left 0.08s ease, top 0.08s ease',
                    } : {
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                    }}
                  >
                    [N] &nbsp;No thanks
                  </button>
                </div>
              </div>
            )}

            {answer === 'yes' && (
              <canvas ref={matrixCanvasRef} style={{ position: 'fixed', inset: 0, zIndex: -1, opacity: 0.18, pointerEvents: 'none' }} />
            )}

            {answer === 'yes' && (
              <div className="result-block">
                <div className="line ok">&gt; Response received: YES ✓</div>
                <div className="line ok">&gt; groomsman[{SLUGS.indexOf(slug) + 1}] = &quot;{person.name}&quot; — CONFIRMED</div>
                <div className="line ok">&gt; Wedding party updated successfully.</div>
                <div className="big">Let&apos;s get it, {person.firstName}!</div>
                {letterLines.length > 0 && (
                  <div style={{ marginTop: '1.5rem', borderTop: '0.5px solid var(--border)', paddingTop: '1.5rem' }}>
                    {letterLines.map((line, i) => (
                      <div key={i} className={`line ${i === 0 ? 'cmd' : line.startsWith('─') ? 'dim' : line === '' ? '' : 'letter-line'}`}
                        style={i === 0 ? {} : { color: line.startsWith('─') ? 'var(--muted)' : line.startsWith('—') ? 'var(--gold)' : 'var(--text)', fontFamily: line.startsWith('─') ? undefined : "'Cormorant Garamond', serif", fontSize: line.startsWith('─') ? '0.75rem' : '1.05rem', lineHeight: '1.9' }}>
                        {i === 0 ? `> ${line}` : line}
                      </div>
                    ))}
                  </div>
                )}
                <div className="date-line" style={{ marginTop: '1.5rem' }}>Kenny &amp; Jeanne · July 16, 2027</div>
              </div>
            )}

            {answer === 'no' && (
              <div className="result-block">
                <div className="line err">&gt; Response received: NO</div>
                <div className="line err">&gt; ERROR: unexpected input — retrying in 3... 2... 1...</div>
                <div className="line ok">&gt; Just kidding. No pressure, {person.firstName}.</div>
                <div className="msg" style={{ marginTop: '0.75rem' }}>
                  You&apos;re still one of my people no matter what.<br />
                  Hope to see you there either way. ❤️
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </>
  )
}
