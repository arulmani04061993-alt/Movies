import React from 'react';
import { Film, RefreshCw, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  title = "No Movies Found",
  message = "We couldn't find any films matching your active search or filter criteria.",
  actionText = "Clear Filters",
  onAction,
  actionLink
}) {
  return (
    <div className="empty-state-wrap">
      <div className="empty-state-icon-box">
        <Film size={40} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-text">{message}</p>
      
      {onAction && (
        <button className="btn-primary" onClick={onAction}>
          <RefreshCw size={16} />
          <span>{actionText}</span>
        </button>
      )}

      {actionLink && !onAction && (
        <Link to={actionLink} className="btn-primary">
          <Compass size={16} />
          <span>{actionText}</span>
        </Link>
      )}
    </div>
  );
}
