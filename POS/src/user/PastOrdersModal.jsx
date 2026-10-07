import React, { useState } from 'react';
import { X, Receipt, Search, Eye, Calendar, Clock } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

export function PastOrdersModal({ pastOrders, onClose, onReprintReceipt }) {
  const [searchTerm, setSearchTerm] = useState('');

  const totalCollected = pastOrders.reduce((sum, o) => sum + o.grandTotal, 0);
  const averageTicket = pastOrders.length ? totalCollected / pastOrders.length : 0;

  const filteredOrders = pastOrders.filter(o => 
    o.tableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.server.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        width: '100%',
        maxWidth: '750px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '85vh'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.1rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-tertiary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Receipt size={20} color="var(--accent-amber)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Today's Settled Orders & Sales Invoices
              </h3>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={12} color="var(--accent-amber)" />
              <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              color: 'var(--text-muted)',
              display: 'flex'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Stats Row in Rupees */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Bills Settled</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>{pastOrders.length}</div>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Total Revenue</span>
            <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-amber-light)' }}>
              {formatCurrency(totalCollected)}
            </div>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Avg Bill Value</span>
            <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--status-vacant)' }}>
              {formatCurrency(averageTicket)}
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Search by invoice #, table, server, payment method..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem 0.85rem 0.45rem 2rem',
                color: 'var(--text-main)',
                fontSize: '0.82rem'
              }}
            />
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
              No completed orders found. Settle a table bill to see it archived here!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {filteredOrders.map((order, idx) => (
                <div
                  key={idx}
                  onClick={() => onReprintReceipt(order)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.85rem 1rem',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.45)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem' }}>
                        {order.tableName}
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-amber-light)', fontWeight: 800 }}>
                        {order.invoiceNo}
                      </span>
                      <span style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: 'var(--status-vacant)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        {order.paymentMethod}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: 'var(--text-main)', fontWeight: 600 }}>
                        <Calendar size={12} color="var(--accent-amber)" />
                        {order.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: 'var(--text-main)', fontWeight: 600 }}>
                        <Clock size={12} color="var(--accent-amber)" />
                        {order.settledAt}
                      </span>
                      <span>•</span>
                      <span>Server: <strong>{order.server}</strong></span>
                      <span>•</span>
                      <span>{order.items.length} dishes</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {formatCurrency(order.grandTotal)}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onReprintReceipt(order);
                      }}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(234, 88, 12, 0.18))',
                        color: '#fbbf24',
                        border: '1.5px solid rgba(245, 158, 11, 0.45)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.38rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                        transition: 'all 0.15s ease'
                      }}
                      title="Open Receipt Pop-up"
                    >
                      <Eye size={14} />
                      <span>View Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.85rem 1.5rem',
          background: 'var(--bg-tertiary)',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'right'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-main)',
              fontSize: '0.82rem',
              fontWeight: 700
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
