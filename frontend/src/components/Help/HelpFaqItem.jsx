const HelpFaqItem = ({ id, question, answer, expanded, onToggle, collapseIcon, expandIcon }) => {
  return (
    <article className={`help-faq-item ${expanded ? 'expanded' : ''}`}>
      <button type="button" className="help-faq-question" onClick={() => onToggle(id)}>
        <span>{question}</span>
        <span className="help-faq-toggle" aria-hidden="true">
          <img src={expanded ? collapseIcon : expandIcon} alt="" />
        </span>
      </button>
      {expanded && <p className="help-faq-answer">{answer}</p>}
    </article>
  );
};

export default HelpFaqItem;
