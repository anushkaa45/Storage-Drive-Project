export default function ErrorState({ message, onRetry }) {
  return <div className="state-panel error-panel" role="alert"><div className="state-symbol">!</div><h2>Couldn’t load your files</h2><p>{message}</p><button className="retry-button" onClick={onRetry}>Try again</button></div>
}
