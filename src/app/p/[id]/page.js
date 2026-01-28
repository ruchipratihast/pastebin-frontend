import { getPaste } from "@/app/services/api";

export default async function PastePage({ params }) {
  const { id } = await params;

  try {
    const data = await getPaste(id);

    return (
      <div className="container-center">
        <div className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 className="title-gradient" style={{ fontSize: '2rem', margin: 0 }}>Shared Note</h1>
          </div>

          <div className="input-group">
            <pre className="textarea-field" style={{
              minHeight: '200px',
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--font-mono), monospace',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderColor: 'transparent'
            }}>
              {data.content}
            </pre>
          </div>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--glass-border)',
            color: 'var(--text-dim)',
            fontSize: '0.9rem'
          }}>
            {data.remaining_views !== null && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span title="Remaining Views">👁</span>
                <span>{data.remaining_views} views left</span>
              </div>
            )}

            {data.expires_at && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span title="Expiration">⏳</span>
                <span>Expires: {new Date(data.expires_at).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          Pastebin Lite
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container-center">
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚫</div>
          <h2 style={{ color: 'var(--error)', margin: '0 0 1rem 0' }}>Paste Unavailable</h2>
          <p className="subtitle" style={{ marginBottom: '2rem' }}>
            This paste may have expired, been deleted, or the view limit was reached.
          </p>

        </div>
      </div>
    );
  }
}
