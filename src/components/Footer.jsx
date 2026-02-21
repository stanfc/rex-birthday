export default function Footer() {
  return (
    <footer className="site-footer">
      <p>Made with ❤️ for 雷克斯</p>
      <p className="site-footer-sub">
        雷克斯 Official Fan Site &copy; {new Date().getFullYear()}
      </p>

      <style>{`
        .site-footer {
          text-align: center;
          padding: 32px 20px 40px;
          border-top: 1px solid var(--border-glass);
          margin-top: 60px;
        }
        .site-footer p {
          color: var(--text-muted);
          font-size: 13px;
          margin: 0;
        }
        .site-footer-sub {
          margin-top: 4px;
          font-size: 11px;
        }
      `}</style>
    </footer>
  )
}
