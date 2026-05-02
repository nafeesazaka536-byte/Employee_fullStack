import React from 'react';

const StatCard = ({ title, value, icon, colorClass, trend }) => {
  return (
    <div className="glass-card mb-4 h-100">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <p className="text-muted mb-1 fw-medium">{title}</p>
          <h3 className="fw-bold mb-0">{value}</h3>
          {trend && (
            <p className={`mb-0 mt-2 text-${trend.type === 'up' ? 'success' : 'danger'} d-flex align-items-center`} style={{ fontSize: '0.85rem' }}>
              <span className="fw-semibold me-1">{trend.value}</span>
              <span className="text-muted ms-1">{trend.label}</span>
            </p>
          )}
        </div>
        <div className={`stat-icon-wrapper ${colorClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
