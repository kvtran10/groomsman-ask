'use client'
import { use, useState, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { notFound } from 'next/navigation'

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

  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [showPrompt, setShowPrompt] = useState(false)
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const noBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const flee = (clientX: number, clientY: number) => {
      const btn = noBtnRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = clientX - cx
      const dy = clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) {
        const angle = Math.atan2(dy, dx)
        let nx = rect.left - Math.cos(angle) * 160
        let ny = rect.top  - Math.sin(angle) * 160
        const pad = 60
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
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  useEffect(() => {
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
  }, [person.lines])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [visibleLines, showPrompt, answer])

  const fireConfetti = () => {
    const colors = ['#c9a96e', '#d4c5a9', '#f0e8d8', '#b5a48a', '#fff8e7', '#e8c97a', '#ffffff']
    confetti({ particleCount: 200, spread: 160, origin: { x: 0.5, y: 0.6 }, colors, scalar: 2, ticks: 300, startVelocity: 60, gravity: 0.8 })
    confetti({ particleCount: 150, angle: 60,  spread: 80, origin: { x: 0, y: 0.7 }, colors, scalar: 2, startVelocity: 70, ticks: 300 })
    confetti({ particleCount: 150, angle: 120, spread: 80, origin: { x: 1, y: 0.7 }, colors, scalar: 2, startVelocity: 70, ticks: 300 })
  }

  const handleAnswer = (choice: 'yes' | 'no') => {
    setAnswer(choice)
    if (choice === 'yes') fireConfetti()
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
      `}</style>

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
                      transition: 'left 0.15s ease, top 0.15s ease',
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
              <div className="result-block">
                <div className="line ok">&gt; Response received: YES ✓</div>
                <div className="line ok">&gt; groomsman[{SLUGS.indexOf(slug) + 1}] = &quot;{person.name}&quot; — CONFIRMED</div>
                <div className="line ok">&gt; Wedding party updated successfully.</div>
                <div className="big">Let&apos;s get it, {person.firstName}!</div>
                <div className="msg">
                  You&apos;re officially locked in as one of my groomsmen.<br />
                  It means everything having you by my side on July 16th.<br />
                  More details coming your way soon — stay tuned. 🤙
                </div>
                <div className="date-line">Kenny &amp; Jeanne · July 16, 2027</div>
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
    </>
  )
}
