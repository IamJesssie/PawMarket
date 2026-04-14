import HelpFaqItem from './HelpFaqItem';

const HelpFaqSection = ({ section, expandedId, onToggle, collapseIcon, expandIcon }) => {
  return (
    <section className="help-faq-section">
      <h3>{section.label}</h3>
      <div className="help-faq-list">
        {section.items.map((item) => (
          <HelpFaqItem
            key={item.id}
            id={item.id}
            question={item.question}
            answer={item.answer}
            expanded={expandedId === item.id}
            onToggle={onToggle}
            collapseIcon={collapseIcon}
            expandIcon={expandIcon}
          />
        ))}
      </div>
    </section>
  );
};

export default HelpFaqSection;
