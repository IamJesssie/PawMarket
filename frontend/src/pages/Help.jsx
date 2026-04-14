import { useContext, useEffect, useMemo, useState } from 'react';
import HelpCategoryCard from '../components/Help/HelpCategoryCard';
import HelpFaqSection from '../components/Help/HelpFaqSection';
import SupportChannelTabs from '../components/Help/SupportChannelTabs';
import { AuthContext } from '../context/AuthContext';
import './Help.css';

const helpCategories = [
  { id: 'orders', label: 'Orders & Shipping', icon: '/images/help/category-orders.svg' },
  { id: 'grooming', label: 'Grooming Services', icon: '/images/help/category-grooming.svg' },
  { id: 'returns', label: 'Returns & Refunds', icon: '/images/help/category-returns.svg' },
  { id: 'payments', label: 'Payments', icon: '/images/help/category-payments.svg' },
  { id: 'account', label: 'Account & Profile', icon: '/images/help/category-account.svg' }
];

const faqSections = [
  {
    id: 'orders',
    label: 'Orders & Shipping',
    items: [
      {
        id: 'os-1',
        question: 'How long does standard shipping take?',
        answer:
          'Standard shipping typically takes 3-5 business days within Metro Manila and 5-7 business days for provincial addresses.'
      },
      {
        id: 'os-2',
        question: 'Can I change my shipping address after ordering?',
        answer:
          'You can update your shipping address if your order has not yet been packed. Contact support immediately with your order number.'
      },
      {
        id: 'os-3',
        question: 'How do I track my order?',
        answer:
          'Go to your profile order history and open the order details page to see the latest courier updates and tracking number.'
      },
      {
        id: 'os-4',
        question: 'What happens if my order is lost in transit?',
        answer:
          'If tracking is stalled or lost, we will investigate with the courier and either resend your order or process a full refund.'
      }
    ]
  },
  {
    id: 'grooming',
    label: 'Grooming Services',
    items: [
      {
        id: 'gs-1',
        question: 'How do I book a grooming appointment?',
        answer:
          'Open the Grooming page, pick your package, choose a date and time slot, then confirm your booking details.'
      },
      {
        id: 'gs-2',
        question: 'What grooming services are available?',
        answer:
          'We offer full grooming, bath and dry, nail trimming, ear cleaning, and optional wellness add-ons based on pet type.'
      },
      {
        id: 'gs-3',
        question: 'Can I reschedule my appointment?',
        answer:
          'Yes, appointments can be rescheduled up to 24 hours before your slot through your account appointments section.'
      },
      {
        id: 'gs-4',
        question: 'What should I bring to the grooming session?',
        answer:
          'Bring your pet with a secure leash or carrier, updated vaccination details, and any grooming preferences.'
      }
    ]
  },
  {
    id: 'returns',
    label: 'Returns & Refunds',
    items: [
      {
        id: 'rr-1',
        question: 'What is your return policy?',
        answer:
          'Unused items in original packaging can be returned within 7 days after delivery, subject to inspection.'
      },
      {
        id: 'rr-2',
        question: 'How do I initiate a return?',
        answer:
          'Submit a return request from your order history or contact support with photos and reason for return.'
      },
      {
        id: 'rr-3',
        question: 'When will I receive my refund?',
        answer:
          'Refunds are processed within 3-7 business days after your return is approved and item quality is verified.'
      }
    ]
  },
  {
    id: 'payments',
    label: 'Payments & Billing',
    items: [
      {
        id: 'pb-1',
        question: 'What payment methods are accepted?',
        answer:
          'We accept major cards, select e-wallets, and cash on delivery for eligible orders and locations.'
      },
      {
        id: 'pb-2',
        question: 'Is it safe to save my card information?',
        answer:
          'Yes. Card details are encrypted and handled by certified payment processors. We do not store full card numbers.'
      },
      {
        id: 'pb-3',
        question: 'Why was my payment declined?',
        answer:
          'Declines may happen due to insufficient funds, expired card details, or bank security checks. Try another method or contact your bank.'
      }
    ]
  }
];

const supportChannels = [
  { id: 'chat', label: 'Live Chat', icon: '/images/help/support-chat.svg' },
  { id: 'email', label: 'Email', icon: '/images/help/support-email.svg' },
  { id: 'phone', label: 'Phone', icon: '/images/help/support-phone.svg' }
];

const initialForm = {
  name: '',
  email: '',
  topic: '',
  orderNumber: '',
  message: ''
};

const Help = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('orders');
  const [activeChannel, setActiveChannel] = useState('email');
  const [contactForm, setContactForm] = useState(initialForm);
  const [expandedItemId, setExpandedItemId] = useState('os-1');

  useEffect(() => {
    if (isAuthenticated && user) {
      setContactForm((current) => ({
        ...current,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user]);

  const filteredSections = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const selectedSections = faqSections.filter((section) => section.id === activeCategory);

    if (!query) {
      return selectedSections;
    }

    return selectedSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query) ||
            section.label.toLowerCase().includes(query)
        )
      }))
      .filter((section) => section.items.length > 0);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    const firstSection = filteredSections[0];
    if (!firstSection || firstSection.items.length === 0) {
      setExpandedItemId('');
      return;
    }

    if (!firstSection.items.some((item) => item.id === expandedItemId)) {
      setExpandedItemId(firstSection.items[0].id);
    }
  }, [filteredSections, expandedItemId]);

  const handleFaqToggle = (itemId) => {
    setExpandedItemId((current) => (current === itemId ? '' : itemId));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setContactForm((current) => ({ ...current, topic: '', orderNumber: '', message: '' }));
  };

  return (
    <div className="help-page">
      <div className="help-inner">
        <header className="help-hero">
          <h1>How Can We Help You?</h1>
          <div className="help-search-wrap">
            <img src="/images/help/search.svg" className="help-search-icon" alt="" aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search for help topics, FAQs..."
              aria-label="Search for help topics"
            />
            <button type="button">Search</button>
          </div>
          <p className="help-search-tip">Search auto-suggests FAQ topics</p>
        </header>

        <section className="help-categories" aria-label="Help categories">
          {helpCategories.map((category) => (
            <HelpCategoryCard
              key={category.id}
              id={category.id}
              label={category.label}
              icon={category.icon}
              active={activeCategory === category.id}
              onClick={setActiveCategory}
            />
          ))}
        </section>

        <section className="help-content-grid">
          <div className="help-faq-column">
            <h2>Frequently Asked Questions</h2>
            {filteredSections.length === 0 ? (
              <div className="help-empty-state">
                <p>No results found for your search. Try another keyword.</p>
              </div>
            ) : (
              filteredSections.map((section) => (
                <HelpFaqSection
                  key={section.id}
                  section={section}
                  expandedId={expandedItemId}
                  onToggle={handleFaqToggle}
                  collapseIcon="/images/help/faq-collapse.svg"
                  expandIcon="/images/help/faq-expand.svg"
                />
              ))
            )}
          </div>

          <aside className="help-support-column">
            <h2>Contact Support</h2>
            <SupportChannelTabs
              channels={supportChannels}
              activeChannel={activeChannel}
              onSelect={setActiveChannel}
            />

            <form className="help-support-form" onSubmit={handleSubmit}>
              <p className="form-caption">Send a message</p>
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={contactForm.name}
                onChange={handleFormChange}
                placeholder="Full Name"
                required
              />

              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleFormChange}
                placeholder="Email"
                required
              />

              <label htmlFor="topic">Topic</label>
              <input
                id="topic"
                name="topic"
                type="text"
                value={contactForm.topic}
                onChange={handleFormChange}
                placeholder="Topic"
                required
              />

              <label htmlFor="orderNumber">Order Number (Optional)</label>
              <input
                id="orderNumber"
                name="orderNumber"
                type="text"
                value={contactForm.orderNumber}
                onChange={handleFormChange}
                placeholder="#PM-XXXX"
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleFormChange}
                placeholder="How can we help you today?"
                rows={4}
                required
              />

              <label htmlFor="attachmentInput">Attachments (Optional)</label>
              <label htmlFor="attachmentInput" className="help-attachment-btn">
                <img src="/images/help/attachment.svg" alt="" aria-hidden="true" />
                <span>Drag &amp; Drop or Browse</span>
              </label>
              <input id="attachmentInput" type="file" className="help-hidden-file-input" />

              <button type="submit" className="help-submit-btn">
                Submit Message
              </button>
            </form>

            <div className="help-hours">
              <p>Support Hours</p>
              <div>
                <span>Mon - Fri</span>
                <strong>8:00 AM - 8:00 PM</strong>
              </div>
              <div>
                <span>Saturday</span>
                <strong>9:00 AM - 6:00 PM</strong>
              </div>
              <div>
                <span>Sunday</span>
                <strong>10:00 AM - 4:00 PM</strong>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Help;
