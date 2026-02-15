'use client';

import { useState, useEffect } from 'react';

export default function VitalPage() {
  const [activeImage, setActiveImage] = useState(1);
  const [activeOption, setActiveOption] = useState('subscribe');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showMobileSticky, setShowMobileSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 767) {
        setShowMobileSticky(window.pageYOffset > 300);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #F2F0EE;
          color: #000000;
          line-height: 1.6;
        }
      `}</style>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .container-narrow {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .version-badge {
          background: linear-gradient(135deg, #8686DA 0%, #A8A8E8 100%);
          color: white;
          padding: 20px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }

        .version-badge span {
          background: white;
          color: #8686DA;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          margin-left: 12px;
        }

        .promo-banner {
          background-color: #40C4C6;
          color: white;
          text-align: center;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
        }

        .hero {
          padding: 16px 0 32px 0;
        }

        .hero-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 24px;
          padding: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-image-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .product-gallery {
          width: 100%;
        }

        .gallery-main {
          width: 100%;
          background: linear-gradient(135deg, #E5F7F8 0%, #B8E5E7 100%);
          aspect-ratio: 1;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #40C4C6;
          font-weight: 700;
          margin-bottom: 12px;
          font-size: 18px;
          text-align: center;
        }

        .gallery-thumbnails {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
          gap: 8px;
        }

        .gallery-thumb {
          aspect-ratio: 1;
          background: linear-gradient(135deg, #D5EEF0 0%, #C5E4E6 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: #40C4C6;
          font-weight: 600;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .gallery-thumb:hover {
          border-color: #8686DA;
          opacity: 0.8;
        }

        .gallery-thumb.active {
          border-color: #8686DA;
        }

        .trust-badges {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .trust-badge {
          background-color: #F2F0EE;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          padding: 8px 4px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .trust-badge-icon {
          width: 24px;
          height: 24px;
          background-color: #8686DA;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: 700;
        }

        .trust-badge-text {
          font-size: 12px;
          font-weight: 600;
          color: #8686DA;
          line-height: 1.2;
        }

        .hero-info-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .badge-primary {
          display: inline-block;
          background-color: #8686DA;
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          width: fit-content;
        }

        .hero-title {
          font-size: 28px;
          font-weight: 700;
          line-height: 1.2;
          margin: 8px 0;
        }

        .hero-headline {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
        }

        .hero-description {
          font-size: 14px;
          color: #6B7280;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .stars {
          color: #FFB800;
        }

        .benefit-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 4px 0;
        }

        .benefit-pill {
          background-color: #F2F0EE;
          color: #374151;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid #D1D5DB;
        }

        .pricing {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding-bottom: 12px;
          border-bottom: 1px solid #E5E7EB;
        }

        .price-compare {
          font-size: 16px;
          color: #9CA3AF;
          text-decoration: line-through;
        }

        .price-current {
          font-size: 28px;
          font-weight: 700;
          color: #000;
        }

        .price-badge {
          background-color: #D1FAE5;
          color: #065F46;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .purchase-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .purchase-option {
          border: 2px solid #D1D5DB;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .purchase-option:hover {
          border-color: #8686DA;
          background-color: rgba(134, 134, 218, 0.05);
        }

        .purchase-option.active {
          border-color: #8686DA;
          background-color: rgba(134, 134, 218, 0.1);
        }

        .radio {
          width: 20px;
          height: 20px;
          border: 2px solid #8686DA;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .purchase-option.active .radio {
          background-color: #8686DA;
          box-shadow: inset 0 0 0 4px white;
        }

        .option-content {
          flex: 1;
        }

        .option-title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .option-subtitle {
          font-size: 12px;
          color: #000000;
          font-weight: 600;
        }

        .option-price {
          font-size: 20px;
          font-weight: 700;
          white-space: nowrap;
        }

        .cta-button {
          background-color: #000000;
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s;
        }

        .cta-button:hover {
          background-color: #374151;
          transform: translateY(-1px);
        }

        .trust-line {
          display: flex;
          justify-content: center;
          gap: 16px;
          font-size: 12px;
          color: #6B7280;
        }

        .section {
          padding: 64px 24px;
        }

        .section-white {
          background-color: white;
        }

        .section-stone {
          background-color: #F2F0EE;
        }

        .section-title {
          font-size: 26px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 16px;
        }

        .section-subtitle {
          text-align: center;
          color: #6B7280;
          margin-bottom: 32px;
          font-size: 14px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .who-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          max-width: 800px;
          margin: 0 auto;
        }

        .who-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .who-card--lavender {
          background-color: rgba(134, 134, 218, 0.1);
          border: 2px solid #8686DA;
        }

        .who-heading {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid #E5E7EB;
        }

        .who-heading--positive {
          color: #8686DA;
        }

        .who-heading--neutral {
          color: #6B7280;
        }

        .who-list {
          list-style: none;
        }

        .who-item {
          font-size: 14px;
          margin-bottom: 12px;
          padding-left: 24px;
          position: relative;
          line-height: 1.5;
        }

        .who-item--positive {
          color: #374151;
        }

        .who-item--neutral {
          color: #6B7280;
        }

        .who-icon {
          position: absolute;
          left: 0;
          font-weight: 700;
          font-size: 16px;
        }

        .who-item--positive .who-icon {
          color: #8686DA;
        }

        .who-item--neutral .who-icon {
          color: #9CA3AF;
        }

        .product-story-text {
          font-size: 15px;
          line-height: 1.8;
          color: #374151;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .types-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .type-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .type-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #E5F7F8 0%, #D5EEF0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #40C4C6;
          font-weight: 600;
          font-size: 14px;
        }

        .type-content {
          padding: 24px;
        }

        .type-badge {
          display: inline-block;
          background: #8686DA;
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .type-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .type-benefits {
          list-style: none;
        }

        .type-benefit {
          font-size: 13px;
          color: #6B7280;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .type-benefit:before {
          content: "+";
          position: absolute;
          left: 0;
          color: #40C4C6;
          font-weight: 700;
        }

        .ingredients-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .ingredient-card {
          background-color: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .ingredient-card-header {
          background-color: #8686DA;
          color: white;
          padding: 16px 20px;
          text-align: center;
        }

        .ingredient-card-title {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
        }

        .ingredient-card-body {
          padding: 0;
        }

        .key-ingredient {
          padding: 20px;
          border-bottom: 1px solid #E5E7EB;
          background-color: white;
        }

        .key-ingredient:last-child {
          border-bottom: none;
        }

        .key-ingredient-title {
          font-size: 15px;
          color: #000;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .key-ingredient-description {
          font-size: 13px;
          color: #6B7280;
          line-height: 1.5;
          margin: 0;
        }

        .dietary-badges {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .dietary-badge {
          background-color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #6B7280;
        }

        .fda-disclaimer {
          font-size: 11px;
          color: #9CA3AF;
          text-align: center;
          margin-top: 24px;
          line-height: 1.6;
          padding: 12px 16px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          background-color: white;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 32px;
        }

        .how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .how-step {
          text-align: center;
        }

        .how-image {
          width: 100%;
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #E5F7F8 0%, #D5EEF0 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: #40C4C6;
          font-weight: 600;
        }

        .how-number {
          width: 40px;
          height: 40px;
          background: #8686DA;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          margin: 0 auto 12px;
        }

        .how-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .how-description {
          font-size: 13px;
          color: #6B7280;
        }

        .section-removed {
          background: #FEF3C7;
          color: #92400E;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
        }

        .comparison-table {
          background-color: #F2F0EE;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border: 2px solid #D1D5DB;
        }

        .comparison-header {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          background-color: #000000;
        }

        .comparison-header-cell {
          padding: 14px;
          font-size: 15px;
          font-weight: 700;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .comparison-header-cell.feature {
          color: white;
          text-align: left;
        }

        .comparison-header-cell.us {
          color: #8686DA;
        }

        .comparison-header-cell.them {
          color: white;
        }

        .comparison-row {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          border-top: 1px solid #D1D5DB;
        }

        .comparison-cell {
          padding: 14px;
          font-size: 12px;
        }

        .comparison-cell.feature {
          font-weight: 600;
          color: #000;
        }

        .comparison-cell.us {
          text-align: center;
          background-color: rgba(134, 134, 218, 0.1);
          color: #8686DA;
          font-weight: 600;
        }

        .comparison-cell.them {
          text-align: center;
          color: #9CA3AF;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .timeline-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .timeline-header {
          background: rgba(134, 134, 218, 0.1);
          padding: 20px;
          text-align: center;
        }

        .timeline-badge {
          background: #8686DA;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 8px;
        }

        .timeline-title {
          font-size: 18px;
          font-weight: 700;
        }

        .timeline-content {
          padding: 20px;
        }

        .timeline-list {
          list-style: none;
        }

        .timeline-list li {
          font-size: 13px;
          color: #374151;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .timeline-list li:before {
          content: "+";
          position: absolute;
          left: 0;
          color: #40C4C6;
          font-weight: 700;
        }

        .disclaimer {
          font-size: 11px;
          color: #9CA3AF;
          text-align: center;
          margin-top: 24px;
          line-height: 1.6;
          padding: 12px 16px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          background-color: white;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .review-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .review-tag {
          background: #E5F7F8;
          color: #40C4C6;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .review-meta {
          flex: 1;
          min-width: 0;
        }

        .review-author {
          font-weight: 700;
          font-size: 14px;
          display: block;
          margin-bottom: 4px;
        }

        .review-rating {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .review-stars {
          color: #FFB800;
          font-size: 12px;
        }

        .review-verified {
          background: #D1FAE5;
          color: #065F46;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .review-title {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .review-text {
          font-size: 13px;
          color: #374151;
          line-height: 1.6;
        }

        .guarantee-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
          align-items: center;
        }

        .guarantee-image {
          width: 100%;
          max-width: 200px;
          aspect-ratio: 1;
          background: linear-gradient(135deg, #40C4C6 0%, #5ED4D6 100%);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto;
        }

        .guarantee-days {
          font-size: 48px;
          font-weight: 700;
        }

        .guarantee-label {
          font-size: 12px;
          font-weight: 600;
        }

        .guarantee-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .guarantee-text {
          font-size: 14px;
          color: #6B7280;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .guarantee-tagline {
          font-size: 14px;
          color: #374151;
          font-weight: 600;
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background: white;
          border-radius: 12px;
          margin-bottom: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .faq-question {
          width: 100%;
          padding: 20px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          border: none;
          text-align: left;
          font-size: 15px;
          font-family: inherit;
        }

        .faq-question:hover {
          background: #F9FAFB;
        }

        .faq-icon {
          color: #8686DA;
          font-weight: 700;
          font-size: 20px;
          transition: transform 0.2s;
        }

        .faq-item.open .faq-icon {
          transform: rotate(45deg);
        }

        .faq-answer {
          padding: 0 20px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item.open .faq-answer {
          padding: 0 20px 20px;
          max-height: 500px;
        }

        .faq-answer p {
          color: #6B7280;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        .final-cta {
          padding: 64px 24px;
          background-color: #F2F0EE;
        }

        .final-cta-grid {
          background: white;
          border-radius: 20px;
          padding: 40px;
          max-width: 1000px;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
          align-items: center;
        }

        .final-cta-image {
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(135deg, #E5F7F8 0%, #B8E5E7 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #40C4C6;
          font-weight: 700;
          font-size: 16px;
          text-align: center;
        }

        .final-cta-content h2 {
          font-size: 28px;
          margin-bottom: 16px;
        }

        .final-cta-content p {
          color: #6B7280;
          margin-bottom: 24px;
        }

        .final-cta-pricing {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding-bottom: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid #E5E7EB;
        }

        .mobile-sticky {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          padding: 12px 16px;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
          z-index: 100;
        }

        .mobile-sticky.visible {
          display: block;
        }

        .mobile-sticky-content {
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 600px;
          margin: 0 auto;
        }

        .mobile-sticky-price {
          font-size: 20px;
          font-weight: 700;
        }

        .mobile-sticky-button {
          flex: 1;
          background: #000;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .v5-badge {
          display: inline-block;
          background: linear-gradient(135deg, #8686DA 0%, #A8A8E8 100%);
          color: white;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 9px;
          font-weight: 700;
          margin-left: 8px;
          vertical-align: middle;
        }

        .collagen-awesome {
          background: linear-gradient(135deg, #40C4C6 0%, #8686DA 100%);
          padding: 80px 24px;
          position: relative;
          overflow: hidden;
        }

        .collagen-awesome::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: shimmer 15s infinite linear;
        }

        @keyframes shimmer {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .collagen-awesome-content {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .collagen-awesome h2 {
          font-size: 36px;
          font-weight: 700;
          color: white;
          text-align: center;
          margin-bottom: 16px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .collagen-awesome-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.9);
          text-align: center;
          margin-bottom: 48px;
        }

        .collagen-awesome-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .collagen-awesome-image {
          width: 100%;
          aspect-ratio: 4/3;
          background: linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
          text-align: center;
          border: 2px dashed rgba(255,255,255,0.3);
          padding: 20px;
        }

        .collagen-awesome-image-placeholder {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .collagen-awesome-image-text {
          font-size: 12px;
          opacity: 0.8;
          max-width: 200px;
        }

        .collagen-reasons {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .collagen-reason {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          border: 1px solid rgba(255,255,255,0.2);
          transition: transform 0.2s, background 0.2s;
        }

        .collagen-reason:hover {
          transform: translateX(8px);
          background: rgba(255,255,255,0.2);
        }

        .collagen-reason-icon {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .collagen-reason-content h4 {
          color: white;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .collagen-reason-content p {
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          line-height: 1.5;
          margin: 0;
        }

        .collagen-awesome-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 48px;
          padding-top: 48px;
          border-top: 1px solid rgba(255,255,255,0.2);
        }

        .collagen-stat {
          text-align: center;
        }

        .collagen-stat-number {
          font-size: 36px;
          font-weight: 700;
          color: white;
          display: block;
        }

        .collagen-stat-label {
          font-size: 12px;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 767px) {
          .hero-card {
            grid-template-columns: 1fr;
            padding: 24px 16px;
          }

          .who-grid,
          .types-grid,
          .how-grid,
          .timeline-grid,
          .reviews-grid,
          .ingredients-grid {
            grid-template-columns: 1fr;
          }

          .guarantee-card,
          .final-cta-grid,
          .collagen-awesome-grid {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .collagen-awesome-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .collagen-awesome h2 {
            font-size: 28px;
          }

          .mobile-sticky {
            display: block;
          }

          .section {
            padding: 40px 16px;
          }

          .review-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .review-tag {
            margin-bottom: 8px;
          }
        }
      `}</style>

      {/* Version Badge */}
      <div className="version-badge">
        V5 COMPLETE - Full Page Preview <span>All Sections Included</span>
      </div>

      {/* 1. Promo Banner */}
      <div className="promo-banner">
        First Order: 10% Off + Free Shipping Over $50
      </div>

      {/* 2. Hero Section with Product Gallery */}
      <section className="hero">
        <div className="container">
          <div className="hero-card">
            <div className="hero-image-col">
              <div className="product-gallery">
                <div className="gallery-main">
                  {activeImage === 1 ? 'MAIN\nPRODUCT\nIMAGE' : `IMAGE\n${activeImage}`}
                </div>
                <div className="gallery-thumbnails">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      className={`gallery-thumb ${activeImage === num ? 'active' : ''}`}
                      onClick={() => setActiveImage(num)}
                    >
                      IMG<br />{num}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '10px', color: '#8686DA', marginTop: '8px' }}>
                <span className="v5-badge">V5</span> Click thumbnails
              </div>

              <div className="trust-badges">
                <div className="trust-badge">
                  <div className="trust-badge-icon">✓</div>
                  <div className="trust-badge-text">3rd Party<br />Tested</div>
                </div>
                <div className="trust-badge">
                  <div className="trust-badge-icon">✓</div>
                  <div className="trust-badge-text">GMP<br />Certified</div>
                </div>
                <div className="trust-badge">
                  <div className="trust-badge-icon">✓</div>
                  <div className="trust-badge-text">Made in<br />USA</div>
                </div>
                <div className="trust-badge">
                  <div className="trust-badge-icon">✓</div>
                  <div className="trust-badge-text">Non-GMO</div>
                </div>
              </div>
            </div>

            <div className="hero-info-col">
              <span className="badge-primary">ALL 5 TYPES OF COLLAGEN</span>
              <h1 className="hero-title">Multi Collagen Complex Plus</h1>
              <p className="hero-headline">Your All-in-One Beauty Supplement</p>
              <p className="hero-description">Pairs a full multi-collagen dose (1,600mg) with our advanced Glowing Beauty Complex and key beauty vitamins.</p>

              <div className="rating">
                <span className="stars">★★★★★</span>
                <span>4.6/5 (53,000+ reviews)</span>
              </div>

              <div className="benefit-pills">
                <span className="benefit-pill">+ Skin & Beauty Support</span>
                <span className="benefit-pill">+ Joint Comfort & Flexibility</span>
                <span className="benefit-pill">+ Hair, Nails & Structure</span>
                <span className="benefit-pill">+ Gut Health Support</span>
              </div>

              <div className="pricing">
                <span className="price-compare">$110.85</span>
                <span className="price-current">$27.86<small>/mo</small></span>
                <span className="price-badge">BEST VALUE</span>
              </div>

              <div className="purchase-options">
                <div
                  className={`purchase-option ${activeOption === 'subscribe' ? 'active' : ''}`}
                  onClick={() => setActiveOption('subscribe')}
                >
                  <div className="radio"></div>
                  <div className="option-content">
                    <div className="option-title">Subscribe & Save 10%</div>
                    <div className="option-subtitle">Cancel anytime · Free shipping always</div>
                  </div>
                  <div className="option-price">$27.86<small>/mo</small></div>
                </div>

                <div
                  className={`purchase-option ${activeOption === 'one-time' ? 'active' : ''}`}
                  onClick={() => setActiveOption('one-time')}
                >
                  <div className="radio"></div>
                  <div className="option-content">
                    <div className="option-title">One-Time Purchase</div>
                    <div className="option-subtitle">No commitment—just try it</div>
                  </div>
                  <div className="option-price">$30.95</div>
                </div>
              </div>

              <button className="cta-button">Add to Cart — $27.86</button>

              <div className="trust-line">
                <span>✓ Free Shipping</span>
                <span>✓ 60-Day Guarantee</span>
                <span>✓ Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Is It Right For You */}
      <section className="section section-white">
        <div className="container-narrow">
          <h2 className="section-title">Is It Right For You?</h2>

          <div className="who-grid">
            <div className="who-card who-card--lavender">
              <h3 className="who-heading who-heading--positive">✓ Perfect for you if: <span className="v5-badge">V5</span></h3>
              <ul className="who-list">
                <li className="who-item who-item--positive">
                  <span className="who-icon">+</span>
                  You want to slow visible signs of aging
                </li>
                <li className="who-item who-item--positive">
                  <span className="who-icon">+</span>
                  You care about skin, hair, and nail health
                </li>
                <li className="who-item who-item--positive">
                  <span className="who-icon">+</span>
                  You experience joint discomfort or stiffness
                </li>
                <li className="who-item who-item--positive">
                  <span className="who-icon">+</span>
                  You want a complete, all-in-one solution
                </li>
                <li className="who-item who-item--positive">
                  <span className="who-icon">+</span>
                  You value clinically-dosed, quality ingredients
                </li>
              </ul>
            </div>

            <div className="who-card">
              <h3 className="who-heading who-heading--neutral">May not be for you if:</h3>
              <ul className="who-list">
                <li className="who-item who-item--neutral">
                  <span className="who-icon">−</span>
                  You&apos;re looking for instant overnight results
                </li>
                <li className="who-item who-item--neutral">
                  <span className="who-icon">−</span>
                  You prefer topical-only solutions
                </li>
                <li className="who-item who-item--neutral">
                  <span className="who-icon">−</span>
                  You&apos;re not willing to be consistent
                </li>
                <li className="who-item who-item--neutral">
                  <span className="who-icon">−</span>
                  You have shellfish or egg allergies
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Story */}
      <section className="section section-stone">
        <div className="container-narrow">
          <h2 className="section-title">Why We Created Multi Collagen Complex Plus</h2>
          <p className="product-story-text">
            Collagen is the most abundant protein in your body and makes up 80% of your skin&apos;s structure, supporting elasticity, hydration, and firmness—but natural production declines with age. Featuring the same trusted blend of five collagen types as Vital Vitamins&apos; best-selling Multi Collagen Complex, <strong>Multi-Collagen Complex Plus</strong> includes our advanced <strong>Glowing Beauty Complex</strong> and key beauty vitamins like Biotin and Vitamin C to be your all-in-one beauty supplement.
          </p>
        </div>
      </section>

      {/* 6. The 5 Types */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">All 5 Types of Collagen</h2>
          <p className="section-subtitle">Each type supports different areas of your body</p>
          <div className="types-grid">
            <div className="type-card">
              <div className="type-image">Type I & III Image</div>
              <div className="type-content">
                <span className="type-badge">TYPE I & III</span>
                <h3 className="type-title">Skin, Bones & Tendons</h3>
                <ul className="type-benefits">
                  <li className="type-benefit">Supports skin elasticity and firmness</li>
                  <li className="type-benefit">Reduces fine lines and wrinkles</li>
                  <li className="type-benefit">Strengthens bones and tendons</li>
                </ul>
              </div>
            </div>

            <div className="type-card">
              <div className="type-image">Type II Image</div>
              <div className="type-content">
                <span className="type-badge">TYPE II</span>
                <h3 className="type-title">Cartilage & Joints</h3>
                <ul className="type-benefits">
                  <li className="type-benefit">Supports joint health and flexibility</li>
                  <li className="type-benefit">Reduces joint discomfort</li>
                  <li className="type-benefit">Promotes cartilage rebuilding</li>
                </ul>
              </div>
            </div>

            <div className="type-card">
              <div className="type-image">Type V & X Image</div>
              <div className="type-content">
                <span className="type-badge">TYPE V & X</span>
                <h3 className="type-title">Hair, Nails & Tissue</h3>
                <ul className="type-benefits">
                  <li className="type-benefit">Strengthens hair strands</li>
                  <li className="type-benefit">Promotes nail growth and strength</li>
                  <li className="type-benefit">Supports tissue formation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Ingredients */}
      <section className="section section-stone">
        <div className="container-narrow">
          <h2 className="section-title">Key Ingredients</h2>
          <p className="section-subtitle">Five powerful ingredients working together</p>

          <div className="ingredients-grid">
            <div className="ingredient-card">
              <div className="ingredient-card-header">
                <h3 className="ingredient-card-title">Core Complexes</h3>
              </div>
              <div className="ingredient-card-body">
                <div className="key-ingredient">
                  <h4 className="key-ingredient-title">Multi-Collagen Complex</h4>
                  <p className="key-ingredient-description">Combines the five types of collagen that supports skin elasticity, joint health, and stronger hair and nails.</p>
                </div>
                <div className="key-ingredient">
                  <h4 className="key-ingredient-title">Glowing Beauty Complex</h4>
                  <p className="key-ingredient-description">Combines MSM to boost collagen production, Keratin to strengthen hair and nails, and Hyaluronic Acid for deep hydration.</p>
                </div>
              </div>
            </div>

            <div className="ingredient-card">
              <div className="ingredient-card-header">
                <h3 className="ingredient-card-title">Supporting Ingredients</h3>
              </div>
              <div className="ingredient-card-body">
                <div className="key-ingredient">
                  <h4 className="key-ingredient-title">Biotin</h4>
                  <p className="key-ingredient-description">A B-vitamin that strengthens hair, supports healthy nails, and enhances skin&apos;s natural glow.</p>
                </div>
                <div className="key-ingredient">
                  <h4 className="key-ingredient-title">Vitamin C</h4>
                  <p className="key-ingredient-description">An antioxidant that boosts collagen production, protects against free radicals, and brightens skin.</p>
                </div>
                <div className="key-ingredient">
                  <h4 className="key-ingredient-title">DigeSEB® Enzyme Blend</h4>
                  <p className="key-ingredient-description">A digestive enzyme blend that enhances nutrient absorption and improves digestion.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dietary-badges">
            <span className="dietary-badge">✓ Gluten-Free</span>
            <span className="dietary-badge">✓ Non-GMO</span>
            <span className="dietary-badge">✓ Keto-Friendly</span>
            <span className="dietary-badge">✓ Paleo-Friendly</span>
          </div>

          <div className="fda-disclaimer">
            <span className="v5-badge">V5</span> * These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </div>
        </div>
      </section>

      {/* 8. How To Take */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">How to Take It</h2>
          <p className="section-subtitle">Simple daily routine for maximum results</p>
          <div className="how-grid">
            <div className="how-step">
              <div className="how-image">STEP 1</div>
              <div className="how-number">1</div>
              <h3 className="how-title">Take 3 Capsules</h3>
              <p className="how-description">Take 3 capsules once daily, preferably with a meal and water</p>
            </div>

            <div className="how-step">
              <div className="how-image">STEP 2</div>
              <div className="how-number">2</div>
              <h3 className="how-title">Stay Consistent</h3>
              <p className="how-description">Take daily for best results. Consistency is key for collagen benefits</p>
            </div>

            <div className="how-step">
              <div className="how-image">STEP 3</div>
              <div className="how-number">3</div>
              <h3 className="how-title">See & Feel Results</h3>
              <p className="how-description">Most customers notice improvements in 2-4 weeks, with full benefits by week 8</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9 REMOVED */}
      <div className="section-removed">
        <span className="v5-badge" style={{ background: '#92400E', color: 'white' }}>V5</span> Section 9 (Key Ingredients with Collagen) REMOVED - Was duplicate content
      </div>

      {/* 11. Comparison Table */}
      <section className="section section-white">
        <div className="container-narrow">
          <h2 className="section-title">Why Multi Collagen Complex Plus? <span className="v5-badge">V5</span></h2>

          <div className="comparison-table">
            <div className="comparison-header">
              <div className="comparison-header-cell feature">Feature</div>
              <div className="comparison-header-cell us">Multi Collagen Complex Plus</div>
              <div className="comparison-header-cell them">Other Brands</div>
            </div>

            {[
              { feature: 'Types of Collagen', us: 'All 5 Types', them: '1-2 Types' },
              { feature: 'Glowing Beauty Complex', us: '✓ MSM, Keratin, HA, Astaxanthin', them: '✗ None' },
              { feature: 'Absorption Boosters', us: 'Vitamin C, Biotin, DigeSEB®', them: 'None or Limited' },
              { feature: 'Verified Reviews', us: '53,000+', them: 'Varies' },
              { feature: 'Money-Back Guarantee', us: '60 Days', them: '30 or None' },
              { feature: 'Complete Body Support', us: 'Skin, Hair, Nails, Joints', them: '1-2 Areas' },
              { feature: 'Third-Party Tested', us: '✓ Yes', them: 'Often No' },
              { feature: 'GMP Certified Facility', us: '✓ Yes', them: 'Not Always' },
            ].map((row, i) => (
              <div className="comparison-row" key={i}>
                <div className="comparison-cell feature">{row.feature}</div>
                <div className="comparison-cell us">{row.us}</div>
                <div className="comparison-cell them">{row.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Timeline */}
      <section className="section section-stone">
        <div className="container">
          <h2 className="section-title">When Will You See Results?</h2>
          <p className="section-subtitle">Real benefits build over time</p>

          <div className="timeline-grid">
            <div className="timeline-card">
              <div className="timeline-header">
                <div className="timeline-badge">WEEK 1-2</div>
                <h3 className="timeline-title">Foundation Building</h3>
              </div>
              <div className="timeline-content">
                <ul className="timeline-list">
                  <li>Better digestion</li>
                  <li>Increased energy</li>
                  <li>Improved hydration</li>
                  <li>Body starts absorbing</li>
                </ul>
              </div>
            </div>

            <div className="timeline-card">
              <div className="timeline-header">
                <div className="timeline-badge">WEEK 3-7</div>
                <h3 className="timeline-title">Visible Changes</h3>
              </div>
              <div className="timeline-content">
                <ul className="timeline-list">
                  <li>Skin feels smoother</li>
                  <li>Hair looks shinier</li>
                  <li>Nails grow stronger</li>
                  <li>Joint comfort improves</li>
                </ul>
              </div>
            </div>

            <div className="timeline-card">
              <div className="timeline-header">
                <div className="timeline-badge">WEEK 8+</div>
                <h3 className="timeline-title">Full Benefits</h3>
              </div>
              <div className="timeline-content">
                <ul className="timeline-list">
                  <li>Radiant, youthful glow</li>
                  <li>Fewer fine lines</li>
                  <li>Thicker, fuller hair</li>
                  <li>Better mobility</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="disclaimer">
            * These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary.
          </div>
        </div>
      </section>

      {/* 13. Reviews */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">53,000+ Happy Customers</h2>
          <p className="section-subtitle">Real people, real results</p>

          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-header">
                <span className="review-tag">Skin & Beauty</span>
                <div className="review-meta">
                  <span className="review-author">Sarah M., 47</span>
                  <div className="review-rating">
                    <span className="review-stars">★★★★★</span>
                    <span className="review-verified">VERIFIED</span>
                  </div>
                </div>
              </div>
              <h4 className="review-title">My skin has never looked better!</h4>
              <p className="review-text">&quot;Finally found a collagen that actually works! My skin looks so much better, and my nails are stronger than they&apos;ve been in years. The Glowing Beauty Complex is a game-changer.&quot;</p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <span className="review-tag">Joint Support</span>
                <div className="review-meta">
                  <span className="review-author">Michael R., 58</span>
                  <div className="review-rating">
                    <span className="review-stars">★★★★★</span>
                    <span className="review-verified">VERIFIED</span>
                  </div>
                </div>
              </div>
              <h4 className="review-title">My joints feel amazing</h4>
              <p className="review-text">&quot;My joint discomfort has significantly improved after 6 weeks. I can finally play with my grandkids without pain. This is the real deal—all 5 types make a difference.&quot;</p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <span className="review-tag">Hair & Nails</span>
                <div className="review-meta">
                  <span className="review-author">Jennifer L., 52</span>
                  <div className="review-rating">
                    <span className="review-stars">★★★★★</span>
                    <span className="review-verified">VERIFIED</span>
                  </div>
                </div>
              </div>
              <h4 className="review-title">Visible results in 3 weeks!</h4>
              <p className="review-text">&quot;My hair is growing faster and looks healthier, my skin is glowing, and I feel more confident. So glad I found this all-in-one solution.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Guarantee */}
      <section className="section section-stone">
        <div className="container-narrow">
          <div className="guarantee-card">
            <div className="guarantee-image">
              <div className="guarantee-days">60</div>
              <div className="guarantee-label">DAY GUARANTEE</div>
            </div>
            <div className="guarantee-content">
              <h2 className="guarantee-title">Try It Risk-Free</h2>
              <p className="guarantee-text">
                We&apos;re so confident you&apos;ll love Multi Collagen Complex Plus that we offer a full 60-day money-back guarantee. If you&apos;re not completely satisfied, simply return it for a full refund—no questions asked.
              </p>
              <p className="guarantee-tagline">
                You have nothing to lose and radiant skin to gain!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 15. FAQ */}
      <section className="section section-white">
        <div className="container-narrow">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {[
              {
                question: 'How is this different from regular collagen?',
                answer: 'Multi Collagen Complex Plus contains all 5 types of collagen (not just 1-2), plus our exclusive Glowing Beauty Complex with MSM, Keratin, Hyaluronic Acid, and more. It\'s a complete beauty supplement, not just collagen.'
              },
              {
                question: 'When will I see results?',
                answer: 'Most customers notice improvements within 2-4 weeks, with full benefits by week 8. Collagen works from within, so consistency is key for best results.'
              },
              {
                question: 'Is it safe to take daily?',
                answer: 'Yes! Multi Collagen Complex Plus is made with high-quality, third-party tested ingredients. It\'s GMP certified, non-GMO, and safe for daily use. As always, consult your healthcare provider if you have specific concerns.'
              },
              {
                question: 'Can I cancel my subscription anytime?',
                answer: 'Absolutely! You can cancel, pause, or modify your subscription anytime with no fees or penalties. Manage everything easily through your account dashboard.'
              },
              {
                question: 'What makes the Glowing Beauty Complex special?',
                answer: 'Our Glowing Beauty Complex combines 6 powerful ingredients: MSM for collagen production, Keratin for hair and nail strength, Hyaluronic Acid for hydration, Astaxanthin for wrinkle reduction, L-Glutathione for skin brightening, and Alpha Lipoic Acid for anti-aging. This unique blend amplifies the benefits of our 5-type collagen complex.'
              },
              {
                question: 'Are there any allergens I should know about?',
                answer: 'Multi Collagen Complex Plus contains collagen from bovine (cow), chicken, fish, and eggshell membrane sources. If you have allergies to any of these, please consult your doctor before use. It is gluten-free and non-GMO.'
              },
              {
                question: 'How should I store the product?',
                answer: 'Store in a cool, dry place away from direct sunlight. Keep the bottle tightly closed. Do not refrigerate.'
              },
              {
                question: 'Can I take this with other supplements?',
                answer: 'Multi Collagen Complex Plus is designed to work well with most supplements. However, since it already contains Biotin and Vitamin C, you may want to adjust your intake of those if you\'re taking them separately. Always consult with your healthcare provider about your specific supplement regimen.'
              }
            ].map((faq, index) => (
              <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={index}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17. Why Collagen is Awesome */}
      <section className="collagen-awesome">
        <div className="collagen-awesome-content">
          <h2>Why Collagen is So Awesome</h2>
          <p className="collagen-awesome-subtitle">The secret to youthful vitality that your body craves</p>

          <div className="collagen-awesome-grid">
            <div className="collagen-awesome-image">
              <div className="collagen-awesome-image-placeholder">🏊‍♀️💊</div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
                Couple Swimming in Collagen
              </div>
              <div className="collagen-awesome-image-text">
                Add your image here: An attractive 25-year-old couple swimming in a pool of collagen pills
              </div>
            </div>

            <div className="collagen-reasons">
              <div className="collagen-reason">
                <div className="collagen-reason-icon">✨</div>
                <div className="collagen-reason-content">
                  <h4>Your Body&apos;s Building Block</h4>
                  <p>Collagen makes up 30% of your body&apos;s total protein—it&apos;s literally the glue that holds you together, from skin to bones to organs.</p>
                </div>
              </div>

              <div className="collagen-reason">
                <div className="collagen-reason-icon">⏰</div>
                <div className="collagen-reason-content">
                  <h4>Fight the Clock</h4>
                  <p>After age 25, collagen production drops 1-1.5% every year. By 50, you&apos;ve lost nearly half. Supplementing helps replenish what time takes away.</p>
                </div>
              </div>

              <div className="collagen-reason">
                <div className="collagen-reason-icon">🔬</div>
                <div className="collagen-reason-content">
                  <h4>Science-Backed Results</h4>
                  <p>Studies show collagen peptides improve skin elasticity by 25% in just 8 weeks and reduce joint pain by up to 43%.</p>
                </div>
              </div>

              <div className="collagen-reason">
                <div className="collagen-reason-icon">💪</div>
                <div className="collagen-reason-content">
                  <h4>Total Body Benefits</h4>
                  <p>Beyond beauty—collagen supports gut health, muscle recovery, bone density, and even helps you sleep better.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="collagen-awesome-stats">
            <div className="collagen-stat">
              <span className="collagen-stat-number">30%</span>
              <span className="collagen-stat-label">Of Body&apos;s Protein</span>
            </div>
            <div className="collagen-stat">
              <span className="collagen-stat-number">80%</span>
              <span className="collagen-stat-label">Of Skin Structure</span>
            </div>
            <div className="collagen-stat">
              <span className="collagen-stat-number">25%</span>
              <span className="collagen-stat-label">More Elasticity</span>
            </div>
            <div className="collagen-stat">
              <span className="collagen-stat-number">8</span>
              <span className="collagen-stat-label">Weeks to Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* 18. FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta-grid">
            <div className="final-cta-image">
              PRODUCT<br />IMAGE
            </div>
            <div className="final-cta-content">
              <h2>Ready to Transform Your Skin, Hair & Joints?</h2>
              <p>Join 53,000+ customers who&apos;ve discovered the all-in-one beauty supplement with all 5 types of collagen + Glowing Beauty Complex.</p>

              <div className="final-cta-pricing">
                <span className="price-compare">$110.85</span>
                <span className="price-current">$27.86<small>/mo</small></span>
                <span className="price-badge">BEST VALUE</span>
              </div>

              <button className="cta-button" style={{ marginBottom: '12px' }}>Add to Cart — $27.86/mo</button>

              <div className="trust-line" style={{ justifyContent: 'flex-start' }}>
                <span>✓ 60-Day Guarantee</span>
                <span>✓ Free Shipping</span>
                <span>✓ Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <div className={`mobile-sticky ${showMobileSticky ? 'visible' : ''}`}>
        <div className="mobile-sticky-content">
          <div className="mobile-sticky-price">$27.86<small>/mo</small></div>
          <button className="mobile-sticky-button">Add to Cart</button>
        </div>
      </div>
    </>
  );
}
